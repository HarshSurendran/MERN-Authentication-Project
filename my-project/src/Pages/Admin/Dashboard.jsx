import React from 'react'
import SideBar from '../../components/SideBar'
import UserTable from '../../components/UserTable'
import { Link } from 'react-router-dom'

const Dashboard = () => {
  return (
    <div className='flex bg-slate-200'>
      <div className='w-1/12'>
        <SideBar />
      </div>
      <div className='w-11/12'>
        <div className='flex justify-between pe-5'>
          <h1 className='text-4xl self-center font-bold p-3 my-4'>User Management</h1>
          <Link to={"/admin/adduser"} >
            <button className='bg-slate-500 hover:bg-slate-700 text-white font-bold py-2 px-4 my-9 rounded'>Add User</button>
          </Link>
        </div>
        <div className='text-center pe-5'>
          <UserTable />
        </div>
      </div>
    </div>
  )
}

export default Dashboard