import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { adminLogin, adminLoginFailure } from '../../redux/admin/adminSlice';

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({});
    const handleChange = (e) => {
      setFormData({...formData, [e.target.id] : e.target.value})
      console.log(formData);
    }
  
    const handleSubmit = async (e) =>{
      e.preventDefault();
      try {
        const res = await fetch("/api/admin/signin",{
            method:'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        const data = await res.json();
        if(data.success===false){
            dispatch(adminLoginFailure(data));
            return;
        }
        dispatch(adminLogin(data))
        navigate('/admin/dashboard');
      } catch (error) {
        console.log("entered catch",error);
        dispatch(adminLoginFailure(error));
      }
    }

    return (
      <div className='p-3 max-w-lg mx-auto'>
        <h1 className='font-Volkhov text-6xl text-brown  text-center pt-28 pb-10  '>Admin Login</h1>
        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
          <input type='email' placeholder='Email' id='email' className='bg-slate-100 p-3 rounded-lg' onChange={handleChange}/>
          <input type='password' placeholder='Password' id='password' className='bg-slate-100 p-3 rounded-lg' onChange={handleChange}/>
          <button  className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>SIGN IN</button>
          {/* <OAuth /> */}
      </form>      
      {/* {error && <p className='text-red-700 pt-3'>{error.message || "Something went wrong."}</p>} */}
      </div>
    )
  }

export default Login;