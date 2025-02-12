"use client";
import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Spin } from "antd";
import { useRouter } from "next/navigation";
import { EditOutlined, EyeOutlined } from "@ant-design/icons";
import { getEmployees, getEmployeeById } from "@/api/employee";
import "./style.css";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [employee, setEmployee] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const router = useRouter();

  useEffect(() => {
    getEmployees(setEmployees, setLoading);
  }, []);

  const handleEdit = (employeeId) => {
    router.push(`/component/EmpCreate?id=${employeeId}`);
  };

  const handleView = (employeeId) => {
    setModalVisible(true);
    setLoading(true);
    getEmployeeById(employeeId, setEmployee, setLoading);
  };

  const columns = [
    {
      title: "SL",
      render: (_, __, index) => index + 1,
      key: "index",
      width: 50,
    },
    {
      title: "Employee Name",
      dataIndex: "firstName",
      render: (text, record) => (
        <>
          {record.firstName} {record.lastName}
        </>
      ),
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
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div style={{ display: "flex", gap: "10px" }}>
          <EditOutlined
            title="Edit Employee"
            style={{ color: "#007BFF", cursor: "pointer", fontSize: "16px" }}
            onClick={() => handleEdit(record.employeeId)}
          />
          <EyeOutlined
            title="View Employee"
            style={{ color: "#28a745", cursor: "pointer", fontSize: "16px" }}
            onClick={() => handleView(record.employeeId)}
          />
        </div>
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
        <h2
          style={{ color: "gray" }}
        >{`Total ${employees.length} Employees`}</h2>
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
        scroll={{ y: 400 }}
        pagination={{ pageSize: 10 }}
        className="custom-scrollbar"
        style={{
          borderRadius: "8px",
          overflow: "hidden",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        }}
      />

      {/* Employee Details Modal */}
      <Modal
        title="Employee Details"
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
        width={800}
      >
        {loading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              padding: "20px",
            }}
          >
            <Spin size="large" />
          </div>
        ) : employee ? (
          <div style={{ padding: "10px" }}>
            <div
              style={{
                backgroundColor: "#f9f9f9",
                padding: "15px",
                borderRadius: "8px",
                boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
              }}
            >
              <h3
                style={{
                  textAlign: "center",
                  marginBottom: "10px",
                  color: "#333",
                }}
              ></h3>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "10px",
                }}
              >
                <p>
                  <strong>Employee Name</strong> <br /> {employee.firstName}{" "}
                  {employee.lastName}
                </p>
                <p>
                  <strong>Email</strong> <br /> {employee.email}
                </p>
                <p>
                  <strong>Phone</strong> <br /> {employee.phoneNumber}
                </p>
                <p>
                  <strong>Department</strong> <br /> {employee.departmentName}
                </p>
                <p>
                  <strong>Designation</strong> <br /> {employee.designationName}
                </p>
                <p>
                  <strong>Grade</strong> <br /> {employee.grade}
                </p>
                <p>
                  <strong>Insurance ID</strong> <br />{" "}
                  {employee.insuranceNumber || 0}
                </p>
                <p>
                  <strong>Joining Date</strong> <br />{" "}
                  {new Date(employee.dateOfJoining).toDateString()}
                </p>
                <p>
                  <strong>Date of Birth</strong> <br />{" "}
                  {new Date(employee.dateOfBirth).toDateString()}
                </p>
                <p>
                  <strong>Address</strong> <br /> {employee.address || ""}
                </p>
                <p>
                  <strong>Gender</strong> <br /> {employee.gender}
                </p>
                <p>
                  <strong>EmployeeStatus</strong> <br />{" "}
                  {employee.employeeStatus}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <p style={{ textAlign: "center", padding: "20px", color: "gray" }}>
            No details available.
          </p>
        )}
      </Modal>
    </div>
  );
};

export default EmployeeList;
