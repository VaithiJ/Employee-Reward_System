import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import SidebarMenu12 from "./side1";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";

const localizer = momentLocalizer(moment);

const calendarEvents = [
  {
    id: 1,
    title: "Meeting with clients",
    start: new Date(2023, 2, 29, 9),
    end: new Date(2023, 3, 1, 15),
    tasks: [
      {
        id: 1,
        name: "Prepare presentation",
        completed: false,
      },
      {
        id: 2,
        name: "Finalize proposal",
        completed: false,
      },
    ],
  },
  {
    id: 2,
    title: "Team lunch",
    start: new Date(2023, 3, 11, 12),
    end: new Date(2023, 3, 11, 13),
    tasks: [],
  },
  {
    id: 3,
    title: "Project deadline",
    start: new Date(2023, 3, 15, 15),
    end: new Date(2023, 3, 15, 16),
    tasks: [
      {
        id: 1,
        name: "Review code",
        completed: false,
      },
      {
        id: 2,
        name: "Test application",
        completed: false,
      },
      {
        id: 3,
        name: "Submit final version",
        completed: false,
      },
    ],
  },
];

const CalendarView = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleEventClick = (event) => {
    setSelectedEvent(event);
  };

  const handleCloseModal = () => {
    setSelectedEvent(null);
  };

  const renderTasks = () => {
    if (!selectedEvent.tasks || selectedEvent.tasks.length === 0) {
      return <p>No tasks assigned for this event.</p>;
    }

    return (
      <ul>
        {selectedEvent.tasks.map((task) => (
          <li key={task.id}>
            {task.name} - {task.completed ? "Completed" : "Pending"}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <>
      <h1
        style={{
          textAlign: "center",
          color: "#FFFFFF",
          background: "#8F00FF",
          height: "50px",
        }}
      >
        Assigned Tasks
      </h1>{" "}
      <SidebarMenu12 />
      {/* <div class="card"> */}
      <Calendar
        localizer={localizer}
        events={calendarEvents}
        startAccessor="start"
        endAccessor="end"
        onSelectEvent={handleEventClick}
        style={{
          height: 600,
          width: 1100,
          margin: "50px auto",
          borderRadius: "5px",
          boxShadow: "0 4px 8px rgba(0, 0, 1, 0.5)",
          overflow: "hidden",
          backgroundColor: "#ffffff",
          fontFamily: "Helvetica Neue, sans-serif",
          fontSize: "14px",
          marginTop: "-40px",
          marginLeft: "150px",
        }}
        eventPropGetter={(event) => ({
          style: {
            backgroundColor: "#d8e1ff",
            color: "#2e3a87",
            borderRadius: "5px",
            border: "none",
            height: "auto",
            padding: "5px",
            margin: "5px 0",
            fontSize: "14px",
            fontWeight: "bold",
            cursor: "pointer",
          },
        })}
      />
      {selectedEvent && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "5px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            zIndex: 9999,
            fontFamily: "Helvetica Neue, sans-serif",
            fontSize: "14px",
          }}
        >
          <h2 style={{ color: "#2e3a87", marginBottom: "10px" }}>
            {selectedEvent.title}
          </h2>
          <p>
            <strong style={{ color: "#2e3a87" }}>Start:</strong>{" "}
            {moment(selectedEvent.start).format("MMMM Do YYYY, h:mm a")}
          </p>
          <p>
            <strong style={{ color: "#2e3a87" }}>End:</strong>{" "}
            {moment(selectedEvent.end).format("MMMM Do YYYY, h:mm a")}
          </p>
          <h4
            style={{
              color: "#2e3a87",
              marginTop: "20px",
              marginBottom: "10px",
            }}
          >
            Tasks
          </h4>
          {renderTasks()}
          <button
            onClick={handleCloseModal}
            style={{
              backgroundColor: "#2e3a87",
              color: "#ffffff",
              border: "none",
              borderRadius: "5px",
              padding: "10px",
              marginTop: "20px",
              cursor: "pointer",
            }}
          >
            Close
          </button>
          <button
            onClick={handleCloseModal}
            style={{
              backgroundColor: "#32CD32",
              color: "#ffffff",
              border: "none",
              borderRadius: "5px",
              padding: "10px",
              marginTop: "20px",
              cursor: "pointer",
              marginLeft: "100px",
            }}
          >
            Mark As Completed
          </button>
        </div>
      )}
    </>
  );
};

export default CalendarView;
