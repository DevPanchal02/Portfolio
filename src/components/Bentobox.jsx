import React, { useState } from 'react';
import gif1 from '../assets/1.gif';
import gif2 from '../Assets/2.gif';
import gif21 from '../assets/monkey.gif';
import video3 from '../assets/3.mov';
import image4 from '../assets/4.jpg';
import gif5 from '../assets/5.gif';
import video6 from '../assets/6.mp4';

export const Bentobox = () => {
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
    <div className="bentobox-container h-full w-full grid grid-cols-5 grid-rows-6 gap-1.5">
      {bentoConfig.map((item, index) => (
        <a
          key={index}
          href={item.link}
          target="_blank"
          rel="noopener noreferrer" // Good practice for external links
          className={`bentobox-cell relative rounded-[4px] bg-neutral-900 overflow-hidden cursor-pointer
            ${hoveredIndex === index ? 'after:content-[""] after:absolute after:inset-0 after:bg-black after:opacity-60 after:flex after:justify-center after:items-center after:text-white after:text-xl after:font-bold after:content-[attr(data-name)]' : ''}
          `}
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
          aria-label={item.name}
          data-name={item.name}
          style={{
            gridColumn: `span ${item.colSpan} / span ${item.colSpan}`,
            gridRow: `span ${item.rowSpan} / span ${item.rowSpan}`,
          }}
        >
          {item.type === 'image' ? (
            <img src={item.src} alt={`cell-${index + 1}`} className="object-cover w-full h-full" style={{ filter: hoveredIndex === index ? 'blur(5px)' : 'none' }} />
          ) : (
            <video src={item.src} autoPlay loop muted playsInline className="object-cover w-full h-full" style={{ filter: hoveredIndex === index ? 'blur(5px)' : 'none' }}>
              Your browser does not support the video tag.
            </video>
          )}
        </a>
      ))}
    </div>
  );
};