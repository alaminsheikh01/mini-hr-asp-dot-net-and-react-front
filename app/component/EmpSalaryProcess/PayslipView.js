import React from "react";
import "./style.css";

const PayslipView = ({ employee }) => {
  if (!employee) return <div>No employee data available</div>;

  return (
    <div className="payslip-container">
      {/* Header with Images */}
      <div className="payslip-header">
        <img src="/images/logo_2.jpg" alt="Left Logo" className="left-logo" />
        <h2>Central Depository Bangladesh Limited</h2>
        <img src="/images/logo_1.jpg" alt="Right Logo" className="right-logo" />
      </div>

      {/* Payslip Title */}
      <h3 className="payslip-title">Payslip</h3>
      <p className="payslip-month">For Month of {employee.salaryMonth} {employee.salaryYear}</p>

      {/* Employee Details */}
      <table className="employee-details">
        <tbody>
          <tr>
            <td>EMP ID: {employee.employeeSalaryId}</td>
            <td>Employee Type: Permanent</td>
            <td>Payscale Grade: {employee.grade}</td>
          </tr>
          <tr>
            <td>Name: {employee.employeeName}</td>
            <td>Joining Date: 01-SEP-2022</td>
            <td></td>
          </tr>
          <tr>
            <td>Designation: {employee.designationName}</td>
            <td>Department: {employee.departmentName}</td>
            <td></td>
          </tr>
        </tbody>
      </table>

      {/* Salary Table */}
      <table className="salary-table">
        <thead>
          <tr>
            <th>Particulars</th>
            <th>Amount</th>
            <th>Deductions</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Basic</td>
            <td>{employee.basicSalary}</td>
            <td>Income Tax</td>
            <td>{employee.incomeTax}</td>
          </tr>
          <tr>
            <td>House Rent</td>
            <td>{employee.houseRent || "-"}</td>
            <td>Lunch</td>
            <td>{employee.lunchDeduction || "-"}</td>
          </tr>
          <tr>
            <td>Conveyance/Car Allowance</td>
            <td>{employee.conveyance}</td>
            <td>Loan Repayment</td>
            <td>{employee.loanRepayment}</td>
          </tr>
          <tr>
            <td>Medical Allowance</td>
            <td>{employee.medicalAllowance}</td>
            <td>Loan Outstanding as of 26th Dec 2024</td>
            <td>-</td>
          </tr>
          <tr>
            <td>Festival Bonus</td>
            <td>{employee.festivalBonus || "-"}</td>
            <td>PF</td>
            <td>{employee.pf}</td>
          </tr>
          <tr>
            <td>Performance Bonus</td>
            <td>{employee.performanceBonus || "-"}</td>
            <td>Advance Salary</td>
            <td>{employee.advanceSalary}</td>
          </tr>
          <tr className="bold-row">
            <td>Total Gross Salary</td>
            <td>{employee.grossSalary}</td>
            <td>Total Deductions</td>
            <td>{employee.totalDeductions}</td>
          </tr>
          <tr className="bold-row">
            <td colSpan="2">Net Salary</td>
            <td colSpan="2">{employee.netSalary}</td>
          </tr>
        </tbody>
      </table>

      {/* Footer */}
      {/* <div className="payslip-footer">
        <p>NB: System Generated copy, no signature required.</p>
        <p>This document remains the property of CDBL and is confidential.</p>
        <p>Persons receiving this document are responsible for restricting disclosure.</p>
        <div className="footer-signatures">
          <span>Prepared By: Payroll Account</span>
          <span>Approved By: GM - HRD</span>
        </div>
      </div> */}
    </div>
  );
};

export default PayslipView;
