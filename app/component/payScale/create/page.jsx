"use client";
import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Select, Input, Button, Row, Col } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { createPayScaleSetup } from "@/api/employee";
import { useRouter } from "next/navigation";

const { Option } = Select;

const PayScaleCreate = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const initialValues = {
    employeeGrade: "",
    employeeSalaryGrade: "",
    basicSalary: "",
    houseRent: "",
    medicalAllowance: "",
    conveyance: "",
    carAllowance: "",
    driversSalaryReimbursement: "",
    delFlag: "",
  };

  const validationSchema = Yup.object({
    employeeGrade: Yup.string().required("Employee Grade is required"),
    employeeSalaryGrade: Yup.string().required(
      "Employee Salary Grade is required"
    ),
    basicSalary: Yup.number()
      .typeError("Basic Salary must be a number")
      .required("Basic Salary is required"),
    houseRent: Yup.number()
      .typeError("House Rent must be a number")
      .required("House Rent is required"),
    medicalAllowance: Yup.number()
      .typeError("Medical Allowance must be a number")
      .required("Medical Allowance is required"),
    conveyance: Yup.number()
      .typeError("Conveyance must be a number")
      .required("Conveyance is required"),
    carAllowance: Yup.number()
      .typeError("Car Allowance must be a number")
      .required("Car Allowance is required"),
  });

  const handleSubmit = (values) => {
    const payload = {
      employeeGrade: String(values.employeeGrade) || "",
      employeeSalaryGrade: String(values.employeeSalaryGrade) || "",
      basicSalary: +values.basicSalary,
      houseRent: +values.houseRent,
      medicalAllowance: +values.medicalAllowance,
      conveyance: +values.conveyance,
      carAllowance: +values.carAllowance,
      driversSalaryReimbursement: +values.driversSalaryReimbursement,
      delFlag: values.delFlag || "",
    };

    createPayScaleSetup(payload, setLoading);
    router.push("/component/payScale");
  };

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
        <h3 style={{ textAlign: "left" }}>Create PayScale</h3>
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue }) => (
          <Form>
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <label htmlFor="employeeGrade" style={{ fontWeight: "bold" }}>
                  Employee Grade:
                </label>
                <Field name="employeeGrade">
                  {({ field }) => (
                    <Select
                      {...field}
                      placeholder="Select Employee Grade"
                      style={{ width: "100%" }}
                      onChange={(value) =>
                        setFieldValue("employeeGrade", value)
                      }
                    >
                      {[...Array(15).keys()].map((i) => (
                        <Option key={i + 1} value={i + 1}>
                          {i + 1}
                        </Option>
                      ))}
                    </Select>
                  )}
                </Field>
                <ErrorMessage
                  name="employeeGrade"
                  component="div"
                  style={{ color: "red" }}
                />
              </Col>

              <Col span={12}>
                <label
                  htmlFor="employeeSalaryGrade"
                  style={{ fontWeight: "bold" }}
                >
                  Employee Salary Grade:
                </label>
                <Field name="employeeSalaryGrade">
                  {({ field }) => (
                    <Select
                      {...field}
                      placeholder="Select Salary Grade"
                      style={{ width: "100%" }}
                      onChange={(value) =>
                        setFieldValue("employeeSalaryGrade", value)
                      }
                    >
                      {[...Array(15).keys()].map((i) => (
                        <Option key={i + 1} value={i + 1}>
                          {i + 1}
                        </Option>
                      ))}
                    </Select>
                  )}
                </Field>
                <ErrorMessage
                  name="employeeSalaryGrade"
                  component="div"
                  style={{ color: "red" }}
                />
              </Col>

              <Col span={12}>
                <label htmlFor="basicSalary" style={{ fontWeight: "bold" }}>
                  Basic Salary:
                </label>
                <Field name="basicSalary">
                  {({ field }) => (
                    <Input
                      {...field}
                      placeholder="Enter Basic Salary"
                      style={{ width: "100%" }}
                    />
                  )}
                </Field>
                <ErrorMessage
                  name="basicSalary"
                  component="div"
                  style={{ color: "red" }}
                />
              </Col>

              <Col span={12}>
                <label htmlFor="houseRent" style={{ fontWeight: "bold" }}>
                  House Rent:
                </label>
                <Field name="houseRent">
                  {({ field }) => (
                    <Input
                      {...field}
                      placeholder="Enter House Rent"
                      style={{ width: "100%" }}
                    />
                  )}
                </Field>
                <ErrorMessage
                  name="houseRent"
                  component="div"
                  style={{ color: "red" }}
                />
              </Col>

              <Col span={12}>
                <label
                  htmlFor="medicalAllowance"
                  style={{ fontWeight: "bold" }}
                >
                  Medical Allowance:
                </label>
                <Field name="medicalAllowance">
                  {({ field }) => (
                    <Input
                      {...field}
                      placeholder="Enter Medical Allowance"
                      style={{ width: "100%" }}
                    />
                  )}
                </Field>
                <ErrorMessage
                  name="medicalAllowance"
                  component="div"
                  style={{ color: "red" }}
                />
              </Col>

              <Col span={12}>
                <label htmlFor="conveyance" style={{ fontWeight: "bold" }}>
                  Conveyance:
                </label>
                <Field name="conveyance">
                  {({ field }) => (
                    <Input
                      {...field}
                      placeholder="Enter Conveyance"
                      style={{ width: "100%" }}
                    />
                  )}
                </Field>
                <ErrorMessage
                  name="conveyance"
                  component="div"
                  style={{ color: "red" }}
                />
              </Col>

              <Col span={12}>
                <label htmlFor="carAllowance" style={{ fontWeight: "bold" }}>
                  Car Allowance:
                </label>
                <Field name="carAllowance">
                  {({ field }) => (
                    <Input
                      {...field}
                      placeholder="Enter Car Allowance"
                      style={{ width: "100%" }}
                    />
                  )}
                </Field>
                <ErrorMessage
                  name="carAllowance"
                  component="div"
                  style={{ color: "red" }}
                />
              </Col>

              <Col span={12}>
                <label
                  htmlFor="driversSalaryReimbursement"
                  style={{ fontWeight: "bold" }}
                >
                  Drivers Salary Reimbursement:
                </label>
                <Field name="driversSalaryReimbursement">
                  {({ field }) => (
                    <Input
                      {...field}
                      placeholder="Enter Drivers Salary Reimbursement"
                      style={{ width: "100%" }}
                    />
                  )}
                </Field>
                <ErrorMessage
                  name="driversSalaryReimbursement"
                  component="div"
                  style={{ color: "red" }}
                />
              </Col>

              <Col span={12}>
                <label htmlFor="delFlag" style={{ fontWeight: "bold" }}>
                  DelFlag:
                </label>
                <Field name="delFlag">
                  {({ field }) => (
                    <Select
                      {...field}
                      placeholder="Select DelFlag"
                      style={{ width: "100%" }}
                      onChange={(value) => setFieldValue("delFlag", value)}
                    >
                      <Option value="true">True</Option>
                      <Option value="false">False</Option>
                    </Select>
                  )}
                </Field>
                <ErrorMessage
                  name="delFlag"
                  component="div"
                  style={{ color: "red" }}
                />
              </Col>

              <Col
                span={24}
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  marginTop: "16px",
                }}
              >
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  style={{ marginRight: "8px" }}
                >
                  Submit
                </Button>
              </Col>
            </Row>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default PayScaleCreate;
