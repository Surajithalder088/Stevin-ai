import React,{useEffect, useState} from 'react'
import { useLocation } from 'react-router-dom';
import axios from '../config/axios.js'

const Project = ({navigate}) => {

    const location=useLocation()
    console.log(location.state.project);
    const [isChecked,setIsChecked]=useState(false)  // while selecting user to add as colebrator
    const [project,setProject]=useState(location.state.project)
    const [isSidePanelOpen,setIsSidePanelOpen]=useState(false)
    const[addUserOpen,setAddUserOpen]=useState(false)
    const[userArray,setUserArray]=useState([])  // selecting user are stord here to add as colebrator

    const [frnds,setFrnds]=useState([])


    

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
             ;
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

  return (
    <main>

{
  !isSidePanelOpen && !addUserOpen && (
       
    <div className="flex h-screen relative align-center  justify-center">
            {/* Chat Section */}
           
            <div className=" bg-gray-800 w-72 text-white left-0 p-4">
            <div className="header mb-4 flex justify-between items-center">
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

              

                <div className="flex flex-col justify-end h-fit">

                    <div className="flex-grow min-h-96 overflow-y-auto">
                        {/* Chat messages will go here */}
               

                        <div className="mb-2 z-0">
                            <div className="bg-red-50 p-2 max-w-56 text-black rounded mb-1">User1: Hello!</div>
                            <div className=" ml-auto bg-slate-700 p-2 max-w-56 rounded mb-1">User2: Hi there!</div>
                            
                        </div>


                    </div>
                    <div className="w-fit  flex items-center m-1 fixed bottom-1  left-1 ">
                        <input
                            type="text"
                            placeholder="Type a message..."
                            className="w-full p-2 mr-2 rounded bg-gray-700 text-white"
                        />
                       <div className="send bg-gray-700 p-2 pr-6 pl-4 text-xl rounded-md text-stone-200"> <i className="ri-send-plane-2-fill"></i></div>
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