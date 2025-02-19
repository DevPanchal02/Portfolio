import React, { useState, useEffect } from "react";
import { Bentobox } from "./components/Bentobox";
import { About } from "./components/About";

const LoadingScreen = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-screen bg-black flex flex-col items-center justify-center z-50">
      <div className="text-white text-xl mb-4">Loading...</div>
      <div className="flex space-x-2">
        {[...Array(5)].map((_, index) => (
          <div
            key={index}
            className={`bg-white h-4 w-4 rounded-sm animate-pulse-${index + 1}`} // Added unique animation class
            style={{ animationDelay: `${index * 0.2}s` }} // stagger animation
          />
        ))}
      </div>
    </div>
  );
};

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time (replace with your actual data fetching)
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row bg-[#090a0c]">
      {isLoading && <LoadingScreen />}

      {/* About section - 61.8% width on desktop */}
      <section className="h-screen md:h-screen w-full md:w-[61.8%]">
        <About className="w-full h-full" />
      </section>

      {/* Bentobox section - 38.2% width on desktop */}
      <section className="h-screen md:h-screen w-full md:w-[38.2%]">
        <Bentobox />
      </section>
    </div>
  );
}

export default App;