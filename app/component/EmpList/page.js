"use client";
import React, { useEffect, useState } from "react";
import { Table, Button } from "antd";
import { useRouter } from "next/navigation";
import { EditOutlined } from "@ant-design/icons";
import { getEmployees } from "@/api/employee";
import './style.css'

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    getEmployees(setEmployees, setLoading);
  }, []);

  const handleEdit = (employeeId) => {
    router.push(`/component/EmpCreate?id=${employeeId}`);
  };

  const columns = [
    {
      title: "SL",
      render: (_, __, index) => index + 1,
      key: "index",
      width: 50,
    },
    {
      title: "First Name",
      dataIndex: "firstName",
      key: "firstName",
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      key: "lastName",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Department",
      dataIndex: "departmentName",
      key: "departmentName",
    },
    {
      title: "Designation",
      dataIndex: "designationName",
      key: "designationName",
    },
    {
      title: "Phone",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <EditOutlined
          title="Edit Employee"
          style={{ color: "#007BFF", cursor: "pointer" }}
          onClick={() => handleEdit(record.employeeId)}
        />
      ),
    },
  ];

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "20px",
        }}
      >
        <h2 style={{ color: "gray" }}>
          {`Total ${employees.length} Employees`}
        </h2>
        <Button
          type="primary"
          onClick={() => router.push("/component/EmpCreate")}
        >
          Add Employee
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={employees}
        rowKey="employeeId"
        bordered
        loading={loading}
        scroll={{ x: 1300, y: 400 }}
        pagination={{
          pageSize: 10,
        }}
        className="custom-scrollbar"
        style={{
          borderRadius: "8px",
          overflow: "hidden",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        }}
      />
    </div>
  );
};

export default EmployeeList;
