import React, { useState, useEffect } from 'react';
import AddStudentModal from '../components/form/studentModal';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '../context/authContext';
import { useRouter } from 'next/router';
import { handleAuthClick } from '../helpers/authActions';
import { debounce  } from '../helpers/debounce';
import AddButton from '../components/buttons/customButton';
import axios from 'axios';

// Fetch function
async function fetchStudentsData(searchTerm = '') {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/students${searchTerm ? `?name=${searchTerm}` : ''}`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch students:', error);
    const errorMessage = error.response ? error.response.data.message : error.message;
    return { error: errorMessage };
  }
}

export async function getServerSideProps() {
  try {
    const studentsData = await fetchStudentsData();
  return {
    props: { initialStudents: studentsData }, // Pass students data as props to the page
  };
  } catch (error) {
    console.error("Error fetching students data:", error);
    return {
      props: { initialStudents: [] }, // Return empty data on error
    };
  }
}

const Students = ({ initialStudents }) => {
  const [students, setStudents] = useState(initialStudents || []);
  const [showAddStudentModal, setShowAddStudentModal] = useState(false);
  const { currentUser, loading } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();


  const addStudent = async (studentData) => {
    try {
      // API call to add student
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/students`, studentData);

      // Close modal
      setShowAddStudentModal(false);
      // Fetch updated list of students
      const updatedStudents = await fetchStudentsData();
      setStudents(updatedStudents);
    } catch (error) {
      console.error('Failed to add student:', error);
    }
  };

  const handleAddClick =  handleAuthClick(() => setShowAddStudentModal(true), loading, currentUser, router);

  useEffect(() => {
    const debouncedSearch = debounce(() => fetchAndSetStudents(searchTerm), 500);
    debouncedSearch();
  } , [searchTerm]);

  const fetchAndSetStudents = async (searchValue) => {
    const updatedStudents = await fetchStudentsData(searchValue);
    setStudents(updatedStudents);
  };

  return (
    <>
    <div className="mx-6 my-4">
      <h1 className="text-3xl font-semibold mb-4">Students</h1>
      <div className="flex justify-between mb-4">
        <div className="flex items-center space-x-2">
          <div className="inline-block w-5 h-5">
            <Image src="/assets/images/loupe.png" alt="Search" width={20} height={20} layout="fixed" />
          </div>
          <input
            type="text"
            placeholder="Search by name"
            className="border border-gray-300 p-2 rounded"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <AddButton onClick={handleAddClick}>
            Add +
        </AddButton>
      </div>
    </div>
    <div className="mx-6">
      {students.map((student) => (
        <Link key={student.id} href={`/students/${student.id}`} passHref>
          <div className="block bg-gray-100 p-4 my-4 rounded-lg shadow">
            <h2 className="text-xl font-bold">{student.name}</h2>
            {student.room && <p>Room: {student.room.name}</p>}
          </div>
        </Link>
      ))}
    </div>
      <AddStudentModal
        isOpen={showAddStudentModal}
        onClose={() => setShowAddStudentModal(false)}
        onAddStudent={addStudent}
      />
    </>
  );
};

export default Students;
