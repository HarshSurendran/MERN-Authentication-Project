import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { adminLogout } from '../redux/admin/adminSlice';

const AdminHeader = () => {
    const dispatch = useDispatch();
    const admin = useSelector((state) => state.admin.adminName);
    
    const handleSignOut = async () =>{
      try {
        await fetch('/api/admin/signout');
        dispatch(adminLogout());
      } catch (error) {
        console.log(error);      
      }
    }
  return (
    <div className=''>
        <div className='flex justify-between items-center mx-auto p-3 bg-slate-600 text-white'>
            <h1 className='font-bold'>My Diary App</h1>
            <ul className='flex gap-4'>
              <li>{ admin ? `Hey, ${admin.username}` : "Welcome to Administration Page"}</li>
              {admin && <li onClick={handleSignOut} className='cursor-pointer' >Sign-Out</li>}
            </ul>
        </div> 
    </div>
    )
}

export default AdminHeader
