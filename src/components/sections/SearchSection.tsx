"use client";

import { useState } from "react";
import { searchKeyword } from "@/lib/actions";
import { EntryCard } from "@/components/EntryCard";
import type { Entry } from "@/lib/db";

export function SearchSection() {
  const [keyword, setKeyword] = useState("");
  const [results, setResults] = useState<Entry[]>([]);

  async function handleSearch() {
    const { data } = await searchKeyword(keyword);
    setResults(data ?? []);
  }

  return (
    <section className="section-card">
      <h2 className="section-title">Search</h2>
      <p className="section-desc">Find entries by keyword (title or content).</p>
      <div className="flex flex-wrap gap-2 items-end">
        <input className="input" value={keyword} onChange={(e) => setKeyword(e.target.value)} placeholder="Keyword" />
        <button type="button" className="btn" onClick={handleSearch}>Search</button>
      </div>
      {results.length > 0 && (
        <div className="mt-4 space-y-2">
          <p className="text-xs text-[var(--text-muted)]">Results ({results.length})</p>
          {results.map((e) => <EntryCard key={e.id} e={e} />)}
        </div>
      )}
    </section>
  );
}
