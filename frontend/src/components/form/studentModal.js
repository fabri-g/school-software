// src/components/form/studentModal.js
import React, { useState, useEffect } from 'react';
import ReactSelect from 'react-select';

const AddStudentModal = ({ isOpen, onClose, onAddStudent }) => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [address, setAddress] = useState('');
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState("");
  const [students, setStudents] = useState([]);
  const [selectedSiblings, setSelectedSiblings] = useState([]);

  useEffect(() => {
    // Fetch rooms
    const fetchData = async () => {
      const roomsResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL || '' }/api/rooms`);
      const roomsData = await roomsResponse.json();
      setRooms(roomsData);

      // Fetch students
      const studentsResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL || '' }/api/students`);
      const studentsData = await studentsResponse.json();
      setStudents(studentsData);
    };

    if (isOpen) {
      fetchData();
    }

  }, [isOpen]);
  // Transform students for react-select
  const studentOptions = students.map(student => ({
    value: student.id,
    label: student.name
  }));

  const handleSiblingsChange = (selectedOptions) => {
    setSelectedSiblings(selectedOptions || []);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const studentData = {
      name,
      age: age ? parseInt(age, 10) : null,
      gender,
      address,
      roomID: selectedRoom ? parseInt(selectedRoom, 10) : null,
      siblingIds: selectedSiblings.map(sibling => sibling.value),
    };
    onAddStudent(studentData);
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
            >
              <option value="">Select a room</option>
              {rooms.map((room) => (
                <option key={room.id} value={room.id}>{room.name}</option>
              ))}
            </select>
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label>Siblings:</label>
            <ReactSelect
              isMulti
              name= "siblings"
              options={studentOptions}
              className= "basic-multi-select"
              classNamePrefix= "select"
              onChange={handleSiblingsChange}
              value={selectedSiblings}
              />
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

export default AddStudentModal;
