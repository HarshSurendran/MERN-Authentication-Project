import React from 'react'
import AdminHeader from '../../components/AdminHeader'


const AdminLayout = ({ children }) => {
  return (
    <div>
      <AdminHeader/>
      { children }
    </div>
  )
}

export default AdminLayout
