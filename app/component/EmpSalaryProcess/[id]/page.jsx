"use client";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { getDetailsBySalaryCode } from "@/api/employee";
import { Table, Button } from "antd";
import { ArrowLeftOutlined, DownloadOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const SalaryDetailsPage = () => {
  const router = useRouter();
  const { id } = useParams();
  const [salaryDetails, setSalaryDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDetailsBySalaryCode(id, setSalaryDetails, setLoading);
  }, [id]);

  // 📌 Function to Export Data to Excel
  const exportToExcel = () => {
    if (salaryDetails.length === 0) return;

    const worksheet = XLSX.utils.json_to_sheet(salaryDetails); // Convert data to worksheet
    const workbook = XLSX.utils.book_new(); // Create new Excel workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, "Salary Details");

    // Generate Excel file and trigger download
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(data, `Salary_Details_${id}.xlsx`);
  };

  const columns = [
    { title: "Employee Name", dataIndex: "employeeName", key: "employeeName" },
    { title: "Basic Salary", dataIndex: "basicSalary", key: "basicSalary" },
    {
      title: "Medical Allowance",
      dataIndex: "medicalAllowance",
      key: "medicalAllowance",
    },
    { title: "Conveyance", dataIndex: "conveyance", key: "conveyance" },
    { title: "Gross Salary", dataIndex: "grossSalary", key: "grossSalary" },
    { title: "Net Salary", dataIndex: "netSalary", key: "netSalary" },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <button
          onClick={() => router.back()}
          style={{
            backgroundColor: "transparent",
            border: "none",
            cursor: "pointer",
          }}
        >
          <ArrowLeftOutlined style={{ fontSize: "24px", color: "#0070f3" }} />
        </button>
        <h2 style={{ marginBottom: "20px" }}>
          Salary Details for Header ID: {id}
        </h2>
        <Button
          type="primary"
          icon={<DownloadOutlined />}
          onClick={exportToExcel}
        >
          Download Excel
        </Button>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <Table
          columns={columns}
          dataSource={salaryDetails}
          rowKey="employeeSalaryId"
        />
      )}
    </div>
  );
};

export default SalaryDetailsPage;
