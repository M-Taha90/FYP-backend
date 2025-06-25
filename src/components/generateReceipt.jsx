// import jsPDF from "jspdf";

// const GenerateReceipt = (user, donationDetails, appName = "Siraab") => {
//   const doc = new jsPDF();

//   doc.setFontSize(16);
//   doc.text(`${appName} Donation Receipt`, 20, 20);
//   doc.text(`Organization: ${donationDetails.orgName}`, 20, 30);
//   doc.text(`Meetup: ${donationDetails.meetupName}`, 20, 40);
//   doc.text(`Tier: ${donationDetails.tierTitle}`, 20, 50);
//   doc.text(`Amount Donated: ${donationDetails.amount}`, 20, 60);
//   doc.text(`Donor: ${user.username}`, 20, 70);
//   doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 80);

//   doc.save("DonationReceipt.pdf");
// };

// export default GenerateReceipt;

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const GenerateReceipt = (user, donationDetails, appName = "Sairaab") => {
  const doc = new jsPDF();

  // Add Header
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.text(`${appName}`, 20, 20);

  doc.setFontSize(16);
  doc.text("Donation Receipt", 20, 35);

  // Add Receipt Information
  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  doc.text(`Date: ${new Date().toLocaleDateString()}`, 140, 20);
  doc.text(`Receipt No: ${donationDetails.receiptId || "001"}`, 140, 30);

  // Add Organization and Donor Details
  doc.setFont("helvetica", "bold");
  doc.text("From:", 20, 50);
  doc.setFont("helvetica", "normal");
  doc.text(donationDetails.orgName, 20, 58);
  doc.text(donationDetails.orgContact || "contact@sairaab.com", 20, 65);

  doc.setFont("helvetica", "bold");
  doc.text("Donor:", 140, 50);
  doc.setFont("helvetica", "normal");
  doc.text(user.username, 140, 58);
  doc.text(user.email || "Not Provided", 140, 65);

  // Add Donation Details Table
  autoTable(doc, {
    startY: 80,
    head: [["Tier", "Meetup", "Amount"]],
    body: [
      [
        donationDetails.tierTitle,
        donationDetails.meetupName,
        `Rs.${donationDetails.amount}`,
      ],
    ],
    theme: "grid",
    headStyles: { fillColor: [41, 128, 185] },
    styles: { halign: "center" },
  });

  // Add Footer with Notes
  doc.setFont("helvetica", "normal");
  doc.text(
    "Thank you for your generous contribution towards planting trees.",
    20,
    doc.lastAutoTable.finalY + 20
  );
  doc.setFont("helvetica", "italic");
  doc.text(
    "This receipt is generated electronically and is valid without a signature.",
    20,
    doc.lastAutoTable.finalY + 30
  );

  // Save PDF
  doc.save(`DonationReceipt_${user.username}.pdf`);
};

export default GenerateReceipt;

