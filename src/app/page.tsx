import { InsertSection } from "@/components/sections/InsertSection";
import { AccessSection } from "@/components/sections/AccessSection";
import { SearchSection } from "@/components/sections/SearchSection";
import { UpdateSection } from "@/components/sections/UpdateSection";
import { DeleteSection } from "@/components/sections/DeleteSection";
import { TraversalSection } from "@/components/sections/TraversalSection";
import { SortingSection } from "@/components/sections/SortingSection";
import { AggregationSection } from "@/components/sections/AggregationSection";

export default function Home() {
  return (
    <main className="min-h-screen max-w-4xl mx-auto px-4 py-10">
      <header className="mb-10 border-b border-[var(--border)] pb-6">
        <h1 className="text-2xl font-semibold text-[var(--text)]">Data Operations Playground</h1>
        <p className="text-sm text-[var(--text-muted)] mt-1">
          Simple table: title (text), value (number), content. Add entries and play with the data.
        </p>
      </header>

      <div className="grid gap-8">
        <InsertSection />
        <AccessSection />
        <SearchSection />
        <UpdateSection />
        <DeleteSection />
        <TraversalSection />
        <SortingSection />
        <AggregationSection />
      </div>

      <footer className="mt-12 pt-6 border-t border-[var(--border)] text-xs text-[var(--text-muted)]">
        One table, three fields. Insert, read, search, update, delete, sort, and aggregate.-by sagar r thalavar
      </footer>
    </main>
  );
}
