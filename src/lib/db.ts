import { neon } from "@neondatabase/serverless";

const databaseUrl = process.env.DATABASE_URL || "postgres://db:db@localhost/db";
export const sql = neon(databaseUrl);

export type Entry = {
  id: number;
  title: string;
  value: number;
  content: string;
  created_at: Date;
};
