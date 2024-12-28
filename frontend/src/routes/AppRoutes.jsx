import React, {useContext} from 'react'
import {Routes,Route,BrowserRouter} from "react-router-dom"
import Login from '../screens/Login'
import Register from '../screens/Register'
import Home from '../screens/Home'
import Project from '../screens/Project'
import {UserContext} from '../context/user.context'
import LandingPage from '../screens/LandingPage'

export const AppRoutes = () => {
  const {user}= useContext(UserContext) 
  console.log(user);
  

  return (
    <BrowserRouter>
    <Routes>
    <Route path ="/" element ={<LandingPage/> }/>
        <Route path ="/home" element ={user?<Home/>:<Login/>} />
        <Route path ="/login" element ={<Login/> }/>
        <Route path ="/register" element ={<Register/>} />
        <Route path ="/project" element ={user?<Project/>:<Login/>} />

    </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes