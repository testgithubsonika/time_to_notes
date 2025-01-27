import React from 'react'
import { Link } from 'react-router-dom'

export default function Signup() {
  return (<>
    <div className='p-3 max-w-lg mx-auto'> 
        <h2 className='text-3xl font-semibold rounded text-center m-20'>
        Sign up</h2>
        <div>
          <form type = "text" placeholder ="name"className='flex flex-col gap-4 '>
            <input type ="text" placeholder = 'Username' id='username' className='bg-slate-100 p-3 rounded-lg
            '/>
            <input type ="email" placeholder = 'Email' id='username' className='bg-slate-100 p-3 rounded-lg
            '/>
            <input type ="password" placeholder = 'Password' id='username' className='bg-slate-100 p-3 rounded-lg
            '/>
            <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>Sign up</button> 
          </form>
          <div className="mt-4 text-slate-950">
          <p>Have an account</p>
            <Link to='/Login'>
            <span clasName='text-blue-500 '>Sign in</span></Link>
          </div>
      </div>

      </div>
   
    </>
  )
}

