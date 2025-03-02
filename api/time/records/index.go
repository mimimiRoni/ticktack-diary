package records

import (
	"context"
	"encoding/json"
	"net/http"
	"ticktack-diary/api/_util/auth"
	"ticktack-diary/api/_util/db"
	"time"

	"github.com/go-playground/validator/v10"
)

type TimeRecordPostRequest struct {
	CategoryID string    `json:"category-id" validate:"uuid,required"`
	StartedAt  time.Time `json:"started-at" validate:"required"`
	DurationMs int       `json:"duration-ms,string" validate:"min=1,required"`
}

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
		handleCreateTimeRecord(w, r, uid)
		// TODO: 他のメソッドも追加
	default:
		w.WriteHeader(http.StatusMethodNotAllowed)
	}
}

func handleCreateTimeRecord(w http.ResponseWriter, r *http.Request, uid string) {
	var requestBody TimeRecordPostRequest
	error := json.NewDecoder(r.Body).Decode(&requestBody)
	if error != nil {
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]string{"error": "failed to request JSON decode. " + error.Error()})
		return
	}

	validate := validator.New()
	error = validate.Struct(requestBody)
	if error != nil {
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]string{"error": "failed to request validation. " + error.Error()})
		return
	}

	dbPool, error := db.GetDB()
	if error != nil || dbPool == nil {
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(map[string]string{"error": error.Error()})
		return
	}

	dbPool.Query(
		context.Background(),
		"INSERT INTO time_records (uid, category_id, started_at, duration_ms) VALUES($1, $2, $3, $4)",
		uid,
		requestBody.CategoryID,
		requestBody.StartedAt,
		requestBody.DurationMs,
	)

	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(map[string]interface{}{"uid": uid})
}
