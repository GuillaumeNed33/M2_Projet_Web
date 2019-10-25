import React from 'react'
import Link from 'next/link'
import Head from 'next/head'

import { Layout, Menu, Icon } from 'antd'
const Header = Layout.Header
const Content = Layout.Content
const Footer = Layout.Footer
const Sider = Layout.Sider

import "./layout.less"

const CustomLayout = ({ children }) => (
    <Layout className="mainLayout">
    <Sider
      breakpoint="lg"
      collapsedWidth="0"
      onBreakpoint={broken => {
        console.log(broken);
      }}
      onCollapse={(collapsed, type) => {
        console.log(collapsed, type);
      }}
    >
      <div className="logo" />
      <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
        <Menu.Item key="1">
        <Link href="/movies">
        <div>
          <Icon type="video-camera" />
          <span className="nav-text">Mes films</span>
          </div>
          </Link>
        </Menu.Item>
        <Menu.Item key="2">
        <Link href="/add">
        <div>
          <Icon type="plus-circle" />
          <span className="nav-text">Ajouter un film</span>
          </div>
          </Link>
        </Menu.Item>
        <Menu.Item key="3">
        <Link href="/explore">
            <div>
          <Icon type="compass" />
          <span className="nav-text">Explorer</span>
          </div>
          </Link>
        </Menu.Item>
      </Menu>
    </Sider>
    <Layout>
      <Header style={{ background: '#fff', padding: 0 }} />
      <Content style={{ margin: '24px 16px 0' }}>
        <div style={{ padding: 24, background: '#fff', minHeight: "98%" }}>
            {children}
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Projet universitaire M2 Informatique ©2019 Créé par Guillaume NEDELEC</Footer>
    </Layout>
  </Layout>
  )

export default CustomLayout
