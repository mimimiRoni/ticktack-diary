CREATE TABLE users (
  uid TEXT PRIMARY KEY
);

CREATE TABLE time_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  uid TEXT REFERENCES users(uid) ON DELETE CASCADE,
  name TEXT NOT NULL
);

CREATE TABLE time_records (
  id SERIAL PRIMARY KEY,
  uid TEXT REFERENCES users(uid) ON DELETE CASCADE,
  category_id UUID REFERENCES time_categories(id) ON DELETE SET NULL,
  started_at TIMESTAMP NOT NULL,
  duration_ms INTEGER NOT NULL
);

CREATE TABLE daily_comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  uid TEXT REFERENCES users(uid) ON DELETE CASCADE,
  date DATE NOT NULL,
  comment TEXT
);
-- INDEX
CREATE INDEX idx_users_uid ON users(uid);

CREATE INDEX idx_time_categories_uid ON time_categories(uid);
CREATE INDEX idx_time_categories_uid_id ON time_categories(uid, id);

CREATE INDEX idx_time_records_uid ON time_records(uid);
CREATE INDEX idx_time_records_uid_id ON time_records(uid, id);
CREATE INDEX idx_time_records_uid_started ON time_records(uid, started_at);

CREATE INDEX idx_daily_comments_uid ON daily_comments(uid);
CREATE INDEX idx_daily_comments_uid_id ON daily_comments(uid, id);
CREATE INDEX idx_daily_comments_uid_date ON daily_comments(uid, date);

