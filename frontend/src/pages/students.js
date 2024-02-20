import React, { useState } from 'react';
import AddStudentModal from '../components/form/student-modal';
import Link from 'next/link';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/router';
import { handleAuthClick } from '../helpers/authActions';

// Fetch function
async function fetchStudentsData() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/students`);
  const data = await response.json();
  return data;
}

export async function getServerSideProps(context) {
  const studentsData = await fetchStudentsData();
  return {
    props: { initialStudents: studentsData }, // Pass students data as props to the page
  };
}

const Students = ({ initialStudents }) => {
  const [students, setStudents] = useState(initialStudents || []);
  const [showAddStudentModal, setShowAddStudentModal] = useState(false);
  const { currentUser, loading } = useAuth();
  const router = useRouter();

  const addStudent = async (studentData) => {
    // API call to add student
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/students`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(studentData),
    });

    // Close modal
    setShowAddStudentModal(false);

    // Fetch updated list of students
    const updatedStudents = await fetchStudentsData();
    setStudents(updatedStudents);
  };

  const handleAddClick =  handleAuthClick(() => setShowAddStudentModal(true), loading, currentUser, router);

  return (
    <>
    <div className="flex justify-between items-center mx-6 my-4">
      <h1 className="text-3xl font-semibold">Students</h1>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleAddClick}
      >
          Add +
      </button>
      </div>
        {students.map((student) => (
          <Link key={student.id} href={`/students/${student.id}`} passHref>
            <div className="max-w-xl mx-auto bg-gray-100 p-4 my-4 rounded-lg shadow">
              <h2 className="text-xl font-bold">{student.name}</h2>
              {student.age && <p>Age: {student.age}</p>}
              {/* More student info */}
            </div>
          </Link>
        ))}
      <AddStudentModal
        isOpen={showAddStudentModal}
        onClose={() => setShowAddStudentModal(false)}
        onAddStudent={addStudent}
      />
    </>
  );
};

export default Students;


