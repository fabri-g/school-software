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
    onAddRoom(roomData);
    onClose(); // Close modal after submission
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-1050">
      <div className="bg-white p-5 rounded shadow-md max-w-sm w-full">
        <form onSubmit={handleSubmit} className="space-y-2.5">
          <div>
            <label>Name:</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required className="ml-2" />
          </div>
          <div>
            <label>Number of Students:</label>
            <input type="number" value={currentCapacity} onChange={(e) => setCurrentCapacity(e.target.value)} className="ml-2" />
          </div>
          <div>
            <label>Maximum Capacity:</label>
            <input type="number" value={maximumCapacity} onChange={(e) => setMaxiumCapacity(e.target.value)} className="ml-2" />
          </div>
          <div>
            <label>Instructor:</label>
            <input type="text" value={instructor} onChange={(e) => setInstructor(e.target.value)} className="ml-2" />
          </div>
          <div className="flex justify-between">
            <button type="submit" className="mr-2">Add</button>
            <button type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddRoomModal;
