import { createContext, useContext, useMemo, useState } from 'react';

const AuthContext = createContext(null);

const USERS = [
  { username: 'regular', password: 'regular', role: 'regular' },
  { username: 'admin', password: 'admin', role: 'admin' }
];

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('newsreader_user');
    return saved ? JSON.parse(saved) : null;
  });

  const login = (username, password) => {
    const found = USERS.find(
      u => u.username === username && u.password === password
    );
    if (!found) return { ok: false, message: 'Invalid username or password' };

    const safeUser = { username: found.username, role: found.role };
    setUser(safeUser);
    localStorage.setItem('newsreader_user', JSON.stringify(safeUser));
    return { ok: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('newsreader_user');
  };

  const isAuthenticated = () => !!user;
  const isAdmin = () => user?.role === 'admin';

  const value = useMemo(
    () => ({ user, login, logout, isAuthenticated, isAdmin }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}
