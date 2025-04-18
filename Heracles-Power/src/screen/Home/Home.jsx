import React from 'react'
import { LandingPage } from '../LandingPage'
import { Footer } from '../../components/Footer'
import { WhyChooseUs } from '../../components/WhyChooseUs'
import { TrainerSection } from '../../components/TrainerSection'
import { JoinToday } from '../../components/JoinToday'
import { Reviews } from '../../components/Reviews'

export const Home = () => {
  return (
    <>
    <LandingPage/>
    <WhyChooseUs/>
    <TrainerSection/>
    <JoinToday/>
    <Reviews/>
    <Footer/>
    
    </>
  )
}
