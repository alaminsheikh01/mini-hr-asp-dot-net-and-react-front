"use client";
import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Badge, Tag } from "antd";
import { getSalaryHeaderData } from "@/api/employee";
import { useRouter } from "next/navigation";
import PayslipView from "./PayslipView";

const LandingPage = () => {
  const router = useRouter();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getSalaryHeaderData(setData, setLoading, "");
  }, []);

  const columns = [
    {
      title: "Salary Code",
      dataIndex: "salaryCode",
      key: "salaryCode",
      width: 200,
    },

    {
      title: "Month",
      dataIndex: "salaryMonth",
      key: "salaryMonth",
      width: 300,
    },
    {
      title: "Year",
      dataIndex: "salaryYear",
      key: "salaryYear",
      width: 300,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text, record) => (
        <Tag color="success">Salary Process Success</Tag>
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
      style={{ cursor: "pointer" }}
        columns={columns}
        dataSource={data}
        rowKey="salaryHeaderId"
        bordered
        onRow={(record) => ({
          onClick: () => {
            router.push(`/component/EmpSalaryProcess/${record.salaryCode}`);
          },
        })}
      />
    </div>
  );
};

export default LandingPage;
