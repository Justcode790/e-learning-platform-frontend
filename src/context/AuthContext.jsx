import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import api from '../api/api.js';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const navigate = useNavigate();

  const [token, setToken] = useState(() => localStorage.getItem('token'));

  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem('user');
      return raw && raw !== 'undefined' && raw !== 'null' ? JSON.parse(raw) : null;
    } catch (err) {
      console.error('Failed to parse user from localStorage:', err);
      localStorage.removeItem('user');
      return null;
    }
  });

  // 🔁 persist token
  useEffect(() => {
    if (token) localStorage.setItem('token', token);
    else localStorage.removeItem('token');
  }, [token]);

  // 🔁 persist user
  useEffect(() => {
    if (user) localStorage.setItem('user', JSON.stringify(user));
    else localStorage.removeItem('user');
  }, [user]);

  // ✅ Login user
  const login = async (email, password, role) => {
    const { data } = await api.post('/auth/login', { email, password, role });
    setToken(data.token);
    setUser(data.user);
  };

  // ✅ Register user
  const register = async (name, email, password, role) => {
    const { data } = await api.post('/auth/register', { name, email, password, role });
    setToken(data.token);
    setUser(data.user);
  };

  // ✅ Logout user
  const logout = () => {
    setToken(null);
    setUser(null);
    navigate('/');
  };

  // ✅ Refresh user (fetch updated data from DB)
  const refreshUser = async () => {
    if (!user?._id) return;
    try {
      const { data } = await api.get(`/api/students/${user._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(data);
    } catch (err) {
      console.error('Error refreshing student info:', err);
    }
  };

  // ✅ Re-fetch user automatically on reload if token exists
  useEffect(() => {
    if (token && user?._id) {
      refreshUser();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  // ✅ Value for context consumers
  const value = useMemo(
    () => ({ token, user, login, register, logout, refreshUser }),
    [token, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// ✅ Custom hook to use context easily
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
