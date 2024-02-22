// components/header.js
import Link from 'next/link';
import styles from './sidebar.module.css';
import Image from 'next/image';

const Sidebar = () => {

  return (

    <div className={styles.sidebar}>
      <nav className={styles.nav}>
        <Link href="/" className={styles.navLink}>Home</Link>
        <Link href="/students" className={styles.navLink}>Students</Link>
        <Link href="/rooms" className={styles.navLink}>Rooms</Link>
      </nav>
      <div className={styles.bottomLogo}>
        <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
          <Image
            src="/assets/images/school_logo.png"
            alt="School Logo"
            width={100}
            height={100}
            layout="intrinsic"
          />
        </div>
        <p style={{fontWeight: 'bold'}} >School Name</p>
      </div>
    </div>
  );
};

export default Sidebar;
