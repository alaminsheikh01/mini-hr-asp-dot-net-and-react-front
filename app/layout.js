"use client";
import React, { useEffect, Suspense } from "react";
import { Layout, Menu } from "antd";
import { useRouter } from "next/navigation";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  HomeOutlined,
  UnorderedListOutlined,
  PlusOutlined,
  TeamOutlined,
  AppstoreAddOutlined,
} from "@ant-design/icons";

const { Sider, Content } = Layout;

// Lazy-loaded components
// const EmpList = React.lazy(() => import("../app/component/EmpList/page.js"));
// const EmpCreate = React.lazy(() => import("../app/component/EmpCreate/page.js"));
// const DepCreate = React.lazy(() => import("../app/component/DepCreate/page.js"));
// const DegCreate = React.lazy(() => import("../app/component/DegCreate/page.js"));
// const EmpSalary = React.lazy(() => import("../app/component/EmpSalary/page.js"));

export default function RootLayout({ children }) {
  const router = useRouter();

  useEffect(() => {
    // Prefetching routes for faster navigation
    router.prefetch("/");
    router.prefetch("/component/EmpList");
    router.prefetch("/component/EmpCreate");
    router.prefetch("/component/EmpBulk");
    router.prefetch("/component/DepCreate");
    router.prefetch("/component/DegCreate");
    router.prefetch("/component/EmpSalary");
  }, [router]);

  const menuItems = [
    {
      key: "1",
      icon: <HomeOutlined />,
      label: "Home",
      onClick: () => {
        document.title = "Home - Employee Management";
        router.push("/");
      },
    },
    {
      key: "2",
      icon: <UnorderedListOutlined />,
      label: "Employee",
      children: [
        {
          key: "sub1",
          label: "Employee List",
          onClick: () => {
            document.title = "Employee List - Employee Management";
            router.push("/component/EmpList");
          },
        },
        {
          key: "sub2",
          label: "Create Employee",
          onClick: () => {
            document.title = "Create Employee - Employee Management";
            router.push("/component/EmpCreate");
          },
        },
        {
          key: "sub3",
          label: "Employee Bulk Upload",
          onClick: () => {
            document.title = "Employee Bulk Upload - Employee Management";
            router.push("/component/EmpBulk");
          },
        },
      ],
    },
    {
      key: "3",
      icon: <AppstoreAddOutlined />,
      label: "Create Department",
      onClick: () => {
        document.title = "Create Department - Employee Management";
        router.push("/component/DepCreate");
      },
    },
    {
      key: "4",
      icon: <TeamOutlined />,
      label: "Create Designation",
      onClick: () => {
        document.title = "Create Designation - Employee Management";
        router.push("/component/DegCreate");
      },
    },
    {
      key: "5",
      icon: <TeamOutlined />,
      label: "Salary Process",
      onClick: () => {
        document.title = "Salary Process - Employee Management";
        router.push("/component/EmpSalary");
      },
    },
  ];

  return (
    <html lang="en">
      <body style={{ margin: 0 }}>
        <Layout style={{ minHeight: "100vh" }}>
          <Sider
            style={{
              position: "fixed",
              height: "100vh",
              background: "#001529",
            }}
          >
            <div
              style={{
                height: "32px",
                margin: "16px",
                background: "rgba(255, 255, 255, 0.2)",
              }}
            ></div>
            <Menu theme="dark" mode="inline" items={menuItems} />
          </Sider>
          <Layout style={{ marginLeft: 200 }}>

            <Content
              style={{
                margin: "20px",
                padding: "20px",
                background: "#fff",
              }}
            >
              <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
              <ToastContainer />
            </Content>
          </Layout>
        </Layout>
      </body>
    </html>
  );
}
