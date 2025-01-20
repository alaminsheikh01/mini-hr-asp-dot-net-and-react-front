"use client";
import { getEmployees } from "@/api/employee";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { EditOutlined } from "@ant-design/icons";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    getEmployees(setEmployees, setLoading);
  }, []);

  const handleEdit = (employeeId) => {
    router.push(`/component/EmpCreate?id=${employeeId}`);
  };

  if (loading) return <p>Loading employees...</p>;

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2 style={{ textAlign: "left", marginBottom: "20px", color:'gray' }}>
        {`Total ${employees?.length} employees`}
      </h2>
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
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Email</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>
              Department
            </th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>
              Designation
            </th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>
              Address
            </th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>City</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Phone</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee, index) => (
            <tr
              key={index}
              style={{
                backgroundColor: index % 2 === 0 ? "#f9f9f9" : "#ffffff",
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
                {employee.email}
              </td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                {employee.departmentName}
              </td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                {employee.designationName}
              </td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                {employee.address}
              </td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                {employee.city}
              </td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                {employee.phoneNumber}
              </td>
              <td
                style={{
                  border: "1px solid #ddd",
                  padding: "8px",
                  textAlign: "center",
                }}
              >
                <EditOutlined
                  style={{ cursor: "pointer", color: "#007BFF" }}
                  onClick={() => handleEdit(employee.employeeId)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeList;
