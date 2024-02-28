import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Function to login a user
  const login = async (username, password) => {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, {
        username,
        password,
      });
      const userData = response.data;
      if (userData) {
        setCurrentUser(userData.user);
        localStorage.setItem('user', JSON.stringify(userData.user));
        const redirectTo = localStorage.getItem('redirectTo') || '/';
        localStorage.removeItem('redirectTo');
        router.push(redirectTo);
      }
    } catch (error) {
      console.error('Login failed:', error);
      throw new Error(error.response?.data.message || "Unable to login");
    }
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setCurrentUser(user);
    }
    setLoading(false);
  }, []);

  // Function to signup a user
  const signup = async (username, password) => {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/signup`, {
        username,
        password,
      });
      const userData = response.data;
      if (userData.token) {
        localStorage.setItem('token', userData.token);
      }
      setCurrentUser(userData.user);
      localStorage.setItem('user', JSON.stringify(userData.user));
    } catch (error) {
      console.error('Signup failed:', error);
      throw new Error(error.response?.data.message || "Unable to signup");
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
