// src/components/form/edit-student-modal.js
import React, { useState, useEffect } from 'react';

const EditStudentModal = ({ isOpen, onClose, onEditStudent, existingStudent }) => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [address, setAddress] = useState('');
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState('');

  // Pre-fill form fields when the modal opens or when existingStudent changes
  useEffect(() => {
    if (existingStudent && isOpen) {
      setName(existingStudent.name);
      setAge(existingStudent.age.toString()); // Ensure age is a string for the input field
      setGender(existingStudent.gender);
      setAddress(existingStudent.address);
      setSelectedRoom(existingStudent.roomID); // Make sure this matches how room ID is stored
    }
  }, [existingStudent, isOpen]);

  useEffect(() => {
    const fetchRooms = async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/rooms`);
      const data = await response.json();
      setRooms(data);
    };

    fetchRooms();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    onEditStudent({
      id: existingStudent.id, // Ensure you pass the student's ID for the update
      name,
      age,
      gender,
      address,
      roomID: selectedRoom
    });
    onClose(); // Close modal after submission
  };

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0,0,0,0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
    }}>
      <div className="modal-content" style={{
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '5px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        maxWidth: '500px',
        width: '100%',
      }}>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '10px' }}>
            <label>Name:</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required style={{ marginLeft: '10px' }} />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label>Age:</label>
            <input type="number" value={age} onChange={(e) => setAge(e.target.value)} style={{ marginLeft: '10px' }} />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label>Gender:</label>
            <input type="text" value={gender} onChange={(e) => setGender(e.target.value)} style={{ marginLeft: '10px' }} />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label>Address:</label>
            <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} style={{ marginLeft: '10px' }} />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label>Room:</label>
            <select
              value={selectedRoom}
              onChange={(e) => setSelectedRoom(e.target.value)}
              required
            >
              <option value="">Select a room</option>
              {rooms.map((room) => (
                <option key={room.id} value={room.id}>{room.name}</option>
              ))}
            </select>
          </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <button type="submit" style={{ marginRight: '10px' }}>Edit</button>
          <button type="button" onClick={onClose}>Cancel</button>
        </div>
      </form>
    </div>
  </div>
  );
};

export default EditStudentModal;
