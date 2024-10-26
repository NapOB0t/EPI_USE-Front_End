/*EmployeeService Page*/
import axios from 'axios';

const API_URL = 'http://localhost:8081/employees';

export const getEmployees = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const createEmployee = async (employeeData) => {
    const response = await axios.post(API_URL, employeeData);
    return response.data;
}

export const updateEmployee = async (emp_number, employeeData) => {
    const response = await axios.post(`${API_URL}/${emp_number}`, employeeData);
    return response.data;
};

export const deleteEmployee = async (emp_number) => {
    await axios.delete(`${API_URL}/${emp_number}`);
};

export const getEmpByID= async (emp_number) => {
    const response = await axios.get(`${API_URL}/${emp_number}`);
    return response.data;}