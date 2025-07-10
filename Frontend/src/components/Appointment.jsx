import React from 'react'
import { AppointmentForm } from '../pages/AppointmentForm'
import { Hero } from './Hero'

const Appointment = () => {
  return (
   <>
   <Hero title={"Schedule Your Appointment || AnkushCare Institute"}
    img='/signin.png'/>

      <AppointmentForm/>
      
      </>
  )
}

export default Appointment