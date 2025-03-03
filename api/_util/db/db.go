package db

import (
	"context"
	"fmt"
	"os"
	"sync"

	"github.com/jackc/pgx/v5/pgxpool"
)

var (
	pool    *pgxpool.Pool
	once    sync.Once
	initErr error
	GetDB   = GetDBImplementation
)

func initDB() error {
	once.Do(func() {
		databaseURL := os.Getenv("DATABASE_URL")
		if databaseURL == "" {
			initErr = fmt.Errorf("DATABASE_URL is not set")
			return
		}

		var err error
		pool, err = pgxpool.New(context.Background(), databaseURL)
		if err != nil {
			initErr = fmt.Errorf("failed to connect to database: %v", err)
			return
		}
	})

	return initErr
}

// GetDB はデータベースプールを取得する
func GetDBImplementation() (*pgxpool.Pool, error) {
	if err := initDB(); err != nil {
		return nil, err
	}
	return pool, nil
}
