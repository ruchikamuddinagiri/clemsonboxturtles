// /turtles/[sub-path]/page.tsx

'use client';
import React, { useEffect, useState } from 'react';

export default function TurtlePage() {
  const [name, setName] = useState('Turtle');

  useEffect(() => {
    const pathParts = window.location.pathname.split('/');
    const nameFromPath = pathParts[pathParts.length - 1] || 'Turtle';
    setName(nameFromPath);
  }, []);

  return (
    <div className="text-center mb-8">
      <h1 className="text-3xl font-bold text-gray-800">Hi, I am {name}</h1>
      <img src="/turtle-gif.gif" alt="Dancing Turtle" className="mx-auto" />
    </div>
  );
}
