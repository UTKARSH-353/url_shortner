import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
export default function BrowserBar({ data }) {
  const formatted = (data || []).map(d => ({ name: d._id || 'Unknown', value: d.value }));
  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart data={formatted}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
        <XAxis dataKey="name" tick={{ fontSize: 12 }} /><YAxis tick={{ fontSize: 12 }} />
        <Tooltip />
        <Bar dataKey="value" fill="#3b82f6" radius={[6,6,0,0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
