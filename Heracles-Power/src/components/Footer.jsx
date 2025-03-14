import React from 'react'
import { Link } from 'react-router-dom'

export const Footer = () => {
  return (
    <>
    <footer className="footer bottom-0 bg-base-200 text-base-content p-10 w-screen flex-col justify-evenly">
      <div className=' flex  justify-between w-full'>
      <nav className='md:mr-32' >
    <h6 className="footer-title text-xl">Services</h6>
    <div className='flex-col flex '>
    <a className="link link-hover">BMI Calculator</a>
    <Link to="/bmi" >BMI</Link>
    <a className="link link-hover">Diet plan</a>
    <a className="link link-hover">Expert</a>
    <a className="link link-hover">Workouts</a>
    </div>
    
  </nav>
  <nav className='md:mx-40'>
    <h6 className="footer-title text-xl">Company</h6>
    <div className='flex-col flex'>

    <a className="link link-hover">About us</a>
    <a className="link link-hover">Contact</a>
    <a className="link link-hover">Jobs</a>
    <a className="link link-hover">Press kit</a>
    </div>
  </nav>

      </div>
     
  
  
  <form>
    
    <fieldset className="form-control w-80">
      <label className="label">
        <span className="label-text">Enter your email address</span>
      </label>
      <div className="join">
        <input
          type="text"
          placeholder="username@site.com"
          className="input input-bordered join-item" />
        <button className="btn btn-primary join-item">Subscribe</button>
      </div>
    </fieldset>
  </form>
</footer>
    </>
  )
}
