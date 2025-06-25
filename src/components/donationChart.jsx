import React, { useState, useEffect } from 'react';
// import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import axios from 'axios';
import './styles.css';

// const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']; // Tier colors

// const DonationChart = ({ meetupId }) => {
//   const [donationData, setDonationData] = useState(null);
//   const [selectedTier, setSelectedTier] = useState(null);

//   useEffect(() => {
//     axios.get(`http://localhost:4000/donations/meetup/${meetupId}`)
//       .then((res) => setDonationData(res.data))
//       .catch((err) => console.error('Error fetching donation data:', err));
//   }, [meetupId]);

//   if (!donationData) {
//     return <p>Loading...</p>;
//   }

//   const { totalDonations, tierData } = donationData;

//   // Prepare pie chart data
//   const chartData = Object.keys(tierData).map((tierId) => ({
//     name: tierData[tierId].tierTitle,
//     value: tierData[tierId].totalAmount,
//     userTypeCounts: tierData[tierId].userTypeCounts,
//   }));

//   return (
//     <div className="chart-container">
//       <h2>Donations Breakdown</h2>
//       <p>Total Donations: {totalDonations}</p>
//       <ResponsiveContainer width="100%" height={300}>
//         <PieChart>
//           <Pie
//             data={chartData}
//             cx="50%"
//             cy="50%"
//             startAngle={180}
//             endAngle={0}
//             innerRadius={60}
//             outerRadius={120}
//             dataKey="value"
//             onMouseEnter={(data, index) => setSelectedTier(chartData[index])}
//           >
//             {chartData.map((entry, index) => (
//               <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//             ))}
//           </Pie>
//           <Tooltip />
//         </PieChart>
//       </ResponsiveContainer>

//       {selectedTier && (
//         <div className="hover-details">
//           <h3>{selectedTier.name}</h3>
//           <p>Amount Donated: ${selectedTier.value}</p>
//           <p>
//             Normal Donors: {selectedTier.userTypeCounts[1]} | 
//             Experts: {selectedTier.userTypeCounts[2]} | 
//             Organizations: {selectedTier.userTypeCounts[3]}
//           </p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default DonationChart;
// import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
// import { Doughnut } from "react-chartjs-2";

// ChartJS.register(ArcElement, Tooltip, Legend);

// const DonationChart = ({ meetupId }) => {
//   const [donationData, setDonationData] = useState(null);

//   useEffect(() => {
//     axios
//       .get(`http://localhost:4000/donations/meetup/${meetupId}`)
//       .then((res) => {
//         setDonationData(res.data);
//       })
//       .catch((err) => {
//         console.error("Error fetching donation data:", err);
//       });
//   }, [meetupId]);

//   if (!donationData) return <div>Loading...</div>;

//   const tierData = Object.values(donationData.tierData);
//   const labels = tierData.map((tier) => tier.tierTitle);
//   const dataValues = tierData.map((tier) => tier.totalAmount);

//   const chartData = {
//     labels,
//     datasets: [
//       {
//         label: "Donations",
//         data: dataValues,
//         backgroundColor: ["#4CAF50", "#2196F3", "#FFC107", "#FF5722"], // Colors for tiers
//         hoverOffset: 4,
//       },
//     ],
//   };

//   const chartOptions = {
//     plugins: {
//       tooltip: {
//         callbacks: {
//           label: function (context) {
//             const tier = tierData[context.dataIndex];
//             return `${tier.tierTitle}: $${tier.totalAmount.toFixed(2)}`;
//           },
//         },
//       },
//     },
//     cutout: "50%", // Makes it a half-pie chart
//     rotation: -90, // Start at the top
//     circumference: 180, // Half circle
//   };

//   return (
//     <div style={{ textAlign: "center", padding: "20px" }}>
//       <h2>Donations Breakdown</h2>
//       <h3>Total Donations: {donationData.totalDonations}</h3>
//       <div style={{ width: "800px", height: "600px", margin: "0 auto" }}>
//         <Doughnut data={chartData} options={chartOptions} />
//       </div>
//       <div style={{ marginTop: "10px" }}>
//         {tierData.map((tier, index) => (
//           <div key={index} style={{ marginBottom: "5px" }}>
//             <strong>{tier.tierTitle}</strong>
//             <p>Amount Donated: ${tier.totalAmount.toFixed(2)}</p>
//             <p>
//               Normal Donors: {tier.userTypeCounts[1] || 0} | Experts: {tier.userTypeCounts[3] || 0} | Organizations:{" "}
//               {tier.userTypeCounts[2] || 0}
//             </p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default DonationChart;

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const DonationChart = ({ meetupId }) => {
  const [donationData, setDonationData] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/donations/meetup/${meetupId}`)
      .then((res) => {
        setDonationData(res.data);
      })
      .catch((err) => {
        console.error("Error fetching donation data:", err);
      });
  }, [meetupId]);

  if (!donationData) return <div className="text-center text-gray-500">Loading...</div>;

  const tierData = Object.values(donationData.tierData);
  const labels = tierData.map((tier) => tier.tierTitle);
  const dataValues = tierData.map((tier) => tier.totalAmount);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Donations",
        data: dataValues,
        backgroundColor: ["#4CAF50", "#2196F3", "#FFC107", "#FF5722"], // Colors for tiers
        hoverOffset: 4,
      },
    ],
  };

  const chartOptions = {
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            const tier = tierData[context.dataIndex];
            return `${tier.tierTitle}: PKR${tier.totalAmount.toFixed(2)}`;
          },
        },
      },
    },
    cutout: "50%", // Makes it a half-pie chart
    rotation: -90, // Start at the top
    circumference: 180, // Half circle
    animation: {
      animateScale: true, // Scale the chart from 0 to full size
      animateRotate: true, // Rotate the chart as it grows
      duration: 1500, // Animation duration in milliseconds
      easing: 'easeInOutQuad', // Animation easing function
    },
  
  };

  return (
    <div className="flex flex-col items-center py-12 px-4">
      {/* Header */}
      <h2 className="text-3xl font-semibold text-gray-700 mb-4">Donations Breakdown</h2>
      <h3 className="text-lg text-gray-600 mb-6">
        Total Donations: <span className="font-bold text-gray-800">{donationData.totalDonations}</span>
      </h3>

      {/* Chart */}
    <div className="relative flex flex-col items-center mb-10">
      <div className="w-10/8 h-2/3 flex justify-center">
        <Doughnut data={chartData} options={chartOptions} />
      </div>
      <div className="flex gap-4 mt-6">
          {chartData.labels.map((label, index) => (
            <div key={index} className="flex items-center gap-2">
              <div
                className={`w-4 h-4 rounded-full`}
                style={{ backgroundColor: chartData.datasets[0].backgroundColor[index] }}
              ></div>
              <span className="text-gray-700 text-sm">{label}</span>
            </div>
          ))}
      </div>
    </div>

      {/* Tier Breakdown */}
      <div className="w-full max-w-4xl grid grid-cols-1 gap-6">
        {tierData.map((tier, index) => (
          <div
            key={index}
            className="p-6 rounded-lg border border-gray-300 shadow-md bg-white"
          >
            <h4 className="text-xl font-semibold text-gray-800">{tier.tierTitle}</h4>
            <p className="text-gray-600 mt-1">
              Amount Donated: <span className="font-bold text-gray-900">PKR{tier.totalAmount.toFixed(2)}</span>
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Normal Donors: <span className="font-bold">{tier.userTypeCounts[1] || 0}</span> | Experts:{" "}
              <span className="font-bold">{tier.userTypeCounts[3] || 0}</span> | Organizations:{" "}
              <span className="font-bold">{tier.userTypeCounts[2] || 0}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DonationChart;
