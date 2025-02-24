package handler

import (
	"encoding/json"
	"net/http"
	auth "ticktack-diary/api/auth"
)

func Handler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json; charset=utf-8")

	uid, error := auth.VerifyToken(r)
	if error != nil {
		w.WriteHeader(http.StatusUnauthorized)
		json.NewEncoder(w).Encode(map[string]string{"error": error.Error()})
		return
	}

	w.WriteHeader(http.StatusOK)
	response := map[string]string{"uid": uid}
	json.NewEncoder(w).Encode(response)
}
