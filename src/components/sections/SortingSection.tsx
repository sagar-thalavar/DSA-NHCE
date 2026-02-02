"use client";

import { useState } from "react";
import { sortByDate, sortByValue, sortByTitle } from "@/lib/actions";
import { EntryCard } from "@/components/EntryCard";
import type { Entry } from "@/lib/db";

export function SortingSection() {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [sortBy, setSortBy] = useState<string | null>(null);

  async function handleDate() {
    const { data } = await sortByDate();
    setEntries(data ?? []);
    setSortBy("date");
  }
  async function handleValue() {
    const { data } = await sortByValue();
    setEntries(data ?? []);
    setSortBy("value");
  }
  async function handleTitle() {
    const { data } = await sortByTitle();
    setEntries(data ?? []);
    setSortBy("title");
  }

  return (
    <section className="section-card">
      <h2 className="section-title">Sorting</h2>
      <p className="section-desc">List entries by date, value, or title.</p>
      <div className="flex gap-2 flex-wrap">
        <button type="button" className="btn" onClick={handleDate}>By date</button>
        <button type="button" className="btn" onClick={handleValue}>By value</button>
        <button type="button" className="btn" onClick={handleTitle}>By title</button>
      </div>
      {sortBy && (
        <div className="mt-4 space-y-2">
          <p className="text-xs text-[var(--text-muted)]">Sorted by {sortBy} ({entries.length})</p>
          {entries.map((e) => <EntryCard key={e.id} e={e} />)}
        </div>
      )}
    </section>
  );
}
