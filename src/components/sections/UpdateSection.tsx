"use client";

import { useState } from "react";
import { updateEntry } from "@/lib/actions";
import { EntryCard } from "@/components/EntryCard";
import type { Entry } from "@/lib/db";

export function UpdateSection() {
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [content, setContent] = useState("");
  const [result, setResult] = useState<Entry | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleUpdate() {
    const entryId = parseInt(id, 10);
    const numValue = parseInt(value, 10);
    if (Number.isNaN(entryId)) { setError("Invalid ID"); return; }
    setError(null);
    const r = await updateEntry(entryId, title, Number.isNaN(numValue) ? 0 : numValue, content);
    setResult(r.data ?? null);
    if (r.error) setError(r.error);
  }

  return (
    <section className="section-card">
      <h2 className="section-title">Update</h2>
      <p className="section-desc">Edit title, value, and content by ID.</p>
      <div className="flex flex-wrap gap-2 items-end">
        <input className="input w-20" type="number" value={id} onChange={(e) => setId(e.target.value)} placeholder="ID" />
        <input className="input" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
        <input className="input w-24" type="number" value={value} onChange={(e) => setValue(e.target.value)} placeholder="Value" />
        <input className="input" value={content} onChange={(e) => setContent(e.target.value)} placeholder="Content" />
        <button type="button" className="btn" onClick={handleUpdate}>Update</button>
      </div>
      {error && <p className="text-sm text-red-600 mt-2">{error}</p>}
      {result && <div className="mt-4"><EntryCard e={result} /></div>}
    </section>
  );
}
