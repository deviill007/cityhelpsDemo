// pages/bookings.tsx
import React from "react";
import { useRouter } from "next/router";
const Bookings = () => {
  const router = useRouter();

  const handleDiscoverClick = () => {
    router.push("/");
  };

  return (
    <div className="bookings">
      <div className="bookingsContainer">
        <h1 className="heading">Your Bookings</h1>
        <p className="noBookingsText">No bookings currently.</p>
        <button className="button" onClick={handleDiscoverClick}>
          Discover Experiences
        </button>
      </div>
    </div>
  );
};

export default Bookings;
