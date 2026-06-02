import { motion } from 'framer-motion';
export default function AnalyticsCard({ label, value, icon, accent = 'brand' }) {
  return (
    <motion.div whileHover={{ y: -2 }} className="card p-5 flex items-center gap-4">
      <div className={`h-12 w-12 rounded-xl flex items-center justify-center bg-${accent}-50 text-${accent}-600 text-xl`}>{icon}</div>
      <div>
        <p className="text-sm text-ink-500">{label}</p>
        <p className="text-2xl font-semibold">{value}</p>
      </div>
    </motion.div>
  );
}
