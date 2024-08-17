import React from 'react'
import './HomeBreadcrumb.scss'
import { Breadcrumb } from 'antd'
import { useLocation, matchRoutes } from 'react-router-dom'
import { routes } from '../../../router'

export default function HomeBreadcrumb() {
  const location = useLocation()
  const matchs = matchRoutes(routes, location)
  const itemArr = matchs?.map(v => {return {'title': v.route.meta?.title}}) 
  return (
    <Breadcrumb className={'home-breadcrumb'} items={itemArr as []} />
  )
}
