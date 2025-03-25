import React from 'react'
import whiteLogoEye from '/whiteLogo.svg'
export default function WhiteLogo() {
  return (
    <div className='w-[165px] flex justify-between items-center'>
        <img src={whiteLogoEye} alt="whiteLogoEye" />
        <h1 className="text-2xl text-[var(--custom-white)] font-bold">My View</h1>
    </div>
  )
}
