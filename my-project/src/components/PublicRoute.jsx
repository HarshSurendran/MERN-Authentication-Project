import React from 'react';
import {useSelector} from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';

const  PublicRoute = () => {
    const {currentUser} = useSelector((state) => state.user);
    console.log(currentUser);
  return (
   currentUser? <Navigate to='/Home'/> : <Outlet/> 
  )
}

export default PublicRoute;
