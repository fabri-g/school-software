// pages/students/[id].js
import React, { useState } from 'react';
import Link from 'next/link';
import EditStudentModal from '../../components/form/editStudentModal';
import ConfirmationDialog from '../../components/form/deleteConfirmation';
import { useRouter } from 'next/router';
import { useAuth } from '../../context/authContext';
import { handleAuthClick } from '../../helpers/authActions';
import AddButton from '../../components/buttons/customButton';
import fetchStudentById from '../../hooks/fetchSingleStudent';
import { editStudent, deleteStudent } from '../../services/studentsService';

const StudentDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data: student, loading, error } = fetchStudentById(id);
  const [showEditStudentModal, setShowEditStudentModal] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const { currentUser, loading: authLoading } = useAuth();

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error loading student details: {error}</p>;
  }

  if (!student) {
    return <p>Student not found</p>;
  }

  const handleEditStudent = async (studentData) => {
    try {
      await editStudent(student.id, studentData);
      router.reload();
    } catch (error) {
      console.error(error);
    }
  }

  const handleDeleteStudent = async () => {
    try{
      await deleteStudent(student.id);
      router.push('/students'); // Redirect to the list of students
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditClick = handleAuthClick(() => setShowEditStudentModal(true), authLoading, currentUser, router);
  const handleDeleteClick = handleAuthClick(() => setShowDeleteConfirmation(true), authLoading, currentUser, router);

  return (
    <div className="ml-10 mt-8 space-y-2">
      <div className="flex items-center">
        <h1 className="text-3xl font-semibold">{student.name}</h1>
        <AddButton onClick= {handleEditClick} className="ml-12">
          Edit
        </AddButton>
        <AddButton onClick= {handleDeleteClick} className="ml-12" color="red">
          Delete
        </AddButton>
      </div>
      <p className="mt-5">Age: {student.age}</p>
      <p>Gender: {student.gender}</p>
      <p>Address: {student.address}</p>
      <p>Room: {student.room ? (
        <Link href={`/rooms/${student.room.id}`} className="text-blue-500 hover:text-blue-800">
          {student.room.name}
        </Link>
      ) : "No room assigned"}
      </p>
      <p> Siblings:</p>
      {student.Siblings && student.Siblings.length > 0 ? (
      <ul>
        {student.Siblings.map(sibling => (
          <li key={sibling.id}>
            <Link href={`/students/${sibling.id}`} className="text-blue-500 hover:text-blue-800">
              {sibling.name}
            </Link>
          </li>
        ))}
      </ul>
      ): (
        <p>No siblings listed.</p>
      ) }
      <EditStudentModal
        isOpen={showEditStudentModal}
        onClose={() => setShowEditStudentModal(false)}
        onEditStudent={handleEditStudent}
        existingStudent={student}
      />
      <ConfirmationDialog
        isOpen={showDeleteConfirmation}
        onClose={() => setShowDeleteConfirmation(false)}
        onConfirm={handleDeleteStudent}
      />
    </div>
  );
};

export default StudentDetails;
