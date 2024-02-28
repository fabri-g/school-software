import React, { useState } from 'react';
import { useAuth } from '../context/authContext';
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
      router.push('/'); // Redirect to home
    } catch (error) {
      alert(error.message); // Show error message from signup attempt
    }
  }

  return (
    <div className="mt-8 text-center -ml-48">
      <h1 className="text-3xl font-semibold mb-5">Sign Up</h1>
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <div className="mb-2.5 flex flex-col items-center">
          <label className="mb-2">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="border border-gray-300 rounded p-1"
          />
        </div>
        <div className="mb-2.5 flex flex-col items-center">
          <label className="mb-2">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="border border-gray-300 rounded p-1"
          />
        </div>
        <button type="submit"
          className="bg-indigo-500 hover:bg-indigo-600 mt-8 text-white font-bold py-2 px-4 rounded">
          Sign Up
        </button>
      </form>
    </div>
  );
}
