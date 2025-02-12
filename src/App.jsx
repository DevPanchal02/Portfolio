import React from "react";
import { Bentobox } from "./components/Bentobox";
import { About } from "./components/About";

function App() {
  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row bg-[#090a0c]">
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
};

export default App;
