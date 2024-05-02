// /turtles/home/page.tsx

'use client';
import React from 'react';
import '/globals.css'

export default function HomePage() {
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
        <h1 className="text-white text-lg sm:text-8xl text-center mx-4">The Clemson Turtle Team</h1>
          <br></br>
          <h2 className="text-white text-lg sm:text-2xl text-center mx-4">
            Our team is here to learn more about the Eastern Box Turtle population in the Clemson area! Browse our site for information on research project, turtles, and how you can help!
          </h2>
        </div>
      </div>

      {/* Project Overview Section */}
      <div className="bg-white p-8 shadow-lg rounded-lg mt-[-3rem] z-10 w-[90%] sm:w-3/4 lg:w-1/2 text-center">
        <h2 className="text-xl font-bold mb-4">Project Overview</h2>
        <p className="text-gray-700 mb-4">
        The Eastern Box Turtle (Terrapene carolina carolina) is a native species of turtle whose range
extends from Maine to Florida and as far west as Texas. The Eastern Box Turtle is one of six
extant subspecies of the common box turtle (Terrapene carolina), four of which are found in the
United States. Box turtles are a mostly terrestrial species similar to tortoises, however they are
actually part of the American pond turtle family (Emydidae). These turtles prefer habitat that is open woods, marshy meadows,
edges of forests and fields, and shrubby habitats (Smithsonian’s National Zoo &amp; Conservation
Biology Institute). Their home range is roughly 750 feet and they are opportunistic omnivores
(Smithsonian National Zoo &amp; Conservation Biology Institute). Their diet often includes
mushrooms, roots, fruits, insects, small amphibians, and even dead animals (Smithsonian Natl
Zoo &amp; CBI). The species is listed as vulnerable according to the International Union for
Conservation of Nature.
        </p>
      </div>

      {/* Footer Section */}
      <footer className="mt-8 flex space-x-6">
        <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
          <img src="/facebook-icon.png" alt="Facebook" className="w-6 h-6" />
        </a>
        <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer">
          <img src="/linkedin-icon.png" alt="LinkedIn" className="w-6 h-6" />
        </a>
      </footer>
    </div>
  );
}
