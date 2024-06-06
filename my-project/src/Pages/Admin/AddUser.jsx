import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

const AddUser = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({});
    const [error,setError] = useState(false);
    const [loading,setLoading] = useState(false);
    const handleChange = (e) => {
        setFormData({...formData, [e.target.id] : e.target.value})
    }
    
    const handleSubmit = async (e) =>{
        e.preventDefault();
        try {
            setLoading(true);
            setError(false);
            console.log(formData);
            if(formData.username.trim() === ""){
                return setError("Username can't be empty")
              }
              if(formData.email.trim() === ""){
                return setError("Email can't be empty")
              }
              if(formData.password.trim() === ""){ 
                console.log("password empty");      
                return setError("Password can't be empty.")
              }
            const res = await fetch("/api/auth/signup",{
                method:'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            const data = await res.json();
            console.log(data,"This is the data");
            if(!data.success){
                setLoading(false);
                setError(true);
                return
            }
            setLoading(false);
            navigate("/admin/dashboard");
        } catch (error) {
            console.log(error,"This is error");
            setLoading(false);
            setError(true);
        }        
    }
    const handleClick = (e) => {
        e.preventDefault();
        navigate(`/admin/dashboard`);
    }

  return (
    <div>
      <div className='p-3 max-w-lg mx-auto'>
        <h1 className='text-3xl text-center font-semibold my-7'>ADD USER</h1>
        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
            <input type='text' placeholder='Username' id='username' className='bg-slate-100 p-3 rounded-lg' onChange={handleChange}/>
            <input type='email' placeholder='Email' id='email' className='bg-slate-100 p-3 rounded-lg' onChange={handleChange}/>
            <input type='password' placeholder='Password' id='password' className='bg-slate-100 p-3 rounded-lg' onChange={handleChange}/>
            <button disabled={loading} className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>{loading? "Loading.." : "SIGN UP"}</button>
        </form>    
        <div className='flex justify-center mt-3'>
            <button onClick={handleClick} className=' p-3 rounded-lg'>Back</button>
        </div>
        {error && <p className='text-red-700 pt-3'>Something went wrong.</p>}
      </div>
    </div>
  )
}

export default AddUser
