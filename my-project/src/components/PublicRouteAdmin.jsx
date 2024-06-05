import React from 'react';
import {useSelector} from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';

const  PublicRouteAdmin = () => {
    const {adminName} = useSelector((state) => state.admin);
  return (
   adminName? <Navigate to='/admin/dashboard'/> : <Outlet />
  )
}

export default PublicRouteAdmin;
