import { useAuth } from '../context/AuthContext';
export default function Profile() {
  const { user } = useAuth();
  if (!user) return null;
  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <div className="card p-6">
        <div className="h-16 w-16 rounded-full bg-brand-600 text-white flex items-center justify-center text-2xl font-bold">
          {user.name?.charAt(0).toUpperCase()}
        </div>
        <h2 className="text-xl font-semibold mt-4">{user.name}</h2>
        <p className="text-ink-500">{user.email}</p>
        <p className="text-sm text-ink-500 mt-2">Joined {new Date(user.createdAt).toLocaleDateString()}</p>
      </div>
    </div>
  );
}
