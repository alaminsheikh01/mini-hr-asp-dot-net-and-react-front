"use client";
import React, { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  createEmployee,
  getDepartments,
  getDesignations,
  getEmployeeById,
  updateEmployee,
} from "@/api/employee";
import { Input, Select, Button, Typography, Row, Col, DatePicker } from "antd";
import { useSearchParams, useRouter } from "next/navigation";
import { ArrowLeftOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

const { Option } = Select;

const initialValues = {
  firstname: "",
  lastname: "",
  employeeID: "",
  gender: "",
  insuranceID: "",
  department: "",
  designation: "",
  email: "",
  phoneNumber: "",
  dateOfBirth: null,
  employeeStatus: "",
  employeeType: "",
  address: "",
  dateOfJoining: null,
};

const validationSchema = Yup.object({
  firstname: Yup.string().required("First Name is required"),
  lastname: Yup.string().required("Last Name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  phoneNumber: Yup.string()
    .matches(/^\d+$/, "Phone number must be digits only")
    .required("Phone number is required"),
});

const EmployeeCreate = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const employeeId = searchParams.get("id");

  const [departments, setDepartments] = React.useState([]);
  const [designations, setDesignations] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [employee, setEmployee] = React.useState(null);

  useEffect(() => {
    getDepartments(setDepartments, setLoading);
    getDesignations(setDesignations, setLoading);
    if (employeeId) {
      // getEmployeeById(employeeId, setEmployee, setLoading);
    }
  }, [employeeId]);

  const handleSubmit = (values) => {
    const payloadList = [];
    const payload = {
      firstName: values.firstname,
      lastName: values.lastname,
      employeeCode: values.employeeCode || "",
      gender: values.gender,
      grade: values.grade || 0,
      insuranceNumber: values.insuranceID,
      DepartmentId: values.department,
      DesignationId: values.designation,
      Email: values.email,
      PhoneNumber: values.phoneNumber,
      DateOfBirth: values?.dateOfBirth
        ? values?.dateOfBirth.format("YYYY-MM-DD")
        : null,
      employeeStatus: values.employeeStatus,
      EmployeeType: values.employeeType,
      Address: values.address,
      DateOfJoining: values.dateOfJoining
        ? values.dateOfJoining.format("YYYY-MM-DD")
        : null,
      tinNumber: values.tinNumber || 0,
    };
    payloadList.push(payload);
    if (employeeId) {
      updateEmployee(
        payload,
        setLoading,
        () => router.push("/component/EmpList"),
        employeeId
      );
    } else {
      createEmployee(payloadList, setLoading, () =>
        router.push("/component/EmpList")
      );
    }
  };

  return (
    <div style={{ padding: "10px", fontFamily: "Arial, sans-serif" }}>
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
        <h2 level={2} style={{ textAlign: "left", paddingBottom: "0px" }}>
          {employeeId ? "Employee Edit Page" : "Employee Create Page"}
        </h2>
      </div>

      <Formik
        enableReinitialize
        initialValues={employeeId ? employee : initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue }) => (
          <Form
            layout="vertical"
            style={{
              margin: "0 auto",
              backgroundColor: "#f9f9f9",
              padding: "20px",
              borderRadius: "8px",
              boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Row gutter={[16, 16]}>
              <Col span={8}>
                <div style={{ marginBottom: "15px" }}>
                  <label htmlFor="firstname" style={{ fontWeight: "bold" }}>
                    First Name:
                  </label>
                  <Field name="firstname">
                    {({ field }) => (
                      <Input {...field} placeholder="Enter first name" />
                    )}
                  </Field>
                  <ErrorMessage
                    name="firstname"
                    component="div"
                    style={{ color: "red" }}
                  />
                </div>
              </Col>

              <Col span={8}>
                <div style={{ marginBottom: "15px" }}>
                  <label htmlFor="lastname" style={{ fontWeight: "bold" }}>
                    Last Name:
                  </label>
                  <Field name="lastname">
                    {({ field }) => (
                      <Input {...field} placeholder="Enter last name" />
                    )}
                  </Field>
                  <ErrorMessage
                    name="lastname"
                    component="div"
                    style={{ color: "red" }}
                  />
                </div>
              </Col>
              <Col span={8}>
                <div style={{ marginBottom: "15px" }}>
                  <label htmlFor="employeeCode" style={{ fontWeight: "bold" }}>
                    Employee Code:
                  </label>
                  <Field name="employeeCode">
                    {({ field }) => (
                      <Input {...field} placeholder="Enter Employee Code" />
                    )}
                  </Field>
                  <ErrorMessage
                    name="employeeCode"
                    component="div"
                    style={{ color: "red" }}
                  />
                </div>
              </Col>

              <Col span={8}>
                <div style={{ marginBottom: "15px" }}>
                  <label htmlFor="department" style={{ fontWeight: "bold" }}>
                    Department:
                  </label>
                  <Field name="department">
                    {({ field }) => (
                      <Select
                        {...field}
                        placeholder="Select a department"
                        style={{ width: "100%" }}
                        value={field.value}
                        onChange={(value, op) =>
                          setFieldValue("department", value)
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
                    name="department"
                    component="div"
                    style={{ color: "red" }}
                  />
                </div>
              </Col>

              <Col span={8}>
                <div style={{ marginBottom: "15px" }}>
                  <label htmlFor="designation" style={{ fontWeight: "bold" }}>
                    Designation:
                  </label>
                  <Field name="designation">
                    {({ field }) => (
                      <Select
                        {...field}
                        placeholder="Select a designation"
                        style={{ width: "100%" }}
                        value={field.value}
                        onChange={(value, op) => {
                          setFieldValue("designation", value);
                        }}
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
                    name="designation"
                    component="div"
                    style={{ color: "red" }}
                  />
                </div>
              </Col>

              <Col span={8}>
                <div style={{ marginBottom: "15px" }}>
                  <label htmlFor="email" style={{ fontWeight: "bold" }}>
                    Email:
                  </label>
                  <Field name="email">
                    {({ field }) => (
                      <Input {...field} placeholder="Enter email" />
                    )}
                  </Field>
                  <ErrorMessage
                    name="email"
                    component="div"
                    style={{ color: "red" }}
                  />
                </div>
              </Col>
              <Col span={8}>
                <div style={{ marginBottom: "15px" }}>
                  <label htmlFor="gender" style={{ fontWeight: "bold" }}>
                    Gender:
                  </label>
                  <Field name="gender">
                    {({ field }) => (
                      <Select
                        {...field}
                        placeholder="Select Gender"
                        style={{ width: "100%" }}
                        value={field.value}
                        onChange={(value) => setFieldValue("gender", value)}
                      >
                        <Option value="male">Male</Option>
                        <Option value="female">Female</Option>
                        <Option value="other">Other</Option>
                      </Select>
                    )}
                  </Field>
                  <ErrorMessage
                    name="gender"
                    component="div"
                    style={{ color: "red" }}
                  />
                </div>
              </Col>

              <Col span={8}>
                <div style={{ marginBottom: "15px" }}>
                  <label htmlFor="phoneNumber" style={{ fontWeight: "bold" }}>
                    Phone Number:
                  </label>
                  <Field name="phoneNumber">
                    {({ field }) => (
                      <Input {...field} placeholder="Enter phone number" />
                    )}
                  </Field>
                  <ErrorMessage
                    name="phoneNumber"
                    component="div"
                    style={{ color: "red" }}
                  />
                </div>
              </Col>

              <Col span={8}>
                <div style={{ marginBottom: "15px" }}>
                  <label htmlFor="address" style={{ fontWeight: "bold" }}>
                    Address:
                  </label>
                  <Field name="address">
                    {({ field }) => (
                      <Input {...field} placeholder="Enter address" />
                    )}
                  </Field>
                  <ErrorMessage
                    name="address"
                    component="div"
                    style={{ color: "red" }}
                  />
                </div>
              </Col>

              <Col span={8}>
                <div style={{ marginBottom: "15px" }}>
                  <label htmlFor="dateOfJoining" style={{ fontWeight: "bold" }}>
                    Date of Joining:
                  </label>
                  <Field name="dateOfJoining">
                    {({ field }) => (
                      <DatePicker
                        {...field}
                        style={{ width: "100%" }}
                        placeholder="Select Date of Joining"
                        onChange={(value) =>
                          setFieldValue("dateOfJoining", value)
                        }
                      />
                    )}
                  </Field>
                  <ErrorMessage
                    name="dateOfJoining"
                    component="div"
                    style={{ color: "red" }}
                  />
                </div>
              </Col>

              <Col span={8}>
                <div style={{ marginBottom: "15px" }}>
                  <label
                    htmlFor="employeeStatus"
                    style={{ fontWeight: "bold" }}
                  >
                    Employee Status:
                  </label>
                  <Field name="employeeStatus">
                    {({ field }) => (
                      <Select
                        {...field}
                        placeholder="Select Employee Status"
                        style={{ width: "100%" }}
                        value={field.value}
                        onChange={(value, op) =>
                          setFieldValue("employeeStatus", value)
                        }
                      >
                        <Option value="Permanent">Permanent</Option>
                        <Option value="Provision">Provision</Option>
                        <Option value="Contractual">Contractual</Option>
                      </Select>
                    )}
                  </Field>
                  <ErrorMessage
                    name="employeeStatus"
                    component="div"
                    style={{ color: "red" }}
                  />
                </div>
              </Col>
              <Col span={8}>
                <div style={{ marginBottom: "15px" }}>
                  <label htmlFor="grade" style={{ fontWeight: "bold" }}>
                    Employee Grade:
                  </label>
                  <Field name="grade">
                    {({ field }) => (
                      <Select
                        {...field}
                        placeholder="Select Employee Grade"
                        style={{ width: "100%" }}
                        value={field.value}
                        onChange={(value, op) => setFieldValue("grade", value)}
                      >
                        <Option value="1">1</Option>
                        <Option value="2">2</Option>
                        <Option value="3">3</Option>
                        <Option value="4">4</Option>
                        <Option value="5">5</Option>
                        <Option value="6">6</Option>
                        <Option value="7">7</Option>
                        <Option value="8">8</Option>
                        <Option value="9">9</Option>
                        <Option value="10">10</Option>
                        <Option value="11">11</Option>
                        <Option value="12">12</Option>
                        <Option value="13">13</Option>
                        <Option value="14">14</Option>
                        <Option value="15">15</Option>
                      </Select>
                    )}
                  </Field>
                  <ErrorMessage
                    name="employeeStatus"
                    component="div"
                    style={{ color: "red" }}
                  />
                </div>
              </Col>
              <Col span={8}>
                <div style={{ marginBottom: "15px" }}>
                  <label htmlFor="insuranceID" style={{ fontWeight: "bold" }}>
                    Insurance ID:
                  </label>
                  <Field name="insuranceID">
                    {({ field }) => (
                      <Input {...field} placeholder="Enter Insurance ID" />
                    )}
                  </Field>
                  <ErrorMessage
                    name="insuranceID"
                    component="div"
                    style={{ color: "red" }}
                  />
                </div>
              </Col>
              <Col span={8}>
                <div style={{ marginBottom: "15px" }}>
                  <label htmlFor="tinNumber" style={{ fontWeight: "bold" }}>
                    TIN Number:
                  </label>
                  <Field name="tinNumber">
                    {({ field }) => (
                      <Input {...field} placeholder="Enter TIN Number" />
                    )}
                  </Field>
                  <ErrorMessage
                    name="tinNumber"
                    component="div"
                    style={{ color: "red" }}
                  />
                </div>
              </Col>

              <Col span={8}>
                <div style={{ marginBottom: "15px" }}>
                  <label htmlFor="dateOfBirth" style={{ fontWeight: "bold" }}>
                    Date of Birth:
                  </label>

                  <Field name="dateOfBirth">
                    {({ field }) => (
                      <DatePicker
                        {...field}
                        style={{ width: "100%" }}
                        placeholder="Select Date of Birth"
                        onChange={(value) =>
                          setFieldValue("dateOfBirth", value)
                        }
                      />
                    )}
                  </Field>
                  <ErrorMessage
                    name="dateOfBirth"
                    component="div"
                    style={{ color: "red" }}
                  />
                </div>
              </Col>

              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                style={{ marginTop: "0px" }}
              >
                {loading
                  ? "Loading..."
                  : !employeeId
                  ? "Create Employee"
                  : "Update Employee"}
              </Button>
            </Row>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EmployeeCreate;
