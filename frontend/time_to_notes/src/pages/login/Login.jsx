import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../../components/navbar/Navbar'
import Input from '../../components/password/input'
const Login = () => {
  return (<>
<Navbar />
<div>
<div  className='py-12 max-w-lg mx-auto'>
<form type = "text" placeholder ="name"className='flex flex-col gap-4 ' onSubmit={() => {}}>
<h4 className="text-3xl py-8 text-center">Login</h4>
 <input type ="email" placeholder = 'Email' id='username' className='bg-slate-100 p-3 rounded-lg
            '/>
 <input type ="password" placeholder = 'Password' id='password' className='bg-slate-100 p-3 rounded-lg
            '/>
<button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>
Login
</button> 

<p className="text-sm  text-center mt-4">
<div className='text-pink-600'>Not registered yet?</div>{" "}
{/* <a href='/Signup'></a> */}
<Link to="/Signup"> 
 Create an Account
</Link>
</p>
</form>
</div>
</div>

</>)

}

export default Login