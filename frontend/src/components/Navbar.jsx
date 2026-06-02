import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { FiLink, FiMoon, FiSun, FiLogOut } from 'react-icons/fi';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { theme, toggle } = useTheme();
  const nav = useNavigate();
  const linkCls = ({ isActive }) =>
    `px-3 py-2 rounded-lg text-sm ${isActive ? 'bg-brand-50 text-brand-700 dark:bg-slate-800' : 'text-ink-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'}`;

  return (
    <header className="sticky top-0 z-30 glass">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-semibold">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600 text-white"><FiLink /></span>
          Shorty
        </Link>
        <nav className="hidden md:flex items-center gap-1">
          <NavLink to="/" end className={linkCls}>Home</NavLink>
          {user && <NavLink to="/dashboard" className={linkCls}>Dashboard</NavLink>}
          {user && <NavLink to="/analytics" className={linkCls}>Analytics</NavLink>}
        </nav>
        <div className="flex items-center gap-2">
          <button onClick={toggle} className="btn-ghost h-9 w-9 p-0" aria-label="Toggle theme">
            {theme === 'dark' ? <FiSun /> : <FiMoon />}
          </button>
          {user ? (
            <>
              <Link to="/profile" className="text-sm text-ink-700 dark:text-slate-300 hidden sm:inline">Hi, {user.name.split(' ')[0]}</Link>
              <button className="btn-ghost" onClick={() => { logout(); nav('/'); }}><FiLogOut /> Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn-ghost">Login</Link>
              <Link to="/register" className="btn-primary">Sign up</Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
