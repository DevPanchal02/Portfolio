import React, { useState, useEffect } from "react";
import { Bentobox } from "./components/Bentobox";
import { About } from "./components/About";
import './styles/LoadingScreen.css';

const App = () => {
  // Track multiple animation states instead of just one
  const [loadingComplete, setLoadingComplete] = useState(false);
  const [aboutSectionReady, setAboutSectionReady] = useState(false);
  const [bentoVisible, setBentoVisible] = useState(false);
  
  // Create a staged animation sequence with proper timing
  useEffect(() => {
    // Stage 1: Mark loading as complete
    const loadingTimer = setTimeout(() => {
      setLoadingComplete(true);
    }, 1000);
    
    // Stage 2: Prepare the About section for resizing
    const aboutReadyTimer = setTimeout(() => {
      setAboutSectionReady(true);
    }, 2000);
    
    // Stage 3: Finally bring in the Bento box
    const bentoTimer = setTimeout(() => {
      setBentoVisible(true);
    }, 3000);
    
    // Clean up all timers
    return () => {
      clearTimeout(loadingTimer);
      clearTimeout(aboutReadyTimer);
      clearTimeout(bentoTimer);
    };
  }, []);
  
  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row bg-[#090a0c] overflow-hidden">
      <section
        className={`
          h-screen relative will-change-[width] 
          transition-all ease-in-out duration-1200
          ${aboutSectionReady ? "md:w-[61.8%]" : "w-full flex justify-center items-center"}
        `}
        style={{
          transform: aboutSectionReady ? "none" : "translateX(0)",
        }}
      >
        <About className="w-full h-full" />
      </section>

      {/* Bentobox Section: Pre-render but keep invisible until needed */}
      <section
        className={`
          h-screen overflow-hidden 
          transition-all ease-in-out duration-1200
          ${bentoVisible ? "md:w-[38.2%] opacity-100" : "md:w-0 opacity-0"}
        `}
        style={{
          // Only use translate for the entry animation, not the width change
          transform: bentoVisible ? "translateX(0)" : "translateX(10%)",
          // Prevent the component from affecting layout until visible
          position: bentoVisible ? "relative" : "absolute",
          right: 0,
          // Ensure the component is already loaded in the DOM
          visibility: loadingComplete ? "visible" : "hidden",
          // Pre-load/render the component even when not visible
          display: "block"
        }}
      >
        <Bentobox />
      </section>
    </div>
  );
};

export default App;