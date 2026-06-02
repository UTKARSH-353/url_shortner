export default function Pagination({ page, pages, onChange }) {
  if (pages <= 1) return null;
  return (
    <div className="flex items-center justify-center gap-2 mt-4">
      <button className="btn-ghost" disabled={page <= 1} onClick={() => onChange(page - 1)}>Prev</button>
      <span className="text-sm">Page {page} / {pages}</span>
      <button className="btn-ghost" disabled={page >= pages} onClick={() => onChange(page + 1)}>Next</button>
    </div>
  );
}
