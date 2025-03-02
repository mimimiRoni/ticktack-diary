package users_test

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"
	"net/http/httptest"
	"testing"
	"ticktack-diary/api/_util/auth"
	"ticktack-diary/api/_util/db"
	"ticktack-diary/api/users"

	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/stretchr/testify/assert"
)

type testCase struct {
	name            string
	mockVerifyToken func(r *http.Request) (string, error)
	mockGetDB       func() (*pgxpool.Pool, error)
	expectedCode    int
	expectedBody    map[string]interface{}
}

const apiUrl = "/api/users"

var validVerifyToken = func(r *http.Request) (string, error) {
	return "mock-user", nil
}

var validMockGetDB = func() (*pgxpool.Pool, error) {
	pool, _ := pgxpool.New(context.Background(), "")
	return pool, nil
}

func TestNotAllowMethod(t *testing.T) {
	originalVerifyToken := auth.VerifyToken
	defer func() {
		auth.VerifyToken = originalVerifyToken
	}()

	auth.VerifyToken = func(r *http.Request) (string, error) {
		return "mock-user", nil
	}

	request := httptest.NewRequest(http.MethodConnect, apiUrl, nil)
	response := httptest.NewRecorder()

	users.Handler(response, request)

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
			expectedCode:    http.StatusCreated,
			expectedBody:    map[string]interface{}{"uid": "mock-user"},
		},
		{
			name: "should return failed when failed to verify token",
			mockVerifyToken: func(r *http.Request) (string, error) {
				return "", fmt.Errorf("invalid auth token")
			},
			mockGetDB:    validMockGetDB,
			expectedCode: http.StatusUnauthorized,
			expectedBody: map[string]interface{}{"error": "invalid auth token"},
		},
		{
			name:            "should return 500 when failed connect db",
			mockVerifyToken: validVerifyToken,
			mockGetDB:       func() (*pgxpool.Pool, error) { return nil, fmt.Errorf("failed to connect db") },
			expectedCode:    http.StatusInternalServerError,
			expectedBody:    map[string]interface{}{"error": "failed to connect db"},
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			auth.VerifyToken = tt.mockVerifyToken
			db.GetDB = tt.mockGetDB

			request := httptest.NewRequest(http.MethodPost, apiUrl, nil)
			response := httptest.NewRecorder()

			users.Handler(response, request)

			assert.Equal(tt.expectedCode, response.Code)
			assert.Equal("application/json", response.Header().Get("Content-Type"))

			var actualBody map[string]interface{}
			err := json.Unmarshal(response.Body.Bytes(), &actualBody)
			if err != nil {
				t.Fatalf("failed response JSON decode: %v", err)
			}

			assert.Equal(tt.expectedBody, actualBody, tt.expectedBody)
		})
	}
}
