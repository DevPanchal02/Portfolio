import React, { useState, useEffect } from "react";
import { Bentobox } from "./components/Bentobox";
import { About } from "./components/About";
import overlay from "./Assets/overlay.mp4"

const App = () => {
  // Track multiple animation states instead of just one
  const [loadingComplete, setLoadingComplete] = useState(false);
  const [aboutSectionReady, setAboutSectionReady] = useState(false);
  const [bentoVisible, setBentoVisible] = useState(false);
  
  // New state to control when to start cycling languages (only after all initial animations)
  const [startLanguageCycle, setStartLanguageCycle] = useState(false);

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
      
      // Stage 4: After everything is positioned and the initial animations completed,
      // signal that it's time to start cycling languages
      const cycleStartTimer = setTimeout(() => {
        setStartLanguageCycle(true);
      }, 4000); // Give extra time after the Bento appears
      
      return () => clearTimeout(cycleStartTimer);
    }, 3000);

    // Clean up all timers
    return () => {
      clearTimeout(loadingTimer);
      clearTimeout(aboutReadyTimer);
      clearTimeout(bentoTimer);
    };
  }, []);

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row bg-[#111010] overflow-hidden ">
      {/* Video Overlay for visual effects */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-45 mix-blend-screen pointer-events-none z-0"
      >
        <source src={overlay} type="video/mp4" />
      </video>

      {/* About Section */}
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
        <About 
          className="w-full h-full" 
          startLanguageCycle={startLanguageCycle} // Signal when to start language cycling
        />
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