// components/Layout.js
import React from 'react';
import Header from './sidebar/sidebar';
import styles from './layout.module.css';

const Layout = ({ children }) => {
  return (
    <div className={styles.layout}>
      <Header />
      <main className={styles.content}>{children}</main>
    </div>
  );
};

export default Layout;
