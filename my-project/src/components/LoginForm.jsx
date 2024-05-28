import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInStart,signInFailure,signInSuccess } from '../redux/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';


const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {loading, error} = useSelector((state)=>state.user);
  const [formData, setFormData] = useState({});
  const handleChange = (e) => {
    setFormData({...formData, [e.target.id] : e.target.value})
  }

  const handleSubmit = async (e) =>{
    e.preventDefault();
    try {
        dispatch(signInStart());
        console.log(error);
        const res = await fetch("/api/auth/signin",{
            method:'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        const data = await res.json();
        if(data.success===false){
          dispatch(signInFailure(data));
          return;
        }
        console.log("This is the data after signing in",data);
        dispatch(signInSuccess(data))
        navigate('/');
    } catch (error) {
        dispatch(signInFailure(error));
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
    {error && <p className='text-red-700 pt-3'>{error.message || "Something went wrong."}</p>}
    </div>
  )
}

export default LoginForm
