import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';

export const SignupCard = () => {
  const notify = () => toast("Wow so easy!");

 


  return (
    <> 
    <div className='w-screen h-screen flex justify-end items-center '>
    <div className=' bg-white bg-opacity-80  md:mx-20 pt-5 pb-3 flex flex-col gap-2 px-7  rounded-2xl '>
      <div className='w-full flex justify-center items-center'>
        <h1 className='text-5xl py-2'>Signup</h1>
      </div>
      <div className='flex gap-2'>
      <input type="text" placeholder='Name' className='rounded-md px-3 py-1 w-40'/>
      <input type="text" placeholder='Last name' className='rounded-md px-3 py-1 w-40' />
      </div>
        <h1 className='text-lg font-medium'> Enter your Email</h1>
        <input className='rounded-md px-3 py-1 w-60'  type="email" placeholder='email'/>
        <h1 className='text-lg font-medium'>Enter your Date of Birth and Gender</h1>
        <div className='flex gap-2'>
        <input className='rounded-md px-3 py-1 w-40'  type="Date" placeholder='Date of birth'/>
        <div className='flex flex-shrink flex-col md:flex-row'>
        <input className='rounded-md size-[1.2rem] text-[2%]  w-20'  type="radio" placeholder='Gender'/>Male
        <input className='rounded-md size-[1.2rem] text-[2%] px-3 py-1 w-20'  type="radio" placeholder='Gender'/>Male
        </div>
        
        </div>
      
        <h1 className='text-lg font-medium'> Enter your Number</h1>
        <input className='rounded-md px-3 py-1 w-60'  type="email" placeholder='Number'/>
        <h1 className='text-lg font-medium'>Enter you Password</h1>
        <input className='rounded-md px-3 py-1 w-60'  type="password" placeholder='Password'/>
        <h1 className='text-lg font-medium'>Confirm you Password</h1>
        <input className='rounded-md px-3 py-1 w-60'  type="password" placeholder='Password'/>
        <button className='bg-orange-600 rounded-md text-white block w-full py-1' onClick={notify}>Register
        <ToastContainer />
        </button>
        <p>Already have an account?<Link to="/login" className='text-blue-600'> Login</Link></p>
       
    </div>
  </div>
    </>
  )
}
