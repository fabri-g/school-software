// components/Header.js
import Link from 'next/link';
import styles from './Header.module.css';

const Header = () => {

  return (

    <div className={styles.sidebar}>
      <nav className={styles.nav}>
        <Link href="/" className={styles.navLink}>Home</Link>
        <Link href="/students" className={styles.navLink}>Students</Link>
        <Link href="/rooms" className={styles.navLink}>Rooms</Link>
      </nav>
      <div className={styles.bottomLogo}>
        <img src="/assets/images/school_logo.png" alt="School Logo"/>
        <p style={{fontWeight: 'bold'}} >School Name</p>
      </div>
    </div>
  );
};

export default Header;
