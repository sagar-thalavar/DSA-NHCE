"use client";

import { useState } from "react";
import { fetchAll, fetchAllReverse } from "@/lib/actions";
import { EntryCard } from "@/components/EntryCard";
import type { Entry } from "@/lib/db";

export function TraversalSection() {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [order, setOrder] = useState<"asc" | "desc" | null>(null);

  async function handleAll() {
    const { data } = await fetchAll();
    setEntries(data ?? []);
    setOrder("asc");
  }

  async function handleReverse() {
    const { data } = await fetchAllReverse();
    setEntries(data ?? []);
    setOrder("desc");
  }

  return (
    <section className="section-card">
      <h2 className="section-title">Traversal</h2>
      <p className="section-desc">Show all entries in order or reverse order.</p>
      <div className="flex gap-2">
        <button type="button" className="btn" onClick={handleAll}>All (oldest first)</button>
        <button type="button" className="btn" onClick={handleReverse}>Reverse (newest first)</button>
      </div>
      {order && (
        <div className="mt-4 space-y-2">
          <p className="text-xs text-[var(--text-muted)]">{entries.length} entries</p>
          {entries.map((e) => <EntryCard key={e.id} e={e} />)}
        </div>
      )}
    </section>
  );
}
