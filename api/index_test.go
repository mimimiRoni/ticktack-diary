package handler

import (
	"bytes"
	"encoding/json"
	"fmt"
	"net/http"
	"net/http/httptest"
	"testing"

	auth "ticktack-diary/api/_util/auth"

	"github.com/stretchr/testify/assert"
)

// モック認証関数
func mockVerifyTokenValid(r *http.Request) (string, error) {
	return "mock-uid-12345", nil
}

func mockVerifyTokenInvalid(r *http.Request) (string, error) {
	return "", fmt.Errorf("unauthorized")
}

// テスト用の構造体
type testCase struct {
	name         string
	mockVerify   func(*http.Request) (string, error)
	expectedCode int
	expectedBody map[string]string
}

func TestHandler(t *testing.T) {
	// `auth.VerifyToken` のモック化
	originalVerifyToken := auth.VerifyToken
	defer func() { auth.VerifyToken = originalVerifyToken }()

	// テストケース
	tests := []testCase{
		{
			name:         "正常系: 認証成功",
			mockVerify:   mockVerifyTokenValid,
			expectedCode: http.StatusOK,
			expectedBody: map[string]string{"uid": "mock-uid-12345"},
		},
		{
			name:         "異常系: 認証失敗",
			mockVerify:   mockVerifyTokenInvalid,
			expectedCode: http.StatusUnauthorized,
			expectedBody: map[string]string{"error": "unauthorized"},
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			// モック関数を適用
			auth.VerifyToken = tt.mockVerify

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
