/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
// SlidingBubble.jsx
import React from "react";

const SlidingBubble = ({ user, setUser}) => {
  return (
    <div className="absolute top-[65px] left-[40%] transform sm:w-[20%] w-[300px] bg-white shadow-md p-4 rounded-lg animate-slide-down z-10">
      <h2 className="text-center font-bold text-lg">Welcome, {user?.username}!</h2>
      <p className="text-center text-sm text-gray-700">
        {" "}
        {user?.usertype === 2 ? "Create new meetups or join ongoing ones." : "Join scheduled meetups, or explore previously held events."}.
      </p>
    </div>
  );
};

export default SlidingBubble;
