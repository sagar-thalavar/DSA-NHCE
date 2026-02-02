/**
 * Run schema against NeonDB. Set DATABASE_URL then: node scripts/init-db.js
 */
const { neon } = require("@neondatabase/serverless");

async function main() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    console.error("Set DATABASE_URL");
    process.exit(1);
  }
  const sql = neon(url);
  await sql`DROP TABLE IF EXISTS entries`;
  await sql`
    CREATE TABLE entries (
      id SERIAL PRIMARY KEY,
      title TEXT NOT NULL,
      value INTEGER NOT NULL DEFAULT 0,
      content TEXT NOT NULL,
      created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
    )
  `;
  await sql`CREATE INDEX idx_entries_created_at ON entries(created_at)`;
  await sql`CREATE INDEX idx_entries_value ON entries(value)`;
  console.log("Schema applied. Table: entries (id, title, value, content, created_at)");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
