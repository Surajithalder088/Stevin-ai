import  React, {createContext,useContext,useState} from 'react'

//create user context

export const UserContext=createContext();

//create user provider

export const UserProvider=({children})=>{
    const [user,setUser]=useState(null);
    return (
    <UserContext.Provider value={{user,setUser}}>
        {children}
        </UserContext.Provider>
        )
    }

//use user context


