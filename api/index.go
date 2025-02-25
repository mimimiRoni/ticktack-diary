package handler

import (
	"encoding/json"
	"net/http"
	auth "ticktack-diary/api/_util/auth"
	"ticktack-diary/api/_util/db"
)

func Handler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json; charset=utf-8")

	// 認証トークンの検証お試し
	uid, error := auth.VerifyToken(r)
	if error != nil {
		w.WriteHeader(http.StatusUnauthorized)
		json.NewEncoder(w).Encode(map[string]string{"error": error.Error()})
		return
	}

	// DB接続お試し：とりあえずエラーが返ってこないことだけ確かめる
	_, error = db.GetDB()
	if error != nil {
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(map[string]string{"error": error.Error()})
		return
	}

	w.WriteHeader(http.StatusOK)
	response := map[string]string{"uid": uid}
	json.NewEncoder(w).Encode(response)
}
