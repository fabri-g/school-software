// components/AdminPanel.js
import Link from 'next/link';
import styles from './adminPanel.module.css';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';

const AdminPanel = () => {
  const { currentUser, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Toggle dropdown menu
  const toggleDropdown = (e) => {
    e.preventDefault();
    setDropdownOpen(!dropdownOpen);
  }

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await logout();
    } catch (error) {
      console.log('Failed to log out', error);
    }
  };

  console.log(currentUser); // To debug

  return (
    <div className={styles.adminContainer}>
          {currentUser ? (
            <div onClick={toggleDropdown} className={`${styles.userDropdown} ${styles.flexContainer}`}>
              <img src="/assets/images/user.png" alt="User" className={styles.userIcon} />
              <span style={{fontWeight: 'bold', marginLeft: '10px'}}>{currentUser.username}</span>
              {dropdownOpen && (
                <div className={styles.dropdownContent}>
                  <Link href="#" className={styles.navLink} onClick={handleLogout}>Log Out</Link>
                </div>
              )}
            </div>
          ) : (
            <Link href="/login" className={styles.navLink} style={{display: 'flex', alignItems: 'center'}}>
              <img src="/assets/images/user.png" alt="User" className={styles.userIcon} />
              <span style={{fontWeight: 'bold', marginLeft: '10px'}}>Log In</span>
            </Link>
          )}
      </div>
  );
};

export default AdminPanel;
