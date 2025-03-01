import { jsPDF } from "jspdf";
import "jspdf-autotable";

const leftImage = "/images/logo_2.jpg";
const rightImage = "/images/logo_1.jpg";

const PayslipGenerator = (employee) => {
  const doc = new jsPDF({
    orientation: "p",
    unit: "mm",
    format: "a4",
    compress: true,
  });

  doc.addImage(leftImage, "JPG", 15, 5, 50, 30); // Left Image
  doc.addImage(rightImage, "JPG", 140, 5, 50, 30); // Right Image

  // **Step 2: Move Payslip Title Below Images**
  doc.setFontSize(18);
  doc.text("Central Depository Bangladesh Limited", 40, 40);

  doc.setFontSize(14);
  doc.text("Payslip", 90, 50);

  doc.setFontSize(12);
  doc.text(
    `For Month of ${employee.salaryMonth} ${employee.salaryYear}`,
    75,
    58
  );

  // **Step 3: Adjust Employee Details Position**
  let yOffset = 65; // Start lower due to images
  doc.setFontSize(10);
  doc.rect(10, yOffset, 190, 8);
  doc.text(`EMP ID: ${employee.employeeSalaryId}`, 12, yOffset + 5);
  doc.text(`Employee Type: Permanent`, 80, yOffset + 5);
  doc.text(`Payscale Grade: ${employee.grade}`, 150, yOffset + 5);

  yOffset += 10;
  doc.rect(10, yOffset, 190, 8);
  doc.text(`Name: ${employee.employeeName}`, 12, yOffset + 5);
  doc.text(`Joining Date: 01-SEP-2022`, 150, yOffset + 5);

  yOffset += 10;
  doc.rect(10, yOffset, 190, 8);
  doc.text(`Designation: ${employee.designationName}`, 12, yOffset + 5);
  doc.text(`Department: ${employee.departmentName}`, 150, yOffset + 5);

  // **Step 4: Adjust Table Start Position**
  yOffset += 15;
  doc.autoTable({
    startY: yOffset,
    head: [["Particulars", "Amount", "Deductions", "Amount"]],
    body: [
      ["Basic", employee.basicSalary, "Income Tax", "-"],
      [
        "House Rent",
        employee.houseRent || "-",
        "Lunch",
        employee.lunchDeduction || "-",
      ],
      [
        "Conveyance/Car Allowance",
        employee.conveyance,
        "Loan Repayment",
        employee.loanRepayment,
      ],
      [
        "Medical Allowance",
        employee.medicalAllowance,
        "Loan Outstanding as of 26th Dec 2024",
        "-",
      ],
      ["Festival Bonus", employee.festivalBonus || "-", "PF", employee.pf],
      [
        "Performance Bonus",
        employee.performanceBonus || "-",
        "Advance Salary",
        employee.advanceSalary,
      ],
      [
        "Payment for extra duties",
        employee.extraDuties || "-",
        { content: "Total Deductions", styles: { fontStyle: "bold" } },
        employee.totalDeductions,
      ],
      [
        { content: "Total Gross Salary", styles: { fontStyle: "bold" } },
        employee.grossSalary,
        { content: "Net Salary", styles: { fontStyle: "bold" } },
        employee.netSalary,
      ],
    ],
    theme: "grid",
    styles: { fontSize: 10, cellPadding: 3 },
    headStyles: { fillColor: [255, 255, 255], textColor: [0, 0, 0] }, // Remove header background color
  });

  // **Step 5: Adjust Footer Position**
  const finalY = doc.autoTable.previous.finalY + 30;
  doc.setFontSize(8);
  doc.text(
    "NB: System Generated copy, no signature required.",
    105,
    finalY + 10,
    { align: "center" }
  );
  doc.text(
    "This document remains the property of CDBL and the information contained herein is confidential.",
    105,
    finalY + 15,
    { align: "center" }
  );
  doc.text(
    "Persons receiving this document are responsible for restricting disclosure except as necessary for intended use.",
    105,
    finalY + 20,
    { align: "center" }
  );

  doc.text("Prepared By: Payroll Account", 15, finalY);
  doc.text("Approved By: GM - HRD", 150, finalY);

  // **Step 6: Save PDF**
  doc.save(`Payslip_${employee.employeeName}.pdf`);
};

export default PayslipGenerator;
