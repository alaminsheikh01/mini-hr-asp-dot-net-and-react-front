import { formatDate } from "@/app/common/formatDate";
import axios from "axios";
import dayjs from "dayjs";
import moment from "moment";
import { toast } from "react-toastify";

const API_BASE_URL = "https://localhost:7250/api";

// login
export const loginAPI = async (payload, setLoading, cb) => {
  try {
    setLoading(true);
    const response = await axios.post(
      `${API_BASE_URL}/Employee/signin`,
      payload
    );
    toast.success("Login successful");
    cb?.(response?.data);
    setLoading(false);
    return response.data;
  } catch (error) {
    toast.warn("Login failed");
    setLoading(false);
    throw error;
  }
};

// fetch all employees
export const getEmployees = async (setter, setLoading) => {
  try {
    setLoading(true);
    const response = await axios.get(`${API_BASE_URL}/Employee`);
    setter(response.data);
    setLoading(false);
    return response.data;
  } catch (error) {
    toast.warn("Error fetching employees");
    setLoading(false);
    throw error;
  }
};

export const getEmployeesAssign = async (setter, setLoading) => {
  try {
    setLoading(true);
    const response = await axios.get(`${API_BASE_URL}/Employee/employeeAssign`);
    setter(response.data);
    setLoading(false);
    return response.data;
  } catch (error) {
    toast.warn("Error fetching employees");
    setLoading(false);
    throw error;
  }
};

export const getSalaryAssignById = (id, setter, setLoading) => {
  try {
    setLoading(true);
    axios
      .get(`${API_BASE_URL}/Employee/salaryAssignById?SalaryAssignId=${id}`)
      .then((res) => {
        const data = res.data;
        setter(data);
        setLoading(false);
      });
  } catch (error) {
    toast.warn("Error fetching employee");
    setLoading(false);
  }
};

export const getEmpSalaryLanding = async (setter, setLoading, Id) => {
  try {
    setLoading(true);
    const response = await axios.get(
      `${API_BASE_URL}/Employee/employeeSalaryLanding?EmployeeId=${Id}`
    );
    setter(response.data);
    setLoading(false);
  } catch (error) {
    toast.warn(error?.response?.data?.message || "Error fetching employees");
    setter([]);
    setLoading(false);
  }
};

export const getSalaryHeaderData = async (setter, setLoading, salaryCode) => {
  try {
    setLoading(true);
    const response = await axios.get(
      `${API_BASE_URL}/Employee/employeeSalaryHeader?salaryCode=${salaryCode}`
    );
    console.log("response", response);
    setter(response.data);
    setLoading(false);
  } catch (error) {
    toast.warn("Error fetching salary header data");
    setLoading(false);
  }
};

export const getDetailsBySalaryCode = async (
  salaryCode,
  setter,
  setLoading
) => {
  try {
    setLoading(true);
    const response = await axios.get(
      `${API_BASE_URL}/Employee/detailsBySalaryCode?salaryCode=${salaryCode}`
    );
    console.log("response", response);
    setter(response.data);
    setLoading(false);
  } catch (error) {
    toast.warn("Error fetching salary details");
    setLoading(false);
  }
};

export const getEmployeeById = async (id, setter, setLoading) => {
  try {
    setLoading(true);
    const response = await axios.get(`${API_BASE_URL}/Employee/${id}`);

    console.log("response", response);

    const modifyData = {
      ...response.data,
      firstname: response.data.firstName,
      lastname: response.data.lastName,
      department: response.data.departmentId,
      designation: response.data.designationId,
      insuranceID: response.data.insuranceNumber,
      dateOfJoining: formatDate(response.data.dateOfJoining),
      dateOfBirth: formatDate(response.data.dateOfBirth),
      grossSalary: response.data.grossSalary || 0,
    };
    console.log("modifyData", modifyData);

    setter(modifyData);
    setLoading(false);
  } catch (error) {
    toast.warn("Error fetching employee");
    setLoading(false);
  }
};

export const createEmployee = async (payload, setLoading, cb) => {
  try {
    setLoading(true);
    const res = await axios.post(`${API_BASE_URL}/Employee`, payload);

    if (res.status === 200 || res.status === 201) {
      toast.success("Employee created successfully");
      cb?.();
    } else {
      throw new Error("Unexpected response status");
    }
  } catch (error) {
    toast.warn("Employee creation failed");
  } finally {
    setLoading(false);
  }
};

// emp salary generate
export const createEmpSalary = async (payload, setLoading) => {
  try {
    setLoading(true);
    const res = await axios.post(
      `${API_BASE_URL}/Employee/addEmployeeSalary`,
      payload
    );
    toast.success("Employee salary created successfully");
    setLoading(false);
  } catch (error) {
    toast.warn(
      error?.response?.data?.message || "Employee salary creation failed"
    );
    setLoading(false);
  }
};

export const salaryAssignSaveandUpdate = async (payload, setLoading, cb) => {
  try {
    setLoading(true);
    const res = await axios.post(
      `${API_BASE_URL}/Employee/assignSalary`,
      payload
    );
    cb?.();
    toast.success("Employee salary assigned successfully");
    setLoading(false);
  } catch (error) {
    toast.warn("Employee salary assign failed");
  }
};

export const getSalaryAssignLanding = async (setter, setLoading) => {
  try {
    setLoading(true);
    const res = await axios.get(`${API_BASE_URL}/Employee/salaryAssignLanding`);
    setter(res.data);
    setLoading(false);
  } catch (error) {
    toast.warn("Error fetching salary assign landing");
    setLoading(false);
  }
};

export const updateEmployee = async (payload, setLoading, cb, id) => {
  try {
    setLoading(true);
    const res = await axios.put(
      `${API_BASE_URL}/Employee/update/${id}`,
      payload
    );
    toast.success("Employee updated successfully");
    cb?.();
    setLoading(false);
  } catch (error) {
    toast.warn("Employee update failed");
  }
};

// create a new designation
export const createDesignation = async (payload, setLoading) => {
  try {
    setLoading(true);
    const res = await axios.post(
      `${API_BASE_URL}/Employee/Designation`,
      payload
    );
    toast.success("Designation created successfully");
    setLoading(false);
  } catch (error) {
    toast.warn("Designation creation failed");
  }
};

// create a new department
export const createDepartment = async (payload, setLoading) => {
  try {
    setLoading(true);
    const res = await axios.post(
      `${API_BASE_URL}/Employee/Department`,
      payload
    );
    toast.success("Department created successfully");
    setLoading(false);
  } catch (error) {
    toast.warn("Department creation failed");
  }
};

export const getDepartments = async (setter, setLoading) => {
  try {
    setLoading(true);
    const res = await axios.get(`${API_BASE_URL}/Employee/departmentDDL`);
    setter(res.data);
    setLoading(false);
  } catch (error) {
    toast.warn("Error fetching departments");
  }
};

export const getDesignations = async (setter, setLoading) => {
  try {
    setLoading(true);
    const res = await axios.get(`${API_BASE_URL}/Employee/designationDDL`);
    setter(res.data);
    setLoading(false);
  } catch (error) {
    toast.warn("Error fetching designations");
  }
};

export const getLoanLanding = async (Id = 0, setter, setLoading) => {
  try {
    setLoading(true);
    const res = await axios.get(
      `${API_BASE_URL}/Employee/loanLanding?EmployeeId=${Id}`
    );
    console.log("res", res);
    setter(res.data);
    setLoading(false);
  } catch (error) {
    setLoading(false);
    toast.warn("Error fetching loan landing data");
  }
};

export const deleteLoan = async (id) => {
  try {
    const res = await axios.put(
      `${API_BASE_URL}/Employee/loanDelete?LoanId=${id}`
    );
    return res.data;
  } catch (error) {
    toast.warn("Error deleting loan");
  }
};

export const createLoan = async (payload, setLoading) => {
  try {
    setLoading(true);
    const res = await axios.post(
      `${API_BASE_URL}/Employee/loanCreate`,
      payload
    );
    toast.success("Loan created successfully");
    setLoading(false);
  } catch (error) {
    toast.warn("Error creating loan");
    setLoading(false);
  }
};
