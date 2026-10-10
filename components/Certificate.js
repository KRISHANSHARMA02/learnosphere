// Certificate.js
import React, { useState } from "react";
import { jsPDF } from "jspdf";
import { RxCross2 } from "react-icons/rx";
import Link from "next/link";
import Summary from '@/components/Summary'

const Certificate = ({ userName,results }) => {
  const [showCertificate, setShowCertificate] = useState(true); // Manage certificate display
  const [showSummary, setShowSummary] = useState(false); // Manage summary display

  const generateCertificate = () => {
    const doc = new jsPDF("landscape"); // Create a PDF in landscape mode
  
    // Certificate background color
    doc.setFillColor(255, 255, 204); // Light yellow background
    doc.rect(0, 0, 297, 210, "F"); // Full-page rectangle (A4 landscape)
  
    // Certificate border
    doc.setDrawColor(255, 165, 0); // Orange border color
    doc.setLineWidth(5);
    doc.rect(10, 10, 277, 190, "S"); // Add a border with padding
  
    // Logo
    const logoPath = "/Yellow_Beige_Feminine_Thank_You_Card-removebg-preview.png";
    // Update this path with the actual logo path
    doc.addImage(logoPath, "PNG", 20, 20, 72, 14);
     // Add the logo at the left-hand side
  
    // Certificate header
    doc.setFontSize(30);
    doc.setTextColor(0, 51, 102); // Dark blue color for header
    doc.setFont("helvetica", "bold");
    doc.text("Certificate of Achievement", 148.5, 60, null, null, "center");
  
    // Subtitle
    doc.setFontSize(16);
    doc.setTextColor(0, 0, 0); // Black color for subtitle
    doc.setFont("helvetica", "italic");
    doc.text("Presented to", 148.5, 80, null, null, "center");
  
    // Recipient's Name
    doc.setFontSize(24);
    doc.setTextColor(255, 165, 0); // Orange color for name
    doc.setFont("times", "bold");
    doc.text(userName, 148.5, 100, null, null, "center");
  
    // Completion text
    doc.setFontSize(18);
    doc.setTextColor(50, 50, 50); // Grey color for completion text
    doc.setFont("helvetica", "normal");
    doc.text(
      "For successfully completing the Learnosphere Quiz.",
      148.5,
      120,
      null,
      null,
      "center"
    );
  
    // Footer text (optional)
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text(
      "Presented with pride by Learnosphere.",
      148.5,
      140,
      null,
      null,
      "center"
    );
    doc.setFontSize(10); // Font size
    doc.setTextColor(0, 0, 0); // Text color
    doc.setLineWidth(15); // Line width
    
    // Date
    doc.setFontSize(12);
    doc.setTextColor(50, 50, 50);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 148.5, 160, null, null, "center");
  
    // Signature Placeholder
   // Signature path (replace with actual path)
const signaturePath = "/download-removebg-preview.png";

// Set the image size and position
const signatureWidth = 40; // Adjust width as needed
const signatureHeight = 10; // Adjust height as needed
const signatureX = 60 - signatureWidth / 2; // Center the image
const signatureY = 170; // Position above the text

// Add the signature image to the document
doc.addImage(signaturePath, "PNG", signatureX, signatureY, signatureWidth, signatureHeight);

// Add the underline and Founder text
doc.setFontSize(16);
doc.setTextColor(50, 50, 50);
doc.text("", 60, 100, 14, 2, "center");
doc.text(" CEO & Founder", 60, 190, null, null, "center");

    // Save the PDF
    doc.save("Certificate.pdf");
  };

  const handleCloseCertificate = () => {
    setShowCertificate(false);
    setShowSummary(true); // Show summary after closing certificate
  };

  return (
    <div className="bg-white rounded-md  p-4 w-11/12 md:w-full relative">
    {showCertificate ? (
      <div className="flex flex-col items-center rounded-xl p-6">
        <h2 className="text-2xl font-bold text-center text-green-600">
          Congratulations!
        </h2>
        <p className="text-lg text-center mt-4">
          You have successfully completed the quiz.
        </p>
        <div className="mt-6 p-4 bg-gray-100 rounded-lg shadow-lg text-center">
          <h3 className="text-xl font-semibold">Certificate of Achievement</h3>
          <p className="mt-2">Awarded to</p>
          <h2 className="text-3xl font-bold mt-2">{userName}</h2>
          <p className="mt-4 text-sm text-gray-500">
            For successfully completing the Learnosphere Quiz.
          </p>
        </div>
        <button
          className="mt-6 p-2 bg-blue-500 text-white rounded-lg"
          onClick={generateCertificate}
        >
          Download Certificate
        </button>
        <button
          className="mt-4 p-2 bg-gray-500 text-white rounded-lg"
          onClick={handleCloseCertificate}
        >
          Close Certificate
        </button>
      </div>
    ) : showSummary ? (
    <Summary results={results}/>
    ) : null}
  </div>
  );
};

export default Certificate;

