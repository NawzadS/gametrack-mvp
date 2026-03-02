import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useArticles } from '../context/ArticlesContext';

export default function Navigation() {
  const { user, logout, isAuthenticated, isAdmin } = useAuth();
  const { getUserSavedArticles } = useArticles();

  const savedCount = getUserSavedArticles().length;

  return (
    <nav style={{ display: 'flex', gap: 12, alignItems: 'center', padding: '12px 0' }}>
      <Link to="/">Home</Link>
      <Link to="/search">Search</Link>

      <Link to="/saved">Saved ({savedCount})</Link>

      {isAdmin() && <Link to="/admin">Admin</Link>}

      <div style={{ marginLeft: 'auto' }}>
        {isAuthenticated() ? (
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <span>{user.username} ({user.role})</span>
            <button onClick={logout}>Logout</button>
          </div>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </nav>
  );
}
