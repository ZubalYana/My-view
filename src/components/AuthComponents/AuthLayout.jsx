import React from 'react'
import WhiteLogo from '../WhiteLogo/WhiteLogo'
import bgCircle from '/bgCircle.svg'
export default function AuthLayout() {
  return (
    <div className='w-full h-screen relative'>
        <div className='w-full h-screen absolute z-50 px-[60px] py-[40px]'>
          <WhiteLogo />
        </div>
        <div className="w-full h-screen bgCirclesCon absolute z-0 top-0">
            <img className='bgCircle w-[409px] left-[-80px] top-[-100px]' src={bgCircle} alt="bgCircle" />
            <img className='bgCircle w-[262px] left-[260px] top-[-80px]' src={bgCircle} alt="bgCircle" />
            <img className='bgCircle w-[262px] left-[260px] top-[-80px]' src={bgCircle} alt="bgCircle" />
        </div>
    </div>
  )
}
