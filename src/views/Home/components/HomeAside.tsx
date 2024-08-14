import React from 'react'
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import './HomeAside.scss'
import { routes } from '../../../router';
import { useSelector } from 'react-redux';
import type { RootState } from '../../../store';
import _ from 'lodash'
import { useLocation, matchRoutes, Link } from 'react-router-dom'

export default function HomeAside() {
  const permission = useSelector((state: RootState) => state.users.infos.permission) as unknown[]
  const loction = useLocation()
  const matchs = matchRoutes(routes, loction)
  const subPath = matchs![0].pathnameBase || ''
  const path = matchs![1].pathnameBase || ''
  const menus = _.cloneDeep(routes).filter(v => {
    v.children = v.children?.filter(v => v.meta?.menu && permission.includes(v.name))
    return v.meta?.menu && permission.includes(v.name)
  })
  const items: MenuProps['items'] = menus.map(v1 => {
    const children = v1.children?.map(v2 => {
      return {
        key: v1.path! + v2.path!,
        label: <Link to={v1.path! + v2.path!}>{v2.meta?.title}</Link>,
        icon: v2.meta?.icon
      }
    })
    return {
      key: v1.path!,
      label: v1.meta?.title,
      icon: v1.meta?.icon,
      children
    }
  })
  const onClick: MenuProps['onClick'] = e => {
    console.log('click ', e);
  };
  return (
    <Menu
      onClick={onClick}
      style={{ width: 300 }}
      selectedKeys={[path]}
      openKeys={[subPath]}
      mode="inline"
      items={items}
    />
  )
}
