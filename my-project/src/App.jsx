import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './Pages/Home';
import About from './Pages/About';
import Profile from './Pages/Profile';
import LoginPage from './Pages/LoginPage';
import SignUp from './Pages/SignUp';
import PrivateRoute from './components/PrivateRoute';


const App = () => {
  return ( 
    <BrowserRouter>
      <Routes>
       <Route path='/' element={<Home/>} />
       <Route path='/about' element={<About/>} />
       <Route element={<PrivateRoute />}>
        <Route path='/profile' element={<Profile/>} />
       </Route>
       <Route path='/signin' element={<LoginPage/>} />
       <Route path='/signup' element={<SignUp/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
