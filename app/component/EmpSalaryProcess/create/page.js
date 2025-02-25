"use client";
import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Select, Button, Row, Col, Collapse, Table, Spin } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import {
  createEmpSalary,
  getDepartments,
  getDesignations,
  getSalaryAssignLanding,
} from "@/api/employee";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const { Option } = Select;
const { Panel } = Collapse;

const EmployeeSalaryProcess = () => {
  const router = useRouter();
  const [departments, setDepartments] = useState([]);
  const [designations, setDesignations] = useState([]);
  const [salaryAssignments, setSalaryAssignments] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getDepartments(setDepartments, setLoading);
    getDesignations(setDesignations, setLoading);
    getSalaryAssignLanding(setSalaryAssignments, setLoading); // Fetch salary assignments
  }, []);

  const initialValues = {
    employeeIds: [],
    month: "",
    year: "",
    departmentId: "",
    designationId: "",
  };

  const validationSchema = Yup.object({
    month: Yup.string().required("Month is required"),
    year: Yup.number()
      .typeError("Year must be a number")
      .required("Year is required"),
  });

  const handleSubmit = (values, { resetForm }) => {
    if(values.employeeIds.length === 0) {
      return toast.warn("Please select at least one employee");
    }
    const payload = {
      employeeIds: values.employeeIds,
      salaryMonth: values.month,
      salaryYear: +values.year,
      departmentId: +values.departmentId || 0,
      designationId: +values.designationId || 0,
    };
    createEmpSalary(payload, setLoading);
    resetForm();
  };

  const columns = [
    { title: "Employee ID", dataIndex: "employeeId", key: "employeeId" },
    { title: "Employee Name", dataIndex: "employeeName", key: "employeeName" },
    { title: "Department", dataIndex: "departmentName", key: "departmentName" },
    {
      title: "Designation",
      dataIndex: "designationName",
      key: "designationName",
    },
    { title: "Gross Salary", dataIndex: "grossSalary", key: "grossSalary" },
    { title: "Net Salary", dataIndex: "netSalary", key: "netSalary" },
  ];

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "16px",
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
        <h3 style={{ textAlign: "left" }}>Employee Salary Process</h3>
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue, values, errors, touched, setTouched }) => (
          <Form
            style={{
              maxWidth: "1200px",
              margin: "0 auto",
              backgroundColor: "#f9f9f9",
              padding: "20px",
              borderRadius: "8px",
              boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Collapse defaultActiveKey={["1"]}>
              <Panel header="Employee Salary Information" key="1">
                <Row gutter={[16, 16]}>
                  <Col span={6}>
                    <div style={{ marginBottom: "15px" }}>
                      <label htmlFor="month" style={{ fontWeight: "bold" }}>
                        Month:
                      </label>
                      <Field name="month">
                        {({ field }) => (
                          <Select
                            {...field}
                            placeholder="Select Month"
                            style={{ width: "100%" }}
                            onChange={(value) => setFieldValue("month", value)}
                          >
                            {[
                              "January",
                              "February",
                              "March",
                              "April",
                              "May",
                              "June",
                              "July",
                              "August",
                              "September",
                              "October",
                              "November",
                              "December",
                            ].map((month) => (
                              <Option key={month} value={month}>
                                {month}
                              </Option>
                            ))}
                          </Select>
                        )}
                      </Field>
                      <ErrorMessage
                        name="month"
                        component="div"
                        style={{ color: "red" }}
                      />
                    </div>
                  </Col>

                  <Col span={6}>
                    <div style={{ marginBottom: "15px" }}>
                      <label htmlFor="year" style={{ fontWeight: "bold" }}>
                        Year:
                      </label>
                      <Field name="year">
                        {({ field }) => (
                          <Select
                            {...field}
                            placeholder="Select Year"
                            style={{ width: "100%" }}
                            onChange={(value) => setFieldValue("year", value)}
                          >
                            {Array.from({ length: 5 }, (_, i) => {
                              const year = new Date().getFullYear() - i;
                              return (
                                <Option key={year} value={year}>
                                  {year}
                                </Option>
                              );
                            })}
                          </Select>
                        )}
                      </Field>
                      <ErrorMessage
                        name="year"
                        component="div"
                        style={{ color: "red" }}
                      />
                    </div>
                  </Col>
                 
                  <Col span={6}>
                    <div style={{ textAlign: "left", marginTop: "20px" }}>
                      <Button
                        type="primary"
                        htmlType="submit"
                        loading={loading}
                      >
                        Generate
                      </Button>
                    </div>
                  </Col>
                </Row>
              </Panel>
            </Collapse>

            {/* Employee Selection Error Message - Now Inside Formik */}
            {touched.employeeIds && errors.employeeIds && (
              <div style={{ color: "red", marginTop: "10px" }}>
                {errors.employeeIds}
              </div>
            )}

            <div style={{ marginTop: "30px" }}>
              <h3>Salary Assignments</h3>
              <Spin spinning={loading}>
                <Table
                  columns={columns}
                  dataSource={salaryAssignments}
                  rowKey="salaryAssignId"
                  rowSelection={{
                    selectedRowKeys: values.employeeIds, // ✅ Sync with Formik
                    onChange: (selectedRowKeys) => {
                      setFieldValue("employeeIds", selectedRowKeys);
                      setTouched({ ...touched, employeeIds: true }); // ✅ Mark field as touched
                    },
                  }}
                  pagination={{ pageSize: 10 }}
                />
              </Spin>
            </div>

            {/* Submit Button */}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EmployeeSalaryProcess;
