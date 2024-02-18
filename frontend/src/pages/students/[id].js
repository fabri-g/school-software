// pages/students/[id].js
import React from 'react';

export async function getServerSideProps({ params }) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/students/${params.id}`);
    if(!res.ok) {
      throw new Error(`Failed to fetch student with id ${params.id}, status code: ${res.status}`);
    }
    const student = await res.json();
    return {
      props: { student },
    };
  } catch (error) {
    console.error(error);
    return {
      props: { error: error.message },
    };
  }
}

const StudentDetails = ({ student, error }) => {
  if (error) {
    return <p>Error loading student details: {error}</p>;
  }

  return (
    <div style={{ marginLeft: '40px', marginTop: '30px', lineHeight: '2' }}>
      <h1 className="text-3xl font-semibold">{student.name}</h1>
      <p style={{ marginTop: '20px' }}>Age: {student.age}</p>
      <p>Gender: {student.gender}</p>
      <p>Address: {student.address}</p>
      <p>Room: {student.room?.name || 'No room assigned'}</p>
    </div>
  );
};

export default StudentDetails;
