/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import axios from "axios";
import React, { useState } from "react";
let treeOptions = [];
// using an axios GET request to get all currently available trees to plant
axios.get("http://localhost:4000/trees").then((response) => {
   treeOptions = response.data;
})
.catch((error) => {
  console.error("Error fetching trees", error);
});

const NewMeetupModal = ({ user, coordinates, mode, onClose }) => {
  const [formData, setFormData] = useState({
    meetupName: "",
    meetupDate: "",
    startTime: "",
    duration: "",
    description: "",
    locationName: "",
    latitude: coordinates.lat,
    longitude: coordinates.lng,
    locationAddress: "",
    selectedTrees: [],
    treeInput: "",
    meetupHost: user.id,
  });

  const addTree = () => {
    if (formData.treeInput && !formData.selectedTrees.includes(formData.treeInput)) {
      setFormData((prev) => ({
        ...prev,
        selectedTrees: [...prev.selectedTrees, formData.treeInput],
        treeInput: "",
      }));
    }
  };

  const removeTree = (tree) => {
    setFormData((prev) => ({
      ...prev,
      selectedTrees: prev.selectedTrees.filter((t) => t !== tree),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Take the form data and create a POST request to the server to create a new meetup
    try {
      const response = await axios.post("http://localhost:4000/meetups/create", formData); // Replace '/api/meetups' with your backend endpoint
      console.log("Meetup created successfully:", response.data);
      onClose("success"); // Close the modal on success
    } catch (error) {
      console.error("Error creating meetup:", error.response?.data || error.message);
    }
    onClose();
  };

  // 1 is the mode for creating a new meetup
  // 2 is for editing the whole meetup (still ongoing so all info can be edited)
  // 3 is for editing the meetup but only the trees' counts
  if (mode !== 1) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-3/4 max-w-lg relative">
        <button
          className="absolute top-2 right-2 text-gray-500"
          onClick={onClose}
        >
          ×
        </button>
        <h2 className="text-2xl font-bold mb-4">Create New Meetup</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Meetup Name</label>
            <input
              type="text"
              value={formData.meetupName}
              onChange={(e) =>
                setFormData({ ...formData, meetupName: e.target.value })
              }
              className="w-full border border-gray-300 rounded p-2"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-700">Meetup Date</label>
              <input
                type="date"
                value={formData.meetupDate}
                onChange={(e) =>
                  setFormData({ ...formData, meetupDate: e.target.value })
                }
                className="w-full border border-gray-300 rounded p-2"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Start Time</label>
              <input
                type="time"
                value={formData.startTime}
                onChange={(e) =>
                  setFormData({ ...formData, startTime: e.target.value })
                }
                className="w-full border border-gray-300 rounded p-2"
                required
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Duration (hours)</label>
            <input
              type="number"
              min="1"
              value={formData.duration}
              onChange={(e) =>
                setFormData({ ...formData, duration: e.target.value })
              }
              className="w-full border border-gray-300 rounded p-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="w-full border border-gray-300 rounded p-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Location Name</label>
            <input
              type="text"
              value={formData.locationName}
              onChange={(e) =>
                setFormData({ ...formData, locationName: e.target.value })
              }
              className="w-full border border-gray-300 rounded p-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Location Address</label>
            <input
              type="text"
              value={formData.locationAddress}
              onChange={(e) =>
                setFormData({ ...formData, locationAddress: e.target.value })
              }
              className="w-full border border-gray-300 rounded p-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Trees</label>
            <div className="flex items-center">
              <select
                value={formData.treeInput}
                onChange={(e) =>
                  setFormData({ ...formData, treeInput: e.target.value })
                }
                className="w-full border border-gray-300 rounded p-2"
              >
                <option value="" disabled>
                  Select a tree
                </option>
                {treeOptions.map((tree) => (
                  <option key={tree} value={tree}>
                    {tree}
                  </option>
                ))}
              </select>
              <button
                type="button"
                onClick={addTree}
                className="ml-2 bg-blue-500 text-white px-4 py-2 rounded"
              >
                Add
              </button>
            </div>
            <div className="mt-2">
              {formData.selectedTrees.map((tree) => (
                <span
                  key={tree}
                  className="inline-block bg-gray-200 text-gray-700 px-2 py-1 rounded mr-2"
                >
                  {tree}
                  <button
                    type="button"
                    className="ml-1 text-red-500"
                    onClick={() => removeTree(tree)}
                  >
                    ×
                  </button> 
                </span>
              ))}
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded mt-4"
          >
            Create Meetup
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewMeetupModal;
