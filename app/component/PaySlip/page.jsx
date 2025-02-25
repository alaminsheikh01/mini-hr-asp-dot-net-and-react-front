"use client";
import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Select } from "antd";
import { EyeOutlined, PrinterOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { getEmployees, getEmpSalaryLanding } from "@/api/employee";
import PayslipView from "../EmpSalaryProcess/PayslipView";
import Payslip from "../EmpSalaryProcess/Payslip";

const { Option } = Select;

const LandingPage = () => {
  const router = useRouter();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [selectedEmpId, setSelectedEmpId] = useState(null);

  useEffect(() => {
    getEmpSalaryLanding(setData, setLoading);
    getEmployees(setEmployees, setLoading);
  }, []);

  const handleView = (record) => {
    setModalVisible(true);
    setSelectedEmployee(record);
  };

  const handlePrint = (data) => {
    Payslip(data);
  };

  const handleDropdownView = () => {
    getEmpSalaryLanding(setData, setLoading, selectedEmpId);
  };

  const columns = [
    {
      title: "Salary Code",
      dataIndex: "salaryCode",
      key: "salaryCode",
      width: 200,
    },
    {
      title: "Employee Name",
      dataIndex: "employeeName",
      key: "employeeName",
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
        <h2>Employee PaySlip</h2>
      </div>
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <Select
          allowClear
          placeholder="Select Employee"
          style={{ width: "300px" }}
          onChange={(value) => setSelectedEmpId(value)}
        >
          {employees.map((employee) => (
            <Option key={employee.employeeId} value={employee.employeeId}>
              {employee.firstName} {employee.lastName}
            </Option>
          ))}
        </Select>
        <Button type="primary" onClick={handleDropdownView}>
          View
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
