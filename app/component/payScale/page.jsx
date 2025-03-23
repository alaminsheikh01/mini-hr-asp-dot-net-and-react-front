"use client";
import React, { useState, useEffect } from "react";
import { Table, Button, message, Popconfirm } from "antd";
import { useRouter } from "next/navigation";
import { getPayScaleLanding } from "@/api/employee";

const PayScaleLanding = () => {
  const router = useRouter();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch PayScale list
  useEffect(() => {
    getPayScaleLanding(0, setData, setLoading);
  }, []);

  // Handle PayScale deletion
  const handleDelete = (id) => {
    setLoading(true);
    deletePayScaleSetup(id)
      .then(() => {
        message.success("PayScale deleted successfully!");
        getPayScaleLanding(0, setData, setLoading);
      })
      .catch(() => {
        message.error("Failed to delete PayScale!");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const columns = [
    {
      title: "SL",
      render: (_, __, index) => index + 1,
      key: "index",
      width: 50,
    },
    {
      title: "Employee Grade",
      dataIndex: "employeeGrade",
      key: "employeeGrade",
    },
    {
      title: "Employee Salary Grade",
      dataIndex: "employeeSalaryGrade",
      key: "employeeSalaryGrade",
    },
    {
      title: "Basic Salary",
      dataIndex: "basicSalary",
      key: "basicSalary",
    },
    {
      title: "House Rent",
      dataIndex: "houseRent",
      key: "houseRent",
    },
    {
      title: "Medical Allowance",
      dataIndex: "medicalAllowance",
      key: "medicalAllowance",
    },
    {
      title: "Conveyance",
      dataIndex: "conveyance",
      key: "conveyance",
    },
    {
      title: "Car Allowance",
      dataIndex: "carAllowance",
      key: "carAllowance",
    },
    {
      title: "Drivers Salary Reimbursement",
      dataIndex: "driversSalaryReimbursement",
      render: (driversSalaryReimbursement) =>
        driversSalaryReimbursement ? driversSalaryReimbursement : "N/A",
      key: "driversSalaryReimbursement",
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
        <h2>PayScale Setup</h2>
        <Button
          type="primary"
          onClick={() => router.push("/component/payScale/create")}
        >
          Add PayScale
        </Button>
      </div>
      <Table columns={columns} dataSource={data || []} rowKey="id" bordered />
    </div>
  );
};

export default PayScaleLanding;
