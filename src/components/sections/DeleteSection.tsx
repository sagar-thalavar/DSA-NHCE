import { deleteOneForm } from "@/lib/actions";

export function DeleteSection() {
  return (
    <section className="section-card">
      <h2 className="section-title">Delete</h2>
      <p className="section-desc">Remove one entry by ID.</p>
      <form action={deleteOneForm} className="flex gap-2 items-end">
        <div>
          <label className="label">Entry ID</label>
          <input name="id" type="number" className="input w-24" required />
        </div>
        <button type="submit" className="btn">Delete</button>
      </form>
    </section>
  );
}
