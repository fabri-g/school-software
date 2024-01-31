// components/Header.js
import Link from 'next/link';
import styles from './Header.module.css';


const Header = () => {
  return (
    <header className={styles.header}>
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
    </header>
  );
};

export default Header;
