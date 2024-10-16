import React, { useState } from 'react';
import api from '../services/api'; // Use the configured API instance
import { useNavigate } from 'react-router-dom';

const Login = ({ setIsAuthenticated, handleLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/auth/login', { username, password });
      handleLogin(response.data.token);
      navigate('/');
    } catch (error) {
      console.error('Login failed', error);
      alert('Login failed. Please check your credentials and try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <h2>התחברות</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">התחבר</button>
    </form>
  );
};

export default Login;
