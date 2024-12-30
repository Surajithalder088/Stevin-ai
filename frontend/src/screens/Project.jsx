import React,{useEffect, useState,useContext} from 'react'
import { useLocation } from 'react-router-dom';
import axios from '../config/axios.js'
import { initializeSocket,recievemessage,sendmessage } from '../config/socket.js';
import { UserContext } from "../context/user.context.jsx"
import Markdown from 'markdown-to-jsx'

const Project = ({navigate}) => {

    const location=useLocation()
    console.log(location.state.project);
    const [isChecked,setIsChecked]=useState(false)  // while selecting user to add as colebrator
    const [project,setProject]=useState(location.state.project)
    const [isSidePanelOpen,setIsSidePanelOpen]=useState(false)
    const[addUserOpen,setAddUserOpen]=useState(false)
    const[userArray,setUserArray]=useState([])  // selecting user are stord here to add as colebrator
    const [message,setMessage]=useState('')
    const [frnds,setFrnds]=useState([])
    const messageBox=React.createRef()

const {user}=useContext(UserContext)
    


    useEffect(() => {
           initializeSocket(project._id)
        
           recievemessage('project-message',(data)=>{
            console.log(data);
            appendIncomingMessage(data)
            
           })
            scrollToBottom()
           

           const projectid=project._id
            axios.get(`/api/projects/get-project/${projectid}`)
           .then((res) => {
               console.log(" project data ",res.data.project);
               setProject(res.data.project);
           })
           .catch((err) =>{console.log(err)})

    },[])

   useEffect(() => {

 

    const getcollaborators=async()=>{

        const projectid=project._id
        await axios.get(`/api/projects/get-project/${projectid}`)
        .then((res) => {
            console.log(res.data.project.users);
            setFrnds(res.data.project.users);
        })
        .catch((err) =>{console.log(err)})
        
        let users=[{id:1,email:"user1@user.com", inproject:true},{id:2,email:"user1@user.com", inproject:false},{id:3,email:"user1@user.com", inproject:false},
            {id:4,email:"user1@user.com", inproject:false},{id:5,email:"user1@user.com", inproject:false}
        ]
      
    }
    const getUserToAdd=async()=>{
            const projectid=project._id

            console.log(projectid);
            
        await axios.get(`/api/users/all/${project._id}`)
        .then((res) => {
            console.log(res.data.users)
            setFrnds(res.data.users)
        })
        .catch((err) =>{console.log(err)})

        let Users=[{id:6,email:"user2@user.com", inproject:false},
            {id:7,email:"user2@user.com", inproject:false},{id:8,email:"user2@user.com", inproject:false},{id:9,email:"user2@user.com", inproject:false}
        ]
     

    }
    if(addUserOpen || isSidePanelOpen){
        addUserOpen?getUserToAdd():getcollaborators()
    }
        


   }, [addUserOpen ===true||isSidePanelOpen===true])



   const addUser=async()=>{

        const projectId=project._id
       
        console.log(userArray);
        
        await axios.put(`/api/projects/add-user`,{projectId,users:userArray})
        .then((res) => {
             
            console.log(res.data)
        })
        .catch((err) =>{console.log(err)
            console.log(" these users are not added  :",userArray)
            
        })
     
      
            
       setAddUserOpen(false)
       setUserArray([])
   }

const checkhandler=(event)=>{
    const{value,checked}=event.target
    if(checked){
        setUserArray([...userArray,value])
        console.log({value});
        
       
    }else{
        setUserArray(userArray.filter(user=>user!==value))
        
    }
    
}


const sendMessage=()=>{
    console.log(user);
    
    console.log(message);
    
    sendmessage('project-message',{
        message,
        sender:user.email

    })
    const messageObject={
        message,
        sender:user.email
    }
    appendOutgoingMessage(messageObject)
    setMessage(" ")
}

const appendIncomingMessage=(messageObject)=>{
    const messageBox=document.querySelector('.message-box')
    const message=document.createElement('div')
  

    if(messageObject.sender==='AI'){
        message.classList.add('bg-slate-950','p-2','max-w-56','text-white','rounded','mb-1')
        const markdown =messageObject.message
        message.innerHTML=`<small>${messageObject.sender}</small> <p className="bg-slate-950 text-stone-100" >${markdown}</p>`

    }else{
          message.classList.add('bg-red-50','p-2','max-w-56','text-black','rounded','mb-1')
        message.innerHTML=`<small>${messageObject.sender}</small> <p > ${messageObject.message} </p>`
    }

    

    messageBox.appendChild(message)
    

}

const appendOutgoingMessage=(messageObject)=>{
    const messageBox=document.querySelector('.message-box')
    const message=document.createElement('div')
    message.classList.add('bg-slate-500','p-2','ml-auto','max-w-56','text-black','rounded','mb-1')
    message.innerHTML=`<p>${messageObject.sender} </p> <p >  ${messageObject.message}</p>`
    messageBox.appendChild(message)
   

}

function scrollToBottom(){
   if(messageBox.current)
             messageBox.current.scrollTop=messageBox.current.scrollHeight
}



  return (
    <main>

{
  !isSidePanelOpen && !addUserOpen && (
       
    <div className="flex h-screen relative align-center  justify-center">
            {/* Chat Section */}
           
            <div className=" bg-gray-800 w-72 relative text-white h-screen left-0 p-4">
            <div className="header mb-4 flex flex-grow  justify-between  items-center top-0">
                <button 
                onClick={()=>{setAddUserOpen(true)}}
                className="headerleft flex hover:text-slate-400 cursor-pointer">
                <i className="ri-user-add-fill"></i>
                <h5 className="text-pretty font-normal">Add Colaborator</h5>

                </button>

                <button 
                onClick={()=>{setIsSidePanelOpen(true)}}
                className="headerright hover:bg-gray-500  text-black bg-white p-2 rounded-full cursor-pointer">
                <i className="ri-group-3-fill"></i>
                </button>

                
                </div>

              

                <div className="flex flex-col justify-end pt-6 h-fit">

                    <div className="flex flex-col flex-grow min-h-96 w-full ">
                        {/* Chat messages will go here */}
               

                        <div 
                        ref={messageBox}
                       
                          className="message-box flex-grow overflow-y-auto max-h-96 pb-10 z-0 scrollbar-hide">
                            
                            
                        </div>


                    </div>
                    <div className="w-fit bg-gray-800 flex items-center m-1 pt-2 absolute bottom-1  left-1 ">
                        <input
                          value={message}
                       onChange={(e)=>{setMessage(e.target.value)}}
                            type="text"
                            placeholder="Type a message..."
                            className="w-full p-2 mr-2 rounded bg-gray-700 text-white"
                        />
                       <button 
                     
                       onClick={sendMessage}
                       className="send bg-gray-700 p-2 pr-6 pl-4 text-xl rounded-md text-stone-200"> <i className="ri-send-plane-2-fill"></i></button>
                    </div>

                </div>
            </div>

           

          {  /* Main Content Section */}
            <div className="w-3/4 bg-gray-100 absoulute  p-4">
                <h1 className="text-2xl font-bold mb-4">{project.name}</h1>
                {/* Main content will go here */} 
                <p>Project details and other content...</p>
            </div>
            
 
           </div>
        
        )}

           {
 ( isSidePanelOpen ||addUserOpen) && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    <div className="bar bg-white  rounded-lg p-6 w-1/3">
            <div className=" ">
                {

              addUserOpen?
                <h2 className="text-lg font-semibold mb-4">Select Multiple</h2>
                :

                <h2 className="text-lg font-semibold mb-4">Your Project Collabroter</h2>
                    }  
                    <div className="flex justify-end">
                        <button
                            type="button"
                          onClick={()=>
                            
                            addUserOpen?setAddUserOpen(false): setIsSidePanelOpen(false)}
                            className="mr-2 px-2 py-1 bg-gray-300 top-0 rounded-md"
                        >
                           <i class="ri-close-large-line"></i>
                        </button>
                        
                    </div>
             
            </div>

           <div className="userlist bg-slate-200 h-40 p-2 border-slate-700 rounded-md overflow-y-scroll ">
           {(addUserOpen===true)?(
                    frnds.map((frnd,id)=>

         ( <div key={id} className="user bg-slate-50 p-1 m-1  ">{frnd.email}
          <input
          type='checkbox'
         
          value={frnd._id}
          onChange={checkhandler}
          
            
            /> </div>)
        )
            
            )
           : 

           ( 
                frnds.map((frnd,id)=>

                    ( <div key={id} className="user bg-slate-50 p-1 m-1">{frnd.email}</div>)
                   )

            )

        }
           
           </div>

           {
            addUserOpen && (
                <button
                onClick={addUser}
                className="bg-slate-400 p-2 rounded-md text-white"> Add</button>
            )
           }

        

            </div>
        </div>)
}

      
    </main>
  )
}

export default Project