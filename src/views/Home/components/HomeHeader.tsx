import React, {useEffect} from 'react'
import './HomeHeader.scss'
import { Dropdown, Badge, Space, Avatar } from 'antd'
import type { MenuProps } from 'antd'
import { BellOutlined } from '@ant-design/icons'
import { useSelector } from 'react-redux'
import { useAppDispatch } from '../../../store'
import type { RootState } from '../../../store'
import { clearToken } from '../../../store/modules/users'
import news, { getRemind, updateInfo } from '../../../store/modules/news'
import type { Infos } from '../../../store/modules/news';
import { Link } from 'react-router-dom'

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
  const _id =   useSelector((state: RootState) => state.users.infos._id) as string
  const newsInfo =  useSelector((state: RootState) => state.news.info)
  const isDot = (newsInfo.applicant || newsInfo.approver) as boolean | undefined
  const dispatch = useAppDispatch() 
  useEffect(() => {
    dispatch(getRemind({userid: _id})).then(res => {
      const { errcode, info } = (res.payload as {[index:string]:unknown}).data as {[index:string]:unknown}
      if(errcode === 0) {
        dispatch(updateInfo(info as Infos[]))
      }
    })
  }, [dispatch, _id])
  const handleLogut = () => {
    dispatch(clearToken())
    setTimeout(() => {
      window.location.replace('/login')
    })
  }
  const items1: MenuProps['items'] = []
  if(newsInfo.applicant) {
    items1.push({
      key: '1',
      label: <Link to="/apply">有审批结果消息</Link>
    })
  }
  if(newsInfo.approverid) {
    items1.push({
      key: '2',
      label: <Link to="/check">有审批请求消息</Link>
    })
  }
  if(!newsInfo.approverid && !newsInfo.applicant) {
    items1.push({
      key: '3',
      label: <div>暂无消息</div>
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
        <Badge dot={isDot}>
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
