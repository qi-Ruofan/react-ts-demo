import React from 'react'
import style from './Home.module.scss'
import { Outlet } from 'react-router-dom'
export default function Home() {
  return (
    <div>
      <h1>home</h1>
      <Outlet />
    </div>
  )
}
