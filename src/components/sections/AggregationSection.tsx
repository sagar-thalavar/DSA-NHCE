"use client";

import { useState } from "react";
import { totalCount, averageValue } from "@/lib/actions";

export function AggregationSection() {
  const [count, setCount] = useState<number | null>(null);
  const [avg, setAvg] = useState<number | null>(null);
  const [mode, setMode] = useState<"count" | "avg" | null>(null);

  async function handleCount() {
    const { data } = await totalCount();
    setCount(data ?? 0);
    setAvg(null);
    setMode("count");
  }
  async function handleAvg() {
    const { data } = await averageValue();
    setAvg(data ?? 0);
    setCount(null);
    setMode("avg");
  }

  return (
    <section className="section-card">
      <h2 className="section-title">Aggregation</h2>
      <p className="section-desc">Total count and average value.</p>
      <div className="flex gap-2 flex-wrap">
        <button type="button" className="btn" onClick={handleCount}>Total count</button>
        <button type="button" className="btn" onClick={handleAvg}>Average value</button>
      </div>
      {mode === "count" && count !== null && <p className="mt-4 text-sm">Total: <strong>{count}</strong></p>}
      {mode === "avg" && avg !== null && <p className="mt-4 text-sm">Average value: <strong>{avg.toFixed(2)}</strong></p>}
    </section>
  );
}
