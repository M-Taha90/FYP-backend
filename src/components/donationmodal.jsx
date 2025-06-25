import React, { useState, useEffect } from "react";
import Tesseract from "tesseract.js";
import GenerateReceipt from "./generateReceipt";

const DonationModal = ({ onClose, tier, orgName, meetupName, user }) => {
  const [amount, setAmount] = useState(tier.price);
  const [screenshot, setScreenshot] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && (file.type === "image/png" || file.type === "image/jpeg")) {
      setScreenshot(file);
      setError("");
    } else {
      setError("Please upload a valid image (JPEG or PNG).");
    }
  };

  useEffect(() => {
        console.log("DonationModal Mounted");
        console.log("DonationModal Props - Tier:", tier.orgName);
        console.log("DonationModal Props - Tier:", orgName);
        console.log("DonationModal Props - Tier:", meetupName);
        console.log("DonationModal Props - Tier:", user);
      }, []);

  const extractTextFromImage = async (imageFile) => {
    try {
      setLoading(true);
      const { data: { text } } = await Tesseract.recognize(imageFile, "eng");
      setLoading(false);
      return text;
    } catch (err) {
      setLoading(false);
      throw new Error("Error processing the image. Please try again.");
    }
  };

  const handleSubmit = async () => {
    if (!screenshot) {
      setError("Please upload a screenshot of your payment.");
      return;
    }

    try {
      const extractedText = await extractTextFromImage(screenshot);
      console.log("Extracted Text:", extractedText);

      if (extractedText.includes("123456789")) { // Replace with your account number
        await updateDonationsTable();

        const donationDetails = {
          orgName: tier.orgName,
          meetupName: tier.meetupName,
          tierTitle: tier.tier_title,
          amount,
        };

        GenerateReceipt(user, donationDetails);

        alert("Donation successfully verified!");
        onClose();
      } else {
        setError("Payment verification failed. Ensure payment is made to the correct account.");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const updateDonationsTable = async () => {
    try {
      const response = await fetch(`http://localhost:4000/donations/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount_donated: amount,
          tiers_id: tier.tier_id,
          donor_id: user.id,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update the database.");
      }

      console.log("Donation details successfully updated in the database.");
    } catch (err) {
      console.error(err.message);
      alert("An error occurred while updating the donation details. Please try again.");
    }
  };

  return (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="relative bg-white rounded-lg shadow-lg w-full max-w-md p-6">
              <button
                onClick={onClose}
                className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
              <h2 className="text-2xl font-bold mb-4">Donate to {tier.tier_title}</h2>
              <p className="mb-4">
                Send the amount of <strong>{amount}</strong> to the following:
              </p>
              <ul className="list-disc pl-5 mb-4">
                <li>Mobile Account: <strong>123456789</strong></li>
                <li>Bank Account: <strong>ABC-123456-789</strong></li>
              </ul>
      
              <div className="mb-4">
                <label className="block font-medium text-gray-700 mb-2">
                  Upload Payment Screenshot:
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="block w-full border border-gray-300 rounded-md p-2"
                />
                {error && <p className="text-red-500 mt-2">{error}</p>}
              </div>
      
              {loading && (
                <div className="flex justify-center mb-4">
                  <div className="animate-spin h-8 w-8 border-4 border-t-blue-500 border-gray-300 rounded-full"></div>
                </div>
              )}
      
              <div className="flex justify-end space-x-4">
                <button
                  onClick={handleSubmit}
                  className={`px-4 py-2 rounded-md font-semibold text-white ${
                    loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
                  }`}
                  disabled={loading}
                >
                  Submit
                </button>
                <button
                  onClick={onClose}
                  className="px-4 py-2 rounded-md font-semibold text-gray-700 bg-gray-200 hover:bg-gray-300"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
  );
};

export default DonationModal;