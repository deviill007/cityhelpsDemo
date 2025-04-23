import { useState, useEffect } from 'react';
import Image from 'next/image';

const FloatingButtons = () => {
  const [showScrollTopButton, setShowScrollTopButton] = useState(false);
  const [isClient, setIsClient] = useState(false); // Track if it's the client side

  // Monitor the scroll position (only on client-side)
  const handleScroll = () => {
    if (window.scrollY > 200) {
      setShowScrollTopButton(true);
    } else {
      setShowScrollTopButton(false);
    }
  };

  // Scroll back to the top of the page
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    // Ensure this only runs on the client-side
    setIsClient(true);

    // Add event listener on mount (client-side only)
    if (isClient) {
      window.addEventListener('scroll', handleScroll);

      // Cleanup event listener on unmount
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }
  }, [isClient]);

  if (!isClient) {
    return null; // Return null to avoid hydration mismatch while the component is loading
  }

  return (
    <div className="floating-container">
      {/* WhatsApp Button */}
      <a
        href="https://wa.me/+917023854060"
        target="_blank"
        rel="noopener noreferrer"
        className="whatsappButton"
      >
        <Image src="/icons/whatsapp.png" alt="WhatsApp" className="icon" height={50} width={50} />
      </a>

      {/* Scroll-to-top Button */}
      {showScrollTopButton && (
        <button onClick={scrollToTop} className="scrollTopButton">
           <Image src="/icons/drop-down.png" alt="WhatsApp" className="icon-top" height={50} width={50} />
        </button>
      )}
    </div>
  );
};

export default FloatingButtons;
