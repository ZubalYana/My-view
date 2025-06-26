import React from 'react'
import DynamicGreating from './DynamicGreating'
import CircularProgressbarsContainer from '../CircularProgressbarsContainer/CircularProgressbarsContainer'
import TimeLine from './TimeLine'
import AchievementActivityChart from './AchievementActivityChart'
import Burger from '../Burger'
export default function Homepage() {
  return (
    <div>
      <Burger />
      <div className='w-full flex flex-col lg:justify-between lg:flex-row'>
        <div>
          <DynamicGreating />
          <p className='mt-1 text-[14px] lg:text-base'>Let’s get on track with your life!</p>
          <CircularProgressbarsContainer />
        </div>
        <TimeLine />
      </div>
      <div className='w-full flex'>
        <AchievementActivityChart />
      </div>
    </div>
  )
}
