'use client';
import { createDepartment } from "@/api/employee"; // Replace with your API endpoint for department creation
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Input, Button, Typography, Row, Col } from "antd";

const { Title } = Typography;

const DepartmentCreate = () => {
  const initialValues = {
    name: "",
    code: "",
  };

  const [loading, setLoading] = React.useState(false);

  const validationSchema = Yup.object({
    name: Yup.string().required("Department Name is required"),
    code: Yup.string().required("Department Code is required"),
  });

  const handleSubmit = (values, { resetForm }) => {
    createDepartment(values, setLoading); // Replace with your API function
    resetForm();
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <Title level={2} style={{ textAlign: "center" }}>
        Department Create Page
      </Title>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({}) => (
          <Form
            style={{
              maxWidth: "600px",
              margin: "0 auto",
              backgroundColor: "#f9f9f9",
              padding: "20px",
              borderRadius: "8px",
              boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Row gutter={[16, 16]}>
              <Col span={24}>
                <div style={{ marginBottom: "15px" }}>
                  <label htmlFor="name" style={{ fontWeight: "bold" }}>
                    Department Name:
                  </label>
                  <Field name="name">
                    {({ field }) => (
                      <Input {...field} placeholder="Enter department name" />
                    )}
                  </Field>
                  <ErrorMessage
                    name="name"
                    component="div"
                    style={{ color: "red" }}
                  />
                </div>
              </Col>

              <Col span={24}>
                <div style={{ marginBottom: "15px" }}>
                  <label htmlFor="code" style={{ fontWeight: "bold" }}>
                    Department Code:
                  </label>
                  <Field name="code">
                    {({ field }) => (
                      <Input {...field} placeholder="Enter department code" />
                    )}
                  </Field>
                  <ErrorMessage
                    name="code"
                    component="div"
                    style={{ color: "red" }}
                  />
                </div>
              </Col>
            </Row>

            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              style={{ width: "100%" }}
            >
              {loading ? "Submitting..." : "Create Department"}
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default DepartmentCreate;
