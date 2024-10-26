import React, { useState, useEffect } from 'react';
import { createEmployee, getEmpByID, updateEmployee } from './EmployeeService';
import { useNavigate, useParams } from 'react-router-dom';
import "./EmployeeForm.css";

const EmployeeForm = ({ existingEmployee }) => {
    const [formData, setFormData] = useState({
        emp_number: '',
        first_name: '',
        last_name: '',
        dob: '',
        email: '',
        phone_number: '',
        manager_id: '',
        role_id: '',
        hire_date: '',
        status: ''
    });

    const navigate = useNavigate();
    const { emp_number } = useParams();// this code fetches the employee number from the url if updating

    useEffect(() => {
        if (emp_number) {
          const fetchEmp = async() => {
            const emp = await getEmpByID(emp_number)
            setFormData(emp);
          }
          fetchEmp();
            
        }
    }, [emp_number]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (emp_number) {
            await updateEmployee(emp_number, formData);
        } else {
            await createEmployee(formData);
        }
        navigate('/employees');// redirect back to employees page
    };

    return (
        <div class="Background">
             <form onSubmit={handleSubmit} class="form-container">
            <label>Employee Number</label>
            <input name="emp_number"  value={formData.emp_number} onChange={handleChange} placeholder="Employee Number" required disabled={!!emp_number} />
            <label>First Name</label>
            <input name="first_name" value={formData.first_name} onChange={handleChange} placeholder="First Name" required />
            <label>Last Name</label>
            <input name="last_name" value={formData.last_name} onChange={handleChange} placeholder="Last Name" required />
            <label>Date of Birth</label>
            <input type="date" name="dob" value={formData.dob} onChange={handleChange} placeholder="Date of Birth" required />
            <label>Email</label>
            <input name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
            <label>Phone Number</label>
            <input name="phone_number" value={formData.phone_number} onChange={handleChange} placeholder="Phone Number" />
            <label>Manager ID</label>
            <input name="manager_id" value={formData.manager_id} onChange={handleChange} placeholder="Manager ID" />
            <label>Role ID</label>
            <input type="number" name="role_id" value={formData.role_id} onChange={handleChange} placeholder="Role ID" required />
            <label>Hire Date</label>
            <input type="date" name="hire_date" value={formData.hire_date} onChange={handleChange} placeholder="Hire Date" required />
            <label>Status</label>
            <input name="status" value={formData.status} onChange={handleChange} placeholder="Status" />
            <button type="submit">Submit</button>
        </form>

        </div>
     
    );
};

export default EmployeeForm;
