// src/hooks/fetchStudents.js
import { useState, useEffect, useCallback } from 'react';
import { debounce } from '../helpers/debounce';
import { fetchStudents as fetchStudentsService } from '../services/studentsService';

const fetchStudents = (searchTerm = '') => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);


  const fetchOperation = async () => {
    setLoading(true);
    try {
      const students = await fetchStudentsService(searchTerm);
      setData(students);
      setError(null);
    } catch (error) {
      console.error('Failed to fetch students:', error);
      setError(error.response ? error.response.data.message : error.message);
    } finally {
      setLoading(false);
    }
  };

  const debouncedFetch = useCallback(debounce(() => {
    fetchOperation();
  }, 500), [searchTerm]);

  useEffect(() => {
    debouncedFetch();
  }, [debouncedFetch]);

  return { loading, data, error, refetch: fetchOperation};
};

export default fetchStudents;
