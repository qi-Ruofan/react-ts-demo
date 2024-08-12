import React from 'react'
import { useLocation, matchRoutes, Navigate } from 'react-router-dom'
import { routes } from '../../router'
// 子组件类型
interface BeforeEachProps {
  children?: React.ReactNode
}

export default function BeforeEach(props: BeforeEachProps) {
  const location = useLocation()
  const matchs = matchRoutes(routes, location)
  // 类型保护
  if(Array.isArray(matchs)) {
    const meta = matchs[matchs.length-1].route.meta
    // 权限判断
    if(meta?.auth) {
      return <Navigate to="/login" />
    }
  }
  // 进入子页面
  return (
    <div>{props.children}</div>
  )
}
