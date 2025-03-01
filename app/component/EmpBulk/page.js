"use client";
import React, { useState } from "react";
import * as XLSX from "xlsx";
import { Table, Button, Upload, message } from "antd";
import { Loading3QuartersOutlined, UploadOutlined } from "@ant-design/icons";
import { toast, ToastContainer } from "react-toastify";
import { createEmployee } from "@/api/employee";
import { useRouter } from "next/navigation";

const BulkAdd = () => {
  const [uploadedData, setUploadedData] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

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
        const date = new Date((excelSerial - 25569) * 86400000);
        return date.toISOString().split("T")[0];
      };

      const formattedData = parsedData.map((row) => ({
        ID: row["ID"] || "",
        firstName: row["First Name"] || "",
        lastName: row["Last Name"] || "",
        employeeCode: String(row["Employee Code"]) || "",
        departmentName: row["Department"] || "",
        departmentId: 0,
        designationName: row["Designation"] || "",
        designationId: 0,
        email: row["Email"] || "",
        gender: row["Gender"] || "",
        phoneNumber: String(row["Phone Number"]) || "",
        address: row["Address"] || "",
        DateOfJoining: excelDateToJSDate(row["Date Of Joining"]),
        employeeStatus: row["Employee Status"] || "",
        grade: +row["Grade"] || 0,
        dateOfBirth: excelDateToJSDate(row["Date Of Birth"]),
        insuranceNumber: String(row["Insurance ID"]) || "",
        tinNumber: +row["TIN Number"] || 0,
        dateOfJoining: excelDateToJSDate(row["Date Of Birth"]),
      }));

      setUploadedData(formattedData);
      message.success("File uploaded successfully!");
    };

    reader.readAsArrayBuffer(file);
  };

  const handleSave = () => {
    if (uploadedData.length === 0) {
      return toast.error("No data to save. Please upload a valid Excel file.");
    }
    createEmployee(uploadedData, setLoading, () =>
      router.push("/component/EmpList")
    );
  };

  const columns = [
    { title: "ID", dataIndex: "ID", key: "id", width: 80 },
    {
      title: "First Name",
      dataIndex: "firstName",
      key: "firstName",
      width: 120,
    },
    { title: "Last Name", dataIndex: "lastName", key: "lastName", width: 120 },
    {
      title: "Employee Code",
      dataIndex: "employeeCode",
      key: "employeeID",
      width: 150,
    },
    {
      title: "Department",
      dataIndex: "departmentName",
      key: "department",
      width: 120,
    },
    {
      title: "Designation",
      dataIndex: "designationName",
      key: "designation",
      width: 120,
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
    },
    { title: "Grade", dataIndex: "grade", key: "grade", width: 120 },
    {
      title: "Insurance ID",
      dataIndex: "insuranceNumber",
      key: "insuranceID",
      width: 150,
    },
    { title: "Email", dataIndex: "email", key: "email" },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      width: 180,
    },
    {
      title: "Date of Birth",
      dataIndex: "dateOfBirth",
      key: "dateOfBirth",
      width: 180,
    },
    { title: "Address", dataIndex: "address", key: "address" },
    {
      title: "Date of Joining",
      dataIndex: "dateOfJoining",
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
