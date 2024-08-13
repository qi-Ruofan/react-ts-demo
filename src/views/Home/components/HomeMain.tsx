import React, {Suspense} from 'react'
import { Outlet } from 'react-router-dom'
import './HomeMain.scss'

export default function HomeMain() {
  return (
    <div className={'home-main'}>
      <Suspense>
        <Outlet />
      </Suspense>
    </div>
  )
}
