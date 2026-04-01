import React, { useEffect } from 'react'
import Login from './Login'
import Browse from './Browse'
import { createBrowserRouter, Router, RouterProvider } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../utils/firebase.js'
import { logInUser, logOutUser } from '../utils/userSlice.js'
import { useDispatch } from 'react-redux'

const Body = () => {
    const dispatch=useDispatch()
    const appRouter=createBrowserRouter([
    {
        path:'/',
        element:<Login />
    },
    {
        path:'/browse',
        element:<Browse />
    }
])

useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/auth.user
    const {uid,email,displayName,photoURL} = auth;
    console.log("userrrrrrrr", user);
    dispatch(logInUser({uid,email,displayName,photoURL}))
    
    // ...
  } 
  else {
    // User is signed out
    // ...
    dispatch(logOutUser())
  }
});
},[])
  return (
    <div>
        <RouterProvider router={appRouter} />
    </div>
  )
}

export default Body