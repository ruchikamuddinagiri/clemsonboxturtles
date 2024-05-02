"use client"; // Ensures this component is treated as a Client Component

import { useState, useEffect } from "react";

export default function MenuBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);

  // Handle window resize event to toggle mobile view
  useEffect(() => {
    const handleResize = () => setIsMobileView(window.innerWidth <= 768); // Adjust breakpoint as needed

    // Set initial mobile view state
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  const styles = {
    menuBar: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: '#e2ab79',
      color: 'white',
      padding: '10px 20px',
    },
    menuLink: {
      color: 'white',
      textDecoration: 'none',
      padding: '10px 15px',
      fontWeight: 'bold',
      hover:'underline'
    },
    logo: {
      fontWeight: 'bold',
      fontSize: '24px',
      color: 'white',
    },
    nav: {
      display: isMobileView ? (isMenuOpen ? 'block' : 'none') : 'flex',
      flexDirection: isMobileView ? 'column' : 'row',
      position: isMobileView ? 'absolute' : 'static',
      top: isMobileView ? '60px' : 'auto', // Adjust according to the height of the menu bar
      right: isMobileView ? '20px' : 'auto',
      backgroundColor: isMobileView ? '#333' : 'transparent',
      boxShadow: isMobileView ? '0 8px 16px rgba(0, 0, 0, 0.3)' : 'none',
      zIndex: 1,
    },
    hamburger: {
      display: isMobileView ? 'block' : 'none',
      fontSize: '30px',
      cursor: 'pointer',
    },
    navItem: {
      display: 'block',
      padding: '10px 15px',
    }
  };

  return (
    <div style={styles.menuBar}>
      <div style={styles.logo}>
        <a href="/" style={styles.menuLink}>Clemson Box Turtles</a>
      </div>
      <span
        style={styles.hamburger}
        onClick={toggleMenu}
      >
        &#9776; {/* Hamburger Icon */}
      </span>
      <nav style={styles.nav}>
        <a href="/" style={{ ...styles.menuLink, ...styles.navItem }}>Home</a>
        <a href="/help" style={{ ...styles.menuLink, ...styles.navItem }}>Ways YOU can help your backyard turtle</a>
        <a href="/turtles" style={{ ...styles.menuLink, ...styles.navItem }}>Learn More</a>
        {/* Add more links as needed */}
      </nav>
    </div>
  );
}
