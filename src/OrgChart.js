import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import axios from 'axios';
import "./OrgChart.css";

const OrgChart = () => {
    const chartRef = useRef(null); // Ref to hook the D3 chart

    useEffect(() => {
        axios.get('http://localhost:8081/employees/hierarchy')
            .then(response => {
                const hierarchyData = convertToHierarchy(response.data);
                renderChart(hierarchyData);
            })
            .catch(error => {
                console.error('Error fetching employee hierarchy:', error);
            });
    }, []);

    const convertToHierarchy = (data) => {
        const employeeMap = {};
        data.forEach(emp => {
            employeeMap[emp.emp_number] = { ...emp, children: emp.subordinates };
        });

        const root = { name: "Organization", children: [] };

        data.forEach(emp => {
            if (emp.manager_id === null) {
                root.children.push(employeeMap[emp.emp_number]);
            } else {
                const manager = employeeMap[emp.manager_id];
                if (manager) {
                    if (!manager.children) {
                        manager.children = [];
                    }
                    manager.children.push(employeeMap[emp.emp_number]);
                }
            }
        });

        return root;
    };

    const renderChart = (data) => {
        const width = 1000;
        const height = 600;
        const margin = { top: 20, right: 250, bottom: 30, left: 90 };

        const svg = d3.select(chartRef.current)
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .append('g')
            .attr('transform', `translate(${margin.left},${margin.top})`);

        const root = d3.hierarchy(data);
        const treeLayout = d3.tree().size([height, width]);
        treeLayout(root);

        svg.selectAll('.link')
            .data(root.links())
            .enter()
            .append('path')
            .attr('class', 'link')
            .attr('d', d => `
                M${d.target.y},${d.target.x}
                C${(d.target.y + d.source.y) / 2},${d.target.x}
                ${(d.target.y + d.source.y) / 2},${d.source.x}
                ${d.source.y},${d.source.x}
            `);

        const node = svg.selectAll('.node')
            .data(root.descendants())
            .enter()
            .append('g')
            .attr('class', 'node')
            .attr('transform', d => `translate(${d.y},${d.x})`);

        node.append('circle')
            .attr('r', 15)
            .style('fill', '#69b3a2');

        node.append('text')
            .attr('dy', '.35em')
            .attr('x', d => d.children ? -20 : 20)
            .style('text-anchor', d => d.children ? 'end' : 'start')
            .text(d => `${d.data.first_name} ${d.data.last_name} (${d.data.role_id})`)
            .on("mouseover", function(event, d) {
                const tooltip = d3.select(".tooltip");
                tooltip.style("opacity", 1);
                tooltip.html(`${d.data.first_name} ${d.data.last_name}<br>Role: ${d.data.role_id}`)
                    .style("left", (event.pageX + 5) + "px")
                    .style("top", (event.pageY - 28) + "px");
            })
            .on("mouseout", () => d3.select(".tooltip").style("opacity", 0));
    };

    return (
      <div className="org-chart-container">
        <h2>Organization Hierarchy</h2>
        
        <div id="legend" className="legend">
            <p><b>Legend: Roles</b></p>
            <ol>
                <li>1. Human Resources Performance Management</li>
                <li>2. SAP Consultant</li>
                <li>3. Associate Partner</li>
                <li>4. Associate Consultant</li>
                <li>5. SAP Technical Consultant</li>
                <li>6. Technical Consultant</li>
                <li>7. IT Support Specialist</li>
            </ol>
        </div>
        
        <svg ref={chartRef}></svg>
        <div className="tooltip" style={{ opacity: 0, position: "absolute", pointerEvents: "none", backgroundColor: "#fff", border: "1px solid #ccc", padding: "5px", borderRadius: "4px", fontSize: "12px", boxShadow: "0px 0px 5px rgba(0,0,0,0.3)" }}></div>
    </div>
    );
};

export default OrgChart;
