"use client";
import React, { useState } from "react";
import * as XLSX from "xlsx";
import { Table, Button, Upload, message } from "antd";
import { Loading3QuartersOutlined, UploadOutlined } from "@ant-design/icons";
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

      const excelDateToJSDate = (excelSerial) => {
        if (!excelSerial || isNaN(excelSerial)) return null;
        const date = new Date((excelSerial - 25569) * 86400000); // Adjust for Excel epoch
        return date.toISOString().split("T")[0]; // Format as YYYY-MM-DD
      };

      const formattedData = parsedData.map((row) => ({
        ID: row["ID"] || "",
        FirstName: row["First Name"] || "",
        LastName: row["Last Name"] || "",
        EmployeeID: String(row["Employee Id"]) || "",
        Department: row["Department"] || "",
        Designation: row["Designation"] || "",
        Gender: row['Gender'] || "",
        Grade: row["Grade"] || "",
        InsuranceID: String(row["Insurance ID"]) || "",
        Email: row["Email"] || "",
        PhoneNumber: String(row["Phone Number"]) || "",
        DateOfBirth: excelDateToJSDate(row["Date Of Birth"]),
        Address: row["Address"] || "",
        DateOfJoining: excelDateToJSDate(row["Date Of Joining"]),
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

    try {
      await createEmployee(
        uploadedData,
        () => setLoading(false),
        () => router.push("/component/EmpList")
      );
      toast.success("Employees saved successfully!");
    } catch (error) {
      toast.error("Failed to save employees");
    }
  };

  const columns = [
    { title: "ID", dataIndex: "ID", key: "id", width: 80 },
    {
      title: "First Name",
      dataIndex: "FirstName",
      key: "firstName",
      width: 120,
    },
    { title: "Last Name", dataIndex: "LastName", key: "lastName", width: 120 },
    {
      title: "Employee ID",
      dataIndex: "EmployeeID",
      key: "employeeID",
      width: 150,
    },
    {
      title: "Department",
      dataIndex: "Department",
      key: "department",
      width: 120,
    },
    {
      title: "Designation",
      dataIndex: "Designation",
      key: "designation",
      width: 120,
    },
    {
      title: 'Gender',
      dataIndex:'Gender',
      key:'gender'
    },
    { title: "Grade", dataIndex: "Grade", key: "grade", width: 120 },
    {
      title: "Insurance ID",
      dataIndex: "InsuranceID",
      key: "insuranceID",
      width: 150,
    },
    { title: "Email", dataIndex: "Email", key: "email" },
    { title: "Phone Number", dataIndex: "PhoneNumber", key: "phoneNumber", width: 180 },
    {
      title: "Date of Birth",
      dataIndex: "DateOfBirth",
      key: "dateOfBirth",
      width: 180,
    },
    { title: "Address", dataIndex: "Address", key: "address" },
    {
      title: "Date of Joining",
      dataIndex: "DateOfJoining",
      key: "dateOfJoining",
      width: 180,
    },
  ];

  return (
    <div>
      {loading && <Loading3QuartersOutlined />}
      <ToastContainer position="top-right" autoClose={3000} />
      <h2 className="text-lg mb-5">Bulk Employee Upload</h2>
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
            style={{
              marginTop: "20px",
              marginBottom: "20px",
              marginLeft: "20px",
            }}
          >
            Save All
          </Button>
          <Table
            scroll={{ x: 1500 }}
            dataSource={uploadedData}
            columns={columns}
            rowKey={(record, index) => index}
          />
        </>
      )}
    </div>
  );
};

export default BulkAdd;
