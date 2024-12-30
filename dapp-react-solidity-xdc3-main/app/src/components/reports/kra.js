import React, { useState } from "react";
import { Form, FormControl, Button, Table, Dropdown } from "react-bootstrap";

import "bootstrap/dist/css/bootstrap.min.css";
// import "./App.css";

const sampleEmployees = [
  { id: 1, name: "John Doe" },
  { id: 2, name: "Jane Smith" },
  { id: 3, name: "Alex Johnson" },
];

function AdminDashBoard() {
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectAll, setSelectAll] = useState(false);

  const handleEmployeeChange = (event) => {
    setSelectedEmployee(event.target.value);
    setShowDropdown(true);
  };

  const handleEmployeeClick = (employee) => {
    setSelectedEmployee(employee.name);
    setShowDropdown(false);
  };

  const handleSelectAll = (event) => {
    setSelectAll(event.target.checked);
  };

  const tableHeaders = ["CheckBox","ID", "Name", "KRA Name", "KRA Allocated Date", "Status-Employee", "Status-Admin"];

  const tableData = [
    ["1", "Row 1", "Data 1", "Data 2", "Data 3", "Data 4", "Data 5"],
    ["2", "Row 2", "Data 1", "Data 2", "Data 3", "Data 4", "Data 5"],
    ["3", "Row 3", "Data 1", "Data 2", "Data 3", "Data 4", "Data 5"],
  ];

  return (
    <div className="container d-flex justify-content-center align-items-center flex-column">
      <h1 className="text-center mb-4">KRA Page</h1>
      <Form className="my-3">
        <Dropdown className="d-flex justify-content-center mb-3">
          <FormControl type="text" placeholder="Search for Employee" className="mr-2" value={selectedEmployee} onChange={handleEmployeeChange} onClick={() => setShowDropdown(true)} />
          {showDropdown && (
            <Dropdown.Menu>
              {sampleEmployees.map((employee) => (
                <Dropdown.Item key={employee.id} onClick={() => handleEmployeeClick(employee)}>{employee.name}</Dropdown.Item>
              ))}
            </Dropdown.Menu>
          )}
        </Dropdown>
        <Button variant="primary" className="mx-auto d-block">Search</Button>
        {selectedEmployee && (
          <div className="mt-3">
            <label className="mr-3">
              <input type="checkbox" checked={selectAll} onChange={handleSelectAll} /> Select All
            </label>
            <Table striped bordered hover>
              <thead>
                <tr>
                  {tableHeaders.map((header, index) => (
                    <th key={index}>{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tableData.map((rowData, index) => (
                  <tr key={index}>
                    <td>
                      <input type="checkbox" checked={selectAll} onChange={() => {}} />
                    </td>
                    {rowData.map((data, index) => (
                      <td key={index}>{data}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        )}
      </Form>
    </div>
  );
}

export default AdminDashBoard;
