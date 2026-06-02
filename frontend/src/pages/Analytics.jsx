import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { dashboard, urlAnalytics } from '../api/analytics';
import Loader from '../components/Loader';
import AnalyticsCard from '../components/AnalyticsCard';
import ClicksOverTime from '../charts/ClicksOverTime';
import DevicePie from '../charts/DevicePie';
import BrowserBar from '../charts/BrowserBar';
import CountryBar from '../charts/CountryBar';
import { FiLink, FiMousePointer, FiUsers, FiGlobe } from 'react-icons/fi';

export default function Analytics() {
  const { shortCode } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        setData(shortCode ? await urlAnalytics(shortCode) : await dashboard());
      } finally { setLoading(false); }
    })();
  }, [shortCode]);

  if (loading) return <Loader />;
  if (!data) return <p className="text-center py-12">No data</p>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 space-y-6">
      <h1 className="text-2xl font-bold">
        {shortCode ? `Analytics — /${shortCode}` : 'Analytics Overview'}
      </h1>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {!shortCode && <AnalyticsCard label="Total URLs" value={data.totalUrls} icon={<FiLink />} />}
        <AnalyticsCard label="Total Clicks" value={data.totalClicks} icon={<FiMousePointer />} />
        <AnalyticsCard label="Unique Visitors" value={data.uniqueVisitors} icon={<FiUsers />} />
        <AnalyticsCard label="Countries" value={data.byCountry?.length || 0} icon={<FiGlobe />} />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="card p-5"><h3 className="font-semibold mb-3">Clicks over time</h3><ClicksOverTime data={data.byDay} /></div>
        <div className="card p-5"><h3 className="font-semibold mb-3">Devices</h3><DevicePie data={data.byDevice} /></div>
        <div className="card p-5"><h3 className="font-semibold mb-3">Browsers</h3><BrowserBar data={data.byBrowser} /></div>
        <div className="card p-5"><h3 className="font-semibold mb-3">Top countries</h3><CountryBar data={data.byCountry} /></div>
      </div>

      {!shortCode && data.topUrls?.length > 0 && (
        <div className="card p-5">
          <h3 className="font-semibold mb-3">Top performing URLs</h3>
          <ul className="divide-y divide-slate-100 dark:divide-slate-800">
            {data.topUrls.map((u) => (
              <li key={u._id} className="py-2 flex justify-between text-sm">
                <span className="font-mono text-brand-600 truncate">/{u.shortCode}</span>
                <span className="text-ink-500 truncate ml-3">{u.originalUrl}</span>
                <span className="font-semibold ml-3">{u.clicks} clicks</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
