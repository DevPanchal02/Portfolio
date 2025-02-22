import React, { useState } from 'react';
import gif1 from '../assets/1.gif';
import gif2 from '../Assets/2.gif'
import gif21 from '../assets/monkey.gif'
import video3 from '../assets/3.mov';
import image4 from '../assets/4.jpg';
import gif5 from '../assets/5.gif';
import video6 from '../assets/6.mp4';

export const Bentobox = () => {
  // Array of objects containing the configuration for each bentobox cell
  // Total usable squares set to 5x6 (wxh)
  const bentoConfig = [
    { name: "Music Streaming", link: "https://github.com/DevPanchal02/react-music-player", colSpan: 2, rowSpan: 1, type: 'image', src: gif1 },
    { name: "Western Course Outline Manager", link: "https://github.com/DevPanchal02/Western-Course-Outline-Manager", colSpan: 2, rowSpan: 1, type: 'image', src: gif2 },
    { name: "Coding Monkey", link: "https://github.com/DevPanchal02/CodingMonkey", colSpan: 1, rowSpan: 1, type: 'image', src: gif21 },
    { name: "Auto Intelligence", link: "https://github.com/DevPanchal02/Automod_4450", colSpan: 3, rowSpan: 3, type: 'video', src: video3 },
    { name: "Souls Fighter", link: "https://github.com/DevPanchal02/3d-rpg-game", colSpan: 2, rowSpan: 3, type: 'image', src: image4 },
    { name: "Pokédex", link: "https://github.com/DevPanchal02/pokedex-webapp", colSpan: 2, rowSpan: 2, type: 'image', src: gif5 },
    { name: "Tcker", link: "https://github.com/DevPanchal02/Tcker", colSpan: 3, rowSpan: 2, type: 'video', src: video6 },
  ];

  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div className="bentobox-container h-full w-full grid-cols-5 grid-rows-6 gap-1.5 grid">
      {bentoConfig.map((item, index) => (
        <a
          key={index}
          href={item.link}
          target="_blank"
          className={`bentobox-cell relative col-span-${item.colSpan} row-span-${item.rowSpan} rounded-[4px] bg-neutral-900 overflow-hidden cursor-pointer`}
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
          aria-label={item.name}
        >
          {item.type === 'image' ? (
            <img src={item.src} alt={`cell-${index + 1}`} className={`object-cover w-full h-full ${hoveredIndex === index ? 'blur-md' : ''}`} />
          ) : (
            <video src={item.src} autoPlay loop muted playsInline className={`object-cover w-full h-full ${hoveredIndex === index ? 'blur-md' : ''}`}>
              Your browser does not support the video tag.
            </video>
          )}
          {hoveredIndex === index && (
            <div className="absolute inset-0 bg-black opacity-60 flex justify-center items-center">
              <p className="text-white text-xl font-bold">{item.name}</p>
            </div>
          )}
        </a>
      ))}
    </div>
  );
};