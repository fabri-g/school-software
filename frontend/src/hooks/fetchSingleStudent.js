// src/hooks/fetchSingleRoom.js
import { useState, useEffect } from 'react';
import { fetchStudentById as fetchStudentByIdService } from '../services/studentsService';

const fetchStudentById = (studentId) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!studentId) return;

    const fetchStudent = async () => {
      setLoading(true);
      try {
        const student = await fetchStudentByIdService(studentId);
        setData(student);
        setError(null);
      } catch (error) {
        console.error('Failed to fetch student:', error);
        setError(error.response ? error.response.data.message : error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStudent();
  }, [studentId]);

  return { loading, data, error };
};

export default fetchStudentById;
