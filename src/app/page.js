import React from 'react'
import Login from '../app/login/page'
import Home from '../app/home/page'
import Navbar from '../components/Navbar'
import Buscador from '../components/Buscador'
import Footer from '../components/Footer'

function page() {
  return (
    <div>
      <Navbar />
      <Home />
    </div>
  )
}

export default page