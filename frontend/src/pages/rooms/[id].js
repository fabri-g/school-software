// pages/rooms/[id].js
import React from 'react';
import Link from 'next/link';

export async function getServerSideProps({ params }) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/rooms/${params.id}`);
  if (!res.ok) {
    throw new Error('Failed to fetch rooms');
  }
  const room = await res.json();

  return {
    props: { room },
  };
}

const RoomDetails = ({ room }) => {
  return (
    <div style={{ marginLeft: '40px', marginTop: '30px', lineHeight: '2' }}>
      <h1 className="text-3xl font-semibold">{room.name}</h1>
      <p style={{ marginTop: '20px' }}>Instructor: {room.instructor}</p>
      <p>Number of Students: {room.currentCapacity}</p>
      <p>Maximum Capacity: {room.maximumCapacity}</p>
      <h2 className="text-xl font-semibold mt-4">Students in this room:</h2>
      <ul>
        {room.students && room.students.map(student => (
          <li key={student.id}>
            <Link href={`/students/${student.id}`}>
              <a className="text-blue-500 hover:text-blue-800">{student.name}</a> - Age: {student.age}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RoomDetails;
