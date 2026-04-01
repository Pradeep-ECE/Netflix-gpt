import React from 'react'
import { signOut } from "firebase/auth";
import { auth } from '../utils/firebase.js'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';

const Header = () => {
  const user = useSelector((state) => state?.user?.user);
  console.log("user in header===", user);
  const navigate = useNavigate();
  const handleSignOut = () => {
    signOut(auth).then(() => {
      // Sign-out successful.
      navigate('/');
    }).catch((error) => {
      // An error happened.
      navigate('/error');
    });
  };

  return (
    <div className='absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between'>
      <img className='w-44'
        src='https://help.nflxext.com/helpcenter/OneTrust/oneTrust_production_2026-03-25/consent/87b6a5c0-0104-4e96-a291-092c11350111/019ae4b5-d8fb-7693-90ba-7a61d24a8837/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png'
        alt='Netflix Logo' />
      { user && (
        <div className='flex items-center gap-4 absolute right-8 top-2'>
          <img
            className='w-12 h-12 p-2'
            alt='User icon'
            src={user?.photoURL ? user?.photoURL : 'https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png'} />
          <button className='bg-red-600 px-4 py-1 rounded cursor-pointer text-white hover:bg-red-700' onClick={handleSignOut}>Sign Out</button>
        </div>
      )}
    </div>
  )
}

export default Header