export default function Loader({ label = 'Loading...' }) {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="h-8 w-8 rounded-full border-2 border-brand-500 border-t-transparent animate-spin" />
      <span className="ml-3 text-sm text-ink-500">{label}</span>
    </div>
  );
}
