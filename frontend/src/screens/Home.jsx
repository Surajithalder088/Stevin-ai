import React ,{useContext,useState,useEffect}from 'react'
import {UserContext} from '../context/user.context.jsx'
import axios from '../config/axios.js'
import {useNavigate} from 'react-router-dom'
import {TypeAnimation} from 'react-type-animation'


const Home = () => {

  const {user}=useContext(UserContext)
  const[loading,setLoading]=useState(false)
  const [isModalOpen,setIsModalOpen]=useState(false)
  const [name, setName] = useState('')
  const[projects,setProjects]=useState([])


  const navigate=useNavigate()

 const createProject=async(e)=>{
  e.preventDefault()
    
      setLoading(true)
     await axios.post('/api/projects/create', {name},{withCredentials:true}
    ).then((res) => {

    console.log(res.data)
  setIsModalOpen(false)
  setLoading(false)
    setName('')

    })
    .catch((err) =>{console.log(err)
  console.log(" wrong here");
  setLoading(false)}
  
  )

  
}

const deleteHandler=(id)=>{
  setLoading(true)
  axios.delete(`/api/projects/delete-project/${id}`).then((res) => {
    console.log(res.data);
   alert("group deleted")
    setLoading(false)
  }).catch((err) => {
    console.log(err);
    setLoading(false)
  }) 
}

const fetchingProjectList=async()=>{
 await axios.get('/api/projects/all').then((res) => {
    console.log(res.data);
    setProjects(res.data.projects);
    
    
  }).catch((err) => {
    console.log(err);
  })
}

useEffect(() => {
 fetchingProjectList()
  
}, [isModalOpen,loading])



  return (
   <>
   <main
   className='p-4 bg-slate-300 h-screen flex flex-col'
   
   >
    <div className="project flex items-center gap-48">
      <button
      onClick={()=>setIsModalOpen(true)}
      className="project p-4 border border-red-400 rounded-md bg-slate-400"
      >{"Create A New Group"}
      <i className="ri-file-add-line"></i>
      </button>
      {loading?
        (<div className='bg-neutral-800 p-5 rounded-lg w-[50%] flex justify-center text-white font-bold'>
          Wait...    Processing...</div>):""
      }
       
    </div>

   

 <div className="projectheading font-semibold mt-3 ml-20 p-4 bg-slate-300 rounded-md w-fit">All Your Groups here :</div>

 {  projects.length===0 ? <div className="project mt-20 flex justify-center font-bold from-neutral-400 w-44">No Groups Yet</div>: 
      <div className="projects ml-10 mt-5 flex flex-row flex-wrap">
       
        {projects.map((project) => (
          <div key={project._id}
          
          className="project p-4  hover:bg-slate-200 cursor-pointer border m-2 w-44 border-red-400 rounded-md bg-slate-400">
           <div onClick={()=>navigate('/project',{
            state:{project}
          })}>
            <h2 className="text-lg font-semibold">{project.name}</h2>
            <div className="flex gap-2">
             <p className='font-thin'> <i className="ri-group-fill"></i> Collaborators:</p>
              {project.users.length}
            </div></div>
            <button onClick={()=>deleteHandler(project._id)}
              className='bg-slate-800 w-30 h-5 flex items-center m-2 p-3 rounded-lg text-slate-50'
              >delete</button>
          
          </div>
        ))}
      </div> }


{
  isModalOpen && (<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-6 w-1/3">
                <h2 className="text-lg font-semibold mb-4">Create a New Project</h2>
                <form onSubmit={createProject}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700" htmlFor="projectName">
                            Project Name
                        </label>
                        <input
                            type="text"
                            id="projectName"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                            required
                        />
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="button"
                          onClick={()=>setIsModalOpen(false)}
                            className="mr-2 px-4 py-2 bg-gray-300 rounded-md"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded-md"
                        >
                            Create
                        </button>
                    </div>
                </form>
            </div>
        </div>)
}

<div className="bubble flex bg-white p-5 w-fit rounded-lg fixed mt-[80vh]">
<img className='w-10 h-10' src='/robot-svgrepo-com.png'/> <img className='w-10 h-10' src='/bubble-message-hi-svgrepo-com.png'/> 
            <TypeAnimation 
            sequence={['Create new group and add collaborator', 1000, 'Ask ai to to generate code', 1000]}
            wrapper='span'
            speed={35}
            deletionSpeed={85}
            style={{fontSize: '25px',fontFamily:'cursive'}}
            repeat={Infinity}
            />
            
        </div>
    

   </main>
   </>
  )
}

export default Home