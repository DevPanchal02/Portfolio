import React from 'react';
import gif1 from '../assets/1.gif';
import gif2 from '../Assets/2.gif'
import gif25 from '../assets/2.5.gif'
import video3 from '../assets/3.mov';
import image4 from '../assets/4.jpg';
import gif5 from '../assets/5.gif';
import video6 from '../assets/6.mp4';

export const Bentobox = () => {
  return (

    <div className="bentobox-container h-full w-full grid-cols-5 grid-rows-6 gap-1.5 grid">

      {/* Cell 1 */}
      <div className="bentobox-cell col-span-2 row-span-1 rounded-[4px] bg-neutral-900 overflow-hidden">
        <img src={gif1} alt="1" className="object-cover w-full h-full" />
      </div>
      {/* Cell 2 */}
      <div className="bentobox-cell col-span-2 row-span-1 rounded-[4px] bg-neutral-900 overflow-hidden">
        <img src={gif2} alt="1" className="object-cover w-full h-full" />
      </div>
      {/* Cell 2.5 */}
      <div className="bentobox-cell col-span-1 row-span-1 rounded-[4px] bg-neutral-900 overflow-hidden">
        <img src={gif25} alt="1" className="object-cover w-full h-full" />
      </div>
      {/* Cell 3 */}
      <div className="bentobox-cell col-span-3 row-span-3 rounded-[4px] bg-neutral-900 overflow-hidden">
        <video src={video3} autoPlay loop muted playsInline className="object-cover w-full h-full">
          Your browser does not support the video tag.
        </video>
      </div>
      {/* Cell 4 */}
      <div className="bentobox-cell col-span-2 row-span-3 rounded-[4px] bg-neutral-900 overflow-hidden">
        <img src={image4} alt="4" className="object-cover w-full h-full" />
      </div>
      {/* Cell 5 */}
      <div className="bentobox-cell col-span-2 row-span-2 rounded-[4px] bg-neutral-900 overflow-hidden">
        <img src={gif5} alt="1" className="object-cover w-full h-full" />
      </div>
      {/* Cell 6 */}
      <div className="bentobox-cell col-span-3 row-span-2 rounded-[4px] bg-neutral-900 overflow-hidden">
        <video src={video6} autoPlay loop muted playsInline className="object-cover w-full h-full">
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
};

