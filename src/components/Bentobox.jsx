import React from 'react';

export const Bentobox = () => {
  return (
 <div className='h-screen w-full flex items-end justify-end bg-[#161b1e]'>
  <div className="grid h-full w-full max-w-[38.2%] 
    grid-cols-5 grid-rows-6 gap-1">
    <div className='col-span-2 row-span-2 rounded-[4px] bg-[#0e1011]'></div>
    <div className='col-span-3 row-span-2 rounded-[4px] bg-[#0e1011]'></div>
    <div className='col-span-3 row-span-3 rounded-[4px] bg-[#0e1011]'></div>
    <div className='col-span-2 row-span-3 rounded-[4px] bg-[#0e1011]'></div>
    <div className='col-span-2 row-span-1 rounded-[4px] bg-[#0e1011]'></div>
    <div className='col-span-3 row-span-1 rounded-[4px] bg-[#0e1011]'></div>
  </div>
</div>
  );
};