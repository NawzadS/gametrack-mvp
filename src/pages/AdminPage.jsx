import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useArticles } from '../context/ArticlesContext';

export default function AdminPage() {
  const { isAdmin } = useAuth();
  const { getAllUserArticles } = useArticles();

  if (!isAdmin()) return <Navigate to="/" replace />;

  const all = getAllUserArticles();
  const users = Object.keys(all);

  return (
    <div>
      <h2>Admin: All Users Saved Articles</h2>

      {users.length === 0 ? (
        <p>No users have saved anything yet.</p>
      ) : (
        users.map((username) => (
          <div key={username} style={{ marginBottom: 18 }}>
            <h3>{username}</h3>
            <ul>
              {(all[username] || []).map((a) => (
                <li key={a.uri || a._id || a.url}>
                  <a href={a.url} target="_blank" rel="noreferrer">
                    {a.title || a.headline?.main || 'Untitled'}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
}
