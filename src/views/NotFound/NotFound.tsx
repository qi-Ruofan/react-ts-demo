import React from 'react'
import style from './NotFound.module.scss'
import { Link } from 'react-router-dom'
import { Button } from 'antd'
import image from "../../assets/images/404.png"
export default function NotFound() {
  return (
    <div className="status-wrapper"> 
      <img src={image} alt="" />
      <p>没找到页面</p>
      <Link to="/">
        <Button type="primary">回到首页</Button>
      </Link>
    </div>
  )
}
