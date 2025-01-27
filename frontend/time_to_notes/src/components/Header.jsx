import React from 'react'
import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <div className='bg-slate-200'>
        <div className='flex justify-between items-center
        max-w-6xl mx-auto p-3'>
            <Link to='/'>
            <h1 className='text-3xl font-bold text-gray-900'>Auth app</h1>
            </Link>
            <ul className='flex gap-4 justify-between' >
                <Link to='/Home'> <li className='justify bg-center '>Home</li></Link>
                 <Link to='/about'><li className=''>About</li></Link>
                 <Link to='/signup'> <li className=''>Sign In</li></Link>
            </ul>
        </div>
    </div>
  )
}
