import React from 'react'
import Header from './Header'
import { useState, useRef } from 'react'
import { validateSignInData } from '../utils/validator.js'
import { auth } from '../utils/firebase.js'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logInUser } from '../utils/userSlice.js'


const Login = () => {
  const dispatch = useDispatch()
  const [isSignIn, setIsSignIn] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')
  const navigate = useNavigate()
  const handleSignInOrSignUp = () => {
    setIsSignIn(!isSignIn)
  }
  const email = useRef()
  const password = useRef()
  const displayName = useRef()
  const handleSignIn = () => {
    console.log("email===", email.current.value);
    const emailValue = email.current.value;
    const passwordValue = password.current.value;
    // Validate the input data
    const validationResult = validateSignInData({ email: emailValue, password: passwordValue });
    if (!validationResult?.valid) {
      setErrorMessage(validationResult?.message);
    }
    if (validationResult?.valid) {
      setErrorMessage('');
      if (!isSignIn) {
        const displayNameValue = displayName?.current?.value;
        console.log("!isSignIn", !isSignIn);
        createUserWithEmailAndPassword(auth, emailValue, passwordValue)
          .then((userCredential) => {
            // Signed up 
            const user = userCredential.user;
            console.log("user===", user);
            updateProfile(user, {
              displayName: displayNameValue, photoURL: "https://example.com/jane-q-user/profile.jpg"
            }).then(() => {
              const { uid, email, displayName, photoURL } = auth.currentUser;
              dispatch(logInUser({ uid, email, displayName, photoURL }))
              navigate('/browse');
            }).catch((error) => {
              setErrorMessage(error.message);
            });
            
            // ... 
          })
          .catch((error) => {
            const errorCode = error?.code;
            const errorMessage = error?.message;
            console.log("error====",error);
            
            // ..
          });
      }
      if (isSignIn) {
        console.log("isSignIn", isSignIn);
        signInWithEmailAndPassword(auth, emailValue, passwordValue)
          .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            // ...
            navigate('/browse');
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
          });
      }
    }

    console.log("validationResult===", errorMessage, validationResult);

  }
  return (
    <div>
      <Header />
      <div className='absolute'>
        <img src='https://assets.nflxext.com/ffe/siteui/vlv3/8cc08720-ac1c-4364-bcbd-9495bf0308cd/web/IN-en-20260323-TRIFECTA-perspective_0b8c8e4e-71ee-48bd-8e16-da74f083a838_small.jpg'
          alt='Hero Image' />
      </div>
      <form className='bg-black/80 w-3/12 absolute p-12  my-36 mx-auto left-0 right-0 text-white rounded-lg' onSubmit={(e) => e.preventDefault()}>
        <h1 className='text-3xl font-bold py-4'>{isSignIn ? 'Sign In' : 'Sign Up'}</h1>
        {!isSignIn && <input ref={displayName} type='text' placeholder='Full Name' className='p-2 my-2 w-full bg-gray-700' />}
        <input ref={email} type='text' placeholder='Email or phone number' className='p-2 my-2 w-full bg-gray-700' />
        <input ref={password} type='password' placeholder='Password' className='p-2 my-2 w-full bg-gray-700' />
        {errorMessage && <p className='text-red-500 font-bold'>{errorMessage}</p>}
        <button className='p-4 my-6 bg-red-700 w-full cursor-pointer' onClick={handleSignIn}>{isSignIn ? 'Sign In' : 'Sign Up'}</button>
        {
          isSignIn ?
            <p>New to Netflix? <span className='text-blue-600 cursor-pointer' onClick={handleSignInOrSignUp}>Sign Up now.</span></p> :
            <p> Already have an account? <span className='text-blue-600 cursor-pointer' onClick={handleSignInOrSignUp}>Sign In now.</span></p>
        }
      </form>
    </div>
  )
}

export default Login