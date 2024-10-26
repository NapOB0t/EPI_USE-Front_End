
import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; 

const HomePage = () => {
    return (
        <div className="home-container">
            <h1>Welcome to EPI USE: Employee Management System</h1>
            <p>Going beyond coporate purpose</p>
            <div className="buttons">
                <Link to="/employees" className="btn">Manage Employees</Link>

                <Link to="/employees/hierarchy" className="btn">View Organization Hierarchy</Link>
            </div>
        </div>
    );
};

export default HomePage;
