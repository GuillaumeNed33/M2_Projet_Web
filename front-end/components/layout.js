import React from 'react'
import Link from 'next/link'
import {logout} from '../utils/auth'
import { Layout, Menu, Icon } from 'antd'
const Header = Layout.Header
const Content = Layout.Content
const Footer = Layout.Footer
const Sider = Layout.Sider

import "../assets/layout.less"

const CustomLayout = props => (
    <Layout id="app-layout">
      <Sider
          breakpoint="lg"
          collapsedWidth="0"
      >
        <div className="logo">
          <img src="/logo.png" alt="logo app"/>
        </div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={[props.tab]}>
          <Menu.Item key="movies">
            <Link href="/movies">
              <div>
                <Icon type="video-camera" />
                <span className="nav-text">My movies</span>
              </div>
            </Link>
          </Menu.Item>
          <Menu.Item key="add">
            <Link href="/add">
              <div>
                <Icon type="plus-circle" />
                <span className="nav-text">Add a movie</span>
              </div>
            </Link>
          </Menu.Item>
          <Menu.Item key="explore">
            <Link href="/explore">
              <div>
                <Icon type="compass" />
                <span className="nav-text">Explore movies</span>
              </div>
            </Link>
          </Menu.Item>
          <Menu.Item key="logout" onClick={logout}>
            <Link href="#">
              <div>
                <Icon type="logout" />
                <span className="nav-text">Sign out</span>
              </div>
            </Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ background: '#fff', padding: 0 }} />
        <Content style={{ margin: '24px 16px 0', minHeight: 'auto' }}>
          <div style={{ padding: 24, background: '#fff', minHeight: "98%" }}>
            {props.children}
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>University project ©2019 Created by Guillaume NEDELEC</Footer>
      </Layout>
    </Layout>
)

export default CustomLayout
