import React from 'react'

export default function About() {
  return (
    <>
    <div className='h-screen'>
      <div className='flex flex-col'>
        <div className='flex-grow  space-y-3 flex items-center justify-center mt-10 p-10 text-center'>
          <h1 className='text-3xl font-serif font-bold'>About Us</h1>
          </div>
          <div className='flex  flex-row items-center justify-center'>
          <hr  className='w-1/4  border-gray-900 my-6'/>
          <div className="mx-4 text-yellow-500 text-xl">★</div>
          <hr  className='w-1/4  border-gray-700 my-6'/>
        
          </div>
          
          <div className='flex-grow flex-col space-y-3 flex items-center justify-center mt-10 p-10 text-center'>
          <p>
            We are a team of passionate developers, designers, and creatives who have been working together . 
            Our mission is to create innovative and user-friendly 
            solutions for various industries.
          </p>
          </div>
          {/*  */}
         <div className=''>
          <div className='flex-grow flex-col space-y-3 flex items-center justify-center mt-10 p-10 text-center'>
            <h2>Our Team</h2>
            <div className='flex flex-row space-x-4'>
              <div className="rounded-full w-16 h-16 bg-gray-400"></div>
              <h1>SahilGupta</h1>
              <div className="rounded-full w-16 h-16 bg-gray-400"></div>
              </div>
          </div>
         </div>
        </div>

      </div>
  
    </>
  )
}
