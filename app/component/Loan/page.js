"use client";
import React, { useState, useEffect } from "react";
import { Table, Button, message, Popconfirm } from "antd";
import { useRouter } from "next/navigation";
import { getLoanLanding, deleteLoan } from "@/api/employee";

const LoanLanding = () => {
  const router = useRouter();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch loan list
  useEffect(() => {
    getLoanLanding(0, setData, setLoading);
  }, []);

  // Handle loan deletion
  const handleDelete = (loanId) => {
    setLoading(true);
    deleteLoan(loanId)
      .then(() => {
        message.success("Loan deleted successfully!");
        getLoanLanding(0, setData, setLoading);
      })
      .catch(() => {
        message.error("Failed to delete loan!");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const columns = [
    {
      title: "Employee Name",
      dataIndex: "employeeName",
      key: "employeeName",
    },
    {
      title: "Loan Type",
      dataIndex: "loanType",
      key: "loanType",
    },
    {
      title: "Application Date",
      dataIndex: "loanDate",
      key: "loanDate",
      render: (_, data) => new Date(data?.loanDate).toDateString(),
    },
    {
      title: "Loan Amount",
      dataIndex: "loanAmount",
      key: "loanAmount",
    },
    {
      title: "Installment Amount",
      dataIndex: "installmentAmount",
      key: "installmentAmount",
    },
    {
      title: "Installment",
      dataIndex: "installment",
      key: "installment",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Popconfirm
          title="Are you sure you want to delete this loan?"
          onConfirm={() => handleDelete(record.loanId)}
          okText="Yes"
          cancelText="No"
          placement="topRight"
        >
          <Button type="link" danger>
            Delete
          </Button>
        </Popconfirm>
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
        <h2>Employee Loan</h2>
        <Button
          type="primary"
          onClick={() => router.push("/component/Loan/create")}
        >
          Loan Request
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={data || []}
        rowKey="loanId"
        bordered
      />
    </div>
  );
};

export default LoanLanding;
