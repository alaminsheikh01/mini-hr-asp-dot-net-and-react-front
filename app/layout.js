'use client';
import React from 'react';
import { Layout, Menu } from 'antd';
import { useRouter } from 'next/navigation';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  HomeOutlined,
  UnorderedListOutlined,
  PlusOutlined,
  TeamOutlined,
  AppstoreAddOutlined,
} from '@ant-design/icons';

const { Sider, Content } = Layout;

export default function RootLayout({ children }) {
  const router = useRouter();

  const menuItems = [
    {
      key: '1',
      icon: <HomeOutlined />,
      label: 'Home',
      onClick: () => router.push('/'),
    },
    {
      key: '2',
      icon: <UnorderedListOutlined />,
      label: 'Employee List',
      onClick: () => router.push('/component/EmpList'),
    },
    {
      key: '3',
      icon: <PlusOutlined />,
      label: 'Create Employee',
      onClick: () => router.push('/component/EmpCreate'),
    },
    {
      key: '4',
      icon: <AppstoreAddOutlined />,
      label: 'Create Department',
      onClick: () => router.push('/component/DepCreate'),
    },
    {
      key: '5',
      icon: <TeamOutlined />,
      label: 'Create Designation',
      onClick: () => router.push('/component/DegCreate'),
    },
  ];

  return (
    <html lang="en">
      <body style={{ margin: 0 }}>
        <Layout style={{ minHeight: '100vh' }}>
          <Sider
            style={{
              background: '#001529',
            }}
          >
            <div
              style={{
                height: '32px',
                margin: '16px',
                background: 'rgba(255, 255, 255, 0.2)',
              }}
            ></div>
            <Menu theme="dark" mode="inline" items={menuItems} />
          </Sider>
          <Layout>
            <Content style={{ margin: '20px', padding: '20px', background: '#fff' }}>
              {children}
              <ToastContainer />
            </Content>
          </Layout>
        </Layout>
      </body>
    </html>
  );
}
