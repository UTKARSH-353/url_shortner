import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiDownload } from 'react-icons/fi';

export default function QRModal({ url, onClose }) {
  const download = () => {
    const a = document.createElement('a');
    a.href = url.qrCode; a.download = `${url.shortCode}.png`; a.click();
  };
  return (
    <AnimatePresence>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onClose}>
        <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
          className="card p-6 max-w-sm w-full" onClick={(e) => e.stopPropagation()}>
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold">QR Code</h3>
            <button className="btn-ghost h-8 w-8 p-0" onClick={onClose}><FiX /></button>
          </div>
          {url.qrCode ? <img src={url.qrCode} alt="QR" className="w-full rounded-lg" /> : <p>No QR available</p>}
          <p className="mt-3 text-sm font-mono text-center text-brand-600">{url.shortUrl}</p>
          <button onClick={download} className="btn-primary w-full mt-4"><FiDownload /> Download</button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
