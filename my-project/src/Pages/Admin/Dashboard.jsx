import React from 'react'
import SideBar from '../../components/SideBar'
import UserTable from '../../components/UserTable'

const Dashboard = () => {
  return (
    <div className='flex bg-slate-200'>
      <div className='w-1/12'>
        <SideBar />
      </div>
      <div className='w-11/12'>
        <h1 className='text-4xl self-center font-bold p-3 my-4'>User Management</h1>
        <div className='text-center pe-5'>
          <UserTable />
        </div>
      </div>
    </div>
  )
}

export default Dashboard