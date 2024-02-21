// components/Layout.js
import React from 'react';
import Header from './header/Header';
import styles from './Layout.module.css';

const Layout = ({ children }) => {
  return (
    <div className={styles.layout}>
      <Header />
      <main className={styles.content}>{children}</main>
    </div>
  );
};

export default Layout;
