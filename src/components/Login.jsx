import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Login.css';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const res = login(username.trim(), password);
    if (!res.ok) {
      setError(res.message || 'Login failed');
      return;
    }

    navigate('/', { replace: true });
  };

  return (
    <div className="login-container">
      <h2>Login</h2>

      <p style={{ marginTop: 0 }}>
        Use: <b>regular/regular</b> or <b>admin/admin</b>
      </p>

      <form onSubmit={handleSubmit} className="login-form">
        <label>
          Username
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="username"
          />
        </label>

        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />
        </label>

        {error && <p style={{ color: 'crimson' }}>{error}</p>}

        <button type="submit">Login</button>
      </form>
    </div>
  );
}
