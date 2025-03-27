import React from 'react'
import whiteLogoEye from '/whiteLogo.svg'
export default function WhiteLogo() {
  return (
    <div className='w-[130px] flex justify-between items-center z-10 lg:w-[165px]'>
        <img src={whiteLogoEye} alt="whiteLogoEye" className='w-[35px] lg:w-[45px]' />
        <h1 className="text-xl text-[var(--custom-white)] font-bold lg:text-2xl">My View</h1>
    </div>
  )
}
