import React, { useState, useRef, useEffect } from 'react';
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
  const [outlinedIndex, setOutlinedIndex] = useState(null);
  const [isCursorInGrid, setIsCursorInGrid] = useState(false);
  const containerRef = useRef(null);
  const [hoverAnimationActive, setHoverAnimationActive] = useState(false);
  const textRefs = useRef([]);
  const [textPositions, setTextPositions] = useState({});

  useEffect(() => {
    const containerElement = containerRef.current;
    if (isCursorInGrid && containerElement) {
      containerElement.classList.add('bentobox-cursor-none');
    } else if (containerElement) {
      containerElement.classList.remove('bentobox-cursor-none');
    }
  }, [isCursorInGrid]);

  const handleMouseEnterGrid = () => {
    setIsCursorInGrid(true);
  };

  const handleMouseLeaveGrid = () => {
    setIsCursorInGrid(false);
    setHoveredIndex(null);
    setOutlinedIndex(null);
    setHoverAnimationActive(false);
    setTextPositions({});
  };

  const handleMouseEnterCell = (index) => {
    setHoveredIndex(index);
    setOutlinedIndex(index);
    setHoverAnimationActive(true);
  };

  const handleMouseLeaveCell = (index) => {
    setHoverAnimationActive(false);
    setOutlinedIndex(null);
    setTextPositions(prevPositions => {
      const newPositions = {...prevPositions};
      delete newPositions[index];
      return newPositions;
    });
  };

  const handleMouseMoveCell = (event, index) => {
    if (hoveredIndex === index) {
      const cellRect = event.currentTarget.getBoundingClientRect();
      const x = event.clientX - cellRect.left;
      const y = event.clientY - cellRect.top;

      const centerX = cellRect.width / 2;
      const centerY = cellRect.height / 2;
      const offsetX = (x - centerX) * 0.05;
      const offsetY = (y - centerY) * 0.05;

      setTextPositions(prevPositions => ({
        ...prevPositions,
        [index]: { x: offsetX, y: offsetY }
      }));
    }
  };


  return (
    <div
      className="bentobox-container h-full w-full grid grid-cols-5 grid-rows-6 gap-1.5"
      ref={containerRef}
      onMouseEnter={handleMouseEnterGrid}
      onMouseLeave={handleMouseLeaveGrid}
    >
      {bentoConfig.map((item, index) => (
        <a
          key={index}
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          className={`bentobox-cell relative rounded-[4px] bg-neutral-900 overflow-hidden cursor-pointer
            ${hoveredIndex === index ? 'bento-hovered-text' : ''}
          `}
          onMouseEnter={() => handleMouseEnterCell(index)}
          onMouseLeave={() => handleMouseLeaveCell(index)}
          onMouseMove={(e) => handleMouseMoveCell(e, index)}
          aria-label={item.name}
          data-name={item.name}
          style={{
            gridColumn: `span ${item.colSpan} / span ${item.colSpan}`,
            gridRow: `span ${item.rowSpan} / span ${item.rowSpan}`,
          }}
        >
          {item.type === 'image' ? (
            <img src={item.src} alt={`cell-${index + 1}`} className={`object-cover w-full h-full ${hoveredIndex === index ? 'blur-lg' : ''}`} />  // Blur conditionally
          ) : (
            <video src={item.src} autoPlay loop muted playsInline className={`object-cover w-full h-full ${hoveredIndex === index ? 'blur-lg' : ''}`}> // Blur conditionally
              Your browser does not support the video tag.
            </video>
          )}
          <span
              className="bento-cell-text"
              style={{
                transform: textPositions[index] ? `translate(${textPositions[index].x}px, ${textPositions[index].y}px)` : 'translate(0, 0)'
              }}
            >
              {item.name}
            </span>
        </a>
      ))}
    </div>
  );
};