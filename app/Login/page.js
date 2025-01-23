"use client";
import React, { useState, useEffect } from "react";
import { Form, Input, Button, Typography } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { loginAPI } from "@/api/employee";
import { login } from "@/app/redux/store";

const { Title } = Typography;

const Login = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    document.title = "Login SmartDesk";
  }, []);

  const handleLogin = async (values) => {
    const payload = {
      email: values.email || "",
      password: values.password || "",
    };

    try {
      await loginAPI(payload, setLoading, (data) => {
        // Save to localStorage
        localStorage.setItem("authToken", data?.token);
        localStorage.setItem("isMasterUser", data?.user?.isMasterUser);
        localStorage.setItem("user", JSON.stringify(data?.user));

        // Dispatch to Redux
        dispatch(
          login({
            isMasterUser: data?.user?.isMasterUser,
            userName: data?.user?.userName,
            email: data?.user?.email,
          })
        );

        // Navigate to home page
        router.push("/");
      });
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "80vh",
        background: "#f0f2f5",
      }}
    >
      <div
        style={{
          maxWidth: 400,
          width: "100%",
          padding: "30px",
          background: "#fff",
          borderRadius: "8px",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Title level={1} style={{ textAlign: "center" }}>
          SmartDesk
        </Title>
        <div className="text-center mb-5 text-gray-400">
          <span>
          Experience the next level of HR management in simple way.
          </span>
        </div>
        <Form
          name="login_form"
          onFinish={handleLogin}
          layout="vertical"
          requiredMark={false}
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please enter your email!" },
              { type: "email", message: "Please enter a valid email!" },
            ]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="Enter your email"
              size="large"
            />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please enter your password!" }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Enter your password"
              size="large"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              block
              loading={loading}
            >
              Login
            </Button>
          </Form.Item>
          <div className="text-sm text-gray-300 text-center">
            If you have forgotten your email, please contact the administrator.
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Login;
