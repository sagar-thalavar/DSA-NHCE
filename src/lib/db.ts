import { neon } from "@neondatabase/serverless";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set");
}

export const sql = neon(process.env.DATABASE_URL);

export type Entry = {
  id: number;
  title: string;
  value: number;
  content: string;
  created_at: Date;
};
