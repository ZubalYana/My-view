import React from 'react';
import blinkingEye from '/blinkingEye.webm';

export default function AnimatedLogo() {
    return (
        <div className='w-[130px] flex justify-between items-center z-10 lg:w-[160px]'>
            <video
                src={blinkingEye}
                autoPlay
                loop
                muted
                className="w-[55px] h-auto lg:w-[50px]"
            />
            <h1 className="text-[16px] text-[var(--custom-white)] font-bold lg:text-2xl">My View</h1>
        </div>
    );
}
