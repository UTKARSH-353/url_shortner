import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import UrlForm from '../components/UrlForm';
import { FiZap, FiBarChart2, FiShield } from 'react-icons/fi';
import { useState } from 'react';
import QRModal from '../components/QRModal';

export default function Home() {
  const [last, setLast] = useState(null);
  const [qr, setQr] = useState(null);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <section className="text-center mb-12">
        <motion.h1 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          className="text-4xl sm:text-5xl font-bold tracking-tight">
          Short links. <span className="text-brand-600">Real insights.</span>
        </motion.h1>
        <p className="mt-4 text-ink-500 max-w-xl mx-auto">
          Shorten URLs, generate QR codes, and track every click with geo, device, and browser analytics.
        </p>
      </section>

      <UrlForm onCreated={setLast} />

      {last && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="card p-5 mt-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm text-ink-500">Your short link</p>
            <a href={last.shortUrl} target="_blank" rel="noreferrer" className="text-lg font-mono text-brand-600">{last.shortUrl}</a>
          </div>
          <div className="flex gap-2">
            <button className="btn-ghost" onClick={() => { navigator.clipboard.writeText(last.shortUrl); }}>Copy</button>
            <button className="btn-primary" onClick={() => setQr(last)}>QR Code</button>
          </div>
        </motion.div>
      )}

      <section className="grid md:grid-cols-3 gap-6 mt-16">
        {[
          { icon: <FiZap />, title: 'Lightning fast', body: 'Instant redirects with reliable infrastructure.' },
          { icon: <FiBarChart2 />, title: 'Rich analytics', body: 'Country, device, browser & clicks over time.' },
          { icon: <FiShield />, title: 'Secure', body: 'JWT auth, rate limiting & input sanitization.' },
        ].map((f, i) => (
          <div key={i} className="card p-6">
            <div className="h-10 w-10 rounded-lg bg-brand-50 text-brand-600 flex items-center justify-center mb-3">{f.icon}</div>
            <h3 className="font-semibold">{f.title}</h3>
            <p className="text-sm text-ink-500 mt-1">{f.body}</p>
          </div>
        ))}
      </section>

      <div className="text-center mt-12">
        <Link to="/register" className="btn-primary">Create a free account</Link>
      </div>

      {qr && <QRModal url={qr} onClose={() => setQr(null)} />}
    </div>
  );
}
