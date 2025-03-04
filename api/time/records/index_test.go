package records_test

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"net/http"
	"net/http/httptest"
	"testing"
	"ticktack-diary/api/_util/auth"
	"ticktack-diary/api/_util/db"
	"ticktack-diary/api/time/records"

	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/stretchr/testify/assert"
)

type testCase struct {
	name            string
	mockVerifyToken func(r *http.Request) (string, error)
	mockGetDB       func() (*pgxpool.Pool, error)
	requestBody     interface{}
	expectedCode    int
	expectedBody    map[string]interface{}
}

const apiUrl = "/api/time/records"

var validVerifyToken = func(r *http.Request) (string, error) {
	return "mock-user", nil
}

var validMockGetDB = func() (*pgxpool.Pool, error) {
	pool, _ := pgxpool.New(context.Background(), "")
	return pool, nil
}

var validRequestBody = map[string]string{
	"category-id": "00000000-0000-0000-0000-000000000000",
	"started-at":  "2025-03-02T04:22:31.958Z",
	"duration-ms": "3600000",
}

// テストではDBにちゃんと接続しないので、すべて初期値が返ってくる → それが返ってくることを期待する
var successResponseBody = map[string]interface{}{
	"id":          "",
	"uid":         "",
	"category-id": "",
	"duration-ms": "0",
	"started-at":  "0001-01-01T00:00:00Z",
}

func TestNotAllowMethod(t *testing.T) {
	originalVerifyToken := auth.VerifyToken
	defer func() {
		auth.VerifyToken = originalVerifyToken
	}()

	auth.VerifyToken = func(r *http.Request) (string, error) {
		return "mock-user", nil
	}

	var reqBody []byte
	var err error

	reqBody, err = json.Marshal(validRequestBody)

	if err != nil {
		t.Fatalf("failed JSON encode: %v", err)
	}

	request := httptest.NewRequest(http.MethodConnect, apiUrl, bytes.NewBuffer(reqBody))
	request.Header.Set("Content-Type", "application/json")
	response := httptest.NewRecorder()

	records.Handler(response, request)

	assert.Equal(t, http.StatusMethodNotAllowed, response.Code)
}

func TestHandlerPost(t *testing.T) {
	originalVerifyToken := auth.VerifyToken
	originalGetDB := db.GetDB
	defer func() {
		auth.VerifyToken = originalVerifyToken
		db.GetDB = originalGetDB
	}()

	assert := assert.New(t)

	tests := []testCase{
		{
			name:            "should return 201 Created",
			mockVerifyToken: validVerifyToken,
			mockGetDB:       validMockGetDB,
			requestBody:     validRequestBody,
			expectedCode:    http.StatusCreated,
			expectedBody:    successResponseBody,
		},
		{
			name:            "should return 201 Created when nil category id",
			mockVerifyToken: validVerifyToken,
			mockGetDB:       validMockGetDB,
			requestBody: map[string]interface{}{
				"category-id": nil,
				"started-at":  "2025-03-02T04:22:31.958Z",
				"duration-ms": "3600000",
			},
			expectedCode: http.StatusCreated,
			expectedBody: successResponseBody,
		},
		{
			name: "should return failed when failed to verify token",
			mockVerifyToken: func(r *http.Request) (string, error) {
				return "", fmt.Errorf("invalid auth token")
			},
			mockGetDB:    validMockGetDB,
			requestBody:  validRequestBody,
			expectedCode: http.StatusUnauthorized,
			expectedBody: map[string]interface{}{"error": "invalid auth token"},
		},
		{
			name:            "should return failed when failed to decode request",
			mockVerifyToken: validVerifyToken,
			mockGetDB:       validMockGetDB,
			requestBody:     nil,
			expectedCode:    http.StatusBadRequest,
			expectedBody:    map[string]interface{}{"error": "failed to request JSON decode. EOF"},
		},
		{
			name:            "should return 400 Bad Request when invalid duration",
			mockVerifyToken: validVerifyToken,
			mockGetDB:       validMockGetDB,
			requestBody: map[string]string{
				"category-id": "00000000-0000-0000-0000-000000000000",
				"started-at":  "2025-03-02T04:22:31.958Z",
				"duration-ms": "0",
			},
			expectedCode: http.StatusBadRequest,
			expectedBody: map[string]interface{}{"error": "failed to request validation. Key: 'TimeRecordPostRequest.DurationMs' Error:Field validation for 'DurationMs' failed on the 'min' tag"},
		},
		{
			name:            "should return 500 when failed connect db",
			mockVerifyToken: validVerifyToken,
			mockGetDB:       func() (*pgxpool.Pool, error) { return nil, fmt.Errorf("failed to connect db") },
			requestBody:     validRequestBody,
			expectedCode:    http.StatusInternalServerError,
			expectedBody:    map[string]interface{}{"error": "failed to connect db"},
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			auth.VerifyToken = tt.mockVerifyToken
			db.GetDB = tt.mockGetDB
			var reqBody []byte
			var err error

			if tt.requestBody != nil {
				reqBody, err = json.Marshal(tt.requestBody)
				if err != nil {
					t.Fatalf("failed JSON encode: %v", err)
				}
			}

			request := httptest.NewRequest(http.MethodPost, apiUrl, bytes.NewBuffer(reqBody))
			request.Header.Set("Content-Type", "application/json")
			response := httptest.NewRecorder()

			records.Handler(response, request)

			assert.Equal(tt.expectedCode, response.Code)
			assert.Equal("application/json", response.Header().Get("Content-Type"))

			var actualBody map[string]interface{}
			err = json.Unmarshal(response.Body.Bytes(), &actualBody)
			if err != nil {
				t.Fatalf("failed response JSON decode: %v", err)
			}

			assert.Equal(tt.expectedBody, actualBody, tt.expectedBody)
		})
	}
}
