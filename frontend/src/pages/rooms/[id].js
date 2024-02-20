// pages/rooms/[id].js
import React, { useState } from 'react';
import Link from 'next/link';
import EditRoomModal from '../../components/form/edit-room-modal';
import ConfirmationDialog from '../../components/form/delete-confirmation';
import { useRouter } from 'next/router';
import { useAuth } from '../../context/AuthContext';
import { handleAuthClick } from '../../helpers/authActions';

export async function getServerSideProps({ params }) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/rooms/${params.id}`);
    if (!res.ok) {
      throw new Error('Failed to fetch rooms');
    }
    const room = await res.json();

    return {
      props: { room },
    };
  } catch (error) {
    console.error(error);
    return {
      props: { error: error.message },
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
    // API call to edit room
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/rooms/${room.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(roomData),
    });
    //Reload to show updated information
    location.reload();
  }

  const handleDeleteRoom = async () => {
    try{
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/rooms/${room.id}`, {
        method: 'DELETE',
      });

    if (!response.ok) {
      throw new Error(`Failed to delete room with id ${room.id}, status code: ${response.status}`);
    }

    // Handle success
    console.log("Room deleted successfully");
    router.push('/rooms'); // Redirect to the list of rooms
    // If you're on a room details page, redirect back to the list
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
          style={{ marginLeft: '50px' }}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleEditClick}>Edit</button>
        <button
          style={{ marginLeft: '30px' }}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
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
        onConfirm={handleDeleteRoom} // Implement this function to handle the deletion
      />
    </div>
  );
}
export default RoomDetails;
