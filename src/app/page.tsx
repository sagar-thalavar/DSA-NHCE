import { InsertSection } from "@/components/sections/InsertSection";
import { AccessSection } from "@/components/sections/AccessSection";
import { SearchSection } from "@/components/sections/SearchSection";
import { UpdateSection } from "@/components/sections/UpdateSection";
import { DeleteSection } from "@/components/sections/DeleteSection";
import { TraversalSection } from "@/components/sections/TraversalSection";
import { SortingSection } from "@/components/sections/SortingSection";
import { AggregationSection } from "@/components/sections/AggregationSection";
import { DatabaseView } from "@/components/DatabaseView";
import { fetchAll } from "@/lib/actions";

export const dynamic = "force-dynamic";

export default async function Home() {
  const { data: entries } = await fetchAll();

  return (
    <main className="min-h-screen max-w-6xl mx-auto px-4 py-10 space-y-8">
      {/* Header and Welcome Introduction */}
      <header className="border-b border-[var(--border)] pb-6">
        <h1 className="text-3xl font-bold tracking-tight text-[var(--text)] font-sans">DataOps Zeta</h1>
        <p className="text-sm text-[var(--text-muted)] mt-1.5">
          Interactive PostgreSQL Operations Sandbox
        </p>
      </header>

      {/* Educational Intro Box */}
      <section className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-6 shadow-sm">
        <h2 className="text-xl font-bold mb-2 flex items-center gap-2 text-[var(--text)]">
          <span>🎓</span> Welcome to the Database Sandbox!
        </h2>
        <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-4">
          DataOps Zeta is an interactive educational dashboard designed to help you visualize and play with real database operations. 
          This sandbox connects directly to a live PostgreSQL database hosted on Neon. Every action you run here 
          directly modifies or queries the database table, helping you understand how standard operations like inserting, updating, 
          deleting, sorting, and aggregating work under the hood.
        </p>
        
        {/* Toggleable / Collapsible Operations Guide */}
        <details className="group border-t border-[var(--border)] pt-4">
          <summary className="text-sm font-semibold cursor-pointer text-[var(--text)] hover:text-black list-none flex items-center gap-1 select-none">
            <span className="transition-transform duration-200 group-open:rotate-90 text-[var(--text-muted)]">▶</span>
            <span>How does this database work? Click to read the interactive guide</span>
          </summary>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 text-xs text-[var(--text-muted)] leading-relaxed">
            <div className="space-y-3">
              <p>
                <strong>📥 Insert (Write Operation)</strong>:<br />
                Adds a new row containing a title, numeric value, and text content. A new unique ID is automatically assigned by PostgreSQL.
              </p>
              <p>
                <strong>🔍 Access (Read Operation)</strong>:<br />
                Fetches specific records from the table using either their exact primary key ID, or finding the oldest/newest entries.
              </p>
              <p>
                <strong>🔎 Search (Read Operation)</strong>:<br />
                Filters rows by performing a case-insensitive keyword search (`ILIKE` query) across the title and content fields.
              </p>
              <p>
                <strong>✏️ Update (Write Operation)</strong>:<br />
                Edits the title, numeric value, and content of an existing record matching the ID you provide.
              </p>
            </div>
            <div className="space-y-3">
              <p>
                <strong>🗑️ Delete (Write Operation)</strong>:<br />
                Permanently removes a record from the database table based on its unique primary key ID.
              </p>
              <p>
                <strong>🔄 Traversal (Read Operation)</strong>:<br />
                Iterates through and lists the entire table sequentially (either oldest first or newest first).
              </p>
              <p>
                <strong>📊 Sort (Read Operation)</strong>:<br />
                Reorders the active database rows based on specific columns (e.g. by numeric value, alphabetically, or date).
              </p>
              <p>
                <strong>📈 Aggregate (Calculate Operation)</strong>:<br />
                Runs math operations on your data rows, counting total records or computing the average of the value column.
              </p>
            </div>
          </div>
        </details>
      </section>

      {/* 1. Live Visual State (Top - Full Width) */}
      <DatabaseView entries={entries ?? []} />

      {/* 2. Operations (Bottom - Grouped Columns) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-4">
        {/* Left Column: Modifiers (Writes) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="border-b border-[var(--border)] pb-1 mb-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">Database Modifiers (Write Actions)</h3>
          </div>
          <InsertSection />
          <UpdateSection />
          <DeleteSection />
        </div>

        {/* Right Column: Queries (Read Operations) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="border-b border-[var(--border)] pb-1 mb-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">Database Queries (Read Actions)</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AccessSection />
            <SearchSection />
            <TraversalSection />
            <SortingSection />
          </div>
          <AggregationSection />
        </div>
      </div>

      <footer className="mt-16 pt-6 border-t border-[var(--border)] text-xs text-[var(--text-muted)] flex justify-between">
        <span>One PostgreSQL table, three fields. Real-time server revalidation.</span>
        <span>by Sagar R. Thalavar</span>
      </footer>
    </main>
  );
}
