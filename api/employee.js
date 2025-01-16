import axios from "axios";
import { toast } from "react-toastify";
import moment from "moment";

const API_BASE_URL = "https://localhost:7245/api";

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



export const getEmployeeById = async (id, setter, setLoading) => {
  try {
    setLoading(true);
    const response = await axios.get(`${API_BASE_URL}/Employee/${id}`);

    // Convert dateOfJoining to a valid Moment.js object or null
    const modifyData = {
      ...response.data,
      firstname: response.data.firstName,
      lastname: response.data.lastName,
      department: response.data.departmentId,
      designation: response.data.designationId,
      dateOfJoining: response.data.dateOfJoining !== "0001-01-01T00:00:00"
        ? moment(response.data.dateOfJoining)
        : null,
      grossSalary: response.data.grossSalary || 0,
    };

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
    toast.success("Employee created successfully");
    cb?.();
    setLoading(false);
  } catch (error) {
    toast.warn("Employee creation failed");
  }
};

// emp salary generate
export const createEmpSalare = async (payload, setLoading) => {
  try {
    setLoading(true);
    const res = await axios.post(`${API_BASE_URL}/Employee/addEmployeeSalary`, payload);
    toast.success("Employee salary created successfully");
    setLoading(false);
  } catch (error) {
    toast.warn("Employee salary creation failed");
  }
}

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
