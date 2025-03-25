import React from 'react'
import WhiteLogo from '../WhiteLogo/WhiteLogo'
import bgCircle from '/bgCircle.svg'
export default function AuthLayout() {
  return (
    <div className='w-full h-screen relative overflow-hidden'>
        <div className='w-full h-screen absolute z-50 px-[60px] py-[40px]'>
          <WhiteLogo />
        </div>
        <div className="w-full h-screen bgCirclesCon absolute z-0 top-0">
            <img className='bgCircle w-[409px] left-[-5%] top-[-12%]' src={bgCircle} alt="bgCircle" />
            <img className='bgCircle w-[262px] left-[17%] top-[-11%]' src={bgCircle} alt="bgCircle" />
            <img className='bgCircle w-[235px] left-[31%] top-[-22%]' src={bgCircle} alt="bgCircle" />
            <img className='bgCircle w-[215px] left-[30%] top-[6%]' src={bgCircle} alt="bgCircle" />
            <img className='bgCircle w-[334px] left-[41%] top-[-12%]' src={bgCircle} alt="bgCircle" />
            <img className='bgCircle w-[210px] left-[60%] top-[-12%]' src={bgCircle} alt="bgCircle" />
            <img className='bgCircle w-[322px] left-[14%] top-[18%]' src={bgCircle} alt="bgCircle" />
            <img className='bgCircle w-[348px] left-[31%] top-[26%]' src={bgCircle} alt="bgCircle" />
            <img className='bgCircle w-[245px] left-[-5%] top-[36%]' src={bgCircle} alt="bgCircle" />
            <img className='bgCircle w-[128px] left-[8.5%] top-[37.5%]' src={bgCircle} alt="bgCircle" />
            <img className='bgCircle w-[378px] left-[3%] top-[50%]' src={bgCircle} alt="bgCircle" />
            <img className='bgCircle w-[480px] left-[-22%] top-[57%]' src={bgCircle} alt="bgCircle" />
            <img className='bgCircle w-[195px] left-[24%] top-[55%]' src={bgCircle} alt="bgCircle" />
            <img className='bgCircle w-[250px] left-[22%] top-[80%]' src={bgCircle} alt="bgCircle" />
            <img className='bgCircle w-[160px] left-[50%] top-[30%]' src={bgCircle} alt="bgCircle" />
            <img className='bgCircle w-[250px] left-[57%] top-[12%]' src={bgCircle} alt="bgCircle" />
            <img className='bgCircle w-[340px] left-[70%] top-[-35%]' src={bgCircle} alt="bgCircle" />
        </div>
    </div>
  )
}
