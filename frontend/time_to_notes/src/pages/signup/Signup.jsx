import React from 'react'
import { Link ,useNavigate} from 'react-router-dom'
import Header from '../../components/Header'
import { useState } from 'react'
export default function Signup() {
  const [formData, setFormData] = useState({}) ;
  const [error, setError] = useState(false) ;
  const [loading, setLoading] = useState(false) ;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]:e.target.value});
  } 
  console.log(formData) ;
  const handleSubmit = async (e) => {
  e.preventDefault();
  try{
    setError(false); 
    setLoading(true);
     const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      setError(false)
      if(data.success===false){
        setError(true);
        return ;
      } 
      navigate('/signin');
  }
  catch(error){
    setLoading(false); 
    setError(true);
  }
  } ;error,loading
  return (<>
  <Header />
    <div className='p-3 max-w-lg mx-auto'> 
        <h2 className='text-3xl font-semibold rounded text-center m-20'>  
        Sign up</h2>
       
          <form onSubmit={handleSubmit} type = "text" placeholder ="name"className='flex flex-col gap-4 '>
            <input type ="text" placeholder = 'Username' id='username' className='bg-slate-100 p-3 rounded-lg
            'onChange={handleChange}/>
            <input type ="email" placeholder = 'Email' id='email' className='bg-slate-100 p-3 rounded-lg
            'onChange={handleChange}/>
            <input type ="password" placeholder = 'Password' id='password' className='bg-slate-100 p-3 rounded-lg
            'onChange={handleChange}/>
            <button
              disabled = {loading}
              className=' text-white p-3 uppercase bg-slate-600 rounded-lg hover:opacity-95 disabled:opacity-60'>
               {loading ? 'loading...' : 'signup'}
            </button>
            {/* <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>Sign up</button>  */}
          </form>
          <div className="mt-4 text-slate-950">
          <p>Have an account</p>
            <Link to='/Login'>
            <span clasName='text-blue-500 '>Sign in</span>
            </Link>
          </div>
          <p className='mt-5 text-red-500'>{error && 'something went wrong'}</p>
      </div>

   
   
    </>
  )
}

