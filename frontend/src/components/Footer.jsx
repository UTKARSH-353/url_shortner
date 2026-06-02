export default function Footer() {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 py-8 mt-16">
      <div className="max-w-7xl mx-auto px-4 text-sm text-ink-500 flex flex-col sm:flex-row justify-between gap-2">
        <p>© {new Date().getFullYear()} Shorty — URL Shortener with Click Analytics.</p>
        <p>Built with React, Node, Express, MongoDB.</p>
      </div>
    </footer>
  );
}
