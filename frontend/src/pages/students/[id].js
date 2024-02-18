// pages/students/[id].js
import React from 'react';

export async function getServerSideProps({ params }) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/students/${params.id}`);
  const student = await res.json();

  return {
    props: { student },
  };
}

const StudentDetails = ({ student }) => {
  return (
    <div style={{ marginLeft: '40px', marginTop: '30px', lineHeight: '2' }}>
      <h1 className="text-3xl font-semibold">{student.name}</h1>
      <p style={{ marginTop: '20px' }}>Age: {student.age}</p>
      <p>Gender: {student.gender}</p>
      <p>Address: {student.address}</p>
    </div>
  );
};

export default StudentDetails;
