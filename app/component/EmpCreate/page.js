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
import { calculateServicePeriod, initialValues } from "./helper";

const { Option } = Select;

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
      getEmployeeById(employeeId, setEmployee, setLoading);
    }
  }, [employeeId]);

  const handleSubmit = (values) => {
    const payloadList = [];
    const payload = {
      firstName: values.firstname,
      lastName: values.lastname,
      employeeCode: values.employeeCode || "",
      gender: values.gender,
      grade: +values.grade || 0,
      insuranceNumber: values.insuranceID,
      departmentId: values.department,
      designationId: values.designation,
      email: values.email,
      phoneNumber: values.phoneNumber,
      dateOfBirth: values?.dateOfBirth
        ? values?.dateOfBirth.format("YYYY-MM-DD")
        : null,
      employeeStatus: values.employeeStatus,
      employeeType: values.employeeType,
      address: values.address,
      dateOfJoining: values.dateOfJoining
        ? values.dateOfJoining.format("YYYY-MM-DD")
        : null,
      emergencyContact: values.emergencyContact,
      nid: values.nid,
      presentAddress: values.presentAddress,
      permanentAddress: values.permanentAddress,
      bloodGroup: values.bloodGroup,
      confirmationDate: values.confirmationDate
        ? values.confirmationDate.format("YYYY-MM-DD")
        : null,
      retirementOrResignation: values.retirementOrResignation
        ? values.retirementOrResignation.format("YYYY-MM-DD")
        : null,
      servicePeriod: values.servicePeriod || 0,
      salaryAccountNumber: values.salaryAccountNumber,
      etin: values.etin,
      academicQualifications: values.academicQualifications,
      certificateVerification: values.certificateVerification,
      policeVerification: values.policeVerification,
      disciplinaryAction: values.disciplinaryAction,
      jobLocation: values.jobLocation,
      tinNumber: +values.tinNumber || 0,
      employeeSalaryGrade: String(values.employeeSalaryGrade) || "",
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
                    {({ field, form }) => (
                      <DatePicker
                        {...field}
                        style={{ width: "100%" }}
                        placeholder="Select Date of Joining"
                        value={field.value ? field.value : null} // Ensure that field.value is a dayjs object or null
                        onChange={(value) =>
                          form.setFieldValue("dateOfJoining", value)
                        } // Set the moment object in Formik
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
                    {({ field, form }) => (
                      <Select
                        {...field}
                        placeholder="Select Employee Grade"
                        style={{ width: "100%" }}
                        value={field.value}
                        onChange={(value) => form.setFieldValue("grade", value)}
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
                    name="grade"
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

              <Col span={8}>
                <div style={{ marginBottom: "15px" }}>
                  <label htmlFor="jobLocation" style={{ fontWeight: "bold" }}>
                    Job Location:
                  </label>
                  <Field name="jobLocation">
                    {({ field }) => (
                      <Input {...field} placeholder="Enter job location" />
                    )}
                  </Field>
                  <ErrorMessage
                    name="jobLocation"
                    component="div"
                    style={{ color: "red" }}
                  />
                </div>
              </Col>
              <Col span={8}>
                <div style={{ marginBottom: "15px" }}>
                  <label
                    htmlFor="employeeSalaryGrade"
                    style={{ fontWeight: "bold" }}
                  >
                    Employee Salary Grade:
                  </label>
                  <Field name="employeeSalaryGrade">
                    {({ field, form }) => (
                      <Select
                        {...field}
                        placeholder="Select Employee Salary Grade"
                        style={{ width: "100%" }}
                        value={field.value}
                        onChange={(value) =>
                          form.setFieldValue("employeeSalaryGrade", value)
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
                </div>
              </Col>

              <Col span={8}>
                <div style={{ marginBottom: "15px" }}>
                  <label
                    htmlFor="emergencyContact"
                    style={{ fontWeight: "bold" }}
                  >
                    Emergency Contact:
                  </label>
                  <Field name="emergencyContact">
                    {({ field }) => (
                      <Input {...field} placeholder="Enter emergency contact" />
                    )}
                  </Field>
                  <ErrorMessage
                    name="emergencyContact"
                    component="div"
                    style={{ color: "red" }}
                  />
                </div>
              </Col>
              <Col span={8}>
                <div style={{ marginBottom: "15px" }}>
                  <label htmlFor="nid" style={{ fontWeight: "bold" }}>
                    NID:
                  </label>
                  <Field name="nid">
                    {({ field }) => (
                      <Input {...field} placeholder="Enter NID" />
                    )}
                  </Field>
                  <ErrorMessage
                    name="nid"
                    component="div"
                    style={{ color: "red" }}
                  />
                </div>
              </Col>
              <Col span={8}>
                <div style={{ marginBottom: "15px" }}>
                  <label
                    htmlFor="presentAddress"
                    style={{ fontWeight: "bold" }}
                  >
                    Present Address:
                  </label>
                  <Field name="presentAddress">
                    {({ field }) => (
                      <Input {...field} placeholder="Enter present address" />
                    )}
                  </Field>
                  <ErrorMessage
                    name="presentAddress"
                    component="div"
                    style={{ color: "red" }}
                  />
                </div>
              </Col>
              <Col span={8}>
                <div style={{ marginBottom: "15px" }}>
                  <label
                    htmlFor="permanentAddress"
                    style={{ fontWeight: "bold" }}
                  >
                    Permanent Address:
                  </label>
                  <Field name="permanentAddress">
                    {({ field }) => (
                      <Input {...field} placeholder="Enter permanent address" />
                    )}
                  </Field>
                  <ErrorMessage
                    name="permanentAddress"
                    component="div"
                    style={{ color: "red" }}
                  />
                </div>
              </Col>
              <Col span={8}>
                <div style={{ marginBottom: "15px" }}>
                  <label htmlFor="bloodGroup" style={{ fontWeight: "bold" }}>
                    Blood Group:
                  </label>
                  <Field name="bloodGroup">
                    {({ field }) => (
                      <Input {...field} placeholder="Enter blood group" />
                    )}
                  </Field>
                  <ErrorMessage
                    name="bloodGroup"
                    component="div"
                    style={{ color: "red" }}
                  />
                </div>
              </Col>
              <Col span={8}>
                <div style={{ marginBottom: "15px" }}>
                  <label
                    htmlFor="confirmationDate"
                    style={{ fontWeight: "bold" }}
                  >
                    Confirmation Date:
                  </label>
                  <Field name="confirmationDate">
                    {({ field, form }) => (
                      <DatePicker
                        {...field}
                        style={{ width: "100%" }}
                        placeholder="Select Confirmation Date"
                        value={field.value ? field.value : null}
                        onChange={(value) => {
                          form.setFieldValue("confirmationDate", value);
                          calculateServicePeriod(
                            value,
                            form.values.retirementOrResignation,
                            form.setFieldValue
                          );
                        }}
                      />
                    )}
                  </Field>
                  <ErrorMessage
                    name="confirmationDate"
                    component="div"
                    style={{ color: "red" }}
                  />
                </div>
              </Col>

              <Col span={8}>
                <div style={{ marginBottom: "15px" }}>
                  <label
                    htmlFor="retirementOrResignation"
                    style={{ fontWeight: "bold" }}
                  >
                    Retirement or Resignation:
                  </label>
                  <Field name="retirementOrResignation">
                    {({ field, form }) => (
                      <DatePicker
                        {...field}
                        style={{ width: "100%" }}
                        placeholder="Select Retirement or Resignation Date"
                        value={field.value ? field.value : null}
                        onChange={(value) => {
                          form.setFieldValue("retirementOrResignation", value);
                          calculateServicePeriod(
                            form.values.confirmationDate,
                            value,
                            form.setFieldValue
                          );
                        }}
                      />
                    )}
                  </Field>
                  <ErrorMessage
                    name="retirementOrResignation"
                    component="div"
                    style={{ color: "red" }}
                  />
                </div>
              </Col>

              <Col span={8}>
                <div style={{ marginBottom: "15px" }}>
                  <label htmlFor="servicePeriod" style={{ fontWeight: "bold" }}>
                    Service Period:
                  </label>
                  <Field name="servicePeriod">
                    {({ field }) => (
                      <Input
                        {...field}
                        placeholder="Service period (Auto-calculated)"
                        disabled
                      />
                    )}
                  </Field>
                  <ErrorMessage
                    name="servicePeriod"
                    component="div"
                    style={{ color: "red" }}
                  />
                </div>
              </Col>

              <Col span={8}>
                <div style={{ marginBottom: "15px" }}>
                  <label
                    htmlFor="salaryAccountNumber"
                    style={{ fontWeight: "bold" }}
                  >
                    Salary Account Number:
                  </label>
                  <Field name="salaryAccountNumber">
                    {({ field }) => (
                      <Input
                        {...field}
                        placeholder="Enter salary account number"
                      />
                    )}
                  </Field>
                  <ErrorMessage
                    name="salaryAccountNumber"
                    component="div"
                    style={{ color: "red" }}
                  />
                </div>
              </Col>
              <Col span={8}>
                <div style={{ marginBottom: "15px" }}>
                  <label htmlFor="etin" style={{ fontWeight: "bold" }}>
                    ETIN:
                  </label>
                  <Field name="etin">
                    {({ field }) => (
                      <Input {...field} placeholder="Enter ETIN" />
                    )}
                  </Field>
                  <ErrorMessage
                    name="etin"
                    component="div"
                    style={{ color: "red" }}
                  />
                </div>
              </Col>
              <Col span={8}>
                <div style={{ marginBottom: "15px" }}>
                  <label
                    htmlFor="academicQualifications"
                    style={{ fontWeight: "bold" }}
                  >
                    Academic Qualifications:
                  </label>
                  <Field name="academicQualifications">
                    {({ field }) => (
                      <Input
                        {...field}
                        placeholder="Enter academic qualifications"
                      />
                    )}
                  </Field>
                  <ErrorMessage
                    name="academicQualifications"
                    component="div"
                    style={{ color: "red" }}
                  />
                </div>
              </Col>
              <Col span={8}>
                <div style={{ marginBottom: "15px" }}>
                  <label
                    htmlFor="certificateVerification"
                    style={{ fontWeight: "bold" }}
                  >
                    Certificate Verification:
                  </label>
                  <Field name="certificateVerification">
                    {({ field }) => (
                      <Select
                        {...field}
                        placeholder="Select Certificate Verification"
                        style={{ width: "100%" }}
                        value={field.value}
                        onChange={(value, op) =>
                          setFieldValue("certificateVerification", value)
                        }
                      >
                        <Option value={true}>Yes</Option>
                        <Option value={false}>No</Option>
                      </Select>
                    )}
                  </Field>
                  <ErrorMessage
                    name="certificateVerification"
                    component="div"
                    style={{ color: "red" }}
                  />
                </div>
              </Col>
              <Col span={8}>
                <div style={{ marginBottom: "15px" }}>
                  <label
                    htmlFor="policeVerification"
                    style={{ fontWeight: "bold" }}
                  >
                    Police Verification:
                  </label>
                  <Field name="policeVerification">
                    {({ field }) => (
                      <Select
                        {...field}
                        placeholder="Select Police Verification"
                        style={{ width: "100%" }}
                        value={field.value}
                        onChange={(value, op) =>
                          setFieldValue("policeVerification", value)
                        }
                      >
                        <Option value={true}>Yes</Option>
                        <Option value={false}>No</Option>
                      </Select>
                    )}
                  </Field>
                  <ErrorMessage
                    name="policeVerification"
                    component="div"
                    style={{ color: "red" }}
                  />
                </div>
              </Col>
              <Col span={8}>
                <div style={{ marginBottom: "15px" }}>
                  <label
                    htmlFor="disciplinaryAction"
                    style={{ fontWeight: "bold" }}
                  >
                    Disciplinary Action:
                  </label>
                  <Field name="disciplinaryAction">
                    {({ field }) => (
                      <Select
                        {...field}
                        placeholder="Select Disciplinary Action"
                        style={{ width: "100%" }}
                        value={field.value}
                        onChange={(value, op) =>
                          setFieldValue("disciplinaryAction", value)
                        }
                      >
                        <Option value={true}>Yes</Option>
                        <Option value={false}>No</Option>
                      </Select>
                    )}
                  </Field>
                  <ErrorMessage
                    name="disciplinaryAction"
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
