import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
const COLORS = ['#2563eb', '#22c55e', '#f59e0b', '#ec4899', '#8b5cf6'];
export default function DevicePie({ data }) {
  const formatted = (data || []).map(d => ({ name: d._id || 'Unknown', value: d.value }));
  return (
    <ResponsiveContainer width="100%" height={280}>
      <PieChart>
        <Pie data={formatted} dataKey="value" nameKey="name" outerRadius={90} label>
          {formatted.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
        </Pie>
        <Tooltip /><Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}
