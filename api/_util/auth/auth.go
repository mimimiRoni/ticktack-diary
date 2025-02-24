package auth

import (
	"context"
	"fmt"
	"net/http"
	"os"

	firebase "firebase.google.com/go/v4"
	"firebase.google.com/go/v4/auth"
	"google.golang.org/api/option"
)

var authClient *auth.Client
var VerifyToken = VerifyTokenImplementation

func init() {
	opt := option.WithCredentialsJSON([]byte(os.Getenv("GOOGLE_APPLICATION_CREDENTIALS")))
	app, err := firebase.NewApp(context.Background(), nil, opt)
	if err != nil {
		fmt.Printf("Firebase 初期化エラー: %v\n", err)
		return
	}

	client, err := app.Auth(context.Background())
	if err != nil {
		fmt.Printf("Auth クライアントの取得エラー: %v\n", err)
		return
	}

	authClient = client
}

func VerifyTokenImplementation(r *http.Request) (string, error) {
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
