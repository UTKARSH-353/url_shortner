import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const { login, loading } = useAuth();
  const nav = useNavigate();
  const loc = useLocation();

  const submit = async (e) => {
    e.preventDefault();

    try {
      const data = await login(form);

      // ✅ IMPORTANT FIX (TOKEN SAVE HERE IF NOT DONE IN CONTEXT)
      if (data?.token) {
        localStorage.setItem("token", data.token);
      }

      toast.success("Welcome back");

      nav(loc.state?.from?.pathname || "/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <h1 className="text-2xl font-bold text-center">Sign in</h1>

      <form onSubmit={submit} className="card p-6 mt-6 space-y-4">
        <div>
          <label className="text-sm">Email</label>
          <input
            type="email"
            required
            className="input mt-1"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />
        </div>

        <div>
          <label className="text-sm">Password</label>
          <input
            type="password"
            required
            className="input mt-1"
            value={form.password}
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />
        </div>

        <button disabled={loading} className="btn-primary w-full">
          {loading ? "Signing in…" : "Sign in"}
        </button>

        <p className="text-sm text-center text-ink-500">
          No account?{" "}
          <Link to="/register" className="text-brand-600">
            Create one
          </Link>
        </p>
      </form>
    </div>
  );
}