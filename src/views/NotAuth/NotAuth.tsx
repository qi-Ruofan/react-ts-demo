import React from 'react'
import style from './NotAuth.module.scss'
import { Link } from 'react-router-dom'
import { Button } from 'antd'
import image from "../../assets/images/403.png"
export default function NotAuth() {
  return (
    <div className="status-wrapper"> 
      <img src={image} alt="" />
      <p>没有权限</p>
      <Link to="/">
        <Button type="primary">回到首页</Button>
      </Link>
    </div>
  )
}
