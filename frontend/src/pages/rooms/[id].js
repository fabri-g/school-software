// pages/rooms/[id].js
import React from 'react';

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
    </div>
  );
}

export default RoomDetails;
