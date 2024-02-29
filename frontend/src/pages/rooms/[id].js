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
  if (error) {
    return <p>Error loading room details: {error}</p>;
  }
  const [showEditRoomModal, setShowEditRoomModal] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const { currentUser, loading } = useAuth();

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
    <div className="ml-10 mt-8 space-y-2">
      <div className="flex items-center">
        <h1 className="text-3xl font-semibold">{room.name}</h1>
        <AddButton onClick= {handleEditClick} className="ml-12">
          Edit
        </AddButton>
        <AddButton onClick= {handleEditClick} className="ml-12" color="red">
          Delete
        </AddButton>
      </div>
      <p className="mt-5">Instructor: {room.instructor}</p>
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
        onConfirm={handleDeleteRoom} // Implement this function to handle the deletion
      />
    </div>
  );
}
export default RoomDetails;
