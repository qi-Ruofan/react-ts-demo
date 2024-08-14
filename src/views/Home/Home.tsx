import React from 'react'
import './Home.scss'


import { Layout } from 'antd'

import HomeHeader from './components/HomeHeader'
import HomeAside from './components/HomeAside'
import HomeBreadcrumb from './components/HomeBreadcrumb'
import HomeMain from './components/HomeMain'

const { Header, Footer, Sider, Content } = Layout;
export default function Home() {
  return (
    <Layout>
      <Header>
        <HomeHeader />
      </Header>
      <Layout>
        <Sider width={300} theme='light'>
          <HomeAside />
        </Sider>
        <Layout style={{padding: '20px'}}>
          <HomeBreadcrumb />
          <Content>
            <HomeMain />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  )
}
