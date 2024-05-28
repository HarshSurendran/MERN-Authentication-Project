import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const handleChange = (e) => {
    setFormData({...formData, [e.target.id] : e.target.value})
  }
  const handleSubmit = async (e) =>{
    e.preventDefault();
    try {
        setLoading(true);
        setError(false);
        const res = await fetch("/api/auth/signin",{
            method:'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        const data = await res.json();
        console.log(data);
        setLoading(false);
        navigate('/');
    } catch (error) {
        setLoading(false);
        setError(true);
    }
  }
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input type='email' placeholder='Email' id='email' className='bg-slate-100 p-3 rounded-lg' onChange={handleChange}/>
        <input type='password' placeholder='Password' id='password' className='bg-slate-100 p-3 rounded-lg' onChange={handleChange}/>
        <button disabled={loading} className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>{loading? "Loading.." : "SIGN IN"}</button>
    </form>
    <div className='flex gap-2 mt-5'>
        <p>Dont have an account?</p>
        <Link to='/signup'>
            <span className='text-blue-500'>Sign Up</span>
        </Link>
    </div>
    {error && <p className='text-red-700 pt-3'>Something went wrong.</p>}
    </div>
  )
}

export default LoginForm
