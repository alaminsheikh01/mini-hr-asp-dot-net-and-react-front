'use client';
import { getEmployees } from '@/api/employee';
import { useEffect, useState } from 'react';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const data = await getEmployees();
        setEmployees(data); // Update the state with fetched data
      } catch (error) {
        setError('Failed to fetch employees');
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  if (loading) return <p>Loading employees...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Employee List</h1>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
        <thead>
          <tr style={{ backgroundColor: '#f4f4f4', textAlign: 'left' }}>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>SL</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>First Name</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Last Name</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Email</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Department</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Designation</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Address</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>City</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Phone</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee, index) => (
            <tr
              key={index}
              style={{
                backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#ffffff',
              }}
            >
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{index + 1}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{employee.firstName}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{employee.lastName}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{employee.email}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{employee.departmentName}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{employee.designationName}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{employee.address}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{employee.city}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{employee.phoneNumber}</td>
              
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeList;
