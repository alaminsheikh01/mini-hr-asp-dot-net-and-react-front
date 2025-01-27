"use client";
import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Select, Input, DatePicker, Button, Row, Col } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { createLoan, getEmployees } from "@/api/employee";
import { useRouter } from "next/navigation";

const { Option } = Select;

const LoanCreate = () => {
  const router = useRouter();
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getEmployees(setEmployees, setLoading);
  }, []);

  const initialValues = {
    employeeId: "",
    loanType: "",
    loanAmount: "",
    installmentNumber: "",
    amountPerInstallment: "",
    effectiveDate: null,
    description: "",
  };

  const validationSchema = Yup.object({
    employeeId: Yup.string().required("Employee is required"),
    loanType: Yup.string().required("Loan Type is required"),
    loanAmount: Yup.number()
      .typeError("Loan Amount must be a number")
      .required("Loan Amount is required"),
    installmentNumber: Yup.number()
      .typeError("Installment Number must be a number")
      .required("Installment Number is required"),
    amountPerInstallment: Yup.number()
      .typeError("Amount Per Installment must be a number")
      .required("Amount Per Installment is required"),
    effectiveDate: Yup.date().nullable().required("Effective Date is required"),
  });

  const handleSubmit = (values, { resetForm }) => {
    const payload = {
      employeeId: values.employeeId,
      loanType: values.loanType,
      loanAmount: +values.loanAmount,
      installment: +values.installmentNumber,
      installmentAmount: +values.amountPerInstallment,
      loanDate: (values.effectiveDate).format("YYYY-MM-DD"),
      description: values.description,
    };
    createLoan(payload, setLoading);
    resetForm();
    router.push("/component/Loan");
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
        <h3 style={{ textAlign: "left" }}>Create Loan</h3>
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
                <label htmlFor="employeeId" style={{ fontWeight: "bold" }}>
                  Employee:
                </label>
                <Field name="employeeId">
                  {({ field }) => (
                    <Select
                      {...field}
                      placeholder="Select Employee"
                      style={{ width: "100%" }}
                      onChange={(value) => setFieldValue("employeeId", value)}
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
              </Col>

              <Col span={12}>
                <label htmlFor="loanType" style={{ fontWeight: "bold" }}>
                  Loan Type:
                </label>
                <Field name="loanType">
                  {({ field }) => (
                    <Select
                      {...field}
                      placeholder="Select Loan Type"
                      style={{ width: "100%" }}
                      onChange={(value) => setFieldValue("loanType", value)}
                    >
                      <Option value="personal">Personal</Option>
                      <Option value="home">Home</Option>
                    </Select>
                  )}
                </Field>
                <ErrorMessage
                  name="loanType"
                  component="div"
                  style={{ color: "red" }}
                />
              </Col>

              <Col span={12}>
                <label htmlFor="loanAmount" style={{ fontWeight: "bold" }}>
                  Loan Amount:
                </label>
                <Field name="loanAmount">
                  {({ field, form }) => (
                    <Input
                      {...field}
                      placeholder="Enter Loan Amount"
                      style={{ width: "100%" }}
                      onChange={(e) => {
                        const loanAmount = parseFloat(e.target.value) || 0;
                        form.setFieldValue("loanAmount", loanAmount);

                        // Recalculate Amount Per Installment
                        const installmentNumber =
                          parseFloat(form.values.installmentNumber) || 0;
                        const amountPerInstallment =
                          installmentNumber > 0
                            ? loanAmount / installmentNumber
                            : 0;
                        form.setFieldValue(
                          "amountPerInstallment",
                          amountPerInstallment.toFixed(2)
                        );
                      }}
                    />
                  )}
                </Field>
                <ErrorMessage
                  name="loanAmount"
                  component="div"
                  style={{ color: "red" }}
                />
              </Col>

              <Col span={12}>
                <label
                  htmlFor="installmentNumber"
                  style={{ fontWeight: "bold" }}
                >
                  Installment Number:
                </label>
                <Field name="installmentNumber">
                  {({ field, form }) => (
                    <Input
                      {...field}
                      placeholder="Enter Installment Number"
                      style={{ width: "100%" }}
                      onChange={(e) => {
                        const installmentNumber =
                          parseInt(e.target.value, 10) || 0;
                        form.setFieldValue(
                          "installmentNumber",
                          installmentNumber
                        );

                        // Recalculate Amount Per Installment
                        const loanAmount =
                          parseFloat(form.values.loanAmount) || 0;
                        const amountPerInstallment =
                          installmentNumber > 0
                            ? loanAmount / installmentNumber
                            : 0;
                        form.setFieldValue(
                          "amountPerInstallment",
                          amountPerInstallment.toFixed(2)
                        );
                      }}
                    />
                  )}
                </Field>
                <ErrorMessage
                  name="installmentNumber"
                  component="div"
                  style={{ color: "red" }}
                />
              </Col>

              {/* Amount Per Installment */}
              <Col span={12}>
                <label
                  htmlFor="amountPerInstallment"
                  style={{ fontWeight: "bold" }}
                >
                  Amount Per Installment:
                </label>
                <Field name="amountPerInstallment">
                  {({ field }) => (
                    <Input
                      {...field}
                      disabled={true}
                      placeholder="Calculated Amount Per Installment"
                      style={{ width: "100%" }}
                    />
                  )}
                </Field>
                <ErrorMessage
                  name="amountPerInstallment"
                  component="div"
                  style={{ color: "red" }}
                />
              </Col>

              <Col span={12}>
                <label htmlFor="effectiveDate" style={{ fontWeight: "bold" }}>
                  Effective Date:
                </label>
                <Field name="effectiveDate">
                  {({ field }) => (
                    <DatePicker
                      {...field}
                      placeholder="Select Effective Date"
                      style={{ width: "100%" }}
                      onChange={(date) => setFieldValue("effectiveDate", date)}
                    />
                  )}
                </Field>
                <ErrorMessage
                  name="effectiveDate"
                  component="div"
                  style={{ color: "red" }}
                />
              </Col>

              <Col span={24}>
                <label htmlFor="description" style={{ fontWeight: "bold" }}>
                  Description:
                </label>
                <Field name="description">
                  {({ field }) => (
                    <Input.TextArea
                      {...field}
                      rows={4}
                      placeholder="Enter Description"
                      style={{ width: "100%" }}
                    />
                  )}
                </Field>
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

export default LoanCreate;
