import React, { useState } from 'react';

export default function Paymentt() {
  const [Paymentmethod, SetPaymentmethod] = useState('');
  const [Cardnumber, SetCardnumber] = useState('');
  const [Expirymonth, SetExpirymonth] = useState('');
  const [Expiryyear, SetExpiryyear] = useState('');
  const [CVV, SetCVV] = useState('');

  const handlesubmit = (e) => {
    e.preventDefault();
    console.log({
      Paymentmethod,
      Cardnumber,
      Expirymonth,
      Expiryyear,
      CVV,
    });
    alert('The payment is successful');
  };

  return (
    <div className='flex min-h-screen bg-gray-100 px-4'>
      {/* LEFT: Payment Form */}
      <div className='w-1/2 flex items-center justify-center'>
        <form onSubmit={handlesubmit} className='bg-white shadow-lg rounded-lg p-8 w-full max-w-md space-y-6'>
          <h1 className='text-2xl font-bold text-center'>Payment Information</h1>

          <div className='flex justify-center space-x-4'>
            <img className='w-12 h-12' src="https://m.economictimes.com/thumb/msid-74960608,width-1200,height-900,resizemode-4,imgsize-49172/upi-twitter.jpg" alt="UPI" />
            <img className='w-12 h-8' src="https://d28wu8o6itv89t.cloudfront.net/images/Visadebitcardpng-1599584312349.png" alt="Visa" />
            <img className='w-12 h-8' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRa60j2xBlCDXo_TL5OCCdZYeD6QJyJnW1Btw&s" alt="Mastercard" />
          </div>

          <div className='space-y-2'>
            <label className='font-medium'>Payment Method</label>
            <div className='flex space-x-4'>
              <label className='flex items-center space-x-2'>
                <input type='radio' value='card' checked={Paymentmethod === 'card'} onChange={(e) => SetPaymentmethod(e.target.value)} />
                <span>Debit/Credit</span>
              </label>
              <label className='flex items-center space-x-2'>
                <input type='radio' value='UPI' checked={Paymentmethod === 'UPI'} onChange={(e) => SetPaymentmethod(e.target.value)} />
                <span>UPI</span>
              </label>
            </div>
          </div>

          <div className='space-y-2'>
            <label className='font-medium'>Card Number</label>
            <input
              type='text'
              value={Cardnumber}
              onChange={(e) => SetCardnumber(e.target.value)}
              placeholder='Enter your card number'
              className='w-full p-2 border border-gray-300 rounded'
              maxLength={16}
            />
          </div>

          <div className='flex space-x-4'>
            <div className='flex-1'>
              <label className='font-medium block mb-1'>Expiry Month</label>
              <select
                value={Expirymonth}
                onChange={(e) => SetExpirymonth(e.target.value)}
                className='w-full p-2 border border-gray-300 rounded'
              >
                <option value=''>MM</option>
                {[
                  "January", "February", "March", "April", "May", "June",
                  "July", "August", "September", "October", "November", "December"
                ].map((month, index) => (
                  <option key={index} value={month}>
                    {month}
                  </option>
                ))}
              </select>
            </div>
            <div className='flex-1'>
              <label className='font-medium block mb-1'>Expiry Year</label>
              <input
                type='text'
                value={Expiryyear}
                onChange={(e) => SetExpiryyear(e.target.value)}
                placeholder='YYYY'
                maxLength={4}
                className='w-full p-2 border border-gray-300 rounded'
              />
            </div>
          </div>

          <div className='space-y-2'>
            <label className='font-medium'>CVV</label>
            <input
              type='password'
              value={CVV}
              onChange={(e) => SetCVV(e.target.value)}
              placeholder='CVV'
              maxLength={3}
              className='w-24 p-2 border border-gray-300 rounded'
            />
          </div>

          <button
            type='submit'
            className='w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded transition duration-300'
          >
            Submit Payment
          </button>
        </form>
      </div>

      {/* RIGHT: Payment Summary */}
      <div className='w-1/2 flex  justify-center'>
        <div className='bg-white shadow-lg rounded-lg p-8 w-full max-w-md'>
          <h2 className='text-xl font-semibold mb-4'>Payment Summary</h2>
          {/* Replace the below dummy content with actual summary info */}
          <div className='space-y-2'>
            <p><strong>Item:</strong> Premium Subscription</p>
            <p><strong>Amount:</strong> ₹499</p>
            <p><strong>Tax:</strong> ₹50</p>
            <p className='border-t pt-2'><strong>Total:</strong> ₹549</p>
          </div>
        </div>
      </div>
    </div>
  );
}
