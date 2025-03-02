package users

import (
	"context"
	"encoding/json"
	"net/http"
	"ticktack-diary/api/_util/auth"
	"ticktack-diary/api/_util/db"
)

func Handler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	uid, error := auth.VerifyToken(r)
	if error != nil {
		w.WriteHeader(http.StatusUnauthorized)
		json.NewEncoder(w).Encode(map[string]string{"error": error.Error()})
		return
	}

	switch r.Method {
	case http.MethodPost:
		handleAddUser(w, uid)
	default:
		w.WriteHeader(http.StatusMethodNotAllowed)
	}
}

func handleAddUser(w http.ResponseWriter, uid string) {
	dbPool, error := db.GetDB()
	if error != nil || dbPool == nil {
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(map[string]string{"error": error.Error()})
		return
	}

	dbPool.Query(context.Background(), "INSERT INTO users (uid) VALUES($1)", uid)
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(map[string]interface{}{"uid": uid})
}
