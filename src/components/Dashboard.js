import React, { useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import '../App.css';
ModuleRegistry.registerModules([AllCommunityModule]);

const Dashboard = () => {
    const [rowData, setRowData] = useState([]);

    const columnDefs = [
        { headerName: 'ID', field: 'id', sortable: true, filter: true },
        { headerName: 'First Name', field: 'firstName', sortable: true, filter: true },
        { headerName: 'Last Name', field: 'lastName', sortable: true, filter: true },
        { headerName: 'Email', field: 'email', sortable: true, filter: true },
        { headerName: 'Department', field: 'department', sortable: true, filter: true },
        { headerName: 'Position', field: 'position', sortable: true, filter: true },
        { headerName: 'Salary', field: 'salary', sortable: true, filter: true },
        { headerName: 'Hire Date', field: 'hireDate', sortable: true, filter: true },
        { headerName: 'Age', field: 'age', sortable: true, filter: true },
        { headerName: 'Location', field: 'location', sortable: true, filter: true },
        { headerName: 'Performance Rating', field: 'performanceRating', sortable: true, filter: true },
        { headerName: 'Projects Completed', field: 'projectsCompleted', sortable: true, filter: true },
        { headerName: 'IsActive', field: 'isActive',   
            cellRenderer: (params) => {
                 return params.value? '🟢': '🔴'}, 
         sortable: true, filter: true },
        { headerName: 'Skills', field: 'skills', valueFormatter: (params) => params.value?.join(', '), sortable: true, filter: true },
        { headerName: 'Manager', field: 'manager', sortable: true, filter: true }
    ];

    useEffect(() => {
        fetch("/employees.json")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                setRowData(data.employees);
            })
            .catch((error) => {
                console.error("Error fetching the JSON data:", error);
            });
    }, []);

    return (
        <div className="dashboard">
            <h1>Dashboard</h1>
            <div className="ag-theme-alpine grid-container">
                <AgGridReact
                    rowData={rowData}
                    columnDefs={columnDefs}
                    theme="legacy"
                    pagination={true}
                    paginationPageSize={10}
                    paginationPageSizeSelector={[10, 20, 50, 100]}
                    domLayout='autoHeight'
                    animateRows={true}
                />
            </div>
        </div>
    );
};

export default Dashboard;
