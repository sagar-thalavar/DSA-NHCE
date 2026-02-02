"use client";

import { useState } from "react";
import { fetchById, fetchLatest, fetchEarliest } from "@/lib/actions";
import { EntryCard } from "@/components/EntryCard";

export function AccessSection() {
  const [byId, setById] = useState("");
  const [result, setResult] = useState<{ id: number; title: string; value: number; content: string; created_at: Date } | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleFetchById() {
    const id = parseInt(byId, 10);
    if (Number.isNaN(id)) { setError("Invalid ID"); return; }
    setError(null);
    const { data } = await fetchById(id);
    setResult(data ?? null);
  }

  async function handleLatest() {
    setError(null);
    const { data } = await fetchLatest();
    setResult(data ?? null);
  }

  async function handleEarliest() {
    setError(null);
    const { data } = await fetchEarliest();
    setResult(data ?? null);
  }

  return (
    <section className="section-card">
      <h2 className="section-title">Access</h2>
      <p className="section-desc">Fetch by ID, or latest / earliest by date.</p>
      <div className="flex flex-wrap gap-2 items-end">
        <div>
          <label className="label">ID</label>
          <input className="input w-24" value={byId} onChange={(e) => setById(e.target.value)} type="number" placeholder="1" />
        </div>
        <button type="button" className="btn" onClick={handleFetchById}>By ID</button>
        <button type="button" className="btn" onClick={handleLatest}>Latest</button>
        <button type="button" className="btn" onClick={handleEarliest}>Earliest</button>
      </div>
      {error && <p className="text-sm text-red-600 mt-2">{error}</p>}
      {result && <div className="mt-4"><EntryCard e={result} /></div>}
    </section>
  );
}
