import type { Entry } from "@/lib/db";

export function EntryCard({ e }: { e: Entry }) {
  const created = e.created_at instanceof Date ? e.created_at : new Date(e.created_at as string);
  return (
    <div className="rounded border border-[var(--border)] bg-[var(--surface)] p-3 text-sm">
      <div className="font-medium text-[var(--text)]">#{e.id} — {e.title}</div>
      <div className="text-[var(--text-muted)] mt-0.5">{e.content}</div>
      <div className="mt-1 flex gap-2 text-xs text-[var(--text-muted)]">
        <span>value: {e.value}</span>
        <span>{created.toISOString().slice(0, 19)}</span>
      </div>
    </div>
  );
}
