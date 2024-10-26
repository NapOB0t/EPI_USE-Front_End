// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EmployeeList from './EmployeeList';
import EmployeeForm from './EmployeeForm';
import OrgChart from './OrgChart';
import Home from './Home';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/employees" element={<EmployeeList />} />
                <Route path="/add-employee" element={<EmployeeForm />} />
                <Route path="/edit-employee/:emp_number" element={<EmployeeForm />} />
                <Route path="/employees/hierarchy" element={<OrgChart/>} />

            </Routes>
        </Router>
    );
};

export default App;
