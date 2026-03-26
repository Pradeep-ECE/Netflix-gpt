import React from 'react'
import Header from './Header'
import { useState } from 'react'

const Login = () => {
    const [isSignIn, setIsSignIn] = useState(true)
    const handleSignIn = () => {
        setIsSignIn(!isSignIn)
    }
  return (
    <div>
        <Header />
        <div className='absolute'>
            <img src='https://assets.nflxext.com/ffe/siteui/vlv3/8cc08720-ac1c-4364-bcbd-9495bf0308cd/web/IN-en-20260323-TRIFECTA-perspective_0b8c8e4e-71ee-48bd-8e16-da74f083a838_small.jpg'
        alt='Hero Image'/>
        </div>
        <form className='bg-black/80 w-3/12 absolute p-12  my-36 mx-auto left-0 right-0 text-white rounded-lg'>
        <h1 className='text-3xl font-bold py-4'>{isSignIn ? 'Sign In' : 'Sign Up'}</h1>
            {!isSignIn && <input type='text' placeholder='Full Name' className='p-2 my-2 w-full bg-gray-700'/>}
            <input type='text' placeholder='Email or phone number' className='p-2 my-2 w-full bg-gray-700'/>
            <input type='password' placeholder='Password' className='p-2 my-2 w-full bg-gray-700'/>
            <button className='p-4 my-6 bg-red-700 w-full cursor-pointer'>{isSignIn ? 'Sign In' : 'Sign Up'}</button>
            {
                isSignIn ? 
                <p>New to Netflix? <span className='text-blue-600 cursor-pointer' onClick={handleSignIn}>Sign Up now.</span></p> : 
                <p>Already have an account? <span className='text-blue-600 cursor-pointer' onClick={handleSignIn}>Sign In now.</span></p>
            }
        </form>
    </div>
  )
}

export default Login