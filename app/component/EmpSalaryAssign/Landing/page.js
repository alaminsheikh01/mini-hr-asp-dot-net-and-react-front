"use client";
import { getEmployeesAssign } from "@/api/employee";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Drawer, Divider, Input } from "antd";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [basicSalary, setBasicSalary] = useState(0); // State to store the basic salary input

  const router = useRouter();

  useEffect(() => {
    getEmployeesAssign(setEmployees, setLoading);
  }, []);

  const showDrawer = (employee) => {
    setSelectedEmployee(employee);
    setBasicSalary(
      Math.min(employee.grossSalary * 0.45, 10000)
    );
    setDrawerVisible(true);
  };

  const closeDrawer = () => {
    setDrawerVisible(false);
    setSelectedEmployee(null);
    setBasicSalary(0);
  };

  const calculateSalaryDetails = (basicSalary) => {
    const houseRent = basicSalary * 0.1;
    const medicalAllowance = basicSalary * 0.0352; // Medical Allowance is 3.52% of Basic
    const conveyance = basicSalary * 0.03; // Conveyance is 3% of Basic
    const totalSalary = basicSalary + houseRent + medicalAllowance + conveyance;

    return { houseRent, medicalAllowance, conveyance, totalSalary };
  };
  
  const handleBasicSalaryChange = (newBasicSalary) => {
    const { houseRent, medicalAllowance, conveyance, totalSalary } =
      calculateSalaryDetails(newBasicSalary);
  
    setSelectedEmployee((prevEmployee) => ({
      ...prevEmployee,
      basicSalary: +newBasicSalary || 0,
      houseRent: +houseRent.toFixed(3),
      medicalAllowance: +medicalAllowance.toFixed(3),
      conveyance: +conveyance.toFixed(3),
      totalSalary: +totalSalary.toFixed(3),
    }));
  };

  if (loading) return <p>Loading employees...</p>;

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ textAlign: "left", marginBottom: "20px" }}>
        Employee Salary Assign List
      </h1>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginBottom: "20px",
        }}
      >
        <thead>
          <tr style={{ backgroundColor: "#f4f4f4", textAlign: "left" }}>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>SL</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>
              First Name
            </th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>
              Last Name
            </th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>
              Department
            </th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>
              Designation
            </th>
            <th
              style={{
                border: "1px solid #ddd",
                padding: "8px",
                textAlign: "center",
              }}
            >
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee, index) => (
            <tr
              key={index}
              onClick={() => showDrawer(employee)}
              style={{
                backgroundColor: index % 2 === 0 ? "#f9f9f9" : "#ffffff",
                cursor: "pointer", // Pointer cursor to indicate clickability
              }}
            >
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                {index + 1}
              </td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                {employee.firstName}
              </td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                {employee.lastName}
              </td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                {employee.departmentName}
              </td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                {employee.designationName}
              </td>
              <td
                style={{
                  textAlign: "center",
                  border: "1px solid #ddd",
                  padding: "8px",
                }}
              >
                <span
                  style={{
                    border: "1px solid #ddd",
                    padding: "5px 10px",
                    textAlign: "center",
                    backgroundColor: employee?.status ? "#cce5ff" : "#f8d7da",
                    color: employee?.status ? "#004085" : "#721c24",
                    borderRadius: "8px",
                    fontWeight: "bold",
                    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  {employee?.status ? "Assign" : "Not Assign"}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Drawer
        title={`Employee Salary Details`}
        placement="right"
        onClose={closeDrawer}
        open={drawerVisible}
        width={600}
      >
        {selectedEmployee && (
          <div>
            <div
              style={{
                marginTop: "0px",
                background: "#f4f4f4",
                padding: "8px",
                borderRadius: "8px",
                marginBottom: "5px",
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
              }}
            >
              <h3
                style={{
                  fontSize: "20px",
                  fontWeight: "bold",
                  marginBottom: "10px",
                  color: "#333",
                }}
              >
                {selectedEmployee.firstName} {selectedEmployee.lastName}
              </h3>
              <p
                style={{
                  fontSize: "16px",
                  color: "#666",
                }}
              >
                <strong>Department:</strong> {selectedEmployee.departmentName}
              </p>
              <p
                style={{
                  fontSize: "16px",
                  color: "#666",
                }}
              >
                <strong>Designation:</strong> {selectedEmployee.designationName}
              </p>
            </div>

            <Divider>Salary Breakdown</Divider>

            {/* Basic Salary Input */}
            <div style={{ marginBottom: "5px" }}>
              <label>
                <strong>Basic Salary:</strong>
              </label>
              <Input
                type="number"
                value={selectedEmployee.basicSalary || 0}
                onChange={(e) => {
                  const newBasicSalary = parseFloat(e.target.value) || 0;
                  handleBasicSalaryChange(newBasicSalary);
                }}
                style={{ width: "100%", marginTop: "5px" }}
              />
            </div>

            {/* Calculated Values */}
            {selectedEmployee.basicSalary > 0 &&
              (() => {
                const { houseRent, medicalAllowance, conveyance, totalSalary } =
                  calculateSalaryDetails(selectedEmployee.basicSalary);

                return (
                  <div>
                    {/* House Rent */}
                    <div style={{ marginBottom: "10px" }}>
                      <label>
                        <strong>House Rent (10% of Basic):</strong>
                      </label>
                      <Input
                        type="number"
                        value={houseRent.toFixed(2)}
                        disabled
                        style={{ width: "100%", marginTop: "5px" }}
                      />
                    </div>

                    {/* Medical Allowance */}
                    <div style={{ marginBottom: "10px" }}>
                      <label>
                        <strong>Medical Allowance (3.52% of Basic):</strong>
                      </label>
                      <Input
                        type="number"
                        value={medicalAllowance.toFixed(2)}
                        disabled
                        style={{ width: "100%", marginTop: "5px" }}
                      />
                    </div>

                    {/* Conveyance */}
                    <div style={{ marginBottom: "10px" }}>
                      <label>
                        <strong>Conveyance (3% of Basic):</strong>
                      </label>
                      <Input
                        type="number"
                        value={conveyance.toFixed(2)}
                        disabled
                        style={{ width: "100%", marginTop: "5px" }}
                      />
                    </div>

                    {/* Total Salary */}
                    <div
                      style={{
                        marginBottom: "10px",
                        textAlign: "right",
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <label style={{ fontWeight: "bold" }}>
                        Total Salary:
                      </label>
                      <p
                        style={{
                          fontSize: "16px",
                          fontWeight: "bold",
                          marginTop: "5px",
                          color: "#333",
                        }}
                      >
                        {totalSalary.toFixed(2)}
                      </p>
                    </div>
                  </div>
                );
              })()}
            {/* Save Button */}
            <div
              style={{
                marginTop: "20px",
                textAlign: "right",
              }}
            >
              <button
                style={{
                  backgroundColor: "#1890ff",
                  color: "white",
                  border: "none",
                  padding: "10px 20px",
                  fontSize: "16px",
                  borderRadius: "4px",
                  cursor: "pointer",
                  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                }}
                onClick={() => {
                  console.log("Saving employee data:", selectedEmployee);
                  // Add save logic here
                }}
              >
                Save
              </button>
            </div>
          </div>
        )}
      </Drawer>
      ;
    </div>
  );
};

export default EmployeeList;
