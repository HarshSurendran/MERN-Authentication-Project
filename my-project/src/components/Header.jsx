import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <div className='border-2 bg-slate-200'>
      <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
      <h1 className='font-bold'>My Diary App</h1>
      <ul className='flex gap-4'>
        <Link to='/'>
          <li>Home</li>
        </Link>
        <Link to='/about'>
          <li>About</li>
        </Link>
        <Link to='/signin'>
          <li>Sign-In</li>
        </Link>
        <Link to='/signup'>
        <li>Sign-Up</li>
        </Link>
      </ul>
      </div> 
    </div>
  )
}

export default Header
