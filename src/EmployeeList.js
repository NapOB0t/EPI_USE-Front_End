import React, { useState, useEffect } from 'react';
import { getEmployees, deleteEmployee } from './EmployeeService';
import { Link } from 'react-router-dom';
import md5 from 'md5';
import "./EmployeeList.css";


const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);
    const [searchId, setSearchId] = useState('');
    const [filteredEmployees, setFilteredEmployees] = useState([]);

    useEffect(() => {
        loadEmployees();
    }, []);

    const loadEmployees = async () => {
        const employees = await getEmployees();
        setEmployees(employees);
        setFilteredEmployees(employees);
    };

    const handleDelete = async (emp_number) => {
        await deleteEmployee(emp_number);
        loadEmployees();
    };

    const handleSearch = () => {
        if (searchId.trim() === '') {
            setFilteredEmployees(employees);
            return;
        }
        
        const filtered = employees.filter(employee => 
            employee.emp_number.toString() === searchId.trim()
        );
        setFilteredEmployees(filtered);
    };

    // Function to get Gravatar URL
    const getGravatarUrl = (email) => {
        const hash = md5(email.toLowerCase().trim());
        return `https://www.gravatar.com/avatar/${hash}?s=50&d=identicon`;
    };

    return (
        <div className="employees-management">
            <h1>Employees Management System</h1>
            
            <div className="search-section">
                <input
                    type="text"
                    placeholder="Enter Employee ID..."
                    value={searchId}
                    onChange={(e) => setSearchId(e.target.value)}
                    className="search-input"
                />
                <button 
                    onClick={handleSearch}
                    className="search-btn"
                >
                    Search
                </button>
                {filteredEmployees.length === 0 && (
                    <button 
                        onClick={() => {
                            setSearchId('');
                            setFilteredEmployees(employees);
                        }}
                        className="reset-btn"
                    >
                        Reset
                    </button>
                )}
            </div>

            <Link className="add-employee-btn" to="/add-employee">Add Employee</Link>

            <table className="employees-table">
                <thead>
                    <tr>
                        <th>Avatar</th>
                        <th>Employee Number</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Role_ID</th>
                        <th>Manager_ID</th>
                        <th>Hire Date</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredEmployees.map(employee => (
                        <tr key={employee.emp_number}>
                            <td className="avatar-cell">
                                <img 
                                    src={getGravatarUrl(employee.email)}
                                    alt={`${employee.first_name} ${employee.last_name}`}
                                    className="avatar-image"
                                    title={`${employee.first_name} ${employee.last_name}`}
                                />
                            </td>
                            <td>{employee.emp_number}</td>
                            <td>{employee.first_name}</td>
                            <td>{employee.last_name}</td>
                            <td>{employee.email}</td>
                            <td>{employee.role_id}</td>
                            <td>{employee.manager_id}</td>
                            <td>{employee.hire_date}</td>
                            <td>{employee.status}</td>
                            <td>
                                <Link className="edit-link" to={`/edit-employee/${employee.emp_number}`}>Edit</Link>
                                <button className="delete-btn" onClick={() => handleDelete(employee.emp_number)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            
            {filteredEmployees.length === 0 && (
                <div className="no-results">No employees found</div>
            )}
        </div>
    );
};

export default EmployeeList;