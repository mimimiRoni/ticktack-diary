//go:build test

package auth

import (
	"fmt"
	"net/http"
)

var VerifyToken = func(r *http.Request) (string, error) {
	fmt.Printf("これはモック関数です")
	return "", nil
}
