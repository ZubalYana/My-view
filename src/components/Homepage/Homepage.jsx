import React from 'react'
import DynamicGreating from './DynamicGreating'
import CircularProgressbarsContainer from '../CircularProgressbarsContainer/CircularProgressbarsContainer'
import TimeLine from './timeLine'
export default function Homepage() {
  return (
    <div>
      <div className='w-full flex justify-between'>
        <div>
          <DynamicGreating />
          <p className='mt-1 text-base'>Let’s get on track with your life!</p>
          <CircularProgressbarsContainer />
        </div>
        <TimeLine />
      </div>
    </div>
  )
}
