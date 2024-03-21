import React from 'react'
import Banner from '../components/Banner'
import BestSellerBooks from './BestSellerBooks'
import FavBook from './FavBook'
import PromoBanner from './PromoBanner'
import OtherBooks from './OtherBooks'
import Review from './Review'

const Home = () => {
  return (
    <div className=''>
      {/*<div className='h-screen'>Home</div>
      <div className='h-screen bg-red-600'>    
  </div>*/}
    <div>
      <Banner/>
      <BestSellerBooks/>
      <FavBook/>
      <PromoBanner/>
      <OtherBooks/>
      <Review/>
     
    </div>
    </div>
  )
}

export default Home
