'use client';
import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, LabelList } from 'recharts';
import { getEmployees, getDepartments, getDesignations, getEmpSalaryLanding } from '@/api/employee';
import { Card } from 'antd';
import moment from 'moment';

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export default function HomePage() {
  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [designations, setDesignations] = useState([]);
  const [salaries, setSalaries] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = "Dashboard - Employee Management";
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    const empData = await getEmployees(setEmployees, setLoading);
    const deptData = await getDepartments(setDepartments, setLoading);
    const desigData = await getDesignations(setDesignations, setLoading);
    const salaryData = await getEmpSalaryLanding(setSalaries, setLoading);
    
    setDepartments(deptData.map(dept => ({
      name: dept.label,
      value: empData?.filter(emp => emp.departmentId === dept.value).length,
    })));

    setDesignations(desigData.map(des => ({
      name: des?.label,
      value: empData.filter(emp => emp.designationId === des.value).length,
    })));

    setLoading(false);
  };

  const employeeMonthlyCount = employees.reduce((acc, emp) => {
    const month = moment(emp.dateOfJoining).format('MMMM');
    acc[month] = (acc[month] || 0) + 1;
    return acc;
  }, {});

  const monthlyData = Object.keys(employeeMonthlyCount).map(month => ({
    name: month,
    value: employeeMonthlyCount[month]
  }));

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Employee Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card title="Employees by Department" bordered={false} className="shadow-md">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={departments} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                {departments?.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        <Card title="Employees by Designation" bordered={false} className="shadow-md">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={designations}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#0088FE">
                <LabelList dataKey="name" position="top" />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card title="Monthly Employee Count" bordered={false} className="shadow-md">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#FFBB28">
                <LabelList dataKey="value" position="top" />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>
      <Card title="Total Employees Assigned Salary" bordered={false} className="shadow-md mt-6">
        <h2 className="text-xl font-bold">{salaries.length} Employees Assigned Salary</h2>
      </Card>
    </div>
  );
}
