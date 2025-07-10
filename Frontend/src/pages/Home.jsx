import React from 'react'
import { Hero } from '../components/Hero'

import MessageForm from '../components/MessageForm'
import hero from '../../public/hero.png'
import Biography from '../components/Biography'
import Department from '../components/Department'
import Footer from './Footer'

export const Home = () => {
  return (
   <>
   <Hero title={"Welcome to Ankush Medical | Your Trusted HealthCare"} img={hero}/>
   <Biography img={'/about.png'}/>
   <Department/>
  
   <MessageForm/>
   <Footer/>
   </>
  )
}
