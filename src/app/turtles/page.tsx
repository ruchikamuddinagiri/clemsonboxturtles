// pages/page.tsx in your Next.js application
// turtles page.tsx
import React from 'react';
import Link from 'next/link';

const turtles = [
  { id: 1, name: 'Allison', description: 'A brief fact about Allison.', slug: 'allison' },
  { id: 2, name: 'Byars', description: 'A brief fact about Byars.', slug: 'byars' },
  { id: 3, name: 'Dos', description: 'A brief fact about Dos.', slug: 'dos' },
  { id: 4, name: 'Hercules', description: 'A brief fact about Hercules.', slug: 'hercules' },
  { id: 5, name: 'Herman', description: 'A brief fact about Herman.', slug: 'herman' },
  { id: 5, name: 'Lolly', description: 'A brief fact about Lolly.', slug: 'lolly' },
  { id: 5, name: 'Marley', description: 'A brief fact about Marley.', slug: 'marley' },
  { id: 5, name: 'Patricia', description: 'A brief fact about Patricia.', slug: 'patricia' },
  { id: 5, name: 'Sammy', description: 'A brief fact about Sammy.', slug: 'sammy' },
  { id: 5, name: 'Scout', description: 'A brief fact about Scout.', slug: 'scout' },
  { id: 5, name: 'Shelly', description: 'A brief fact about Shelly.', slug: 'shelly' },
  { id: 5, name: 'Sunny', description: 'A brief fact about Sunny.', slug: 'sunny' },
  { id: 5, name: 'Terra', description: 'A brief fact about Terra.', slug: 'terra' },
  { id: 5, name: 'Uno', description: 'A brief fact about Uno.', slug: 'uno' },

  // ... Add more turtles as needed
];

const Page = () => {
  // Inline CSS styles...
  // Same styles as previously defined
  const styles = {
    gridContainer: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '20px',
      padding: '20px',
    },
    card: {
      boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
      transition: '0.3s',
      borderRadius: '5px',
      overflow: 'hidden',
    },
    cardImage: {
      width: '100%',
      height: '200px',
      objectFit: 'cover',
    },
    cardContainer: {
      padding: '2px 16px',
    },
    cardTitle: {
      fontSize: '18px',
      fontWeight: 'bold',
    },
    cardDescription: {
      fontSize: '16px',
    },
    learnMoreButton: {
      backgroundColor: '#4CAF50',
      color: 'white',
      border: 'none',
      padding: '10px 20px',
      textAlign: 'center',
      textDecoration: 'none',
      display: 'inline-block',
      fontSize: '16px',
      margin: '4px 2px',
      cursor: 'pointer',
    },
  };

  return (
    <div>
      <h1>Meet Our Turtles</h1>
      <div style={styles.gridContainer}>
        {turtles.map((turtle) => (
          <div key={turtle.id} style={styles.card}>
            <img
              src={`/${turtle.name}.jpg`} // Replace with your image paths
              alt={turtle.name}
              style={styles.cardImage}
            />
            <div style={styles.cardContainer}>
              <h2 style={styles.cardTitle}>{turtle.name}</h2>
              <p style={styles.cardDescription}>{turtle.description}</p>
              <Link href={`/turtles/${turtle.slug}`}>
                <button style={styles.learnMoreButton}>Learn More</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
