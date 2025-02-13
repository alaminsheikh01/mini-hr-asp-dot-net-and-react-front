"use client";
import React, { useState, useEffect } from "react";
import { Table, Button, Modal } from "antd";
import { getEmpSalaryLanding } from "@/api/employee";
import { EyeOutlined, PrinterOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import Payslip from "./Payslip";
import PayslipView from "./PayslipView";

const LandingPage = () => {
  const router = useRouter();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  useEffect(() => {
    getEmpSalaryLanding(setData, setLoading);
  }, []);

  const handleView = (record) => {
    setModalVisible(true);
    setSelectedEmployee(record);
  };

  const handlePrint = (data) => {
    Payslip(data);
  };

  const columns = [
    {
      title: "Salary ID",
      dataIndex: "employeeSalaryId",
      key: "employeeSalaryId",
      width: 100,
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
        <>
          <EyeOutlined
            title="View Details"
            style={{
              fontSize: "16px",
              color: "#1890ff",
              cursor: "pointer",
              marginRight: 10,
            }}
            onClick={() => handleView(record)}
          />
          <PrinterOutlined
            title="Print"
            style={{ fontSize: "16px", color: "#1890ff", cursor: "pointer" }}
            onClick={() => handlePrint(record)}
          />
        </>
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
      <Modal
        title="Payslip Details"
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
        width={800}
      >
        <PayslipView employee={selectedEmployee} />
      </Modal>
    </div>
  );
};

export default LandingPage;
