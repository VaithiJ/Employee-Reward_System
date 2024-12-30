import React, { useState } from 'react'
import './task.css'

const TaskManagementPage = () => {
  const [projects, setProjects] = useState([
    { name: 'Project 1', deadline: '2023-04-30', status: 'In progress', tasks: 3 },
    { name: 'Project 2', deadline: '2023-05-15', status: 'Not started', tasks: 0 },
    { name: 'Project 3', deadline: '2023-05-31', status: 'Completed', tasks: 5 }
  ]);

 
  const [tasks, setTasks] = useState([
    {
      project: 'Project A',
      name: 'Task A1',
      assignedTo: 'John',
      dueDate: '2023-03-31',
      progress: 80,
      approved: false,
    },
    {
      project: 'Project B',
      name: 'Task B1',
      assignedTo: 'Jane',
      dueDate: '2023-04-15',
      progress: 60,
      approved: false,
    },
    {
      project: 'Project B',
      name: 'Task B1',
      assignedTo: 'mathi',
      dueDate: '2023-04-15',
      progress: 60,
      approved: false,
    },
  ]);

  const handleApproveTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index] = { ...updatedTasks[index], approved: true };
    setTasks(updatedTasks);
    alert('Task has been approved');
  };

  const handleRejectTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index] = { ...updatedTasks[index], approved: false };
    setTasks(updatedTasks);
    alert('Task has been rejected');
  };


  return (
    <div className="container">
      {/* <nav className="navbar" style={{ backgroundColor: "#f2f2f2", padding: "10px 20px", boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)" }}>
  <ul style={{ display: "flex", gap: "20px", listStyleType: "none", margin: "0" }}>
    <li><a href="#" style={{ color: "#333", textDecoration: "none" }}>Dashboard</a></li>
    <li><a href="#" style={{ color: "#333", textDecoration: "none" }}>Projects</a></li>
    <li><a href="#" style={{ color: "#333", textDecoration: "none" }}>Team</a></li>
    <li><a href="#" style={{ color: "#333", textDecoration: "none" }}>Calendar</a></li>
    <li><a href="#" style={{ color: "#333", textDecoration: "none" }}>Settings</a></li>
  </ul>
</nav> */}

      <div className="main">
        <h1>Task Management</h1>
        <div className="summary">
  <div className="summary-card" style={{ backgroundColor: "#fff", padding: "20px", boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.6)", borderRadius: "5px", marginBottom: "20px" }}>
    <h2 style={{ fontSize: "1.2rem", fontWeight: "bold", margin: "0" }}>Ongoing Projects</h2>
    <p style={{ fontSize: "1.5rem", fontWeight: "bold", margin: "10px 0 0 0" }}>{projects.filter(p => p.status === 'In progress').length}</p>
  </div>
  <div className="summary-card" style={{ backgroundColor: "#fff", padding: "20px", boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.6)", borderRadius: "5px", marginBottom: "20px" }}>
    <h2 style={{ fontSize: "1.2rem", fontWeight: "bold", margin: "0" }}>Upcoming Deadlines</h2>
    <p style={{ fontSize: "1.5rem", fontWeight: "bold", margin: "10px 0 0 0" }}>{projects.filter(p => new Date(p.deadline) <= new Date()).length}</p>
  </div>
  <div className="summary-card" style={{ backgroundColor: "#fff", padding: "20px", boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.6)", borderRadius: "5px", marginBottom: "20px" }}>
    <h2 style={{ fontSize: "1.2rem", fontWeight: "bold", margin: "0" }}>Pending Tasks</h2>
    <p style={{ fontSize: "1.5rem", fontWeight: "bold", margin: "10px 0 0 0" }}>{tasks.filter(t => t.progress < 100).length}</p>
  </div>
</div>

<div className="tasks" style={{ 
  background: 'white', 
  padding: '20px', 
  borderRadius: '8px', 
  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.6)', 
  border: '1px solid #ccc',
  marginBottom: '20px',
  }}>
  <h2>Tasks</h2>
  <div className="task-list">
  <div className="task-list">
    <div className="task-list-header">
      <div className="task-name" style={{ width: '25%' }}>Task Name</div>
      <div className="task-assigned-to" style={{ width: '20%' }}>Assigned To</div>
      <div className="task-due-date" style={{ width: '10%' }}>Due Date</div>
      <div className="task-progress" style={{ width: '10%' }}>Status</div>
      
      <div className="task-status" style={{ width: '15%', paddingLeft: "30px" }}>Actions</div>
    </div>
    {tasks.map((task, index) => (
      <div className="task-list-item" key={index} style={{ 
        display: 'flex', 
        alignItems: 'center', 
        marginTop: '10px', 
        borderBottom: '1px solid #ccc',
        paddingBottom: '10px',
      }}>
        <div className="task-name" style={{ width: '25%' }}>{task.name}</div>
        <div className="task-assigned-to" style={{ width: '20%' }}>{task.assignedTo}</div>
        <div className="task-due-date" style={{ width: '10%', marginLeft:"80px" }}>{task.dueDate}</div>
        <div className="task-progress" style={{ width: '10%' ,marginLeft:"40px"}}>
          {task.approved ? <span className="approved">&#10003;</span> : <span className="rejected">&#10005;</span>}
        </div>
        
        <div className="task-status" style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          marginLeft: 'auto',
          width: '15%',
        }}>
          {!task.approved ? (
            <div>
              <button style={{ 
                marginRight: '10px', 
                padding: '8px 16px', 
                background: 'green', 
                color: 'white', 
                border: 'none', 
                borderRadius: '4px', 
                cursor: 'pointer' 
              }} onClick={() => handleApproveTask(index)}>Approve</button> 
            </div>
          ) : (
            <div style={{ fontSize: '20px', fontWeight: 'bold' }}>Approved</div>
          )}
          {!task.rejected ? (
            <div>
              <button style={{ 
                padding: '8px 16px', 
                background: 'red', 
                color: 'white', 
                border: 'none', 
                borderRadius: '4px', 
                cursor: 'pointer' 
              }} onClick={() => handleRejectTask(index)}>Reject</button>
            </div>
          ) : (
            <div style={{ fontSize: '20px', fontWeight: 'bold' }}>Rejected</div>
          )}
        </div>
      </div>
    ))}
</div>


      </div>
    </div>
  </div>
</div>
);
};

export default TaskManagementPage;