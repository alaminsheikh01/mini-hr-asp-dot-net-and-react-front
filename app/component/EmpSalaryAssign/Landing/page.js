"use client";
import {
  getEmployeesAssign,
  getSalaryAssignById,
  salaryAssignSaveandUpdate,
} from "@/api/employee";
import { useEffect, useState } from "react";
import { Drawer, Divider, Input, Button } from "antd";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [basicSalary, setBasicSalary] = useState(0);

  useEffect(() => {
    getEmployeesAssign(setEmployees, setLoading);
  }, []);
  const showDrawer = (employee) => {
    const calculatedSalary = calculateSalaryComponents(
      employee.basicSalary || 0,
      employee.carAllowance || 0,
      employee.ccCharge || 0,
      employee.grade || 0,
      employee.loanRepayment || 0,
      employee.lunchDeduction || 1350,
      employee.advanceSalary || 0,
      employee.incomeTax || 0,
      employee.performanceBonus || 0,
      employee.festivalBonus || 0,
      employee.lastMonthLoanPayment || 0
    );

    setSelectedEmployee({ ...employee, ...calculatedSalary });
    setDrawerVisible(true);
    employee?.salaryAssignId &&
      getSalaryAssignById(
        employee.salaryAssignId,
        setSelectedEmployee,
        setLoading
      );
  };
  const handleSalaryChange = (field, value) => {
    if (value < 0) value = 0; // Prevent negative values

    const updatedSalary = calculateSalaryComponents(
      field === "basicSalary" ? value : selectedEmployee.basicSalary,
      field === "carAllowance" ? value : selectedEmployee.carAllowance,
      field === "ccCharge" ? value : selectedEmployee.ccCharge,
      selectedEmployee.grade || 0,
      field === "loanRepayment" ? value : selectedEmployee.loanRepayment,
      field === "lunchDeduction" ? value : selectedEmployee.lunchDeduction,
      field === "advanceSalary" ? value : selectedEmployee.advanceSalary,
      field === "incomeTax" ? value : selectedEmployee.incomeTax,
      field === "performanceBonus" ? value : selectedEmployee.performanceBonus,
      field === "festivalBonus" ? value : selectedEmployee.festivalBonus
    );

    setSelectedEmployee((prev) => ({
      ...prev,
      [field]: value,
      ...updatedSalary,
    }));
  };

  const closeDrawer = () => {
    setDrawerVisible(false);
    setSelectedEmployee(null);
    setBasicSalary(0);
  };

  if (loading) return <p>Loading employees...</p>;

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h3 style={{ textAlign: "left", marginBottom: "20px" }}>
        Employee Salary Assign List
      </h3>
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
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>
              Gross Salary
            </th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>
              Basic Salary
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
                cursor: "pointer",
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
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                {employee.grossSalary}
              </td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                {employee.basicSalary}
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
                  {employee?.status ? "Assigned" : "Not Assign"}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Drawer
        title="Employee Salary Details"
        onClose={closeDrawer}
        open={drawerVisible}
        width={600}
      >
        <div>
          <h3>
            <strong>Employee Name: </strong> {selectedEmployee?.firstName}{" "}
            {selectedEmployee?.lastName} {selectedEmployee?.employeeName}
          </h3>
          <p>
            <strong>Department:</strong> {selectedEmployee?.departmentName}
          </p>
          <p>
            <strong>Designation:</strong> {selectedEmployee?.designationName}
          </p>
          <p>
            <strong>Grade:</strong> {selectedEmployee?.grade}
          </p>

          <Divider>Salary Breakdown</Divider>

          {/* Basic Salary Input */}
          <label>
            <strong>Basic Salary:</strong>
          </label>
          <Input
            type="number"
            value={selectedEmployee?.basicSalary}
            onChange={(e) =>
              handleSalaryChange("basicSalary", parseFloat(e.target.value) || 0)
            }
          />

          {/* House Rent */}
          <label>
            <strong>House Rent:</strong>
          </label>
          <Input
            disabled={true}
            type="number"
            value={selectedEmployee?.houseRent}
            onChange={(e) =>
              handleSalaryChange("houseRent", parseFloat(e.target.value) || 0)
            }
          />

          {/* Car Allowance Input */}
          <label>
            <strong>Car Allowance:</strong>
          </label>
          <Input
            type="number"
            value={selectedEmployee?.carAllowance}
            onChange={(e) =>
              handleSalaryChange(
                "carAllowance",
                parseFloat(e.target.value) || 0
              )
            }
          />

          {/* CC Charge Input */}
          <label>
            <strong>CC Charge:</strong>
          </label>
          <Input
            type="number"
            value={selectedEmployee?.ccCharge}
            onChange={(e) =>
              handleSalaryChange("ccCharge", parseFloat(e.target.value) || 0)
            }
          />

          {/* Performance Bonus */}
          <label>
            <strong>Performance Bonus:</strong>
          </label>
          <Input
            type="number"
            value={selectedEmployee?.performanceBonus}
            onChange={(e) =>
              handleSalaryChange(
                "performanceBonus",
                parseFloat(e.target.value) || 0
              )
            }
          />
          {/* Festival Bonus */}
          <label>
            <strong>Festival Bonus:</strong>
          </label>
          <Input
            type="number"
            value={selectedEmployee?.festivalBonus}
            onChange={(e) =>
              handleSalaryChange(
                "festivalBonus",
                parseFloat(e.target.value) || 0
              )
            }
          />

          <Divider>Auto-Calculated Fields</Divider>

          {/* Auto-Calculated Medical Allowance */}
          <label>
            <strong>Medical Allowance (Auto):</strong>
          </label>
          <Input
            type="number"
            value={selectedEmployee?.medicalAllowance}
            disabled
          />

          {/* Auto-Calculated Transport Allowance */}
          <label>
            <strong>Transport/Convenience (Auto):</strong>
          </label>
          <Input type="number" value={selectedEmployee?.conveyance} disabled />

          <Divider>
            <strong>Gross Salary:</strong> {selectedEmployee?.grossSalary}
          </Divider>

          <Divider>Deductions</Divider>

          {/* Loan Repayment & Lunch Deduction Section */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <label>{/* <strong>Lunch Deduction:</strong> 1350 */}</label>
            <label>
              <strong>Loan Repayment (Last Month Displayed):</strong>{" "}
              {selectedEmployee?.lastMonthLoanPayment}
            </label>
          </div>

          <label>
            <strong>Lunch Deduction:</strong>
          </label>
          <Input
            type="number"
            value={selectedEmployee?.lunchDeduction}
            onChange={(e) =>
              handleSalaryChange(
                "lunchDeduction",
                parseFloat(e.target.value) || 0
              )
            }
          />
          {/* Income Tax */}
          <label>
            <strong>Income Tax:</strong>
          </label>
          <Input
            type="number"
            value={selectedEmployee?.incomeTax}
            onChange={(e) =>
              handleSalaryChange("incomeTax", parseFloat(e.target.value) || 0)
            }
          />

          {/* Loan Repayment Input */}
          <label>
            <strong>Loan Repayment (This Month):</strong>
          </label>
          <Input
            type="number"
            value={selectedEmployee?.loanRepayment}
            onChange={(e) =>
              handleSalaryChange(
                "loanRepayment",
                parseFloat(e.target.value) || 0
              )
            }
          />

          {/* Advance Salary Input */}
          <label>
            <strong>Advance Salary:</strong>
          </label>
          <Input
            type="number"
            value={selectedEmployee?.advanceSalary}
            onChange={(e) =>
              handleSalaryChange(
                "advanceSalary",
                parseFloat(e.target.value) || 0
              )
            }
          />

          {/* Auto-Calculated Provident Fund */}
          <label>
            <strong>Provident Fund (10% of Basic - Auto):</strong>
          </label>
          <Input type="number" value={selectedEmployee?.pf} disabled />

          <Divider>
            <strong>Total Deductions:</strong>{" "}
            {selectedEmployee?.totalDeductions}
          </Divider>
          <Divider>
            <strong>Net Salary:</strong> {selectedEmployee?.netSalary}
          </Divider>

          {/* Save Button */}
          <Button
            type="primary"
            style={{ width: "100%", marginTop: "10px" }}
            onClick={() => {
              const payload = {
                id: selectedEmployee.salaryAssignId || 0,
                employeeId: selectedEmployee.employeeId || 0,
                salaryAssignId: selectedEmployee.salaryAssignId || 0,
                basicSalary: +selectedEmployee.basicSalary || 0,
                grossSalary: +selectedEmployee.grossSalary || 0,
                carAllowance: +selectedEmployee.carAllowance || 0,
                ccCharge: +selectedEmployee.ccCharge || 0,
                incomeTax: +selectedEmployee.incomeTax || 0,
                performanceBonus: +selectedEmployee.performanceBonus || 0,
                festivalBonus: +selectedEmployee.festivalBonus || 0,
                medicalAllowance: +selectedEmployee.medicalAllowance || 0,
                houseRent: +selectedEmployee.houseRent || 0,
                conveyance: +selectedEmployee.conveyance || 0,
                pf: +selectedEmployee.pf || 0,
                lunchDeduction: +selectedEmployee.lunchDeduction || 0,
                loanRepayment: +selectedEmployee.loanRepayment || 0,
                lastMonthLoanPayment:
                  +selectedEmployee.lastMonthLoanPayment || 0,
                advanceSalary: +selectedEmployee.advanceSalary || 0,
                totalDeductions: +selectedEmployee.totalDeductions || 0,
                netSalary: +selectedEmployee.netSalary || 0,
                status: true,
              };
              console.log("payload", payload);
              salaryAssignSaveandUpdate(payload, setLoading, () => {
                getEmployeesAssign(setEmployees, setLoading);
                closeDrawer();
              });
            }}
          >
            {selectedEmployee?.salaryAssignId ? "Re-Assign" : "Assign"}
          </Button>
        </div>
      </Drawer>
      ;
    </div>
  );
};

export default EmployeeList;

const calculateSalaryComponents = (
  basicSalary,
  carAllowance = 0,
  ccCharge = 0,
  grade = 0,
  loanRepayment = 0,
  lunchDeduction = 1350,
  advanceSalary = 0,
  incomeTax = 0,
  performanceBonus = 0,
  festivalBonus = 0,
  lastMonthLoanPayment = 0
) => {
  basicSalary = basicSalary || 0;

  // ✅ Medical Allowance Calculation
  let medicalAllowance =
    grade >= 8 && grade <= 15
      ? basicSalary * 0.05 // 5% for grade 8-15
      : grade >= 3 && grade <= 7
      ? basicSalary * 0.1 // 10% if grade is 3-7
      : basicSalary * 0.05; // Default to 5% if not in specified grades

  // Ensure medical allowance does not exceed 10,000
  medicalAllowance = medicalAllowance > 10000 ? 10000 : medicalAllowance;

  // ✅ Transport/Convenience Allowance (5% of Basic)
  const conveyance = basicSalary * 0.05;
  // house rent should be 45% of basic salary
  const houseRent = basicSalary * 0.45;

  // ✅ Gross Salary Calculation
  const grossSalary =
    basicSalary +
    carAllowance +
    medicalAllowance +
    conveyance +
    ccCharge +
    houseRent +
    performanceBonus +
    festivalBonus;

  // ✅ Deductions Calculation
  const pf = basicSalary * 0.1; // Provident Fund (10% of Basic)
  const totalDeductions = pf + lunchDeduction + loanRepayment + advanceSalary + incomeTax;

  // ✅ Net Salary Calculation
  const netSalary = grossSalary - totalDeductions;

  return {
    basicSalary,
    carAllowance,
    ccCharge,
    medicalAllowance: medicalAllowance.toFixed(2),
    conveyance: conveyance.toFixed(2),
    grossSalary: grossSalary.toFixed(2),
    pf: pf.toFixed(2),
    lunchDeduction,
    loanRepayment,
    lastMonthLoanPayment, // Display only
    advanceSalary,
    totalDeductions: totalDeductions.toFixed(2),
    netSalary: netSalary.toFixed(2),
    houseRent: houseRent.toFixed(2),
  };
};
