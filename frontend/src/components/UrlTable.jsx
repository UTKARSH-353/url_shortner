import { useState } from 'react';
import toast from 'react-hot-toast';
import { FiCopy, FiTrash2, FiEdit2, FiBarChart2, FiMaximize2 } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { deleteUrl, updateUrl } from '../api/url';
import QRModal from './QRModal';

export default function UrlTable({ rows, onChanged }) {
  const [qr, setQr] = useState(null);
  const [editId, setEditId] = useState(null);
  const [editVal, setEditVal] = useState('');

  const copy = (text) => { navigator.clipboard.writeText(text); toast.success('Copied!'); };
  const remove = async (id) => {
    if (!confirm('Delete this URL?')) return;
    await deleteUrl(id); toast.success('Deleted'); onChanged?.();
  };
  const saveEdit = async (id) => {
    try {
      await updateUrl(id, { originalUrl: editVal });
      toast.success('Updated'); setEditId(null); onChanged?.();
    } catch (e) { toast.error(e.response?.data?.message || 'Failed'); }
  };

  if (!rows?.length) return <p className="text-center text-ink-500 py-12">No URLs yet.</p>;

  return (
    <div className="overflow-x-auto card">
      <table className="min-w-full text-sm">
        <thead className="bg-slate-50 dark:bg-slate-800 text-left">
          <tr>
            <th className="px-4 py-3">Short URL</th>
            <th className="px-4 py-3">Original</th>
            <th className="px-4 py-3">Clicks</th>
            <th className="px-4 py-3">Created</th>
            <th className="px-4 py-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
          {rows.map((u) => (
            <tr key={u._id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
              <td className="px-4 py-3 font-mono text-brand-600">
                <a href={u.shortUrl} target="_blank" rel="noreferrer">{u.shortUrl}</a>
              </td>
              <td className="px-4 py-3 max-w-xs truncate">
                {editId === u._id ? (
                  <input className="input" value={editVal} onChange={(e) => setEditVal(e.target.value)} />
                ) : (
                  <span title={u.originalUrl}>{u.originalUrl}</span>
                )}
              </td>
              <td className="px-4 py-3">{u.clicks}</td>
              <td className="px-4 py-3 text-ink-500">{new Date(u.createdAt).toLocaleDateString()}</td>
              <td className="px-4 py-3 text-right space-x-1">
                <button className="btn-ghost h-8 w-8 p-0" onClick={() => copy(u.shortUrl)}><FiCopy /></button>
                <button className="btn-ghost h-8 w-8 p-0" onClick={() => setQr(u)}><FiMaximize2 /></button>
                <Link to={`/analytics/${u.shortCode}`} className="btn-ghost h-8 w-8 p-0 inline-flex"><FiBarChart2 /></Link>
                {editId === u._id ? (
                  <button className="btn-primary h-8" onClick={() => saveEdit(u._id)}>Save</button>
                ) : (
                  <button className="btn-ghost h-8 w-8 p-0" onClick={() => { setEditId(u._id); setEditVal(u.originalUrl); }}><FiEdit2 /></button>
                )}
                <button className="btn-ghost h-8 w-8 p-0 text-red-500" onClick={() => remove(u._id)}><FiTrash2 /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {qr && <QRModal url={qr} onClose={() => setQr(null)} />}
    </div>
  );
}
