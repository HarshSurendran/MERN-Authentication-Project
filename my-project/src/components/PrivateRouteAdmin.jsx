import React from 'react';
import {useSelector} from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';

const  PrivateRouteAdmin = () => {
    const {adminName} = useSelector((state) => state.admin);
  return (
    adminName?  <Outlet /> : <Navigate to='/admin' />  
  )
}

export default PrivateRouteAdmin;
