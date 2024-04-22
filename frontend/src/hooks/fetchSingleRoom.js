// src/hooks/fetchSingleRoom.js
import { useState, useEffect } from 'react';
import axios from 'axios';
import { fetchRoomById as fetchRoomByIdService } from '../services/roomsService';

const fetchRoomById = (roomId) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!roomId) return;

    const fetchRoom = async () => {
      setLoading(true);
      try {
        const room = await fetchRoomByIdService(roomId);
        setData(room);
        setError(null);
      } catch (error) {
        console.error('Failed to fetch room:', error);
        setError(error.response ? error.response.data.message : error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRoom();
  }, [roomId]);

  return { loading, data, error };
};

export default fetchRoomById;
