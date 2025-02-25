import React, { useState, useEffect, useRef } from "react";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { RoughNotation } from "react-rough-notation";

export const About = ({ className, startLanguageCycle = false }) => {
  // Preserve original animation flow
  const [lines, setLines] = useState(["", "", ""]);
  const fullTextLines = ["Hello,", "I'm", "Dev Panchal."];
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const [typingComplete, setTypingComplete] = useState(false);

  // Language cycling states - only used after initial animation completes
  const cycleAnimationRef = useRef(null);
  const [isInitialAnimationDone, setIsInitialAnimationDone] = useState(false);
  const [isCycling, setIsCycling] = useState(false);
  const [isErasing, setIsErasing] = useState(false);
  const [languageIndex, setLanguageIndex] = useState(0); // Start with English (index 0)
  const [showCursor, setShowCursor] = useState(true);
  const [cursorPosition, setCursorPosition] = useState(0);

  // All language versions - English will be skipped in first cycle since it's the initial animation
  const languageGreetings = [
    ["Hello,", "I'm", "Dev Panchal."], // English
    ["Bonjour,", "je suis", "Dev Panchal."], // French
    ["Hola,", "soy", "Dev Panchal."], // Spanish
    ["你好，", "我是", "Dev Panchal."], // Mandarin
    ["नमस्ते,", "मैं", "Dev Panchal हूं."], // Hindi
    ["Привет, ", "я", "Dev Panchal."], //Russian
    ["こんにちは、", "私は", "Dev Panchal."] //Japanese
  ];

  // For social links hover states
  const [hoverStates, setHoverStates] = useState({
    GitHub: false,
    Linkedin: false,
    Email: false,
  });

  const description =
    "I'm a Toronto-based software engineer who transforms complex challenges into elegant, efficient solutions. I build reliable, high-performance software designed for longevity and a seamless user experience.";

  const socials = {
    GitHub: "https://github.com/DevPanchal02",
    Linkedin: "https://www.linkedin.com/in/dev-panchal-5a9a651aa/",
    Email: "mailto:devpanchal0120@gmail.com",
  };

  // STEP 1: Initial typing animation
  useEffect(() => {
    // Skip if we're already cycling through languages
    if (isCycling) return;

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
          setCursorPosition(currentLine);
        }, 100); // Slightly slower typing
        return () => clearTimeout(timer);
      } else {
        setCurrentLine((prev) => prev + 1);
        setCurrentChar(0);
        setCursorPosition(currentLine + 1);
      }
    } else {
      const timer = setTimeout(() => {
        setTypingComplete(true);
        setIsInitialAnimationDone(true);
        // Keep cursor at the end of the last line
        setCursorPosition(fullTextLines.length - 1);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [currentLine, currentChar, isCycling]);

  // STEP 2: Begin language cycling sooner after initial animation is done
  useEffect(() => {
    if (isInitialAnimationDone && startLanguageCycle && !isCycling) {
      // Start language cycle sooner (1.5s instead of 3s)
      const startCycleTimer = setTimeout(() => {
        setIsCycling(true);
        setIsErasing(true);
        // Start with erasing the currently displayed text
        setCurrentLine(fullTextLines.length - 1);
        setCurrentChar(fullTextLines[fullTextLines.length - 1].length);
        setCursorPosition(fullTextLines.length - 1);
        // Initialize language index to 1 to skip English in the cycle
        setLanguageIndex(1);
      }, 1500); // Reduced wait time before cycling

      return () => clearTimeout(startCycleTimer);
    }
  }, [isInitialAnimationDone, startLanguageCycle, isCycling]);

  // STEP 3: Language cycling animation
  useEffect(() => {
    if (!isCycling) return;

    // Clean up any existing animation timer
    if (cycleAnimationRef.current) {
      clearTimeout(cycleAnimationRef.current);
    }

    // Get current language text based on current language index
    const currentLanguage = languageGreetings[languageIndex];

    if (isErasing) {
      // ERASING PHASE
      if (currentLine >= 0) {
        if (currentChar > 0) {
          // Erase one character
          cycleAnimationRef.current = setTimeout(() => {
            setLines((prevLines) => {
              const newLines = [...prevLines];
              newLines[currentLine] = lines[currentLine]?.slice(0, currentChar - 1) || "";
              return newLines;
            });
            setCurrentChar((prev) => prev - 1);
            // Keep cursor at the end of current text
            setCursorPosition(currentLine);
          }, 50);
        } else {
          // Move to previous line - Clear the current line immediately for clean erase
          setLines((prevLines) => {
            const newLines = [...prevLines];
            newLines[currentLine] = ""; // Clean erase line by line
            return newLines;
          });
          if (currentLine > 0) {
            setCurrentLine((prev) => prev - 1);
            const prevLineText = lines[currentLine - 1] || "";
            setCurrentChar(prevLineText.length);
            setCursorPosition(currentLine - 1);
          } else {
            // All erased, prepare to type the next language
            setIsErasing(false);
            setCurrentLine(0);
            setCurrentChar(0);
            setCursorPosition(0);
          }
        }
      }
    } else {
      // TYPING PHASE
      if (currentLine < currentLanguage.length) {
        if (currentChar < currentLanguage[currentLine].length) {
          // Type next character
          cycleAnimationRef.current = setTimeout(() => {
            setLines((prevLines) => {
              const newLines = [...prevLines];
              newLines[currentLine] = currentLanguage[currentLine].slice(0, currentChar + 1);
              return newLines;
            });
            setCurrentChar((prev) => prev + 1);
            setCursorPosition(currentLine);
          }, 80);
        } else {
          // Move to next line
          setCurrentLine((prev) => {
            const nextLine = prev + 1;
            // Update cursor position immediately with valid line index, clamping to the last line
            setCursorPosition(Math.min(nextLine, currentLanguage.length - 1));
            return nextLine;
          });
          setCurrentChar(0);
        }
      } else {
        // Typing complete - wait before starting to erase
        cycleAnimationRef.current = setTimeout(() => {
          // Increment language index, skip index 0 (English)
          setLanguageIndex((prev) => {
            const nextIndex = prev + 1;
            // If next index would be 0 (English), skip to 1
            return nextIndex >= languageGreetings.length ? 1 : nextIndex;
          });
          setIsErasing(true);
          setCurrentLine(currentLanguage.length - 1);
          setCurrentChar(currentLanguage[currentLanguage.length - 1].length);
          setCursorPosition(currentLanguage.length - 1);
        }, 2000); // Pause with text visible
      }
    }
  }, [currentLine, currentChar, isErasing, languageIndex, isCycling, lines]);

  // Cursor blink effect - independent of typing state
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500); // Standard cursor blink rate

    return () => clearInterval(blinkInterval);
  }, []);

  // Clean up all animation timers on unmount
  useEffect(() => {
    return () => {
      if (cycleAnimationRef.current) {
        clearTimeout(cycleAnimationRef.current);
      }
    };
  }, []);

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
          className={`inline-flex flex-col transition-all duration-1000 ease-in-out ${typingComplete ? "translate-y-0" : "translate-y-8"
            }`}
        >
          {/* Using fixed height containers to prevent layout shift when re-typing*/}
          <div className="text-white text-4xl sm:text-5xl md:text-6xl font-mono h-[220px] flex flex-col justify-start overflow-hidden translate-">
            {lines.map((line, index) => (
              <div key={index} className="relative whitespace-pre text-left h-[80px] flex items-center">
                {line || ""}
                {cursorPosition === index && showCursor && (
                  <span className="inline-block h-[70%] w-[3px] bg-white animate-pulse">
                  </span>
                )}
              </div>
            ))}
          </div>

          <div
            className={`mt-8 max-w-2xl text-gray-300 text-lg sm:text-l md:text-xl font-light leading-relaxed transition-opacity duration-1000 ease-in-out ${typingComplete
                ? "opacity-100"
                : "opacity-0"
              }`}
          >
            {description}
          </div>

          <div
            className={`mt-5 flex space-x-4 sm:space-x-6 transition-opacity duration-1000 ease-in-out ${typingComplete
                ? "opacity-100"
                : "opacity-0"
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