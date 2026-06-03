import { createContext, useContext, useEffect, useState } from "react";
import * as authApi from "../api/auth";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("user"));
    } catch {
      return null;
    }
  });

  const [loading, setLoading] = useState(false);

  // ✅ FIX 1: Restore session properly on refresh
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token && !user) {
      authApi
        .profile()
        .then((res) => setUser(res))
        .catch(() => {
          // ❌ if token invalid, clear everything
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          setUser(null);
        });
    }
  }, []); // eslint-disable-line

  // ✅ FIX 2: Proper persist handling
  const persist = ({ token, user }) => {
    if (!token) {
      console.error("No token received from backend");
      return;
    }

    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    setUser(user);
  };

  // ✅ FIX 3: login must return data (IMPORTANT FOR YOUR LOGIN.JSX FIX)
  const login = async (data) => {
    setLoading(true);
    try {
      const res = await authApi.login(data);
      persist(res);
      return res; // 🔥 IMPORTANT (your Login.jsx depends on this)
    } finally {
      setLoading(false);
    }
  };

  const register = async (data) => {
    setLoading(true);
    try {
      const res = await authApi.register(data);
      persist(res);
      return res;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);