import React from 'react'
import { Outlet } from 'react-router-dom'
import FooterLayout from './FooterLayout/FooterLayout'
import './Layout.css'
const Layout = () => {
  return (
    <div className='site'>
      <Outlet/>
      <FooterLayout/>
    </div>
  )
}

export default Layout
