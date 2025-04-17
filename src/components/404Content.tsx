// components/404Content.tsx
import React, { useEffect, useState } from 'react';
import Lottie from 'react-lottie';

const Custom404 = () => {
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    fetch('/images/404-animation.json')
      .then((response) => response.json())
      .then((data) => setAnimationData(data));
  }, []);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      {animationData ? (
        <Lottie options={defaultOptions} height={500} width={500} />
      ) : (
        <p>Loading animation...</p>
      )}
      <h1 style={{ fontSize: '30px', color: '#E47D31' }}>404 NOT FOUND</h1>
      <h3 style={{ fontSize: '20px', color: '#E47D31' }}>This page is outside of universe</h3>
      <p style={{ fontSize: '14px', color: '#333', padding: '20px', marginBottom: '10px' }}>
        Oops! The page you are trying to access does not exist or has been moved. <br />
        Try going back to our homepage.
      </p>
      <a
        href="/"
        style={{
          fontSize: '18px',
          color: '#fff',
          padding: '20px',
          backgroundColor: '#E47D31',
          margin: '10px',
          borderRadius: '10px',
        }}
      >
        Home Page
      </a>
      <p style={{ fontSize: '14px', color: '#333', padding: '20px', marginTop: '10px' }}>
        If you think this is an error, contact our support team at <br />
        <span style={{color: "E47D31"}}>support@cityhelps.com</span>
      </p>
    </div>
  );
};

export default Custom404;
