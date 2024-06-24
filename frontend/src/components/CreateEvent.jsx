// frontend/src/components/CreateEvent.js
import React, { useState } from 'react';
import axios from 'axios';
import './CreateEvent.css';
import { useNavigate } from 'react-router-dom';
import { FaTimes } from 'react-icons/fa';

function CreateEvent({setShowEvents,fetchEvents}) {
  const [programName, setProgramName] = useState('');
  const [time, setTime] = useState('');
  const [deadline, setDeadline] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://rgukt-bms.onrender.com/api/events/create', { programName, time, deadline });
      alert('Event created successfully!');
      setProgramName('');
      setTime('');
      setDeadline('');
      navigate('/adminpostlogin');
      fetchEvents();
    } catch (error) {
      console.error('Error creating event', error);
      alert('Failed to create event');
    }
  };

  return (
    <div className="create-event-form" >
      <FaTimes style={{color:"black",paddingLeft:"200px",cursor:"pointer"}} onClick={()=>setShowEvents(false)}/>
      <h1>Create Event</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Program Name:</label>
          <input
            type="text"
            value={programName}
            onChange={(e) => setProgramName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Time:</label>
          <input
            type="datetime-local"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Deadline:</label>
          <input
            type="datetime-local"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            required
          />
        </div>
        <button type="submit">Create Event</button>
      </form>
    </div>
  );
}

export default CreateEvent;
