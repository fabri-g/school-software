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
      router.push('/'); // Redirect to home page
    } catch (error) {
      setError(error.message);
    }
  }

  function handleSignup() {
    router.push('/signup'); // Redirect to signup page
  }

  return (
    <div className="mt-8 text-center" style={{marginLeft:"-200px"}}>
      <h1 className="text-3xl font-semibold mb-5">Login</h1>
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <div className="mb-2.5">
          <label className="mr-2">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="border border-gray-300 rounded p-1"
          />
        </div>
        <div className="mb-2.5">
          <label className="mr-2">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="border border-gray-300 rounded p-1"
          />
        </div>
        <div className="flex items-center mt-8 space-x-4">
        <button type="submit"
           style={{backgroundColor: '#6367E3'}}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Login
        </button>
        <button type="button" onClick={handleSignup}
          style={{backgroundColor: '#E22840'}}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Sign Up
        </button>
        </div>
      </form>
    </div>
  );
}
