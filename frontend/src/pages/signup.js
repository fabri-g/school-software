import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/router';

export default function RegistrationPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { signup } = useAuth();
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await signup(username, password);
      router.push('/'); // Redirect to home or another page after successful signup
    } catch (error) {
      alert(error.message); // Show error message from signup attempt
    }
  }

  return (
    <div style={{ textAlign: 'center', marginTop: '30px' }}>
      <h1 className="text-3xl font-semibold" style={{ marginBottom: '20px' }}>Sign Up</h1>
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
        <button type="submit" style={{ padding: '10px', marginLeft: '30px', backgroundColor: '#008CBA', color: 'white', border: 'none', cursor: 'pointer' }}>
          Sign Up
        </button>
        </div>
      </form>
    </div>
  );
}
