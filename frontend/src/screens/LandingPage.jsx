import React from 'react'
import { useNavigate } from 'react-router-dom'
const LandingPage = () => {
    const navigate=useNavigate()
  return (

    <>
      <div className="flex flex-col items-center justify-center h-100% min-h-screen bg-slate-100 text-black">
            <header className="text-center flex flex-col mb-8 animate-fade-in-down">
            <div className="flex justify-end p-4 w-full">
                    <button 
                        onClick={() => navigate('/login')}
                        className="rounded-full text-xl hover:cursor-pointer flex items-center text-white bg-sky-700 hover:bg-black p-2 px-4 font-bold shadow-lg transition-transform transform hover:scale-105 hover:shadow-lg"
                    >
                        Login
                    </button>
                    </div>

                <div className="heading  text-4xl bg-rounded mr-52 flex flex-col align-center justify-center  p-1 w-full font-bold mb-4">
                <button className="icons rounded-full text-4xl hover:cursor-pointer flex flex-row align-center text-black justify-center  p-4 w-full bg-sky-700  
                 hover:text-white font-bold mb-4flex flex-row shadow-lg transition-transform transform hover:scale-105 hover:shadow-lg
                 align-center justify-center m-10 p-4 w--32  hover:bg-black text-black font-bold mb-4">
                <img className='h-9 w-9' src='\public\safe-and-stable-svgrepo-com (1).svg'></img>
                    <h1 className="">
                Stevin AI</h1>
                </button>
                
                 <p className="text-lg">A platform to manage your projects with Ai software developer .</p>
                </div>

               
            </header>
            <main className="flex-grow flex flex-col items-center justify-center">
                <div className="text-center mb-8 animate-fade-in-left">
                    <h2 className="text-2xl font-semibold mb-2">Applicaton Features</h2>
                    <div className="text border-2 border-black bg-black text-white p-4 rounded-lg ml-60 mr-40">
                    <p className="text-md">Our app provides seamless project management and collaboration with other user,
                         and Our Ai developer will always guide you to build your application</p>
                         </div>
                </div>
                <div className="text-center flex align-center justify-ceneter mb-8 animate-fade-in-right">
                    <h2 className="text-2xl flex font-semibold mb-2"><img className='h-9 w-9' src='\public\arrow-right-circle-svgrepo-com.svg'></img></h2>
                    <ul className="list-disc flex text-center style list-inside">
                        <li className='border-2 border-black hover:bg-black hover:text-white hover:border-blue-900 rounded-lg m-2 p-1'>Ai model will design and write code  </li>
                        <li className='border-2 border-black hover:bg-black hover:text-white hover:border-blue-900  rounded-lg m-2 p-1'>Collaborate with team memeber</li>
                        <li className='border-2 border-black hover:bg-black hover:text-white hover:border-blue-900  rounded-lg m-2 p-1'>project data are stored</li>
                        <li className='border-2 border-black hover:bg-black hover:text-white hover:border-blue-900  rounded-lg m-2 p-1'>Team communication</li>
                    </ul>
                </div>
            </main>
            <footer className="w-full flex align-center bg-slate-500 justify-between p-4 animate-fade-in-up">
               <div> developed by surajit</div>
               <div> Ai access Gemini ai</div>
            </footer>
        </div>
</>
  )
}

export default LandingPage