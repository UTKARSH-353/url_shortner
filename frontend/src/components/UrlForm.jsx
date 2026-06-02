import { useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { shorten } from '../api/url';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { FiLink, FiScissors } from 'react-icons/fi';

export default function UrlForm({ onCreated }) {
  const [originalUrl, setOriginalUrl] = useState('');
  const [customAlias, setCustomAlias] = useState('');
  const [expiresAt, setExpiresAt] = useState('');
  const [busy, setBusy] = useState(false);
  const { user } = useAuth();
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    if (!user) return nav('/login');
    setBusy(true);
    try {
      const res = await shorten({
        originalUrl,
        customAlias: customAlias || undefined,
        expiresAt: expiresAt || undefined,
      });
      toast.success('Short URL created');
      setOriginalUrl(''); setCustomAlias(''); setExpiresAt('');
      onCreated?.(res);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to shorten');
    } finally { setBusy(false); }
  };

  return (
    <motion.form initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
      onSubmit={submit} className="card p-6 space-y-4">
      <div>
        <label className="text-sm font-medium">Long URL</label>
        <div className="mt-1 relative">
          <FiLink className="absolute left-3 top-3 text-ink-500" />
          <input className="input pl-10" placeholder="https://example.com/very/long/path"
            value={originalUrl} onChange={(e) => setOriginalUrl(e.target.value)} required />
        </div>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium">Custom alias (optional)</label>
          <input className="input mt-1" placeholder="my-link" value={customAlias}
            onChange={(e) => setCustomAlias(e.target.value)} />
        </div>
        <div>
          <label className="text-sm font-medium">Expires at (optional)</label>
          <input type="datetime-local" className="input mt-1" value={expiresAt}
            onChange={(e) => setExpiresAt(e.target.value)} />
        </div>
      </div>
      <button disabled={busy} className="btn-primary w-full sm:w-auto">
        <FiScissors /> {busy ? 'Shortening…' : 'Shorten URL'}
      </button>
    </motion.form>
  );
}
