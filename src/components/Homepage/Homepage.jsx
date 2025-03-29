import React from 'react'
import DynamicGreating from './DynamicGreating'
import CircularProgressbarsContainer from '../CircularProgressbarsContainer/CircularProgressbarsContainer'
export default function Homepage() {
  return (
    <div>
      <DynamicGreating />
      <p className='mt-1 text-base'>Let’s get on track with your life!</p>
      <CircularProgressbarsContainer />
    </div>
  )
}
