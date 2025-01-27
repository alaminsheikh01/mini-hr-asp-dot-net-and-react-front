"use client";
import React, { Suspense, useEffect } from "react";
import { Layout, Button, Spin, Menu, Dropdown, Avatar } from "antd";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch, Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  HomeOutlined,
  UnorderedListOutlined,
  TeamOutlined,
  AppstoreAddOutlined,
  UserOutlined,
  DownOutlined,
  KeyOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { logout, store } from "./redux/store";
import "./globals.css";

const { Header, Sider, Content } = Layout;

function RootLayout({ children }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const { isAuthenticated, isMasterUser, userName, email, role } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      router.push("/Login");
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("isMasterUser");
    localStorage.removeItem("user");
    dispatch(logout());
    router.push("/Login");
  };

  const profileMenu = (
    <Menu style={{ width: 220, padding: "10px" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingBottom: "10px",
        }}
      >
        <Avatar size={48} icon={<UserOutlined />} />
        <div style={{ fontWeight: "bold", marginTop: "8px" }}>{userName}</div>
        <div style={{ color: "gray", fontSize: "12px" }}>{email}</div>
        <div style={{ color: "gray", fontSize: "12px" }}>{`Role: ${isMasterUser ? "Admin" : "Employee"}`}</div>
      </div>
      <Menu.Divider />
      <Menu.Item
        key="2"
        icon={<LogoutOutlined />}
        onClick={handleLogout}
        style={{ padding: "12px" }}
      >
        Log Out
      </Menu.Item>
      <Menu.Divider />
      <div
        style={{
          textAlign: "center",
          fontSize: "12px",
          color: "gray",
          marginTop: "8px",
        }}
      >
        SmartDesk@2025
      </div>
    </Menu>
  );

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
        isMasterUser && {
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

    isMasterUser && {
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
    {
      key: "6",
      icon: <TeamOutlined />,
      label: "Loan & Financial Aid",
      onClick: () => {
        document.title = "Loan & Financial Aid - Employee Management";
        router.push("/component/Loan");
      },
    },
  ];

  if (isAuthenticated === null) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Spin size="large" />
      </div>
    );
  }

  return (
    <html lang="en">
      <body>
        <Layout style={{ minHeight: "100vh" }}>
          {isAuthenticated && (
            <Sider
              width={"250px"}
              style={{
                position: "fixed",
                height: "100vh",
                background: "#001529",
              }}
            >
              <div
                style={{
                  height: "40px",
                }}
              ></div>
              <Menu theme="dark" mode="inline" items={menuItems} />
            </Sider>
          )}

          <Layout style={{ marginLeft: isAuthenticated ? 250 : 0 }}>
            <Header
              style={{
                position: "fixed",
                top: 0,
                zIndex: 1000,
                width: isAuthenticated ? "calc(100% - 250px)" : "100%",
                background: "#001529",
                color: "#fff",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "0 20px",
              }}
            >
              <div></div>
              <div style={{ color: "#fff", fontSize: "18px" }}>
                Welcome to Employee Management
              </div>
              {isAuthenticated ? (
                <Dropdown
                  overlay={profileMenu}
                  placement="bottomRight"
                  trigger={["click"]}
                >
                  <Avatar
                    size="large"
                    icon={<UserOutlined />}
                    style={{ cursor: "pointer" }}
                  />
                </Dropdown>
              ) : (
                <div></div>
              )}
            </Header>
            <Content
              style={{
                marginTop: 70,
                marginLeft: isAuthenticated ? 10 : 0,
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

export default function AppWrapper(props) {
  return (
    <Provider store={store}>
      <RootLayout {...props} />
    </Provider>
  );
}
