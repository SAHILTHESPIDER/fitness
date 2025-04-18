import React, { useEffect, useState } from 'react'
import { MdOutlineAccountBalanceWallet } from "react-icons/md";
export default function Pay() {
const[Activetab,SetActivetab]=useState('card');
const [amount, setAmount] = useState("0.00");

  useEffect(() => {
    const storedAmount = localStorage.getItem("selectedAmount");
    if (storedAmount) {
      setAmount(storedAmount);
    }
  }, []);

   return (
  <>
  <div className='flex min-h-screen'>
   {/* Left side */}
   <div className='w-1/4 flex items-start mt-[10%]  justify-center'>
   
     <div className='flex  flex-col space-y-3  '>
      <p onClick={()=>SetActivetab('card')} className='btn text-gray-600 hover:text-blue-600 cursor-pointer px-10 text-lg'>
         <img className='size-6 grayscale hover:grayscale-0 ' src="https://ico.simpleness.org/static/coolicons/credit-card-back-view.png" alt="" />
         <span>Credit/Debit Card</span> </p>
      <p onClick={()=>SetActivetab('netbanking')} className='btn text-gray-600 hover:text-blue-600 cursor-pointer px-10 text-lg'>
         <img className='size-6' src="https://cdn-icons-png.flaticon.com/512/2655/2655001.png" alt="" />
         <span>NetBanking</span> </p>
      <p onClick={()=>SetActivetab('Wallet')} className='btn text-gray-600 hover:text-blue-600 cursor-pointer px-10 text-lg'>
        <MdOutlineAccountBalanceWallet />
         <span>Mobile Wallet</span> </p>
      <p onClick={()=>SetActivetab('UPI')} className='btn text-gray-600 hover:text-blue-600 cursor-pointer px-32   text-center  text-lg'>
         <img src="https://static.thenounproject.com/png/6730166-200.png" className='size-6' alt="" />
         <span>UPI</span> </p>   

     </div>
      
   </div>
   <div className='w-1/2 flex items-Start mt-12 justify-center '>
      {Activetab==='card'&&(
         <div className=' flex flex-col mt-10 w-full h-2/3  max-w-full p-2 rounded-xl shadow-md border'>
           <div className='relative inline-block'>
           <h1 className='text-xl border-2 text-white px-4 py-4 rounded-r-md border-blue-400 bg-blue-400 w-[50%]'>Pay Credit/Debit Card</h1>
           <div className="absolute top-0 left-0 w-0 h-0 border-t-[32px] border-t-transparent border-b-[32px] border-b-transparent border-l-[20px] border-l-blue-500"></div>
           </div>
            <div className='flex flex-col items-start mt-5 '>
             <div className='flex flex-col w-[60%]  mx-3'>
            <h1 className='text-md font-semibold'>Enter you card number</h1>
             <input type="text" className='border input-bordered border-black rounded-lg p-1 ' />
             </div>
<div className='flex mt-3 space-x-4 mx-3 w-full'>
  {/* Card Name */}
  <div className='flex flex-col w-1/2'>
    <label className='text-md font-semibold mb-1'>Cardholder Name</label>
    <input
      type="text"
      className='border border-black rounded-lg p-2 w-full'
    />
  </div>
  {/* Expiry Date */}
  <div className='flex flex-col w-1/3'>
    <label className='text-md font-semibold mb-1'>Expiry Date</label>
    <div className='flex space-x-2'>
      <select className='border border-black rounded-lg p-2 '>
        <option>MM</option>
      </select>
      <select className='border border-black rounded-lg p-2 '>
        <option>YY</option>
      </select>
    </div>
  </div>
   <div className='flex flex-col w-1/3'>
      <h1 className=' text-md font-semibold mb-1'>CVV</h1>
      <input type="password" className='border border-black rounded-lg p-2 w-[30%]' maxLength={3} minLength={3} />
   </div>
</div>
<div className='flex space-x-3 w-full'>
<div className='mt-3  mx-2 w-1/2 '>
      <h1 className='font-medium'>Enter your Email[optional]</h1>
      <input type="text" className=' border border-black rounded-lg p-2 ' />
   </div>
   <div className='mt-3  ml-2 w-1/2'>
      <h1 className='font-medium'>Enter your Number[optional]</h1>
      <input type="text" className=' border border-black rounded-lg p-2 ' />
      
   </div>
</div>
<div className='mt-8 rounded-lg flex justify-end w-[80%]'>
  <button className='bg-blue-500 p-5 text-white px-20 py-2 rounded-md'>
    Submit
  </button>
</div>


            </div>
           
         </div>
      )}
         {Activetab==='netbanking'&&(
         <div className=' flex flex-col mt-10 w-full h-2/3  max-w-full p-2 rounded-xl shadow-md border'>
           <div className='relative inline-block'>
           <h1 className='text-xl border-2 text-white px-4 py-4 rounded-r-md border-blue-400 bg-blue-400 w-[50%]'>Pay NetBanking</h1>
           <div className="absolute top-0 left-0 w-0 h-0 border-t-[32px] border-t-transparent border-b-[32px] border-b-transparent border-l-[20px] border-l-blue-500"></div>
           </div>
           <div className='flex  mt-[5%] space-x-3'>
           <div className="flex flex-col items-center space-y-2">
  <div className="rounded-full overflow-hidden border-4 border-blue-500 cursor-pointer hover:shadow-lg transition duration-300">
    <img
      className="w-20 h-20 object-contain p-2"
      src="https://yt3.googleusercontent.com/dKfFHo3BoPAn53jsOzXCmAhxtiDf-N2au3txCOsXcquzwyLJKif2wjnj1NKSRcRETfvLerBT_g=s900-c-k-c0x00ffffff-no-rj"
      alt="SBI"
    />
  </div>
  <h1 className="text-center font-semibold text-sm">ICICI Bank</h1>
</div>
<div className="flex flex-col items-center space-y-2">
  <div className="rounded-full overflow-hidden border-4 border-blue-500 cursor-pointer hover:shadow-lg transition duration-300">
    <img
      className="w-20 h-20 object-contain p-2"
      src="https://etimg.etb2bimg.com/photo/117618701.cms"
      alt="SBI"
    />
  </div>
  <h1 className="text-center font-semibold text-sm">State Bank of India</h1>
</div>
<div className="flex flex-col items-center space-y-2">
  <div className="rounded-full overflow-hidden border-4 border-blue-500 cursor-pointer hover:shadow-lg transition duration-300">
    <img
      className="w-20 h-20 object-contain p-2"
      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCZJXH_1QP7Gfsf0v_FK6VFI5ty7PaDqC8Gg&s"
      alt="SBI"
    />
  </div>
  <h1 className="text-center font-semibold text-sm">AU BANK</h1>
</div>
<div className="flex flex-col items-center space-y-2">
  <div className="rounded-full overflow-hidden border-4 border-blue-500 cursor-pointer hover:shadow-lg transition duration-300">
    <img
      className="w-20 h-20 object-contain p-2"
      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8zAbKhIggRs8aVN2TWlP-nF38Jlm78p9KOA&s"
      alt="SBI"
    />
  </div>
  <h1 className="text-center font-semibold text-sm">IDFC BANK</h1>
</div>
        </div>
  <div className='mt-5 w-full'>
   <h1 className='text-md font-medium'>Select Other Bank </h1>
    <select name="" id="" className='px-4 text-md w-[50%] mt-4 rounded-lg ' >
    <option value="">State Bank of India</option>
    <option value="">Kotak Bank</option>
    </select>
   </div>      
<div className='mt-8 rounded-lg flex justify-end w-[80%]'>
  <button className='bg-blue-500 p-5 text-white px-20 py-2 rounded-md'>
    Submit
  </button>
</div>


            </div>
           
         
      )}
       {Activetab==='Wallet'&&(
         <div className=' flex flex-col mt-10 w-full h-2/3  max-w-full p-2 rounded-xl shadow-md border'>
           <div className='relative inline-block'>
           <h1 className='text-xl border-2 text-white px-4 py-4 rounded-r-md border-blue-400 bg-blue-400 w-[50%]'>Pay NetBanking</h1>
           <div className="absolute top-0 left-0 w-0 h-0 border-t-[32px] border-t-transparent border-b-[32px] border-b-transparent border-l-[20px] border-l-blue-500"></div>
           </div>
           <div className='flex  mt-[5%] space-x-3'>
           <div className="flex flex-col items-center space-y-2">
  <div className="rounded-full overflow-hidden border-4 border-blue-500 cursor-pointer hover:shadow-lg transition duration-300">
    <img
      className="w-20 h-20 object-contain p-2 "
      src="https://indiaforensic.com/certifications/wp-content/uploads/2018/03/airtelbank.jpg"
      alt="SBI"
    />
  </div>
  <h1 className="text-center font-semibold text-sm">Airtel Bank</h1>
</div>
<div className="flex flex-col items-center space-y-2">
  <div className="rounded-full overflow-hidden border-4 border-blue-500 cursor-pointer hover:shadow-lg transition duration-300">
    <img
      className="w-20 h-20 object-contain p-2"
      src="https://www.indifi.com/blog/wp-content/uploads/2020/02/How-Are-Payments-Managed-On-Amazon-.png"
      alt="SBI"
    />
  </div>
  <h1 className="text-center font-semibold text-sm">Amazon Pay</h1>
</div>
<div className="flex flex-col items-center space-y-2">
  <div className="rounded-full overflow-hidden border-4 border-blue-500 cursor-pointer hover:shadow-lg transition duration-300">
    <img
      className="w-20 h-20 object-contain p-2"
      src="https://www.phonepe.com/webstatic/9189/static/PhonePe_vertical-16158be8710408f3561e1d07d01d5d89.png"
      alt="SBI"
    />
  </div>
  <h1 className="text-center font-semibold text-sm">Phone Pe</h1>
</div>

        </div>
    
<div className='mt-8 rounded-lg flex  justify-end w-[80%]'>
  <button className='bg-blue-500 p-5 text-white px-20 py-2 rounded-md'>
    Submit
  </button>
</div>


            </div>
           
         
      )}
        {Activetab==='UPI'&&(
         <div className=' flex flex-col mt-10 w-full h-2/3  max-w-full p-2 rounded-xl shadow-md border'>
           <div className='relative inline-block'>
           <h1 className='text-xl border-2 text-white px-4 py-4 rounded-r-md border-blue-400 bg-blue-400 w-[50%]'>Pay NetBanking</h1>
           <div className="absolute top-0 left-0 w-0 h-0 border-t-[32px] border-t-transparent border-b-[32px] border-b-transparent border-l-[20px] border-l-blue-500"></div>
           </div>
           <div className='flex  mt-[5%] space-x-3'>
           <div className="flex flex-col items-center space-y-2">
  <div className="rounded-full overflow-hidden border-4 border-blue-500 cursor-pointer hover:shadow-lg transition duration-300">
    <img
      className="w-20 h-20 object-contain p-2 "
      src="https://static.toiimg.com/thumb/msid-120411106,width-400,resizemode-4/UPI.jpg"
      alt="SBI"
    />
  </div>
  <h1 className="text-center font-semibold text-sm">UPI</h1>
</div>



        </div>
    
<div className='mt-8 rounded-lg flex  justify-end w-[80%]'>
  <button className='bg-blue-500 p-5 text-white px-20 py-2 rounded-md'>
    Submit
  </button>
</div>


            </div>
           
         
      )}
   </div>
   <div className='w-1/4 flex flex-col mx-4 items-start h-fit mt-[6%] justify-start shadow-md rounded-md overflow-hidden'>
      <div className='bg-blue-600 text-white px-6 py-4 w-full'>
        <h2 className='text-lg font-semibold'>Amount</h2>
      </div>
      <div className='bg-blue-100 px-6 py-5 flex items-center justify-center w-full'>
        <span className='text-3xl font-extrabold text-blue-800'>${amount}.00</span>
      </div>
    </div>
  </div>
  </>
  )
}
