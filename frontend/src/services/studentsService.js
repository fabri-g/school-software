// services/studentsService.js
import apiClient from "../api/apiClient";

export const fetchStudents = async (searchTerm = '') => {
  try {
    const response = await apiClient.get(`/api/students${searchTerm ? `?name=${searchTerm}` : ''}`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch students:', error);
    window.alert('Failed to fetch students:', error);
    throw error;
  }
};

export const fetchStudentById = async (studentId) => {
  try {
    const response = await apiClient.get(`/api/students/${studentId}`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch student:', error);
    window.alert('Failed to fetch student:', error);
    throw error;
  }
};

export const addStudent = async (studentData) => {
  try {
    const response = await apiClient.post('/api/students', studentData);
    return response.data;
  } catch (error) {
    console.error('Failed to add student:', error);
    window.alert('Failed to add student:', error);
    throw error;
  }
};

export const editStudent = async (studentId, studentData) => {
  try {
    const response = await apiClient.put(`/api/students/${studentId}`, studentData);
    return response.data;
  } catch (error) {
    console.error('Failed to edit student:', error);
    window.alert('Failed to edit student:', error);
    throw error;
  }
};

export const deleteStudent = async (studentId) => {
  try {
    await apiClient.delete(`/api/students/${studentId}`);
  } catch (error) {
    console.error('Failed to delete student:', error);
    window.alert('Failed to delete student:', error);
    throw error;
  }
};
