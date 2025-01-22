"use client";
import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Select, Button, Row, Col, Collapse } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import {
  createEmpSalary,
  getDepartments,
  getDesignations,
  getEmployees,
} from "@/api/employee";
import { useRouter } from "next/navigation";

const { Option } = Select;
const { Panel } = Collapse;

const EmployeeSalaryProcess = () => {
    const router = useRouter();
  const [departments, setDepartments] = useState([]);
  const [designations, setDesignations] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getDepartments(setDepartments, setLoading);
    getDesignations(setDesignations, setLoading);
    getEmployees(setEmployees, setLoading);
  }, []);

  const initialValues = {
    employeeId: "",
    month: "",
    year: "",
    departmentId: "",
    designationId: "",
  };

  const validationSchema = Yup.object({
    employeeId: Yup.string().required("Employee is required"),
    month: Yup.string().required("Month is required"),
    year: Yup.number()
      .typeError("Year must be a number")
      .required("Year is required"),
  });

  const handleSubmit = (values, { resetForm }) => {
    const payload = {
      employeeId: values.employeeId,
      salaryMonth: values.month,
      salaryYear: +values.year,
      departmentId: values.departmentId,
      designationId: values.designationId,
    };
    createEmpSalary(payload, setLoading);
    resetForm();
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "20px" }}>
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
        {({ setFieldValue }) => (
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
              <Panel header="Collapse" key="1">
                <Row gutter={[16, 16]}>
                  <Col span={6}>
                    <div style={{ marginBottom: "15px" }}>
                      <label
                        htmlFor="employeeId"
                        style={{ fontWeight: "bold" }}
                      >
                        Employee:
                      </label>
                      <Field name="employeeId">
                        {({ field }) => (
                          <Select
                            {...field}
                            placeholder="Select Employee"
                            style={{ width: "100%" }}
                            value={field.value}
                            onChange={(value) =>
                              setFieldValue("employeeId", value)
                            }
                          >
                            {employees.map((employee) => (
                              <Option
                                key={employee.employeeId}
                                value={employee.employeeId}
                              >
                                {employee.firstName} {employee.lastName}
                              </Option>
                            ))}
                          </Select>
                        )}
                      </Field>
                      <ErrorMessage
                        name="employeeId"
                        component="div"
                        style={{ color: "red" }}
                      />
                    </div>
                  </Col>

                  {/* Month Selection */}
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

                  {/* Year Selection */}
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

                  {/* Department Selection */}
                  <Col span={6}>
                    <div style={{ marginBottom: "15px" }}>
                      <label
                        htmlFor="departmentId"
                        style={{ fontWeight: "bold" }}
                      >
                        Department:
                      </label>
                      <Field name="departmentId">
                        {({ field }) => (
                          <Select
                            {...field}
                            placeholder="Select Department"
                            style={{ width: "100%" }}
                            onChange={(value) =>
                              setFieldValue("departmentId", value)
                            }
                          >
                            {departments.map((department) => (
                              <Option
                                key={department.value}
                                value={department.value}
                              >
                                {department.label}
                              </Option>
                            ))}
                          </Select>
                        )}
                      </Field>
                      <ErrorMessage
                        name="departmentId"
                        component="div"
                        style={{ color: "red" }}
                      />
                    </div>
                  </Col>

                  {/* Designation Selection */}
                  <Col span={6}>
                    <div style={{ marginBottom: "15px" }}>
                      <label
                        htmlFor="designationId"
                        style={{ fontWeight: "bold" }}
                      >
                        Designation:
                      </label>
                      <Field name="designationId">
                        {({ field }) => (
                          <Select
                            {...field}
                            placeholder="Select Designation"
                            style={{ width: "100%" }}
                            onChange={(value) =>
                              setFieldValue("designationId", value)
                            }
                          >
                            {designations.map((designation) => (
                              <Option
                                key={designation.value}
                                value={designation.value}
                              >
                                {designation.label}
                              </Option>
                            ))}
                          </Select>
                        )}
                      </Field>
                      <ErrorMessage
                        name="designationId"
                        component="div"
                        style={{ color: "red" }}
                      />
                    </div>
                  </Col>

                  {/* Submit Button */}
                  <Col span={6} style={{ marginTop: "20px" }}>
                    <Button type="primary" htmlType="submit" loading={loading}>
                      Generate
                    </Button>
                  </Col>
                </Row>
              </Panel>
            </Collapse>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EmployeeSalaryProcess;
