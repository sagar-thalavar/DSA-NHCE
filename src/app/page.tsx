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
    <main className="min-h-screen max-w-6xl mx-auto px-4 py-10">
      <header className="mb-10 border-b border-[var(--border)] pb-6">
        <h1 className="text-3xl font-bold tracking-tight text-[var(--text)]">DataOps Zeta</h1>
        <p className="text-sm text-[var(--text-muted)] mt-1.5">
          PostgreSQL Operations Playground — Insert, Update, Delete, Sort, and Aggregate records in real-time.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column - Actions (Writes) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="border-b border-[var(--border)] pb-1 mb-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">Database Modifiers</h3>
          </div>
          <InsertSection />
          <UpdateSection />
          <DeleteSection />
        </div>

        {/* Right Column - View & Queries (Reads) */}
        <div className="lg:col-span-8 space-y-6">
          <div className="border-b border-[var(--border)] pb-1 mb-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">Database state & queries</h3>
          </div>
          
          <DatabaseView entries={entries ?? []} />
          
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
