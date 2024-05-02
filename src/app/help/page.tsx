// /turtles/home/page.tsx

'use client';
import React from 'react';
import '/globals.css'

export default function HelpPage() {
  return (
    <div className="flex flex-col items-center min-h-screen bg-[#BADDC0]">
      {/* Header Section */}
      {/* <header className="w-full bg-[#e2ab79] p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">The Clemson Turtle Team</h1>
        <nav>
          <ul className="flex space-x-8 text-lg">
            <li><a href="/research" className="hover:underline">Research</a></li>
            <li><a href="/team" className="hover:underline">Team</a></li>
            <li><a href="/contact" className="hover:underline">Contact</a></li>
          </ul>
        </nav>
      </header> */}


      {/* Hero Section with Background Image */}
      <div className="w-full relative">
        <img
          src="/Allison.jpg" // Add your background image file in the public folder
          alt="Turtle Background"
          className="w-full object-cover h-80 sm:h-96"
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center bg-black bg-opacity-40">
        <h1 className="text-white text-lg sm:text-8xl text-center mx-4">Ways you can help!</h1>
          <br></br>
          <h2 className="text-white text-lg sm:text-2xl text-center mx-4">
          Want to know how you can help your backyard turtles?
          </h2>
        </div>
      </div>

      {/* Project Overview Section */}
      <div className="bg-white p-8 shadow-lg rounded-lg mt-[-3rem] z-10 w-[90%] sm:w-3/4 lg:w-1/2 text-center">
        <h2 className="text-xl font-bold mb-4">Project Overview</h2>
        <p className="text-gray-700 mb-4">
        You can make a difference just by
working on your lawn! Leaving your brush piles and some woody debris (e.g. branches, tree
trunks) in your backyard in a corner can help provide shelter for turtles. You can also avoid
harming turtles that might be crossing your driveway or lawn by checking for them before you
drive or mow. If you want to do more, you can also plant native species in your yard. This will
attract natural prey items for the turtles, such as earth worms or crickets. It will also attract
natural pollinators that will help native plants grow in your yard, adding another source of food
for the turtles. You can also limit your pesticide/insecticide use in your yard, as the turtles will
ingest it if it’s there.
        </p>
      </div>

      <div className="mt-8 flex flex-col items-center w-full">
      <h2 className="text-lg font-bold mb-4">Download Our Flyer</h2>
      
      {/* PDF Preview */}
      <object
        data="/flyer.pdf" // Adjust the file path as needed
        type="application/pdf"
        className="w-full h-screen border shadow-lg mb-4"
      >
        <p>Preview not available. <a href="/flyer.pdf">Download here</a></p>
      </object>

      {/* Download Link */}
      
    </div>
      
    </div>
  );
}
