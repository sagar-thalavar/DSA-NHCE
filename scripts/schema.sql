-- Simple entries: id, title (text), value (number), content (text), created_at
-- Run in Neon SQL Editor or: node scripts/init-db.js

DROP TABLE IF EXISTS entries;

CREATE TABLE entries (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  value INTEGER NOT NULL DEFAULT 0,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_entries_created_at ON entries(created_at);
CREATE INDEX idx_entries_value ON entries(value);
