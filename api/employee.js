import axios from 'axios';
import { toast } from 'react-toastify';

const API_BASE_URL = 'https://localhost:7245/api';

// fetch all employees
export const getEmployees = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/Employee`);
    console.log('Employee data:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching employees:', error);
    throw error;
  }
};

export const createEmployee = async (payload, setLoading) => {
  try {
    setLoading(true);
    const res = await axios.post(`${API_BASE_URL}/Employee`, payload);
    toast.success('Employee created successfully');
    setLoading(false);
  } catch (error) {
    console.error('Error creating employee:', error);
  }
}


// create a new designation
export const createDesignation = async (payload, setLoading) =>{
  try{
    setLoading(true);
    const res = await axios.post(`${API_BASE_URL}/Employee/Designation`, payload);
    toast.success('Designation created successfully');
    setLoading(false);

  }catch(error){
    console.log('Error creating designation:', error);
  }
}

export const getDepartments = async (setter, setLoading) =>{
  try{
    setLoading(true);
    const res = await axios.get(`${API_BASE_URL}/Employee/departmentDDL`);
    setter(res.data);
    setLoading(false);
  }catch(error){
    console.log('Error fetching departments:', error);
  }
}

export const getDesignations = async (setter, setLoading) =>{
  try{
    setLoading(true);
    const res = await axios.get(`${API_BASE_URL}/Employee/designationDDL`);
    setter(res.data);
    setLoading(false);
  }catch(error){
    console.log('Error fetching designations:', error);
  }
}