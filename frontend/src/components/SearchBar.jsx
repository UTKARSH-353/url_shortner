import { FiSearch } from 'react-icons/fi';
export default function SearchBar({ value, onChange, placeholder = 'Search...' }) {
  return (
    <div className="relative">
      <FiSearch className="absolute left-3 top-2.5 text-ink-500" />
      <input className="input pl-10" placeholder={placeholder} value={value} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
}
