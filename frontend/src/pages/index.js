// pages/index.js

import Image from 'next/image';
import styles from '../styles/home.module.css';


export default function Home() {
  return (
    <div className={styles.homeContainer}>
      <div className={styles.logoContainer}>
        <Image
          src="/assets/images/school_logo.png"
          alt="School Logo"
          width={300}
          height={300}
        />
      </div>
      <p className={styles.slogan}> Forti Animo Estote</p>
    </div>
  );
}
