import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import { Modal, Button, Form } from "react-bootstrap";

const LibraryEventCalendar = ({ isAdmin }) => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [newEvent, setNewEvent] = useState({ title: "", start: "" });

  // Fetch events from backend
  useEffect(() => {
    fetch("http://localhost:8080/api/events")
      .then((response) => response.json())
      .then((data) => setEvents(data))
      .catch((error) => console.error("Error fetching events:", error));
  }, []);

  // Handle adding a new event (Admin only)
  const handleAddEvent = () => {
    if (!isAdmin) return; // Restrict non-admins

    fetch("http://localhost:8080/api/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newEvent),
    })
      .then((response) => response.json())
      .then((event) => setEvents([...events, event]))
      .catch((error) => console.error("Error adding event:", error));

    setShowModal(false);
  };

  // Handle deleting an event (Admin only)
  const handleDeleteEvent = (id) => {
    if (!isAdmin) return;

    fetch(`http://localhost:8080/api/events/${id}`, { method: "DELETE" })
      .then(() => setEvents(events.filter((event) => event.id !== id)))
      .catch((error) => console.error("Error deleting event:", error));
  };

  return (
    <div style={{ padding: "20px", background: "#fff", borderRadius: "8px" }}>
      <h2 style={{ color: "#9100df", textAlign: "center", marginBottom: "20px" }}>
        📅 Library Event Calendar
      </h2>

      {isAdmin && (
        <Button onClick={() => setShowModal(true)} style={{ marginBottom: "10px", background: "#9100df" }}>
          ➕ Add Event
        </Button>
      )}

      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        eventClick={(info) => isAdmin && handleDeleteEvent(info.event.id)}
        style={{ background: "#f5f5f5", borderRadius: "8px", padding: "10px" }}
      />

      {/* Modal for Adding Events (Admin Only) */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Event</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Event Title</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Event Date</Form.Label>
              <Form.Control
                type="date"
                onChange={(e) => setNewEvent({ ...newEvent, start: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
          <Button variant="primary" onClick={handleAddEvent}>Save Event</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default LibraryEventCalendar;
