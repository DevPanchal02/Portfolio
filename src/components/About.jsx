import React, { useState, useEffect } from "react";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { RoughNotation } from "react-rough-notation";

export const About = ({ className }) => {
  const [lines, setLines] = useState(["", "", ""]);
  const fullTextLines = ["Hello,", "I'm", "Dev Panchal"];
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const [typingComplete, setTypingComplete] = useState(false);
  const [hoverStates, setHoverStates] = useState({
    GitHub: false,
    Linkedin: false,
    Email: false,
  });

  const description =
    "I'm a software engineer based in Toronto. My passion is to create emotional experiences at the intersection of art, design, and AI.";
  const socials = {
    GitHub: "https://github.com/DevPanchal02",
    Linkedin: "https://www.linkedin.com/in/dev-panchal-5a9a651aa/",
    Email: "mailto:devpanchal0120@gmail.com",
  };

  useEffect(() => {
    if (currentLine < fullTextLines.length) {
      if (currentChar < fullTextLines[currentLine].length) {
        const timer = setTimeout(() => {
          setLines((prevLines) => {
            const newLines = [...prevLines];
            newLines[currentLine] = fullTextLines[currentLine].slice(
              0,
              currentChar + 1
            );
            return newLines;
          });
          setCurrentChar((prev) => prev + 1);
        }, 100);
        return () => clearTimeout(timer);
      } else {
        setCurrentLine((prev) => prev + 1);
        setCurrentChar(0);
      }
    } else {
      const timer = setTimeout(() => {
        setTypingComplete(true);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [currentLine, currentChar]);

  const handleMouseEnter = (name) => {
    setHoverStates((prev) => ({ ...prev, [name]: true }));
  };

  const handleMouseLeave = (name) => {
    setHoverStates((prev) => ({ ...prev, [name]: false }));
  };

  return (
    <div className={`h-full ${className}`}>
      <div className="flex items-center justify-center h-full w-full">
        <div
          className={`inline-flex flex-col transition-all duration-1000 ease-in-out ${
            typingComplete ? "-translate-y-8" : "translate-y-0"
          }`}
        >
          <div className="text-white text-5xl font-mono">
            {lines.map((line, index) => (
              <div key={index} className="relative whitespace-pre text-left">
                {line}
                {currentLine === index && (
                  <span className="absolute inline-block h-full animate-pulse">
                    |
                  </span>
                )}
              </div>
            ))}
          </div>

          <div
            className={`mt-8 max-w-xl text-gray-300 text-lg font-light leading-relaxed transition-all duration-1000 ease-in-out ${
              typingComplete
                ? "opacity-100 transform translate-y-0"
                : "opacity-0 transform translate-y-4"
            }`}
          >
            {description}
          </div>

          <div
            className={`mt-8 flex space-x-6 transition-all duration-1000 ease-in-out ${
              typingComplete
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
          >
            {Object.entries(socials).map(([name, url], index) => {
              const Icon =
                name === "GitHub"
                  ? FaGithub
                  : name === "Linkedin"
                  ? FaLinkedin
                  : FaEnvelope;

              return (
                <a
                  key={index}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative group flex items-center space-x-2 text-gray-300 cursor-pointer"
                  onMouseEnter={() => handleMouseEnter(name)}
                  onMouseLeave={() => handleMouseLeave(name)}
                >
                  <Icon className="text-gray-300" />
                  <RoughNotation
                    type="underline"
                    color="rgba(255, 255, 255, 0.5)"
                    strokeWidth={5.5}
                    show={hoverStates[name]}
                    padding={2}
                    animationDuration={220}
                  >
                    <span className="relative text-gray-300 group-hover:text-white transition-colors duration-300">
                      {name}
                    </span>
                  </RoughNotation>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;