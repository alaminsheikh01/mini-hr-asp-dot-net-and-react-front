"use client";
import React, { useState } from "react";
import * as XLSX from "xlsx";
import { Table, Button, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { toast, ToastContainer } from "react-toastify";
import { createEmployee } from "@/api/employee";

const BulkAdd = () => {
  const [uploadedData, setUploadedData] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleFileUpload = (info) => {
    const file = info.fileList?.[0].originFileObj;
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const data = new Uint8Array(event.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const parsedData = XLSX.utils.sheet_to_json(sheet);

      // Transform Date and other fields if needed
      const formattedData = parsedData.map((row) => ({
        ...row,
        Date: row.Date
          ? new Date(row.Date * 86400000 + Date.parse("1899-12-30"))
              .toISOString()
              .split("T")[0]
          : null,
      }));

      setUploadedData(formattedData);
      message.success("File uploaded successfully!");
    };
    reader.readAsArrayBuffer(file);
  };

  const handleSave = async () => {
    if (uploadedData.length === 0) {
      return toast.error("No data to save. Please upload a valid Excel file.");
    }

    const payload = uploadedData.map((row) => ({
      FirstName: row["First Name"],
      LastName: row["Last Name"],
      DepartmentId: row["Department ID"],
      DesignationId: row["Designation ID"],
      Email: row["Email"],
      PhoneNumber: row["Phone Number"],
      Address: row["Address"],
      City: row["City"],
      DateOfJoining: row.Date,
      GrossSalary: row["Gross Salary"],
    }));

    try {
      await createEmployee(payload, () => setLoading(false), () =>
        router.push("/component/EmpList")
      );
    } catch (error) {
      toast.error("Failed to save employees");
    }
  };

  const columns = [
    {
      title: "First Name",
      dataIndex: "First Name",
      key: "firstName",
    },
    {
      title: "Last Name",
      dataIndex: "Last Name",
      key: "lastName",
    },
    {
      title: "Email",
      dataIndex: "Email",
      key: "email",
    },
    {
      title: "Salary",
      dataIndex: "Gross Salary",
      key: "grossSalary",
    },
    {
      title: "Date",
      dataIndex: "Date",
      key: "date",
    },
  ];

  return (
    <div>
        {loading && <Loader />}
      <ToastContainer position="top-right" autoClose={3000} />
      <h1>Bulk Employee Upload</h1>
      <Upload
        accept=".xlsx, .xls"
        beforeUpload={() => false}
        onChange={handleFileUpload}
        showUploadList={false}
      >
        <Button icon={<UploadOutlined />}>Click to Upload</Button>
      </Upload>
      {uploadedData.length > 0 && (
        <>
          <Button
            type="primary"
            onClick={handleSave}
            style={{ marginTop: "20px", marginBottom: "20px", marginLeft: "20px" }}
          >
            Save All
          </Button>
          <Table
            dataSource={uploadedData}
            columns={columns}
            rowKey={(record, index) => index} // Use index as a unique key for simplicity
          />
        </>
      )}
    </div>
  );
};

export default BulkAdd;
