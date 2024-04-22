// services/roomsService.js
import apiClient from "../api/apiClient";

export const fetchRooms = async (searchTerm = '') => {
  try {
      const response = await apiClient.get(`/api/rooms${searchTerm ? `?name=${searchTerm}` : ''}`);
      return response.data;
  } catch (error) {
      console.error('Failed to fetch rooms:', error);
      window.alert('Failed to fetch rooms:', error);
      throw error;
  }
};

export const fetchRoomById = async (roomId) => {
  try {
    const response = await apiClient.get(`/api/rooms/${roomId}`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch room:', error);
    window.alert('Failed to fetch room:', error);
    throw error;
  }
};

export const addRoom = async (roomData) => {
  try {
    const response = await apiClient.post('/api/rooms', roomData);
    return response.data;
  } catch (error) {
    console.error('Failed to add room:', error);
    window.alert('Failed to add room:', error);
    throw error;
  }
};

export const editRoom = async (roomId, roomData) => {
  try {
    const response = await apiClient.put(`/api/rooms/${roomId}`, roomData);
    return response.data;
  } catch (error) {
    console.error('Failed to edit room:', error);
    window.alert('Failed to edit room:', error);
    throw error;
  }
};

export const deleteRoom = async (roomId) => {
  try {
    await apiClient.delete(`/api/rooms/${roomId}`);
  } catch (error) {
    console.error('Failed to delete room:', error);
    window.alert('Failed to delete room:', error);
    throw error;
  }
};
