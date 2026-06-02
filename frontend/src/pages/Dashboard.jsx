import { useEffect, useState } from 'react';
import UrlForm from '../components/UrlForm';
import UrlTable from '../components/UrlTable';
import SearchBar from '../components/SearchBar';
import Pagination from '../components/Pagination';
import Loader from '../components/Loader';
import { listUrls } from '../api/url';

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('-createdAt');
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try { setData(await listUrls({ page, limit: 10, search, sort })); }
    finally { setLoading(false); }
  };

  useEffect(() => { load(); /* eslint-disable-next-line */ }, [page, search, sort]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <UrlForm onCreated={load} />

      <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
        <div className="sm:w-80"><SearchBar value={search} onChange={(v) => { setPage(1); setSearch(v); }} placeholder="Search URLs..." /></div>
        <select className="input sm:w-48" value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="-createdAt">Newest first</option>
          <option value="createdAt">Oldest first</option>
          <option value="-clicks">Most clicks</option>
          <option value="clicks">Fewest clicks</option>
        </select>
      </div>

      {loading ? <Loader /> : <>
        <UrlTable rows={data?.items} onChanged={load} />
        <Pagination page={data?.page} pages={data?.pages} onChange={setPage} />
      </>}
    </div>
  );
}
