import React from 'react'
import { useNavigate } from 'react-router-dom'
const LandingPage = () => {
    const navigate=useNavigate()
  return (

    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
            <header className="text-center mb-8 animate-fade-in-down">
                <h1 className="text-4xl font-bold mb-4">Welcome to Our App</h1>
                <p className="text-lg">A platform to manage your projects and collaborate with your team efficiently.</p>
            </header>
            <main className="flex-grow flex flex-col items-center justify-center">
                <div className="text-center mb-8 animate-fade-in-left">
                    <h2 className="text-2xl font-semibold mb-2">Why Choose Us?</h2>
                    <p className="text-md">Our app provides seamless project management and collaboration tools to boost your productivity.</p>
                </div>
                <div className="text-center mb-8 animate-fade-in-right">
                    <h2 className="text-2xl font-semibold mb-2">Features</h2>
                    <ul className="list-disc list-inside">
                        <li>Real-time collaboration</li>
                        <li>Task management</li>
                        <li>Project tracking</li>
                        <li>Team communication</li>
                    </ul>
                </div>
            </main>
            <footer className="w-full flex justify-center p-4 animate-fade-in-up">
                <button
                    onClick={() => navigate('/login')}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Login
                </button>
            </footer>
        </div>
</>
  )
}

export default LandingPage