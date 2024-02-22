import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  console.log("Before response.ok in AuthContext.js");
  // Function to login a user
  const login = async (username, password) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    const userData = await response.json();
    if (response.ok) {
      console.log('RESPONSE OK')
      setCurrentUser(userData.user);
      localStorage.setItem('user', JSON.stringify(userData.user));
      console.log("Current User after login:", userData.user);
      const redirectTo = localStorage.getItem('redirectTo') || '/';
      localStorage.removeItem('redirectTo');
      router.push(redirectTo);

    } else {
      throw new Error(userData.message || "Unable to login");
    }
  };

  useEffect(() => {
    console.log("Attempting to rehydrate user from local storage");
    const user = JSON.parse(localStorage.getItem('user'));
    console.log("Parsed user from local storage:", user);
    if (user) {
      setCurrentUser(user);
      console.log("Current user set from local storage:", user);
    }
    setLoading(false);
  }, []);

  // Function to signup a user
  const signup = async (username, password) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    const userData = await response.json();
    if (response.ok) {
      setCurrentUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
    } else {
      throw new Error(data.message || "Unable to sign up");
    }
  };

  // Function to logout a user
  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('user');
  };

  const value = {
    currentUser,
    login,
    signup,
    logout,
    loading,
  };

  return(
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
