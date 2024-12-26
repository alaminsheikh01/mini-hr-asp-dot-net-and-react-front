"use client";
import { createDesignation } from "@/api/employee";
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Input, Button, Typography, Row, Col } from "antd";

const { Title } = Typography;

const DesignationCreate = () => {
  const initialValues = {
    name: "",
    code: "",
  };

  const [loading, setLoading] = React.useState(false);

  const validationSchema = Yup.object({
    name: Yup.string().required("Designation Name is required"),
    code: Yup.string().required("Designation Code is required"),
  });

  const handleSubmit = (values) => {
    createDesignation(values, setLoading);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <Title level={2} style={{ textAlign: "center" }}>
        Designation Create Page
      </Title>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({isSubmitting, errors, touched}) => (
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
                    Designation Name:
                  </label>
                  <Field name="name">
                    {({ field }) => (
                      <Input {...field} placeholder="Enter designation name" />
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
                    Designation Code:
                  </label>
                  <Field name="code">
                    {({ field }) => (
                      <Input {...field} placeholder="Enter designation code" />
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
              {loading ? "Submitting..." : "Create Designation"}
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default DesignationCreate;
