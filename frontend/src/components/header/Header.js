// components/Header.js
import Link from 'next/link';
import styles from './Header.module.css';
import { useAuth } from '../../context/AuthContext';
import { useState } from 'react';

const Header = () => {
  const { currentUser, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Toggle dropdown menu
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  //Function to handle logging out
  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.log('Failed to log out', error);
    }
  }

  console.log(currentUser); // To debug

  return (
    <header className={styles.header}>
      <div className={styles.logoAndNav}>
        <div className={styles.logo}>
          <img src="/assets/images/school_logo.png" alt="School Logo" className={styles.logoImage}/>
        </div>
        <nav>
          <ul className={styles.navList}>
            <li className={styles.navItem}>
              <Link href="/" className={styles.navLink}>Home</Link>
            </li>
            <li className={styles.navItem}>
              <Link href="/students" className={styles.navLink}>Students</Link>
            </li>
            <li className={styles.navItem}>
              <Link href="/rooms" className={styles.navLink}>Rooms</Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className = {styles.loginOrUser}>
        {currentUser ? (
          <div onClick={toggleDropdown} className={styles.userDropdown}>
            {currentUser.username}
            {dropdownOpen && (
              <div className={styles.dropdownContent}>
                <a href="#" className={styles.navLink} onClick={handleLogout}>Log Out</a>
              </div>
            )}
          </div>
        ) : (
          <Link href="/login" className={styles.navLink}>Login</Link>
        )}
      </div>
    </header>
  );
};

export default Header;
