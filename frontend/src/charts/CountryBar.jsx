import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
export default function CountryBar({ data }) {
  const formatted = (data || []).map(d => ({ name: d._id || 'Unknown', value: d.value }));
  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart layout="vertical" data={formatted}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
        <XAxis type="number" tick={{ fontSize: 12 }} />
        <YAxis dataKey="name" type="category" tick={{ fontSize: 12 }} width={80} />
        <Tooltip />
        <Bar dataKey="value" fill="#22c55e" radius={[0,6,6,0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
