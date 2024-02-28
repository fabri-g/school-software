// pages/rooms/[id].js
import React, { useState } from 'react';
import Link from 'next/link';
import EditRoomModal from '../../components/form/editRoomModal';
import ConfirmationDialog from '../../components/form/deleteConfirmation';
import { useRouter } from 'next/router';
import { useAuth } from '../../context/authContext';
import { handleAuthClick } from '../../helpers/authActions';
import axios from 'axios';

export async function getServerSideProps({ params }) {
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/rooms/${params.id}`);
    const room = res.data;
    return {
      props: { room },
    };
  } catch (error) {
    console.error(error);
    const errorMessage = error.response ? error.response.data.message : error.message;
    return {
      props: { error: errorMessage },
    };
  }
}

const RoomDetails = ({ room, error }) => {
  const router = useRouter();
  const [showEditRoomModal, setShowEditRoomModal] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const { currentUser, loading } = useAuth();

  if (error) {
    return <p>Error loading room details: {error}</p>;
  }

  const editRoom = async (roomData) => {
    try {
      // API call to edit room
      await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/rooms/${room.id}`, roomData);
      //Reload to show updated information
      location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteRoom = async () => {
    try{
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/rooms/${room.id}`);
      // Handle success
      router.push('/rooms'); // Redirect to the list of rooms
    } catch (error) {
    console.error(error);
    }
  };

  const handleEditClick = handleAuthClick(() => setShowEditRoomModal(true), loading, currentUser, router);
  const handleDeleteClick = handleAuthClick(() => setShowDeleteConfirmation(true), loading, currentUser, router);

  return (
    <div style={{ marginLeft: '40px', marginTop: '30px', lineHeight: '2' }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <h1 className="text-3xl font-semibold">{room.name}</h1>
        <button
          style={{ marginLeft: '50px' , backgroundColor: '#6367E3'}}
          className="text-white font-bold py-2 px-4 rounded"
          onClick={handleEditClick}>Edit</button>
        <button
          style={{ marginLeft: '30px' , backgroundColor: '#E22840'}}
          className="text-white font-bold py-2 px-4 rounded"
          onClick={handleDeleteClick}>Delete</button>
      </div>
      <p style={{ marginTop: '20px' }}>Instructor: {room.instructor}</p>
      <p>Number of Students: {room.currentCapacity}</p>
      <p>Maximum Capacity: {room.maximumCapacity}</p>
      <h2 className="text-xl font-semibold mt-4">Students in this room:</h2>
      <ul>
        {room.students && room.students.map(student => (
          <li key={student.id}>
            <Link href={`/students/${student.id}`}
              className="text-blue-500 hover:text-blue-800">{student.name} - Age: {student.age}
            </Link>
          </li>
        ))}
      </ul>
      <EditRoomModal
        isOpen={showEditRoomModal}
        onClose={() => setShowEditRoomModal(false)}
        onEditRoom={editRoom}
        existingRoom={room}
      />
      <ConfirmationDialog
        isOpen={showDeleteConfirmation}
        onClose={() => setShowDeleteConfirmation(false)}
        onConfirm={handleDeleteRoom}
      />
    </div>
  );
}
export default RoomDetails;
