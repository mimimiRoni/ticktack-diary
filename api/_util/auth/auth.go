package auth

import (
	"context"
	"encoding/base64"
	"fmt"
	"net/http"
	"os"
	"sync"

	firebase "firebase.google.com/go/v4"
	"firebase.google.com/go/v4/auth"
	"google.golang.org/api/option"
)

var (
	authClient  *auth.Client
	once        sync.Once
	initError   error
	VerifyToken = VerifyTokenImplementation
)

func initAuth() error {
	once.Do(func() {
		decode, decodeErr := base64.StdEncoding.DecodeString(os.Getenv("GOOGLE_APPLICATION_CREDENTIALS"))
		if decodeErr != nil {
			initError = fmt.Errorf("environment variable decoding error: %v", decodeErr)
			return
		}

		opt := option.WithCredentialsJSON([]byte(decode))
		app, err := firebase.NewApp(context.Background(), nil, opt)
		if err != nil {
			initError = fmt.Errorf("init Firebase error: %v", err)
			return
		}

		client, err := app.Auth(context.Background())
		if err != nil {
			initError = fmt.Errorf("getting Auth client error: %v", err)
			return
		}

		authClient = client
	})

	return initError
}

func VerifyTokenImplementation(r *http.Request) (string, error) {
	if err := initAuth(); err != nil {
		return "", err
	}
	authHeader := r.Header.Get("Authorization")
	if authHeader == "" {
		return "", fmt.Errorf("authorization ヘッダーがありません")
	}

	idToken := authHeader[len("Bearer "):]
	token, err := authClient.VerifyIDToken(context.Background(), idToken)
	if err != nil {
		return "", fmt.Errorf("無効なトークン: %v", err)
	}

	return token.UID, nil
}
