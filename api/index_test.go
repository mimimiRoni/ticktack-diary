package handler

import (
	"bytes"
	"encoding/json"
	"fmt"
	"net/http"
	"net/http/httptest"
	"testing"

	auth "ticktack-diary/api/_util/auth"
	db "ticktack-diary/api/_util/db"

	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/stretchr/testify/assert"
)

// モック認証関数
func mockVerifyTokenValid(r *http.Request) (string, error) {
	return "mock-uid-12345", nil
}

func mockVerifyTokenInvalid(r *http.Request) (string, error) {
	return "", fmt.Errorf("unauthorized")
}

// モックDB関数
func mockGetDBSuccess() (*pgxpool.Pool, error) {
	return nil, nil
}

func mockGetDBFailure() (*pgxpool.Pool, error) {
	return nil, fmt.Errorf("db connection error")
}

// テスト用の構造体
type testCase struct {
	name         string
	mockVerify   func(*http.Request) (string, error)
	mockDB       func() (*pgxpool.Pool, error)
	expectedCode int
	expectedBody map[string]string
}

func TestHandler(t *testing.T) {
	// `auth.VerifyToken` と `db.GetDB` のモック化
	originalVerifyToken := auth.VerifyToken
	originalGetDB := db.GetDB
	defer func() {
		auth.VerifyToken = originalVerifyToken
		db.GetDB = originalGetDB
	}()

	// テストケース
	tests := []testCase{
		{
			name:         "正常系: 認証成功",
			mockVerify:   mockVerifyTokenValid,
			mockDB:       mockGetDBSuccess,
			expectedCode: http.StatusOK,
			expectedBody: map[string]string{"uid": "mock-uid-12345"},
		},
		{
			name:         "異常系: 認証失敗",
			mockVerify:   mockVerifyTokenInvalid,
			mockDB:       mockGetDBSuccess,
			expectedCode: http.StatusUnauthorized,
			expectedBody: map[string]string{"error": "unauthorized"},
		},
		{
			name:         "異常系: DB接続失敗",
			mockVerify:   mockVerifyTokenValid,
			mockDB:       mockGetDBFailure,
			expectedCode: http.StatusInternalServerError,
			expectedBody: map[string]string{"error": "db connection error"},
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			// モック関数を適用
			auth.VerifyToken = tt.mockVerify
			db.GetDB = tt.mockDB

			// リクエスト作成
			req, err := http.NewRequest("GET", "/", bytes.NewBuffer(nil))
			assert.NoError(t, err)

			// レスポンスを記録する `httptest` の `ResponseRecorder`
			rr := httptest.NewRecorder()

			// ハンドラー実行
			Handler(rr, req)

			// ステータスコードの検証
			assert.Equal(t, tt.expectedCode, rr.Code)

			// JSONレスポンスの検証
			var respBody map[string]string
			err = json.Unmarshal(rr.Body.Bytes(), &respBody)
			assert.NoError(t, err)
			assert.Equal(t, tt.expectedBody, respBody)
		})
	}
}
