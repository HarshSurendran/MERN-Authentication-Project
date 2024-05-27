import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './Pages/Home';
import About from './Pages/About';
import Profile from './Pages/Profile';
import LoginPage from './Pages/LoginPage';



const App = () => {
  return ( 
    <BrowserRouter>
      <Routes>
       <Route path='/' element={<Home/>} />
       <Route path='/about' element={<About/>} />
       <Route path='/profile' element={<Profile/>} />
       <Route path='/signin' element={<LoginPage/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
