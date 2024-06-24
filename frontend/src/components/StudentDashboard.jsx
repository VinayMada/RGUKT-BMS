import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './StudentDashboard.css';

export default function StudentDashboard({ studentId }) {
  const [events, setEvents] = useState([]);
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [seatingInfo, setSeatingInfo] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/events');
        const currentDate = new Date();
        const upcomingEvents = response.data.filter(event => new Date(event.time) >= currentDate);
        setEvents(upcomingEvents);
      } catch (error) {
        console.error('Error fetching events', error);
      }
    };

    fetchEvents();
  }, []);

  const registerForEvent = async (eventId) => {
    console.log('Registering for event. Student ID:', studentId, 'Event ID:', eventId);
    try {
      const response = await axios.post(`http://localhost:5000/api/events/register/${eventId}`, { studentId });
      alert(response.data.message);

      if (response.data.success) {
        setSelectedEventId(eventId);
      }
    } catch (error) {
      alert('Failed to register for event');
    }
  };

  return (
    <div className="student-dashboard">
      <h1>Upcoming Programs</h1>
      <ul>
        {events.length === 0 ? (
          <li style={{color:"black"}}>No events available</li>
        ) : (
          events.map(event => (
            <li key={event._id}>
              <p className="event-name">{event.programName}</p>
              <p className="event-time">Event Date: {new Date(event.time).toLocaleString()}</p>
              <p className="event-deadline">Deadline: {new Date(event.deadline).toLocaleString()}</p>
              {new Date() < new Date(event.deadline) ? (
                <button className="register-button" onClick={() => registerForEvent(event._id)}>
                  Register
                </button>
              ) : (
                <p className="registration-closed">Bookings closed</p>
              )}
            </li>
          ))
        )}
      </ul>

      {selectedEventId && (
        <div className="seating-info">
          <h2>Seating Information</h2>
          <div className="seating-chart">
            {seatingInfo.length === 0 ? (
              <p>No seating information available</p>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>Row</th>
                    <th>Seat Number</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {seatingInfo.map((seat, index) => (
                    <tr key={index}>
                      <td>{seat.row}</td>
                      <td>{seat.seatNumber}</td>
                      <td>{seat.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
