// pages/index.js

import Image from 'next/image';
import styles from '../styles/Home.module.css'; // CSS module for styling

export default function Home() {
  return (
    <div className={styles.homeContainer}>
      <div className={styles.logoContainer}>
        <Image
          src="/assets/images/school_logo.png"
          alt="School Logo"
          width={300} // Adjust according to your logo's size
          height={300} // Adjust according to your logo's size
          layout="intrinsic" // Adjust as needed
        />
      </div>
      <p className={styles.slogan}> Forti Animo Estote</p>
    </div>
  );
}
