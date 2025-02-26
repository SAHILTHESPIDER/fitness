import React from 'react'
import reviewer1 from "../assets/reviewer-1.jpg"
import reviewer2 from "../assets/reviewer-2.jpg"
import reviewer3 from "../assets/reviewer-3.jpg"
import reviewer4 from "../assets/reviewer-4.jpg"
import TestimonialCard from './TestimonialCard'
import trainer1 from "../assets/trainer1.jpg";
import trainer2 from "../assets/trainer2.jpg";
import trainer3 from "../assets/trainer3.jpg";



export const Reviews = () => {

  const testimonials = [
    {
      Name: "Abhishek",
      Ratings: "******",
      Feedback: "Lorem ipsum dolor sit amet consectetur adipisicing elit. At, magni.",
      img: "https://randomuser.me/api/portraits/men/1.jpg"
    },
    {
      Name: "Sundaram",
      Ratings: "******",
      Feedback: "Lorem ipsum dolor sit amet consectetur adipisicing elit. At, magni.",
      img: "https://randomuser.me/api/portraits/men/2.jpg"
    },
    {
      Name: "Akash",
      Ratings: "******",
      Feedback: "Lorem ipsum dolor sit amet consectetur adipisicing elit. At, magni.",
      img: "https://randomuser.me/api/portraits/men/3.jpg"
    },
    {
      Name: "Mansi",
      Ratings: "******",
      Feedback: "Lorem ipsum dolor sit amet consectetur adipisicing elit. At, magni.",
      img: "https://photoswalay.com/wp-content/uploads/2024/05/real-girl-photo-25.jpg"
    },
    {
      Name: "Sahil",
      Ratings: "******",
      Feedback: "Lorem ipsum dolor sit amet consectetur adipisicing elit. At, magni.",
      img: "https://randomuser.me/api/portraits/men/5.jpg"
    }
  ];
  

  return (<>
  
     {/* main div  */}
     <div className=" w-screen my-11 px-4">
     {/* containing 2 div 1st is Join Today title div and 2nd div is Add Rewview button  */}
     <div className="flex justify-between md:px-10">
       <div className="title">
         <h6>Reviews </h6>
         <h1 className="md:text-4xl text-2xl font-bold">FROM YOU </h1>
       </div>
       {/* Review button  */}
       <div>            
        <button className='px-3 py-2 bg-custom-black text-white rounded-xl'> +Give Reviews</button>
       </div>
     </div>
    {/* agian creating 2 div 1st one for Client image and 2nd div for the review card  */}
    <div className='flex my-6 '>
      {/* 1st div which is storing client image  */}
      <div className='md:w-1/3 md:flex gap-x-6 gap-y-2 pl-7 md:flex-wrap  hidden  '>
      <img className='w-28 h-28 rounded-full object-cover' src={reviewer1} alt="Reviewer-1" />
      <img className='w-20 h-20 rounded-full object-cover' src={reviewer2} alt="Reviewer-2" />
      <img className='w-32 h-32 rounded-full object-cover' src={reviewer3} alt="Reviewer-3" />
      <img className='w-28 h-28  rounded-full object-cover' src={reviewer4} alt="Reviewer-4" />
      
      </div>
      {/* 2nd div which is storing review card */}
      <div className='md:w-3/4 w-full md:p-5 '>
         <TestimonialCard testimonials={testimonials} />
        
      </div>
    </div>
   </div>
   </>
  )
}
