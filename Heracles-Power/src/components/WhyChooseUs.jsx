import React from "react";
import { MdSportsGymnastics } from "react-icons/md";
import { RiMoneyRupeeCircleFill } from "react-icons/ri";
import { CgGym } from "react-icons/cg";
import { MdOutlineTimer } from "react-icons/md";
import diet from "../assets/diet.jpg";
import trademill from "../assets/trademill.jpeg";
import HealthyLife from "../assets/HealthyLife.jpg";

export const WhyChooseUs = () => {
  return (
    <>
      {/* main container div */}
      <div className="w-screen  mt-[4px] ">
        {/* upper container carrying title and description */}
        <div className="flex flex-col justify-center items-center py-6 gap-2 px-4 ">
          <h1 className="md:text-4xl text-2xl font-bold">Why choose Us</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi
            adipisci optio sed deserunt accusantium expedita perferendis quasi
            fuga dolorum. Fuga.
          </p>
        </div>

        {/* lower div container carrying 2 div one is written cards and 2nd is image div */}
        <div className="w-screen flex  flex-wrap py-10 px-4 ">
          {/* description card div  */}
          <div className="md:w-1/2 md:flex md:flex-wrap gap-4 md:pl-7">
            <div className=" flex md:w-72 gap-2">
              <MdSportsGymnastics className="text-[100px]" />
              <div>
                <h1 className="font-bold md:text-xl">Trainer Qualifications</h1>
                <p className="text-[.8rem]">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Dolor, voluptates?
                </p>
              </div>
            </div>
            <div className=" flex md:w-72 gap-2">
              <CgGym className="text-[100px]" />
              <div>
                <h1 className="font-bold md:text-xl">Facility Amenities</h1>
                <p className="text-[.8rem]">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Dolor, voluptates?
                </p>
              </div>
            </div>
            <div className=" flex md:w-72 gap-2">
              <RiMoneyRupeeCircleFill className="text-[100px]" />
              <div>
                <h1 className="font-bold md:text-xl">Member Cost</h1>
                <p className="text-[.8rem]">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Dolor, voluptates?
                </p>
              </div>
            </div>
            <div className=" flex md:w-72 gap-2">
              <MdOutlineTimer className="text-[100px]" />
              <div>
                <h1 className="font-bold md:text-xl">Operating Hours</h1>
                <p className="text-[.8rem]">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Dolor, voluptates?
                </p>
              </div>
            </div>
          </div>
          {/* image section for medium device */}
          <div className=" md:w-1/2 md:pl-8 md:flex gap-7 hidden">
            <div className="md:flex-col gap-3 flex">
              <img
                src={diet}
                alt="Diet image"
                class="w-56 h-28 object-cover shadow-2xl rounded-2xl"
              />
              <img
                src={trademill}
                alt="trademill"
                class="w-56 h-28 object-cover shadow-2xl rounded-2xl"
              />
            </div>
            <img
              src={HealthyLife}
              alt="trademill"
              class="w-48 h-64 object-cover shadow-2xl rounded-2xl"
            />
          </div>

          {/* carsousel for mobile device  */}
          <div className="carousel w-full md:hidden h-56 rounded-2xl mt-2">
            <div id="item1" className="carousel-item w-full  ">
              <img src={diet} className="w-full object-cover" />
            </div>
            <div id="item2" className="carousel-item  w-full">
              <img src={trademill} className="w-full object-cover" />
            </div>
            <div id="item3" className="carousel-item w-full ">
              <img src={HealthyLife} className="w-full object-cover" />
            </div>
          </div>
          <div className="flex w-full justify-center gap-2 py-2 md:hidden ">
            <a href="#item1" className="btn btn-circle btn-xs  bg-slate-200 ">
              1
            </a>
            <a href="#item2" className="btn btn-circle  btn-xs bg-slate-200 ">
              2
            </a>
            <a href="#item3" className="btn btn-circle  btn-xs bg-slate-200 ">
              3
            </a>
          </div>
        </div>
      </div>
    </>
  );
};
