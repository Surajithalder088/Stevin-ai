import React ,{useState,useContext}from 'react'
import { Link,useNavigate } from 'react-router-dom';
import axios from '../config/axios';
import { UserContext } from '../context/user.context.jsx';

const Register = () => {


    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
        const {setUser}=useContext(UserContext)

    const navigate=useNavigate()


const submithandler=async(e)=>{
    e.preventDefault()
     await axios.post('/api/users/register',{
        email,
        password
    }).then((res)=>{
        console.log(res.data);
        localStorage.setItem('token',(res.data.token))
        setUser(res.data.user)
        navigate('/home')
        
    }).catch(err=>{console.log(err.response.data)
      alert(err.response.data)
    navigate('/register')}
    )
}  

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-96">
      <h2 className="text-2xl text-white mb-4">Register</h2>
      <form  
      onSubmit={submithandler}
      >
        <div className="mb-4">
          <label className="block text-gray-300" htmlFor="email">Email</label>
          <input
          onChange={(e)=>setEmail(e.target.value)}
            type="email"
            id="email"
            className="w-full p-2 rounded bg-gray-700 text-white"
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-300" htmlFor="password">Password</label>
          <input
           onChange={(e)=>setPassword(e.target.value)}
            type="password"
            id="password"
            className="w-full p-2 rounded bg-gray-700 text-white"
            placeholder="Enter your password"
            required
          />
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-500">Register</button>
      </form>
      <p className="mt-4 text-gray-400">
       Already have account ? <Link to="/login" className="text-blue-400">login</Link>
      </p>
    </div>
  </div>
  )
}

export default Register