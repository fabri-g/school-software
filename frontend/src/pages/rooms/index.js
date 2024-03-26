// pages/rooms.js
import React, { useState, useEffect } from 'react';
import AddRoomModal from '../../components/form/roomModal';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '../../context/authContext';
import { useRouter } from 'next/router';
import { handleAuthClick } from '../../helpers/authActions';
import AddButton from '../../components/buttons/customButton';
import fetchRooms from '../../hooks/fetchRooms';
import { addRoom } from '../../services/roomsService';

const Rooms = () => {
  const [showAddRoomModal, setShowAddRoomModal] = useState(false);
  const { currentUser, loading: authLoading } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();
  const { loading, data: rooms, error, refetch } = fetchRooms(searchTerm);

  const handleAddRoom = async (roomData) => {
    try {
      await addRoom(roomData);
      setShowAddRoomModal(false); // Close modal
      refetch();
    } catch (error) {
      console.error('Failed to add room:', error);
    }
  };

  const handleAddClick = handleAuthClick(() => setShowAddRoomModal(true), authLoading, currentUser, router);

  return (
    <>
      <div className="mx-6 my-4">
        <h1 className="text-3xl font-semibold mb-4">Rooms</h1>
        <div className="flex justify-between mb-4">
          <div className="flex items-center space-x-2">
            <div className="inline-block w-5 h-5">
              <Image src="/assets/images/loupe.png" alt="Search" width={20} height={20} />
            </div>
            <input
              type="text"
              placeholder="Search by name"
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border border-gray-300 p-2 rounded"
            />
          </div>
          <AddButton onClick={handleAddClick}>
            Add +
          </AddButton>
        </div>
      </div>
      <div className="mx-6">
        {rooms && rooms.map((room) => (
          <Link key={room.id} href={`/rooms/${room.id}`} passHref>
            <div className="block bg-gray-100 p-4 my-4 rounded-lg shadow">
              <h2 className="text-xl font-bold">{room.name}</h2>
              <p>Number of Students: {room.currentCapacity}</p>
          </div>
          </Link>
        ))}
      </div>
      <AddRoomModal
        isOpen={showAddRoomModal}
        onClose={() => setShowAddRoomModal(false)}
        onAddRoom={handleAddRoom}
      />
    </>
  );
};

export default Rooms;
