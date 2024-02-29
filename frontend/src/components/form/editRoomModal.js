// src/components/form/editRoomModal.js
import React, { useState, useEffect } from 'react';

const EditRoomModal = ({ isOpen, onClose, onEditRoom, existingRoom }) => {
  const [name, setName] = useState('');
  const [currentCapacity, setCurrentCapacity] = useState('');
  const [maximumCapacity, setMaximumCapacity] = useState('');
  const [instructor, setInstructor] = useState('');

  // Pre-fill form fields when the modal opens or when existingRoom changes
  useEffect(() => {
    if (existingRoom && isOpen) {
      setName(existingRoom.name);
      setCurrentCapacity(existingRoom.currentCapacity ? existingRoom.currentCapacity.toString() : '') // Ensure currentCapacity is a string for the input field
      setMaximumCapacity(existingRoom.maximumCapacity ? existingRoom.maximumCapacity.toString() : ''); // Ensure maximumCapacity is a string for the input field
      setInstructor(existingRoom.instructor);
    }
  }, [existingRoom, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Data sent', { name, currentCapacity, maximumCapacity, instructor });
    onEditRoom({
      id: existingRoom.id,
      name,
      currentCapacity: currentCapacity ? parseInt(currentCapacity, 10) : null,
      maximumCapacity: maximumCapacity ? parseInt(maximumCapacity, 10) : null,
      instructor
    });
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
            <input type="number" value={maximumCapacity} onChange={(e) => setMaximumCapacity(e.target.value)} className="ml-2" />
          </div>
          <div>
            <label>Instructor:</label>
            <input type="text" value={instructor} onChange={(e) => setInstructor(e.target.value)} className="ml-2" />
          </div>
          <div className="flex justify-between">
            <button type="submit" className="mr-2">Edit</button>
            <button type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditRoomModal;
