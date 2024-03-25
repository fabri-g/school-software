// pages/rooms/[id].js
import React, { useState } from 'react';
import Link from 'next/link';
import EditRoomModal from '../../components/form/editRoomModal';
import ConfirmationDialog from '../../components/form/deleteConfirmation';
import { useRouter } from 'next/router';
import { useAuth } from '../../context/authContext';
import { handleAuthClick } from '../../helpers/authActions';
import AddButton from '../../components/buttons/customButton';
import fetchRoomById from '../../hooks/fetchSingleRoom';
import { deleteRoom, editRoom } from '../../services/roomsService';

const RoomDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data: room, loading, error } = fetchRoomById(id);
  const [showEditRoomModal, setShowEditRoomModal] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const { currentUser, loading: authLoading } = useAuth();

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error loading room details: {error}</p>;
  }

  if (!room) {
    return <p>Room not found</p>;
  }

  const handleEditRoom = async (roomData) => {
    try {
      await editRoom(room.id, roomData);
      location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteRoom = async () => {
    try{
      await deleteRoom(room.id);
      router.push('/rooms'); // Redirect to the list of rooms
    } catch (error) {
    console.error(error);
    }
  };

  const handleEditClick = handleAuthClick(() => setShowEditRoomModal(true), authLoading, currentUser, router);
  const handleDeleteClick = handleAuthClick(() => setShowDeleteConfirmation(true), authLoading, currentUser, router);

  return (
    <div className="ml-10 mt-8 space-y-2">
      <div className="flex items-center">
        <h1 className="text-3xl font-semibold">{room.name}</h1>
        <AddButton onClick= {handleEditClick} className="ml-12">
          Edit
        </AddButton>
        <AddButton onClick= {handleDeleteClick} className="ml-12" color="red">
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
        onEditRoom={handleEditRoom}
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
