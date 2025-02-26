import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

export default function TestimonialCard({ testimonials }) {
  return (
    <div className="testimonial-container">
      <Swiper
        // install Swiper modules
        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
        spaceBetween={10}
        slidesPerView={1} // Default slides per view
        navigation={false}
        pagination={{ clickable: true }}
        autoplay={{ delay: 2000 }}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          
        }}
      >
        {testimonials.map((testimonial, index) => (
          <SwiperSlide key={index}>
            <div className="border-[1px] px-5 py-5 rounded-2xl shadow-md ">
              <p>{testimonial.Feedback}</p>
              <div className="flex gap-3 pt-4">
                <img
                  src={testimonial.img}
                  alt="Trainer 1"
                  className="w-12 h-12 object-cover rounded-full border-2 border-custom-black"
                />
                <div>
                  <h1>{testimonial.Name}</h1>
                  <h1>{testimonial.Ratings}</h1>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
