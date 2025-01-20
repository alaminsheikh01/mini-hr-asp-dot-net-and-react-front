"use client";
import React, { useState, useEffect } from "react";
import { Table, Button } from "antd";
import { getEmpSalaryLanding } from "@/api/employee";
import { EyeOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";

const LandingPage = () => {
  const router = useRouter();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getEmpSalaryLanding(setData, setLoading);
  }, []);

  const columns = [
    {
      title: "Employee SalaryID",
      dataIndex: "employeeSalaryId",
      key: "employeeSalaryId",
    },
    {
      title: "Employee Name",
      dataIndex: "employeeName",
      key: "employeeName",
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
      title: "Month",
      dataIndex: "salaryMonth",
      key: "salaryMonth",
    },
    {
      title: "Year",
      dataIndex: "salaryYear",
      key: "salaryYear",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <EyeOutlined
          title="View Details"
          style={{ fontSize: "16px", color: "#1890ff", cursor: "pointer" }}
          onClick={() => console.log("View icon clicked", record)}
        />
      ),
    },
  ];

  return (
    <div style={{ padding: "20px" }}>
      {loading && <div>Loading...</div>}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <h2>Employee Salary Table</h2>
        <Button
          type="primary"
          onClick={() => router.push("/component/EmpSalaryProcess/create")}
        >
          Create
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={data}
        rowKey="employeeSalaryId"
        bordered
      />
    </div>
  );
};

export default LandingPage;
