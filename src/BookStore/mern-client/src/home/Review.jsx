import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import { FaStar } from "react-icons/fa6";
import 'swiper/css';
import 'swiper/css/pagination';
import proPic from '../assets/profile.jpg';

// import required modules
import { Pagination } from 'swiper/modules';

const Review = () => {
  return (
    <div className='my-16 px-4 lg:px-4'> {/* Increased margin top from my-12 to my-16 */}
      <h2 className='text-5xl font-bold text-center mb-8'>Our Customers</h2> {/* Increased margin bottom from mb-0 to mb-8 */}
   
      <div>
        <Swiper
          slidesPerView={1}
          spaceBetween={30}
          pagination={{
            clickable: true,
          }}
          breakpoints={{
            640: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 40,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 50,
            },
          }}
          modules={[Pagination]}
          className="mySwiper"
        >
          <SwiperSlide className='shadow-2xl bg-white py-8 px-4 md:m-5 rounded-lg border'>
              <div className='space-y-6'>
                  <div className='text-amber-500 flex gap-2'>
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  </div>

                  {/*text */}
                  <div className='mt-7'>
                      <p className='mb-5'>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                   Excepteur sint occaecat cupidatat non proident, sunt 
                   in culpa qui officia deserunt mollit anim id est laborum.</p>
                   <img src={proPic} alt="avatar of Jese" rounded
                    className='w-10 mb-4'/>
                    <h5 className='text-lg font-medium'>Kahlo Pirez</h5>
                    <p className='text-base'>Painter</p>
                  </div>
              </div>
          </SwiperSlide>

          <SwiperSlide className='shadow-2xl bg-white py-8 px-4 md:m-5 rounded-lg border'>
              <div className='space-y-6'>
                  <div className='text-amber-500 flex gap-2'>
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  </div>

                  {/*text */}
                  <div className='mt-7'>
                      <p className='mb-5'>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                   Excepteur sint occaecat cupidatat non proident, sunt 
                   in culpa qui officia deserunt mollit anim id est laborum.</p>
                   <img src={proPic} alt="avatar of Jese" rounded
                    className='w-10 mb-4'/>
                    <h5 className='text-lg font-medium'>Kahlo Pirez</h5>
                    <p className='text-base'>Painter</p>
                  </div>
              </div>
          </SwiperSlide>
         
          <SwiperSlide className='shadow-2xl bg-white py-8 px-4 md:m-5 rounded-lg border'>
              <div className='space-y-6'>
                  <div className='text-amber-500 flex gap-2'>
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  </div>

                  {/*text */}
                  <div className='mt-7'>
                      <p className='mb-5'>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                   Excepteur sint occaecat cupidatat non proident, sunt 
                   in culpa qui officia deserunt mollit anim id est laborum.</p>
                   <img src={proPic} alt="avatar of Jese" rounded
                    className='w-10 mb-4'/>
                    <h5 className='text-lg font-medium'>Kahlo Pirez</h5>
                    <p className='text-base'>Painter</p>
                  </div>
              </div>
          </SwiperSlide>

          <SwiperSlide className='shadow-2xl bg-white py-8 px-4 md:m-5 rounded-lg border'>
              <div className='space-y-6'>
                  <div className='text-amber-500 flex gap-2'>
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  </div>

                  {/*text */}
                  <div className='mt-7'>
                      <p className='mb-5'>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                   Excepteur sint occaecat cupidatat non proident, sunt 
                   in culpa qui officia deserunt mollit anim id est laborum.</p>
                   <img src={proPic} alt="avatar of Jese" rounded
                    className='w-10 mb-4'/>
                    <h5 className='text-lg font-medium'>Kahlo Pirez</h5>
                    <p className='text-base'>Painter</p>
                  </div>
              </div>
          </SwiperSlide>

          <SwiperSlide className='shadow-2xl bg-white py-8 px-4 md:m-5 rounded-lg border'>
              <div className='space-y-6'>
                  <div className='text-amber-500 flex gap-2'>
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  </div>

                  {/*text */}
                  <div className='mt-7'>
                      <p className='mb-5'>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                   Excepteur sint occaecat cupidatat non proident, sunt 
                   in culpa qui officia deserunt mollit anim id est laborum.</p>
                   <img src={proPic} alt="avatar of Jese" rounded
                    className='w-10 mb-4'/>
                    <h5 className='text-lg font-medium'>Kahlo Pirez</h5>
                    <p className='text-base'>Painter</p>
                  </div>
              </div>
          </SwiperSlide>

          <SwiperSlide className='shadow-2xl bg-white py-8 px-4 md:m-5 rounded-lg border'>
              <div className='space-y-6'>
                  <div className='text-amber-500 flex gap-2'>
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  </div>

                  {/*text */}
                  <div className='mt-7'>
                      <p className='mb-5'>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                   Excepteur sint occaecat cupidatat non proident, sunt 
                   in culpa qui officia deserunt mollit anim id est laborum.</p>
                   <img src={proPic} alt="avatar of Jese" rounded
                    className='w-10 mb-4'/>
                    <h5 className='text-lg font-medium'>Kahlo Pirez</h5>
                    <p className='text-base'>Painter</p>
                  </div>
              </div>
          </SwiperSlide>

        </Swiper>
      </div>
    </div>
  )
}

export default Review;
