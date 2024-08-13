import React from 'react'
import './HomeBreadcrumb.scss'
import { Breadcrumb } from 'antd'
import { useLocation, matchRoutes } from 'react-router-dom'
import { routes } from '../../../router'

export default function HomeBreadcrumb() {
  const location = useLocation()
  const matchs = matchRoutes(routes, location)
  return (
    <Breadcrumb className={'home-breadcrumb'}>
      {
        matchs?.map(v => <Breadcrumb.Item key={v.pathnameBase}>{v.route.meta?.title}</Breadcrumb.Item>)
      }
    </Breadcrumb>
  )
}
