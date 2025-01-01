import React,{useEffect, useState,useContext} from 'react'
import { useLocation } from 'react-router-dom';
import axios from '../config/axios.js'
import { initializeSocket,recievemessage,sendmessage } from '../config/socket.js';
import { UserContext } from "../context/user.context.jsx"
import Markdown from 'markdown-to-jsx'
import hljs from 'highlight.js'
import { useNavigate } from 'react-router-dom';
import { getWebContainer } from '../config/webContainer.js';

const Project = ({navigate}) => {
    const navigattion=useNavigate()

    const location=useLocation()
    console.log(location.state.project);
    const [messageList,setMessageList]=useState([{sender:"developer",text:"no message history"}])
    const [isChecked,setIsChecked]=useState(false)  // while selecting user to add as colebrator
    const [project,setProject]=useState(location.state.project)
    const [isSidePanelOpen,setIsSidePanelOpen]=useState(false)
    const[addUserOpen,setAddUserOpen]=useState(false)
    const[userArray,setUserArray]=useState([])  // selecting user are stord here to add as colebrator
    const [message,setMessage]=useState('')
    const [isAiResponding,setIsAiResponding]=useState(false)
    const [fileTree,setFileTree]=useState({
        'file.js': {
            file:{
            content: "  // Your application file code will be here !  // Ask Ai to Create server in express or React app" 
        }
            // "
        }

    })

    const [webContainer,setWebContainer]=useState(null)
    const [currentFile,setCurrentFile]=useState(null)
    const [frnds,setFrnds]=useState([])
    const [openFiles,setOpenFiles]=useState([])

    const messageBox=React.createRef()
    const [mountedFiletree,setMountedFiletree]=useState({
        'file.js': {
            file:{
            content: "  // Your application file code will be here !  // Ask Ai to Create server in express or React app" 
        }
            // "
        }
    })
    const [running,setRunning]=useState(true)  // to fetching saved messages

const {user}=useContext(UserContext)
    


    useEffect(() => {
           initializeSocket(project._id)
           if(!webContainer){
            getWebContainer().then(container =>{
                setWebContainer(container)
                console.log("container started you can run now ")
            })
           }
        
           recievemessage('project-message',(data)=>{
            if(data.message){
               
                console.log(JSON.parse(data.message));
                
            }
            
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


const sendMessage=async()=>{
    console.log(user);
    
    console.log(message);
    const isAi=message.toLowerCase().includes('ai')
    if(isAi){
         setIsAiResponding(true);
    }
   
    
    
    sendmessage('project-message',{
        message,
        sender:user.email

    })
    const messageObject={
        message,
        sender:user.email
    }
    const projectId=project._id
    appendOutgoingMessage(messageObject)
    const resp=await axios.post('/api/message/post-message',{
        sender:user.email,
        text:message,
        projectId
    })
    console.log(resp.data);
    
    setMessage(" ")
}



const appendIncomingMessage=async(messageObject)=>{
    const messageBox=document.querySelector('.message-box')
    const message=document.createElement('div')
  

    if(messageObject.sender==='AI'){
        setOpenFiles([])
        setCurrentFile(null)
       
        message.classList.add('bg-slate-950','p-2','max-w-56','text-white','rounded','mb-1')

        const markdown =messageObject.message
        const messageBody=JSON.parse(markdown)
            const files=messageBody.fileTree;
            if(files){
                   await webContainer?.mount(messageBody.fileTree)
    
       console.log(" web container mounted the files ,file ",files);

            }
    

         
         setMountedFiletree(messageBody.fileTree?messageBody.fileTree:fileTree)
        message.innerHTML=`<small>${messageObject.sender}</small> <p className="bg-slate-950 text-stone-100" >${messageBody.text}</p>`
       setFileTree(messageBody.fileTree?messageBody.fileTree:fileTree)
        setTimeout(() => {
            setIsAiResponding(false);
        }, 100);

        const resp=await axios.post('/api/message/post-message',{
            sender:"AI",
            text:messageBody.text,
            projectId:project._id
        })
        console.log(resp.data);

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

async function runCode (){
    try{
        console.log(mountedFiletree);
        
       await webContainer.mount(mountedFiletree?mountedFiletree:fileTree)
        console.log("file tree mounted to build");
        
        const buildprocess=await webContainer.spawn("npm",["install"])
        console.log("build success fully");
        

        buildprocess.outpout.pipeTo(new WritableStream({
            write(chunk){
                console.log(chunk)
            }

      }))
        
      const runprocess=await webContainer.spawn("npm",["start"])
      console.log(" server is live now !! ");
      
      runprocess.outpout.pipeTo(new WritableStream({
            write(chunk){
                console.log(chunk)
            }

      }))

    }catch(error){
        console.log(error)
    }

}

const handleContentChange = (e) => {
    
    setFileTree({
        ...fileTree,
        [currentFile]: {
            ...fileTree[currentFile],
            content: e.target.value
        }
    });
};


    
    const fetchingMessages=async()=>{
    const projectId=project._id
    
        try{
          
        console.log(projectId);
    
            const messages=await axios.get(`/api/message/get-messages/${projectId}`)
           console.log(messages.data);
           
            setMessageList(messages.data)
            console.log(messageList);

            const messageBox=document.querySelector('.message-box')
            messageList.forEach((item)=>{
              
         const message=document.createElement('div')

         if(item.sender==="AI"){
            message.classList.add('bg-slate-950','p-2','max-w-56','text-white','rounded','mb-1')

         }
         else if(item.sender===user.email){
             message.classList.add('bg-slate-500','p-2','ml-auto','max-w-56','text-black','rounded','mb-1')
         }
         else{
            message.classList.add('bg-red-50','p-2','max-w-56','text-black','rounded','mb-1')
         }

   
    message.innerHTML=`<p>${item.sender} </p> <p > ${item.text}</p>`


    messageBox.appendChild(message) 

 })
    
        }catch(err){
            console.log(err);
            
        }
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
                onClick={fetchingMessages}
                className="headerleft flex hover:text-slate-400 cursor-pointer">
                <i className="ri-history-line"></i>
                </button>

                <button 
                onClick={()=>{setAddUserOpen(true)}}
                className="headerleft flex hover:text-slate-400 cursor-pointer">
                <i className="ri-user-add-fill"></i>
               

                </button>
                <button
                onClick={()=>{navigattion('/home')}}
                 className="headerleft flex hover:text-slate-400 cursor-pointer"
                >
                <i className="ri-home-9-fill"></i>
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
          


            <section className="right flex bg-red-100 flex-grow h-full ">
    <div className="explore overflow-y-auto h-full bg-slate-400 max-w-28 min-w-20">
        <div className="file-tree flex flex-col bg-stone-400">
            {
                Object.keys(fileTree).map((file,id)=>(

                    <button 
                    onClick={()=>{setCurrentFile(file) 
                        setOpenFiles([...new Set([...openFiles,file])])
                    }
                    }
                    className="tree-object overflow-x-auto hover:bg-slate-50 cursor-pointer p-2">
                <p className=' font-semibold w-full text-lg'>{file}</p>
            </button>
                ))
            }
            
            
        </div>
    </div>

    
        {
            currentFile && (<>
                <div className="code-editor flex flex-col w-fit  flex-grow">
                    
                    <div className="top max-w-2xl overflow-x-auto flex bg-slate-600 ">
                    {
                            openFiles.map((file,index)=>(

                                <div className="flex justify-between bg-gray-300  w-fit gap-1 p-1">
                              <button 
                              onClick={()=>setCurrentFile(file)}
                              className='text-stone-950'>  {file}
                              </button>
                              <button 
                              onClick={()=>{
                                const updatedFiles=openFiles.filter((f)=>f!==file)
                                setOpenFiles(updatedFiles)
                                setCurrentFile(updatedFiles.length > 0 ? updatedFiles[updatedFiles.length - 1] : null)
                              }}
                              >
                              <i className="ri-close-line"></i>
                              </button>
                              
                              </div>
                              
                            ))
                        }

                    </div>



                    <div className="bottom flex h-full">
                        {
                            fileTree[currentFile] &&(
                                <div className="editor h-full flex  max-w-2xl flex-grow bg-slate-800 text-white p-4">
                              <textarea 
                              className="w-full h-full bg-slate-800 p-1 text-xs text-white"
                              value={fileTree[currentFile].file.content}
                              onChange={handleContentChange}
                              />
                              
                              </div>
                            )
                        }
                    </div>
                     </div>

                     <div className="code-runner flex flex-col min-w-20 max-w-36 bg-amber-300">
                        <div className="heading">
                        <button  
                        onClick={()=>{setRunning(true)}}
                        className='bg-slate-400 p-2 rounded-md text-white'
                        >Run</button></div>
                        <h4>your application will run here</h4>


                     </div>
                     </>

            )
        }
        {
             isAiResponding && (
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-4 rounded shadow-lg">
                        AI is responding...
                    </div>
                </div>
            )
        }


   

            </section>
           
            
 
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
                    frnds.map((frnd,_id)=>

         ( <div key={_id} className="user bg-slate-50 p-1 m-1  ">{frnd.email}
          <input
          type='checkbox'
         
          value={frnd._id}
          onChange={checkhandler}
          
            
            /> </div>)
        )
            
            )
           : 

           ( 
                frnds.map((frnd,_id)=>

                    ( <div key={_id} className="user bg-slate-50 p-1 m-1">{frnd.email}</div>)
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