import React from 'react'
import Hero from '../components/Hero'
import FeaturedDestination from '../components/FeaturedDestination'
import ExclusiveOffers from '../components/ExclusiveOffers'
import Testimonial from '../components/Testimonial'
import NewsLetter from '../components/NewsLetter'
import About from '../components/About'

const Home = () => {
  return (
    <div>
      <Hero />
      <FeaturedDestination />
      <ExclusiveOffers/>
      <About />
      <Testimonial/>
      <NewsLetter/>
    </div>
  )
}

export default Home