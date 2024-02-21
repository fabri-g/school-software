// src/components/form/roomModal.js
import React, { useState } from 'react';

const AddRoomModal = ({ isOpen, onClose, onAddRoom }) => {
  const [name, setName] = useState('');
  const [currentCapacity, setCurrentCapacity] = useState('');
  const [maximumCapacity, setMaxiumCapacity] = useState('');
  const [instructor, setInstructor] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const roomData = {
      name,
      currentCapacity: currentCapacity ? parseInt(currentCapacity, 10) : null,
      maximumCapacity: maximumCapacity ? parseInt(maximumCapacity, 10) : null,
      instructor,
    };
    console.log("Final data sent to backend:", roomData);
    onAddRoom(roomData);
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
      zIndex: 1000, // Ensure it's above other content
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
            <label>Number of Students:</label>
            <input type="number" value={currentCapacity} onChange={(e) => setCurrentCapacity(e.target.value)} style={{ marginLeft: '10px' }} />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label>Maximum Capacity:</label>
            <input type="number" value={maximumCapacity} onChange={(e) => setMaxiumCapacity(e.target.value)} style={{ marginLeft: '10px' }} />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label>Instructor:</label>
            <input type="text" value={instructor} onChange={(e) => setInstructor(e.target.value)} style={{ marginLeft: '10px' }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <button type="submit" style={{ marginRight: '10px' }}>Add</button>
            <button type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddRoomModal;
