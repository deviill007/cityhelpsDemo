// components/404Content.tsx
import React from 'react';
import Lottie from 'react-lottie';
import Link from 'next/link';
import animationData from './animations/404-animation.json';
import styles from '@/styles/404.module.css';

const Custom404 = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <div className={styles.container}>
            <div className={styles.lottieWrapper}>
        <Lottie options={defaultOptions} />
      </div>
      <h1 className={styles.title}>404 NOT FOUND</h1>
      <h3 className={styles.subtitle}>This page is outside of universe</h3>
      <p className={styles.description}>
        Oops! The page you are trying to access does not exist or has been moved. <br />
        Try going back to our homepage.
      </p>
      <Link href="/" className={styles.homeButton}>
        Home Page
      </Link>
      <p className={styles.supportText}>
        If you think this is an error, contact our support team at <br />
        <span className={styles.supportEmail}>support@cityhelps.com</span>
      </p>
    </div>
  );
};

export default Custom404;
