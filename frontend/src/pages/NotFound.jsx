import { Link } from 'react-router-dom';
export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center">
      <h1 className="text-7xl font-bold text-brand-600">404</h1>
      <p className="mt-2 text-ink-500">Page not found</p>
      <Link to="/" className="btn-primary mt-6">Go home</Link>
    </div>
  );
}
