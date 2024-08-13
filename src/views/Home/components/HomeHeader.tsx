import React from 'react'
import './HomeHeader.scss'
import { Dropdown, Badge, Space, Avatar } from 'antd'
import type { MenuProps } from 'antd'
import { BellOutlined } from '@ant-design/icons'
import { useSelector } from 'react-redux'
import { useAppDispatch } from '../../../store'
import type { RootState } from '../../../store'
import { clearToken } from '../../../store/modules/users'

const items1: MenuProps['items'] =[
  {
    label: (
      <div>暂无消息</div>
    ),
    key: '0',
  },
]
export default function HomeHeader() {
  const name = useSelector((state: RootState) => state.users.infos.name) as string
  const head = useSelector((state: RootState) => state.users.infos.head) as string
  const dispatch = useAppDispatch()
  const handleLogut = () => {
    dispatch(clearToken())
    setTimeout(() => {
      window.location.replace('/login')
    })
  }
  const items2: MenuProps['items'] =[
    {
      label: (
        <div>个人中心</div>
      ),
      key: '0',
    },
    {
      label: (
        <div onClick={handleLogut}>退出</div>
      ),
      key: '1',
    },
  ]
  return (
    <div className={'home-header'}>
      <span className={'home-header-logo'}>
        <i className={"iconfont icon-react"}></i>
        <i className={"iconfont icon-icon-test"}></i>
        <i className={"iconfont icon-typescript"}></i>
      </span>
      <span className={"home-header-title"}>在线考勤系统</span>
      <Dropdown menu={{items: items1}} arrow placement='bottom'>
        <Badge dot>
          <BellOutlined style={{fontSize: 20}} />
        </Badge>
      </Dropdown>
      <Dropdown menu={{items: items2}} arrow placement='bottom'>
        <Space className={'home-header-space'}>
          <Avatar src={head} size="large" /> 
          {name}
        </Space>
      </Dropdown>
    </div>
  )
}
