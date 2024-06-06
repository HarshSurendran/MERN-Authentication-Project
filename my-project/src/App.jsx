import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './Pages/Home';
import About from './Pages/About';
import Profile from './Pages/Profile';
import LoginPage from './Pages/LoginPage';
import SignUp from './Pages/SignUp';
import PrivateRoute from './components/PrivateRoute';
import AdminLayout from './Pages/Admin/AdminLayout';
import Login from './Pages/Admin/Login';
import Dashboard from './Pages/Admin/Dashboard';
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import PublicRoute from './components/PublicRoute';
import UserHome from './Pages/UserHome';
import PrivateRouteAdmin from './components/PrivateRouteAdmin';
import EditUser from './Pages/Admin/EditUser';
import PublicRouteAdmin from './components/PublicRouteAdmin';
import AddUser from './Pages/Admin/AddUser';



const App = () => {
  return ( 
    <BrowserRouter>
      <Routes>
        <Route element={<PublicRoute />}>
          <Route path='/' element={<Home/>} />
        </Route>
      
       <Route path='/about' element={<About/>} />

       <Route element={<PrivateRoute />}>
        <Route path='/Home' element={<UserHome/>} />
        <Route path='/profile' element={<Profile/>} />
       </Route>

       <Route path='/signin' element={<LoginPage/>} />
       <Route path='/signup' element={<SignUp/>} />
      </Routes>
      <Routes>
        <Route element={<PublicRouteAdmin />} >
          <Route path='/admin' element={<AdminLayout><Login /></AdminLayout>} />
        </Route>
        <Route element={<PrivateRouteAdmin />} >
          <Route path='/admin/dashboard' element={<AdminLayout><Dashboard /></AdminLayout>} />
          <Route path="/admin/edit/:id" element={<AdminLayout> <EditUser /></AdminLayout>} />
          <Route path='/admin/adduser' element={<AdminLayout> <AddUser/> </AdminLayout>} />
        </Route>
          {/* <Route path='/admin/*' element={<AdminLayout><Login /></AdminLayout>} /> */}
      </Routes>
    </BrowserRouter>
  )
}

export default App
