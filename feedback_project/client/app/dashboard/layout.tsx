'use client'
import {
  MenuFoldOutlined,
  UploadOutlined,
  VideoCameraOutlined,
  MenuUnfoldOutlined,
  BarsOutlined
} from '@ant-design/icons';
import { Button, Layout, Menu, theme, Dropdown } from 'antd';

import withAuth from "@/utils/auth"
import { Suspense, useEffect, useState } from "react"
import Loading from "./loading"
import { useRouter } from 'next/navigation';
const { Header, Sider, Content } = Layout;

function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [collapsed, setCollapsed] = useState(false);
  const router = useRouter()
  const {
    token: { colorBgContainer },
  } = theme.useToken();



  const handleLogout = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/v1/auth/logout", {
        method: "POST",
      })
      if (res.status === 200) {
        router.push("/signin")
      }
    } catch (error) {
      console.log(error);
    }
  }


  const items = [
    {
      key: '1',
      label: 'Ayarlar',
      onClick: () => { router.push("/dashboard/settings") }
    },
    {
      key: '2',
      label: 'Çıkış Yap',
      onClick: () => { handleLogout() }
    },

  ];

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth <= 800) {
        setCollapsed(true)
      } else {
        setCollapsed(false)
      }
    }
    window.addEventListener("resize", handleResize);
    handleResize()
    return () => window.removeEventListener("resize", handleResize);
  }, [])


  return (
    <Layout className=' h-screen'>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo text-white mb-3" >
          <h3 className='text-center mt-3 text-lg'>Logo</h3>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={[
            {
              key: '1',
              icon: <BarsOutlined />,
              label: 'Dashboard',
              onClick: () => { router.push("/dashboard") }
            },
            {
              key: '2',
              icon: <VideoCameraOutlined />,
              label: 'Geri Bildirimler',
            },
            {
              key: '3',
              icon: <UploadOutlined />,
              label: 'Ayarlar',
              onClick: () => { router.push("/dashboard/settings") }
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer
          }}
          className='flex'
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
          <Dropdown.Button
            className=' mt-4 justify-end mr-3'
            menu={{
              items
            }}
          >
            Tolga BAYRAK
          </Dropdown.Button>
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <Suspense fallback={<Loading />}>
            {children}
          </Suspense>
        </Content>
      </Layout>
    </Layout>






  )
}

export default DashboardLayout