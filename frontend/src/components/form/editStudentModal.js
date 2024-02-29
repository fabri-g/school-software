// src/components/form/editStudentModal.js
import React, { useState, useEffect } from 'react';
import ReactSelect from 'react-select';
import axios from 'axios';

const EditStudentModal = ({ isOpen, onClose, onEditStudent, existingStudent }) => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [address, setAddress] = useState('');
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState('');
  const [siblings, setSiblings] = useState([]);
  const [selectedSiblings, setSelectedSiblings] = useState([]);

  // Pre-fill form fields when the modal opens or when existingStudent changes
  useEffect(() => {
    if (existingStudent && isOpen) {
      setName(existingStudent.name);
      setAge(existingStudent.age ? existingStudent.age.toString() : ''); // Ensure age is a string for the input field
      setGender(existingStudent.gender);
      setAddress(existingStudent.address);
      setSelectedRoom(existingStudent.roomID);
    }
  }, [existingStudent, isOpen]);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const roomsResponse = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/rooms`);
        setRooms(roomsResponse.data);
      } catch (error) {
        console.error('Error fetching rooms', error);
      }
    };

    fetchRooms();

    const fetchStudents = async () => {
      try {
        const studentsResponse = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/students`);
        const filteredStudents = studentsResponse.data.filter(student => student.id !== existingStudent.id);
        setSiblings(filteredStudents.map(student => ({ value: student.id, label: student.name })));
      } catch (error) {
        console.error('Error fetching students', error);
      }
    };

    if (isOpen) {
      fetchStudents();
      // Pre-fill selected siblings if any
      setSelectedSiblings(existingStudent.Siblings.map(sibling => ({ value: sibling.id, label: sibling.name })));
    }
  }, [existingStudent, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onEditStudent({
      id: existingStudent.id,
      name,
      age: age ? parseInt(age, 10) : null,
      gender,
      address,
      roomID: selectedRoom ? parseInt(selectedRoom, 10) : null,
      siblingIds: selectedSiblings.map(sibling => sibling.value),
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
            <label>Age:</label>
            <input type="number" value={age} onChange={(e) => setAge(e.target.value)} className="ml-2" />
          </div>
          <div>
            <label>Gender:</label>
            <input type="text" value={gender} onChange={(e) => setGender(e.target.value)} className="ml-2" />
          </div>
          <div>
            <label>Address:</label>
            <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} className="ml-2" />
          </div>
          <div>
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
          <div>
            <label>Siblings:</label>
            <ReactSelect
              isMulti
              value={selectedSiblings}
              onChange={(selected) => setSelectedSiblings(selected)}
              options={siblings}
            />
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

export default EditStudentModal;
