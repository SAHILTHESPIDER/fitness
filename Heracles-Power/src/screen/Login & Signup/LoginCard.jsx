import React from 'react'
import { Link } from 'react-router-dom'
import { FaGoogle, FaInstagram, FaLinkedin } from "react-icons/fa";

export const LoginCard = () => {
 

  return (<>
  <div className='w-screen h-screen flex md:justify-end justify-center items-center   '>
    <div className=' bg-white bg-opacity-80  md:mx-20 py-7 flex flex-col gap-2 px-7  rounded-2xl '>
      <div className='w-full flex justify-center items-center'>
        <h1 className='text-5xl py-3'>Login</h1>
      </div>
        <h1 className='text-lg font-medium'> Enter your Email</h1>
        <input className='rounded-md px-3 py-1 w-60 bg-none outline-1'  type="email" placeholder='email'/>
        <h1 className='text-lg font-medium'>Enter you Password</h1>
        <input className='rounded-md px-3 py-1 w-60'  type="password" placeholder='Password'/>
        <span className='text-xs text-blue-600'><Link> Forgot Password</Link></span>
        <button className='bg-orange-600 rounded-md text-white block w-full py-1 shadow-sm shadow-orange-400' >
  Login
</button>
        <p>Don't have an account?<Link to="/signup" className='text-blue-600'> Signup</Link></p>
       
    </div>
  </div>
  </>
  )
}
