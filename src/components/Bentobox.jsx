import React from 'react';

export const Bentobox = () => {
    return (
        <div className="h-full w-full grid-cols-5 grid-rows-6 gap-0.5 grid">
          <div className="col-span-2 row-span-2 rounded=[4px] bg-neutral-900"></div>
          <div className="col-span-3 row-span-2 rounded=[4px] bg-neutral-900"></div>
          <div className="col-span-3 row-span-3 rounded=[4px] bg-neutral-900"></div>
          <div className="col-span-2 row-span-3 rounded=[4px] bg-neutral-900"></div>
          <div className="col-span-2 row-span-1 rounded=[4px] bg-neutral-900"></div>
          <div className="col-span-3 row-span-1 rounded=[4px] bg-neutral-900"></div>
        </div>
      );
    };