import { insertSingle } from "@/lib/actions";

export function InsertSection() {
  return (
    <section className="section-card">
      <h2 className="section-title">Add entry</h2>
      <p className="section-desc">One form: text (title), number (value), and content.</p>
      <form action={insertSingle} className="space-y-3 max-w-md">
        <div>
          <label className="label">Title (text)</label>
          <input name="title" className="input" required placeholder="e.g. My note" />
        </div>
        <div>
          <label className="label">Value (number)</label>
          <input name="value" type="number" className="input" defaultValue="0" />
        </div>
        <div>
          <label className="label">Content</label>
          <input name="content" className="input" required placeholder="e.g. Some content" />
        </div>
        <button type="submit" className="btn btn-primary">Add</button>
      </form>
    </section>
  );
}
