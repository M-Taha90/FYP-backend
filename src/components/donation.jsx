import React, { useState, useEffect } from 'react';
import { useUser } from "../context/UserContext";
import DonationModal from "./DonationModal"; // Adjust the path if needed
import DonationChart from "./donationChart";

const Donation = ({user, setUser}) => {
  const { usertype } = useUser();

  // Ensure `user` is available before rendering

  const [organizations, setOrganizations] = useState([]);
  const [meetups, setMeetups] = useState([]);
  const [tiers, setTiers] = useState([]);

  const [meetups2, setMeetups2] = useState([]);
  const [selectedMeetup2, setSelectedMeetup2] = useState('');
  const [tiers2, setTiers2] = useState([]);
  const [editMode2, setEditMode2] = useState(false); // Add/Update mode
  const [newTiers2, setNewTiers2] = useState([]); // Editable tiers

  useEffect(() => {
    if (usertype === 2 && user?.id) {
      // Fetch meetups for the current user
      fetch(`http://localhost:4000/donation/meetups/${user.id}`)
        .then((res) => res.json())
        .then((data) => setMeetups2(data))
        .catch((err) => console.error('Error fetching meetups:', err));
    }
  }, [user?.id, usertype]);

  const handleMeetupSelect = (meetupId) => {
    setSelectedMeetup2(meetupId);
    setEditMode2(false);

    // Fetch tiers for the selected meetup
    fetch(`http://localhost:4000/tiers2/${meetupId}`)
      .then((res) => res.json())
      .then((data) => setTiers2(data))
      .catch((err) => console.error('Error fetching tiers:', err));
  };

  const handleEditTiers = () => {
    setEditMode2(true);
    setNewTiers2(
      tiers2.length > 0
        ? tiers2.map((tier) => ({ ...tier, features: [...tier.features] }))
        : [
            { tier_title: '', price: '', tier_desc: '', features: [] },
            { tier_title: '', price: '', tier_desc: '', features: [] },
            { tier_title: '', price: '', tier_desc: '', features: [] },
          ]
    );
  };

  const handleSaveTiers = () => {
    fetch(`http://localhost:4000/tiers2/${selectedMeetup2}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tiers2: newTiers2 }),
    })
    .then((res) => {
      if (!res.ok) {
        return res.json().then((error) => Promise.reject(error));
      }
      return res.json(); // Parse the JSON response
    })
    .then((data) => {
      console.log(data.message); // Log the success message
      alert(data.message); // Optionally display it to the user
      setEditMode2(false);
      handleMeetupSelect(selectedMeetup2); // Refresh the tiers
    })
    .catch((err) => {
      console.error('Error saving tiers:', err);
      alert('Failed to save tiers. Please try again.');
  });
};

  // State for selected organization and meet-up
  const [selectedOrganization, setSelectedOrganization] = useState('');
  const [selectedMeetup, setSelectedMeetup] = useState('');

  // Fetch organizations on component mount
  useEffect(() => {
    const fetchOrganizations = async () => {
      try {
        const response = await fetch('http://localhost:4000/organizations');
        const data = await response.json();
        setOrganizations(data); // Set organizations in state
      } catch (error) {
        console.error('Error fetching organizations:', error);
      }
    };

    fetchOrganizations();
  }, []);

  // Fetch meetups whenever selectedOrganization changes
  useEffect(() => {
    if (!selectedOrganization) return;

    const fetchMeetups = async () => {
      try {
        const response = await fetch(`http://localhost:4000/donation/meetups/${selectedOrganization}`);
        const data = await response.json();
        setMeetups(data); // Set meetups in state
      } catch (error) {
        console.error('Error fetching meetups:', error);
      }
    };

    fetchMeetups();
  }, [selectedOrganization]);

  const handleMeetupChange = async (meetupId) => {
    setSelectedMeetup(meetupId);
  
    if (!meetupId) {
      setTiers([]); // Reset tiers if no meetup is selected
      return;
    }
  
    try {
      const response = await fetch(`http://localhost:4000/tiers/${meetupId}`);
      const data = await response.json();
      setTiers(data); // Update tiers state
    } catch (error) {
      console.error('Error fetching tiers:', error);
    }
  };

  // Check if both dropdowns are selected
  const isTierClickable = selectedOrganization && selectedMeetup;

  const [showModal, setShowModal] = useState(false);
  const [selectedTier, setSelectedTier] = useState(null);

  return (
    <>
    <section className=" isolate overflow-hidden py-16 bg-white text-gray-900">
      <div className="max-w-5xl mx-auto px-6 lg:px-8 flow-root pb-16 pt-24 sm:pt-32 lg:pb-0">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
 
        {/* Heading */}
        <div className="relative text-center mb-12">
          <h2 className="text-gray-900 mx-auto max-w-4xl text-balance text-center text-5xl font-semibold tracking-tight sm:text-6xl">Choose Your Plan</h2>           
          <p className=" mx-auto mt-6 max-w-2xl text-pretty text-center text-lg font-medium text-gray-400 sm:text-xl/8">
            Find the right plan to support your initiatives.
          </p>
        </div>
      
        {/* Dropdowns for Organization and Meet-up */}
        <div className="flex flex-col md:flex-row justify-center items-center mb-8 space-y-4 md:space-y-0 md:space-x-4">
          <select
            value={selectedOrganization}
            onChange={(e) => setSelectedOrganization(e.target.value)}
            className="w-full md:w-1/3 p-3 bg-gray-100 border border-gray-300 rounded-md text-gray-700"
          >
            <option value="">-- Choose an Organization --</option>
            {organizations.map((org) => (
              <option key={org.user_id} value={org.user_id}>{org.org_name}</option>
            ))}
          </select>

          <select
            value={selectedMeetup}
            onChange={(e) => handleMeetupChange(e.target.value)}
            className="w-full md:w-1/3 p-3 bg-gray-100 border border-gray-300 rounded-md text-gray-700"
            disabled={!selectedOrganization}
          >
            <option value="">-- Choose a Meet-up --</option>
            {meetups.map((meetup) => (
              <option key={meetup.meetup_id} value={meetup.meetup_id}>{meetup.meetup_name}</option>
            ))}
          </select>
        </div>

        {/* Donation Tiers */}
        <div className="flex flex-col md:flex-row justify-center items-center space-y-8 md:space-y-0 md:space-x-4">
        {tiers.length === 0 ? (
          <p className="text-gray-500">No tiers available for the selected meetup.</p>
        ) : (
          tiers.map((tier) => (
            <div
              key={tier.tier_id}
              className={`bg-white border border-gray-200 rounded-lg shadow-sm p-8 w-full max-w-sm transition transform 
                ${isTierClickable ? "hover:scale-105 hover:shadow-md" : "opacity-50 cursor-not-allowed"}`}
            >
              <h3 className="text-xl font-semibold text-center">{tier.tier_title}</h3>
              <div className="mt-4 text-center">
                <span className="text-3xl font-bold text-gray-900"> 
                  <span className="text-sm align-top">PKR  </span>{tier.price}
                </span>
                <span className="block text-gray-600">{tier.tier_desc}</span>
              </div>
              <button
                className={`mt-6 w-full py-3 px-6 rounded-lg font-medium transition ${
                  isTierClickable ? "bg-gray-200 text-gray-700 hover:bg-gray-300" : "bg-gray-300 text-gray-500"
                }`}
                onClick={() => {
                   // Log the arrays for debugging
                  console.log("Organizations Array:", organizations);
                  console.log("Meetups Array:", meetups);
                  console.log("isTierClickable:", isTierClickable);
                  console.log(typeof selectedOrganization, typeof selectedMeetup);
                  console.log("Selected Tier:", tier);
                  if (isTierClickable && user) {
                    alert(`You selected the ${tier.tier_title} plan for ${selectedOrganization} with ${selectedMeetup}`);
                    setSelectedTier({
                      ...tier,
                      orgName: organizations.find((org) => org.user_id === Number(selectedOrganization))?.org_name || "Unknown Organization",
                      meetupName: meetups.find((meetup) => meetup.meetup_id === Number(selectedMeetup))?.meetup_name || "Unknown Meetup",
                    });
                    setShowModal(true);
                    console.log("Modal State Updated:", true);

                  }
                  else{
                    alert("Please login or sign up to donate.");
                  }
                }}
                disabled={!isTierClickable}
              >
                Buy this plan
              </button>
              <ul className="mt-6 space-y-3 text-gray-700">
                {tier.features.map((feature, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <span className="text-green-500">✔</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )))}
        </div>
        
      </div>
    </div>    
    </section>

  {usertype === 2 && (
      <div className="min-h-screen bg-gray-50 py-8">
      
        <section className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">Manage Meetups and Tiers</h2>
          <div className="flex justify-center mb-8">
            <select
              value={selectedMeetup2}
              onChange={(e) => handleMeetupSelect(e.target.value)}
              className="p-3 bg-gray-100 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
            >
              <option value="">-- Select a Meetup --</option>
              {meetups2.map((meetup) => (
                <option key={meetup.meetup_id} value={meetup.meetup_id}>
                  {meetup.meetup_name}
                </option>
              ))}
            </select>
          </div>

          {tiers2.length === 0 && !editMode2 ? (
            <p className=" text-gray-500 text-center">No tiers available for the selected meetup.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {(editMode2 ? newTiers2 : tiers2).map((tier, index) => (
                <div
                  key={index}
                  className="bg-white border border-gray-200 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300"
                >
                  {editMode2 ? (
                    <>
                      <input
                        type="text"
                        placeholder="Enter a title"
                        value={tier.tier_title}
                        onChange={(e) =>
                          setNewTiers2((prev) =>
                            prev.map((t, i) =>
                              i === index ? { ...t, tier_title: e.target.value } : t
                            )
                          )
                        }
                        className="text-xl bg-white text-black font-semibold w-full mb-4 border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
                      />
                      <input
                        type="number"
                        placeholder="Enter Price"
                        value={tier.price}
                        onChange={(e) =>
                          setNewTiers2((prev) =>
                            prev.map((t, i) =>
                              i === index ? { ...t, price: e.target.value } : t
                            )
                          )
                        }
                        className="w-full mb-4 border bg-white text-black border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
                      />
                      <textarea
                        placeholder="Give a description"
                        value={tier.tier_desc}
                        onChange={(e) =>
                          setNewTiers2((prev) =>
                            prev.map((t, i) =>
                              i === index ? { ...t, tier_desc: e.target.value } : t
                            )
                          )
                        }
                        className="w-full mb-4 border bg-white text-black border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
                      />
                    </>
                  ) : (
                    <>
                      <h3 className="text-xl font-semibold text-gray-700 mb-2">{tier.tier_title}</h3>
                      <p className="text-3xl font-bold text-blue-600 mb-2">
                        <span className="text-sm align-top">PKR  </span>{tier.price}
                      </p>
                      <p className="text-gray-500">{tier.tier_desc}</p>
                    </>
                  )}

                  <div className="mt-4">
                    {/* Map through the features array and display input fields */}
                    {tier.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="mb-2">
                        <input
                          type="text"
                          value={feature}
                          onChange={(e) => {
                            setNewTiers2((prev) =>
                              prev.map((t, i) =>
                                i === index
                                  ? {
                                      ...t,
                                      features: t.features.map((f, j) =>
                                        j === featureIndex ? e.target.value : f
                                      ),
                                    }
                                  : t
                              )
                            );
                          }}
                          placeholder={`Feature ${featureIndex + 1}`}
                          className="border bg-white text-black border-gray-300 p-2 rounded-lg w-full focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    ))}

                    {/* Button to add a new feature input */}
                    <button
                      onClick={() => {
                        setNewTiers2((prev) =>
                          prev.map((t, i) =>
                            i === index
                              ? { ...t, features: [...t.features, ''] } // Add an empty feature
                              : t
                          )
                        );
                      }}
                      className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                    >
                      + Add Feature
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-4">
            {editMode2 ? (
              <>
                <button
                  onClick={handleSaveTiers}
                  className="bg-green-500 text-white px-4 py-2 rounded-md mr-4"
                >
                  Submit & Save
                </button>
                <button
                  onClick={() => setEditMode2(false)}
                  className="bg-red-500 text-white px-4 py-2 rounded-md"
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                onClick={handleEditTiers}
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
              >
                + {tiers2.length === 0 ? 'Add' : 'Update'}
              </button>
            )}
          </div>
          {selectedMeetup2 && <DonationChart meetupId={selectedMeetup2} />}
        </section>
      
    </div>
  )}
    {/* Modal */}
    {showModal && (
        <DonationModal
          onClose={() => setShowModal(false)}
          tier={selectedTier}
          orgName={selectedTier?.org_name || ""}
          meetupName={selectedTier?.meetup_name || ""}
          user={user || ""}
        />
        
    )}
  </>
  );
};

export default Donation;
