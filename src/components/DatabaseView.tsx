import React from "react";
import type { Entry } from "@/lib/db";

interface DatabaseViewProps {
  entries: Entry[];
}

export function DatabaseView({ entries }: DatabaseViewProps) {
  return (
    <section className="section-card">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="section-title flex items-center gap-2">
            <span className="text-xl">🗄️</span> Live Database View
          </h2>
          <p className="text-xs text-[var(--text-muted)]">
            Displaying all entries directly from your Neon PostgreSQL database.
          </p>
        </div>
        <span className="text-xs font-semibold px-2 py-1 rounded bg-[var(--border)] text-[var(--text-muted)]">
          {entries.length} {entries.length === 1 ? "row" : "rows"}
        </span>
      </div>

      <div className="overflow-x-auto border border-[var(--border)] rounded bg-[var(--bg)]">
        {entries.length === 0 ? (
          <div className="p-8 text-center text-sm text-[var(--text-muted)]">
            No entries found in the database. Use the <strong>Add entry</strong> form to insert your first record!
          </div>
        ) : (
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="bg-[var(--surface)] border-b border-[var(--border)] text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">
                <th className="p-3 w-16">ID</th>
                <th className="p-3">Title</th>
                <th className="p-3 w-24 text-right">Value</th>
                <th className="p-3">Content</th>
                <th className="p-3 w-44">Created At</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]">
              {entries.map((entry) => {
                const created =
                  entry.created_at instanceof Date
                    ? entry.created_at
                    : new Date(entry.created_at as string);

                return (
                  <tr key={entry.id} className="hover:bg-[var(--surface)] transition-colors">
                    <td className="p-3 font-mono text-xs text-[var(--text-muted)]">#{entry.id}</td>
                    <td className="p-3 font-medium text-[var(--text)]">{entry.title}</td>
                    <td className="p-3 text-right font-mono font-medium text-[var(--text)]">
                      {entry.value}
                    </td>
                    <td className="p-3 text-[var(--text-muted)] max-w-xs truncate" title={entry.content}>
                      {entry.content}
                    </td>
                    <td className="p-3 text-xs text-[var(--text-muted)]">
                      {created.toISOString().slice(0, 19).replace("T", " ")}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </section>
  );
}
