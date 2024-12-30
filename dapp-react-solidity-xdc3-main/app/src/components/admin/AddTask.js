import React, { useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Navbar from '../header/Navbar';
import Footer from '../footer/Footer';
const AddTask = () => {
  const [employees, setEmployees] = useState([
    { id: 1, name: 'John Doe', status: 'pending' },
    { id: 2, name: 'Jane Smith', status: 'completed' },
    { id: 3, name: 'Bob Johnson', status: 'pending' },
  ]);

  const handleAddTask = () => {
    // Add logic for adding new task
  };

  const handleApproveTasks = () => {
    // Add logic for approving tasks
  };

  return (
    <div>
        <Navbar/>
    <Container className="mt-3">
        
      <Row>
        <Col>
          <h2>Task Status</h2>
          <hr />
        </Col>
      </Row>
      <Row>
        <Col>
          {employees.map((employee) => (
            <div key={employee.id}>
              <p>{employee.name}</p>
              <p>EmployeeID: {employee.id}</p>
              <p>Status: {employee.status}</p>
            </div>
          ))}
        </Col>
      </Row>
      <Row className="mt-3">
        <Col>
          <Button variant="primary" onClick={handleAddTask}>
            Add tasks
          </Button>{' '}
          <Button variant="success" onClick={handleApproveTasks}>
            Approve Tasks
          </Button>
        </Col>
      </Row>
      
    </Container>
    <Footer/>
    </div>
  );
};

export default AddTask;
