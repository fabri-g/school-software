// src/components/form/studentModal.js
import React, { useState, useEffect } from 'react';
import ReactSelect from 'react-select';
import axios from 'axios';

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
    // Fetch rooms and students
    const fetchData = async () => {
      try {
          const roomsResponse = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/rooms`);
          setRooms(roomsResponse.data);

          const studentsResponse = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/students`);
          setStudents(studentsResponse.data);
        } catch (error) {
          console.error('Error fetching data', error);
        }
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
              name= "siblings"
              options={studentOptions}
              className= "basic-multi-select"
              classNamePrefix= "select"
              onChange={handleSiblingsChange}
              value={selectedSiblings}
              />
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

export default AddStudentModal;
