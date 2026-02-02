"use server";

import { revalidatePath } from "next/cache";
import { sql } from "./db";
import type { Entry } from "./db";

// ——— INSERT ———
export async function insertSingle(formData: FormData) {
  const title = (formData.get("title") as string)?.trim() || "";
  const value = parseInt((formData.get("value") as string) || "0", 10);
  const content = (formData.get("content") as string)?.trim() || "";
  if (!title || !content) return { error: "Title and content required" };
  const rows = await sql`
    INSERT INTO entries (title, value, content)
    VALUES (${title}, ${value}, ${content})
    RETURNING id, title, value, content, created_at
  `;
  revalidatePath("/");
  return { data: rows[0] as Entry, error: null };
}

export async function insertSingleForm(formData: FormData) {
  await insertSingle(formData);
}

// ——— ACCESS ———
export async function fetchById(id: number) {
  const rows = await sql`
    SELECT id, title, value, content, created_at
    FROM entries WHERE id = ${id}
  `;
  return { data: (rows[0] as Entry) || null, error: null };
}

export async function fetchLatest() {
  const rows = await sql`
    SELECT id, title, value, content, created_at
    FROM entries ORDER BY created_at DESC LIMIT 1
  `;
  return { data: (rows[0] as Entry) || null, error: null };
}

export async function fetchEarliest() {
  const rows = await sql`
    SELECT id, title, value, content, created_at
    FROM entries ORDER BY created_at ASC LIMIT 1
  `;
  return { data: (rows[0] as Entry) || null, error: null };
}

// ——— SEARCH ———
export async function searchKeyword(q: string) {
  const term = `%${(q || "").trim()}%`;
  const rows = await sql`
    SELECT id, title, value, content, created_at
    FROM entries
    WHERE title ILIKE ${term} OR content ILIKE ${term}
    ORDER BY created_at DESC
  `;
  return { data: rows as Entry[], error: null };
}

// ——— UPDATE ———
export async function updateEntry(id: number, title: string, value: number, content: string) {
  const rows = await sql`
    UPDATE entries SET title = ${title}, value = ${value}, content = ${content}
    WHERE id = ${id}
    RETURNING id, title, value, content, created_at
  `;
  revalidatePath("/");
  return { data: (rows[0] as Entry) || null, error: rows.length ? null : "Not found" };
}

// ——— DELETE ———
export async function deleteOne(id: number) {
  await sql`DELETE FROM entries WHERE id = ${id}`;
  revalidatePath("/");
  return { error: null };
}

export async function deleteOneForm(formData: FormData) {
  const id = parseInt((formData.get("id") as string) || "0", 10);
  if (!Number.isNaN(id)) await deleteOne(id);
}

// ——— TRAVERSAL ———
export async function fetchAll() {
  const rows = await sql`
    SELECT id, title, value, content, created_at
    FROM entries ORDER BY created_at ASC
  `;
  return { data: rows as Entry[], error: null };
}

export async function fetchAllReverse() {
  const rows = await sql`
    SELECT id, title, value, content, created_at
    FROM entries ORDER BY created_at DESC
  `;
  return { data: rows as Entry[], error: null };
}

// ——— SORTING ———
export async function sortByDate() {
  const rows = await sql`
    SELECT id, title, value, content, created_at
    FROM entries ORDER BY created_at ASC
  `;
  return { data: rows as Entry[], error: null };
}

export async function sortByValue() {
  const rows = await sql`
    SELECT id, title, value, content, created_at
    FROM entries ORDER BY value DESC, created_at ASC
  `;
  return { data: rows as Entry[], error: null };
}

export async function sortByTitle() {
  const rows = await sql`
    SELECT id, title, value, content, created_at
    FROM entries ORDER BY title ASC
  `;
  return { data: rows as Entry[], error: null };
}

// ——— AGGREGATION ———
export async function totalCount() {
  const rows = await sql`SELECT COUNT(*)::int AS count FROM entries`;
  return { data: (rows[0] as { count: number }).count, error: null };
}

export async function averageValue() {
  const rows = await sql`SELECT COALESCE(AVG(value), 0)::float AS avg FROM entries`;
  return { data: (rows[0] as { avg: number }).avg, error: null };
}
