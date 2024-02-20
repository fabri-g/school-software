import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/router';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    setError(''); // Reset error message
    try {
      await login(username, password);
      router.push('/'); // Redirect to home page or dashboard
    } catch (error) {
      setError(error.message);
    }
  }

  function handleSignup() {
    router.push('/signup'); // Redirect to signup page
  }

  return (
    <div style={{ textAlign: 'center', marginTop: '30px' }}>
      <h1 className="text-3xl font-semibold" style={{ marginBottom: '20px' }}>Login</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ marginBottom: '10px' }}>
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={{ marginLeft: '10px' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ marginLeft: '10px' }}
          />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', marginTop: '30px', }}>
        <button type="submit" style={{ marginRight: '10px', padding: '10px', backgroundColor: '#4CAF50', color: 'white', border: 'none', cursor: 'pointer' }}>
          Login
        </button>
        <button type="button" onClick={handleSignup} style={{ padding: '10px', marginLeft: '30px', backgroundColor: '#008CBA', color: 'white', border: 'none', cursor: 'pointer' }}>
          Sign Up
        </button>
        </div>
      </form>
    </div>
  );
}
