import React,{useContext, useEffect,useState} from 'react'
import { UserContext } from '../context/user.context'
import { useNavigate } from 'react-router-dom'

const UserAuth = ({children}) => {
    const navigate=useNavigate()

    const {user}=useContext(UserContext)
    const [loading,setLoading]=useState(true)
    

   
    useEffect(() => {
        if(!user){
            navigate('/login')
        }
        if(user){
            setLoading(false)
        }
            
    },[])
     if(loading){
        return <div style={{color:"gray", margin:"35vw"}}>Loading...</div>
    }


  return (
    <>
   {children}
   </>
  )
}

export default UserAuth