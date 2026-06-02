import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const { register, loading } = useAuth();
  const nav = useNavigate();
  const submit = async (e) => {
    e.preventDefault();
    try { await register(form); toast.success('Account created'); nav('/dashboard'); }
    catch (err) { toast.error(err.response?.data?.message || 'Failed'); }
  };
  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <h1 className="text-2xl font-bold text-center">Create account</h1>
      <form onSubmit={submit} className="card p-6 mt-6 space-y-4">
        <div><label className="text-sm">Name</label><input required className="input mt-1" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></div>
        <div><label className="text-sm">Email</label><input type="email" required className="input mt-1" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></div>
        <div><label className="text-sm">Password</label><input type="password" required minLength={6} className="input mt-1" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} /></div>
        <button disabled={loading} className="btn-primary w-full">{loading ? 'Creating…' : 'Sign up'}</button>
        <p className="text-sm text-center text-ink-500">Have an account? <Link to="/login" className="text-brand-600">Sign in</Link></p>
      </form>
    </div>
  );
}
