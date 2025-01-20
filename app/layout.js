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

export default function RootLayout({ children }) {
  const router = useRouter();

  useEffect(() => {
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
      label: "Employee Information",
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
      icon: <TeamOutlined />,
      label: "Salary Process",
      children: [
        {
          key: "sub4",
          label: "Employee Salary Assign",
          onClick: () => {
            document.title = "Employee Salary - Employee Management";
            router.push("/component/EmpSalaryAssign/Landing");
          },
        },
        {
          key: "sub5",
          label: "Employee Salary Process",
          onClick: () => {
            document.title = "Salary Process - Employee Management";
            router.push("/component/EmpSalaryProcess");
          },
        },
      ],
    },
    {
      key: "4",
      icon: <AppstoreAddOutlined />,
      label: "Create Department",
      onClick: () => {
        document.title = "Create Department - Employee Management";
        router.push("/component/DepCreate");
      },
    },
    {
      key: "5",
      icon: <TeamOutlined />,
      label: "Create Designation",
      onClick: () => {
        document.title = "Create Designation - Employee Management";
        router.push("/component/DegCreate");
      },
    },
  ];

  return (
    <html lang="en">
      <body style={{ margin: 0 }}>
        <Layout style={{ minHeight: "100vh" }}>
          <Sider
            width={"260!important"}
            style={{
              position: "fixed",
              height: "100vh",
              background: "#001529",
            }}
          >
            <div
              style={{
                height: "40px",
                background: "#22ff49cc",
                color: "white",
                fontSize: "24px",
                textAlign: "center",
                fontWeight: "bold",
                marginBottom: "10px",
                paddingLeft: "20px",
                paddingRight: "20px",
                borderRadius: "10px",
                marginTop: "10px",
              }}
            >
              Employee Management
            </div>
            <Menu theme="dark" mode="inline" items={menuItems} />
          </Sider>

          <Layout style={{ marginLeft: 280 }}>
            <Content
              style={{
                margin: "40px",
                padding: "5px",
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
