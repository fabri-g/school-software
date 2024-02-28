// pages/students/[id].js
import React, { useState } from 'react';
import Link from 'next/link';
import EditStudentModal from '../../components/form/editStudentModal';
import ConfirmationDialog from '../../components/form/deleteConfirmation';
import { useRouter } from 'next/router';
import { useAuth } from '../../context/authContext';
import { handleAuthClick } from '../../helpers/authActions';
import axios from 'axios';

export async function getServerSideProps({ params }) {
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/students/${params.id}`);
    const student = await res.data;
    console.log(student.Siblings);
    return {
      props: { student },
    };
  } catch (error) {
    console.error(error);
    const errorMessage = error.response ? error.response.data.message : error.message;
    return {
      props: { error: errorMessage },
    };
  }
}

const StudentDetails = ({ student, error }) => {
  const router = useRouter();
  if (error) {
    return <p>Error loading student details: {error}</p>;
  }
  const [showEditStudentModal, setShowEditStudentModal] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const { currentUser, loading } = useAuth();

  const editStudent = async (studentData) => {
    try {
      // API call to edit student
      await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/students/${student.id}`, studentData);
      //Reload to show updated information
      router.reload();
    } catch (error) {
      console.error(error);
    }
  }

  const handleDeleteStudent = async () => {
    try{
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/students/${student.id}`);
      router.push('/students'); // Redirect to the list of students
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditClick = handleAuthClick(() => setShowEditStudentModal(true), loading, currentUser, router);
  const handleDeleteClick = handleAuthClick(() => setShowDeleteConfirmation(true), loading, currentUser, router);

  return (
    <div style={{ marginLeft: '40px', marginTop: '30px', lineHeight: '2' }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <h1 className="text-3xl font-semibold">{student.name}</h1>
        <button
          style={{ marginLeft: '50px' , backgroundColor: '#6367E3'}}
          className="text-white font-bold py-2 px-4 rounded"
          onClick= {handleEditClick} >Edit</button>
        <button
          style={{ marginLeft: '30px' , backgroundColor: '#E22840'}}
          className= "text-white font-bold py-2 px-4 rounded"
          onClick={handleDeleteClick}>Delete</button>
      </div>
      <p style={{ marginTop: '20px' }}>Age: {student.age}</p>
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
        onEditStudent={editStudent}
        existingStudent={student}
      />
      <ConfirmationDialog
        isOpen={showDeleteConfirmation}
        onClose={() => setShowDeleteConfirmation(false)}
        onConfirm={handleDeleteStudent} // Implement this function to handle the deletion
      />
    </div>
  );
};

export default StudentDetails;
