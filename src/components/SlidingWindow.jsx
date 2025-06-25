/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
// SlidingWindow.jsx
import axios from "axios";
import React, { useRef, useState, useEffect } from "react";

const NotificationBubble = ({ message, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 500);
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg transition-all duration-500 ${
        isVisible ? "animate-fadeIn" : "animate-fadeOut"
      }`}
    >
      {message}
      <button
        className="ml-4 text-xl font-bold"
        onClick={() => {
          setIsVisible(false);
          setTimeout(onClose, 500);
        }}
      >
        &times;
      </button>
    </div>
  );
};

const SlidingWindow = ({ meetupData, onClose, user }) => {
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const [notification, setNotification] = useState(null);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [showScientificNames, setShowScientificNames] = useState(false);

  const toggleAccordion = () => {
    setIsAccordionOpen(!isAccordionOpen);
  };

  const isOwner = user?.id === meetupData?.meetupInfo?.user_id;
  const isOngoing = new Date(meetupData?.meetupInfo?.meetup_date) > new Date();
  const isAlreadyParticipant = meetupData?.meetupParticipants?.some(
    (participant) => participant.participant_id === user.id
  );

  const handleJoinClick = () => {
    if (isAlreadyParticipant || isOwner) {
      setNotification("You are already part of the meetup!");
      setIsButtonDisabled(true);
      return;
    }

    axios
      .post(
        `http://localhost:4000/meetups/${meetupData.meetupInfo.meetup_id}/participants/join/${user.id}`
      )
      .then((response) => {
        setIsButtonDisabled(true);
        setNotification(response.data.message || "Successfully joined!");
      })
      .catch((error) => {
        console.error("Error adding user to participants", error);
        setNotification("Failed to join the meetup. Please try again.");
        setIsButtonDisabled(false);
      });
    setIsButtonDisabled(true);
  };

  return (
    <>
    
      {/* Inline Styles for the Custom Scrollbar */}
      <style>
        {`
          .custom-scrollbar {
            scrollbar-width: thin; /* For Firefox */
            scrollbar-color: #b0c4de #f0f8ff; /* Thumb and Track colors */
          }

          /* For Chrome, Edge, and Safari */
          .custom-scrollbar::-webkit-scrollbar {
            width: 8px; /* Width of the scrollbar */
          }

          .custom-scrollbar::-webkit-scrollbar-thumb {
            background-color: #b0c4de; /* Thumb color */
            border-radius: 10px; /* Round edges for the scrollbar thumb */
          }

          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background-color: #778899; /* Darker thumb on hover */
          }

          .custom-scrollbar::-webkit-scrollbar-track {
            background: #f0f8ff; /* Track color */
            border-radius: 10px; /* Optional: round edges for track */
          }
        `}
      </style>

      <div
        className={`fixed top-0 left-0 h-full w-96 bg-white shadow-lg z-50 transform transition-transform duration-500 ${
          meetupData ? "translate-x-0" : "-translate-x-full"
        } overflow-y-auto custom-scrollbar`}
      ></div>
    <div
      className={`fixed top-0 left-0 h-full w-96 bg-white shadow-lg z-50 transform transition-transform duration-500 ${
        meetupData ? "translate-x-0" : "-translate-x-full"
      } overflow-y-auto custom-scrollbar`}
    >
      <button
        className="absolute top-4 right-4 text-xl font-bold"
        onClick={onClose}
      >
        &times;
      </button>
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">
          {meetupData?.meetupInfo?.meetup_name}
        </h2>
        <hr className="border-t border-green-200 my-4" />
        <p className="mb-2">
          <strong>Date:</strong>{" "}
          {new Date(meetupData?.meetupInfo?.meetup_date).toLocaleDateString()}
        </p>
        <p className="mb-2">
          <strong>Time:</strong> {meetupData?.meetupInfo?.start_time} for{" "}
          {meetupData?.meetupInfo?.duration?.hours} hours
        </p>
        <p className="mb-2">
          <strong>Location:</strong> {meetupData?.meetupInfo?.location_name},{" "}
          {meetupData?.meetupInfo?.location_address}
        </p>
        <p className="mb-4">
          <strong>Organizer:</strong> {meetupData?.meetupInfo?.org_name}
        </p>
        <hr className="border-t border-green-200 my-4" />
        <h3 className="text-lg font-bold mb-2">Description:</h3>
        <p className="mb-4">{meetupData?.meetupInfo?.description}</p>
        <hr className="border-t border-green-200 my-4" />
        <h3 className="text-lg font-bold mb-2">
          {isOngoing ? "Planned Trees:" : "Planted Trees:"}
        </h3>
        <table className="table-auto w-full mb-4">
          <thead>
            <tr>
              <th className="px-4 py-2">
                {showScientificNames ? "Scientific Name" : "Colloquial Name"}
              </th>
              <th className="px-4 py-2">Count</th>
            </tr>
          </thead>
          <tbody>
            {meetupData?.meetupTrees?.map((tree, index) => (
              <tr key={index}>
                <td className="border px-4 py-2">
                  {showScientificNames
                    ? tree.scientific_name
                    : tree.colloquial_name}
                </td>
                <td className="border px-4 py-2">{tree.num_trees}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button
          className="bg-blue-500 text-white px-2 py-1 rounded"
          onClick={() => setShowScientificNames(!showScientificNames)}
        >
          {showScientificNames ? "Show Colloquial Names" : "Show Scientific Names"}
        </button>
        <hr className="border-t border-green-200 my-4" />
        <div className="mt-4">
          <button
            className="bg-gray-300 text-black px-4 py-2 rounded mb-2"
            onClick={toggleAccordion}
          >
            {isAccordionOpen ? "Hide Participants" : "Show Participants"}
          </button>

          {isAccordionOpen && (
            <ul className="list-disc list-inside">
              {meetupData?.meetupParticipants?.slice(0, 5).map((participant, index) => (
                <li key={index}>
                  {participant.participant_id}
                </li>
              ))}
            </ul>
          )}
        </div>
        <hr className="border-t border-green-200 my-4" />
        <div className="mt-4">
          {isOngoing && !isOwner && (
            <>
              <button
                className={`px-4 py-2 rounded mr-2 ${
                  isAlreadyParticipant || isButtonDisabled
                    ? "bg-gray-500 text-gray-200 cursor-not-allowed"
                    : "bg-green-500 text-white"
                }`}
                onClick={handleJoinClick}
                disabled={isButtonDisabled}
              >
                {isAlreadyParticipant || isButtonDisabled ? "Joined" : "Join"}
              </button>
              <button className="bg-green-500 text-white px-4 py-2 rounded">
                Donate
              </button>
            </>
          )}
          {isOngoing && isOwner && (
            <button className="bg-blue-500 text-white px-4 py-2 rounded">
              Edit
            </button>
          )}

          {!isOngoing && isOwner && (
            <button className="bg-blue-500 text-white px-4 py-2 rounded">
              Edit Tree Log Information
            </button>
          )}
        </div>
      </div>
      {notification && (
        <NotificationBubble
          message={notification}
          onClose={() => setNotification(null)}
        />
      )}
    </div>
  </>
  );
};

export default SlidingWindow;
