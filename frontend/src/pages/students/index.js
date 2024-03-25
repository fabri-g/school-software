// src/pages/students/index.js
import React, { useState } from 'react';
import AddStudentModal from '../../components/form/studentModal';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '../../context/authContext';
import { useRouter } from 'next/router';
import { handleAuthClick } from '../../helpers/authActions';
import AddButton from '../../components/buttons/customButton';
import { addStudent } from '../../services/studentsService';
import fetchStudents from '../../hooks/fetchStudents';

const Students = () => {
  const [showAddStudentModal, setShowAddStudentModal] = useState(false);
  const { currentUser, loading: authLoading } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();
  const { loading, data: students, error, refetch } = fetchStudents(searchTerm);

  const handleAddStudent = async (studentData) => {
    try {
      await addStudent(studentData);
      setShowAddStudentModal(false); // Close modal
      refetch();
    } catch (error) {
      console.error('Failed to add student:', error);
    }
  };

  const handleAddClick =  handleAuthClick(() => setShowAddStudentModal(true), authLoading, currentUser, router);

  return (
    <>
    <div className="mx-6 my-4">
      <h1 className="text-3xl font-semibold mb-4">Students</h1>
      <div className="flex justify-between mb-4">
        <div className="flex items-center space-x-2">
          <div className="inline-block w-5 h-5">
            <Image src="/assets/images/loupe.png" alt="Search" width={20} height={20} />
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
      {students && students.map((student) => (
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
        onAddStudent={handleAddStudent}
      />
    </>
  );
};

export default Students;
