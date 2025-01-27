import { useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import SignatureCanvas from "react-signature-canvas";
import { jsPDF } from "jspdf";
import "jspdf-autotable";  // Ensure you import the autoTable plugin

function DisplayData() {
  const location = useLocation();
  const { formData, visitStatus, reason } = location.state.data || {}; // Get data passed from AddData page
  const { product, category, date } = location.state.data1 || {}; // Get state passed from the previous page


  const [isChecked, setIsChecked] = useState(false); // State to manage checkbox selection
  const [signatureDataUrl, setSignatureDataUrl] = useState(null); // State to store the signature URL
  const signatureRef = useRef(null); // Reference to the signature canvas

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked); // Update the state when the checkbox is clicked
  };

  const handleEdit = () => {
    // Logic to handle editing the data (e.g., navigating to an edit page)
    alert("Edit functionality not implemented yet.");
  };

  const handleDownloadPdf = () => {

    const doc = new jsPDF({
      orientation: 'portrait', // or 'landscape'
      unit: 'mm',
      format: 'a4',
    });


    const stanleyLogo = '/stanley.png'; // Base64 string for Stanley logo
    const tuckerLogo = '/tucker.png'; // Base64 string for Tucker logo
    doc.addImage(stanleyLogo, "PNG", 14, 10, 40, 12);
    doc.addImage(tuckerLogo, "PNG", 160, 10, 40, 12);



    //header
    doc.setFont("helvetica", "bold");
    doc.setFontSize(26);
    doc.text("SERVICE REPORT", 105, 17, { align: "center" });
    doc.setFontSize(10);
    doc.text(
      "STANLEY® Engineered Fastening India Pvt. Ltd.\n No: 55 Chennai - Bangalore Highway, Thandalam Village, \n Kancheepuram District, Chennai - 602 105, Tamilnadu, INDIA.",
      105,
      22,
      { align: "center" }
    );

    // Add the HomeLayout data (product, category, and date) to the PDF

    // doc.setFontSize(12);
    // doc.text("Activity Type: " + (product || "Not selected"), 14, 30);
    // doc.text("Business Type: " + (category || "Not selected"), 14, 35);
    // doc.text("Selected Date: " + (date || "Not selected"), 14, 40);

    // Add table to the PDF using autoTable method directly from jsPDF
    // const tableData = [
    //   ["Customer Name", formData?.customerName || "Not provided"],
    //   ["Customer Location", formData?.customerLocation || "Not provided"],
    //   ["Equipment", formData?.equipment || "Not provided"],
    //   ["Part No", formData?.partNo || "Not provided"],
    //   ["Order No", formData?.orderNo || "Not provided"],
    //   ["Stud Size", formData?.studSize || "Not provided"],
    //   ["Contact Person Name", formData?.contactPersonName || "Not provided"],
    //   ["Contact Person Email", formData?.contactPersonEmail || "Not provided"],
    //   ["Planned Activity", formData?.plannedActivity || "Not provided"],
    //   ["Activity Performed", formData?.activityPerformed || "Not provided"],
    //   ["Visit Status", visitStatus || "Not provided"],
    //   ...(visitStatus === "Pending" ? [["Reason for Pending", reason || "Not provided"]] : []),
    //   ["Activity Points/Observation", formData?.activityPoints || "Not provided"]
    // ];

    const visitStatusRow = [
      { content: "Visit Status", styles: { halign: "left", fontStyle: "bold" } },
      { content: visitStatus === "Pending" ? "Pending" : visitStatus === "Completed" ? "Completed" : "Not Provided", colSpan: 4, styles: { halign: "left" } },
    ];

    // If the visitStatus is "Pending", add the reason
    if (visitStatus === "Pending") {
      visitStatusRow.push(
        { content: "Reason for Pending", styles: { halign: "left", fontStyle: "bold" } },
        { content: reason || "Not provided", colSpan: 4, styles: { halign: "left" } }
      );
    }

    doc.autoTable({
      startY: 38,
      body: [
        [
          { content: "Customer Name", styles: { halign: "left", fontStyle: "bold" } },
          formData?.customerName || "Not provided",
          { content: "Equipment", styles: { halign: "left", fontStyle: "bold" } },
          formData?.equipment || "Not provided",
        ],
        [
          { content: "Customer Location", styles: { halign: "left", fontStyle: "bold" } },
          formData?.customerLocation || "Not provided",
          { content: "Part No", styles: { halign: "left", fontStyle: "bold" } },
          formData?.partNo || "Not provided",
        ],
        [
          { content: "Stud Size", styles: { halign: "left", fontStyle: "bold" } },
          formData?.studSize || "Not provided",
          { content: "Order No", styles: { halign: "left", fontStyle: "bold" } },
          formData?.orderNo || "Not provided",
        ],
        [
          { content: "Contact person Name", styles: { halign: "left", fontStyle: "bold" } },
          formData?.contactPersonName || "Not provided",
          { content: "Contact Person Email", styles: { halign: "left", fontStyle: "bold" } },
          formData?.contactPersonEmail || "Not provided",
        ],
        [
          { content: "Planned Activity", styles: { halign: "left", fontStyle: "bold" } },
          { content: formData?.plannedActivity || "Not provided", colSpan: 4, styles: { halign: "left" } },
        ],
        [
          { content: "Activity performed", styles: { halign: "left", fontStyle: "bold" } },
          { content: formData?.activityPerformed || "Not provided", colSpan: 4, styles: { halign: "left" } },
        ],

        [
          {
            content: "Actions & Observations: ", // Combine label and data
            colSpan: 4, // Spanning all columns
            styles: { halign: "left", fontStyle: "bold"}, // Fixed height
          },
        ],
        [
          { content: formData?.activityPoints || "Not provided", colSpan: 4, styles: { halign: "left", minCellHeight: 132 } },
        ],
        // Insert Visit Status or Reason for Pending based on the visitStatus
        [
          { content: "Visit Status", styles: { halign: "left", fontStyle: "bold" } },
          visitStatus || "Not provided",
          visitStatus === "Pending" ? { content: "Reason for Pending", styles: { halign: "left", fontStyle: "bold" } } : null,
          visitStatus === "Pending" ? reason || "Not provided" : "",
        ],
        [
          { content: "Equipment Status", styles: { halign: "left", fontStyle: "bold" } },
          formData?.equipmentStatus || "Not provided",
          { content: "Warranty Status", styles: { halign: "left", fontStyle: "bold" } },
          formData?.warrantyStatus || "Not provided",
        ],
        [
          {
            content: "Customer Remarks: " + (formData?.customerRemarks || ""), // Combine label and data
            colSpan: 4, // Spanning all columns
            styles: { halign: "left", fontStyle: "bold", minCellHeight: 30 }, // Fixed height
          },

        ],
        [
          { content: "Customer Name", styles: { halign: "left", fontStyle: "bold" } },
          formData?.customerSignatureName || "Not provided",
          { content: "Attended By", styles: { halign: "left", fontStyle: "bold" } },
          formData?.attendedBy || "Not provided",
        ],
        [
          { content: "Signature", styles: { halign: "left", fontStyle: "bold" } },
          formData?.customerSignature || "Not provided",
          { content: "Signature", styles: { halign: "left", fontStyle: "bold" } },
          formData?.attendedBySignature || "",
        ],
        [
          { content: "Date", styles: { halign: "left", fontStyle: "bold" } },
          formData?.customerDate || "Not provided",
          { content: "Date", styles: { halign: "left", fontStyle: "bold" } },
          date || "Not provided",
        ],
      ],
      theme: "grid", // Adds a grid structure
      styles: {
        fontSize: 11,
        cellPadding: 1,
        lineWidth: 0.2, // Adjust line width for cell borders
        lineColor: [0, 0, 0], // Set cell border color to black
      },
      columnStyles: {
        0: { cellWidth: 40 },
        1: { cellWidth: 50 },
        2: { cellWidth: 40 },
        3: { cellWidth: 50 },
      },
      // tableLineWidth: 0.2, // Line width for outer borders
      // tableLineColor: [0, 0, 0], // Set outer borders to black
      cellLineWidth: 0.2, // Line width for inner cell borders
      cellLineColor: [0, 0, 0], // Set inner cell borders to black

      didDrawCell: function (data) {
        // Check if it's the signature cell
        if (data.column.index === 3 && data.row.index === 12 && signatureDataUrl) {
          const signatureImg = signatureDataUrl;
          const cellWidth = data.cell.width;
          const cellHeight = data.cell.height;

          // Calculate image dimensions to fit within the cell
          const imgProps = doc.getImageProperties(signatureImg);
          const ratio = Math.min(cellWidth / imgProps.width, cellHeight / imgProps.height);
          const imgWidth = imgProps.width * ratio;
          const imgHeight = imgProps.height * ratio;

          // Add the signature image in the cell
          doc.addImage(
            signatureImg,
            "PNG",
            data.cell.x + (cellWidth - imgWidth) / 2, // Center horizontally
            data.cell.y + (cellHeight - imgHeight) / 2, // Center vertically
            imgWidth,
            imgHeight
          );
        }
      }
    });


    // Download the generated PDF
    doc.save("service_report.pdf");
  };

  const handleClearSignature = () => {
    signatureRef.current.clear(); // Clear the signature canvas
    setSignatureDataUrl(null); // Reset the saved signature
  };

  const handleSaveSignature = () => {
    const dataUrl = signatureRef.current.toDataURL(); // Get the signature image as a data URL
    setSignatureDataUrl(dataUrl); // Store the signature image in the state
  };

  return (
    <div className="p-6 md:p-10 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Service Report</h1>

      <div className="w-full md:w-1/4 mb-8 md:mb-0">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Selected Fields</h1>

        <div className="space-y-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-700">Activity Type:</h2>
            <p className="text-base font-bold">{product || "Not selected"}</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-700">Business Type:</h2>
            <p className="text-base font-bold">{category || "Not selected"}</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-700">Selected Date:</h2>
            <p className="text-base font-bold">{date || "Not selected"}</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">

        <table className="w-full border-collapse border border-gray-300 text-sm text-left">
          <tbody>
            <tr>
              <td className="border border-gray-300 p-2 font-semibold">Customer Name</td>
              <td className="border border-gray-300 p-2">{formData?.customerName || "Not provided"}</td>
              <td className="border border-gray-300 p-2 font-semibold">Equipment</td>
              <td className="border border-gray-300 p-2">{formData?.equipment || "Not provided"}</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2 font-semibold">Customer Location</td>
              <td className="border border-gray-300 p-2">{formData?.customerLocation || "Not provided"}</td>
              <td className="border border-gray-300 p-2 font-semibold">Part No</td>
              <td className="border border-gray-300 p-2">{formData?.partNo || "Not provided"}</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2 font-semibold">Order No</td>
              <td className="border border-gray-300 p-2">{formData?.orderNo || "Not provided"}</td>
              <td className="border border-gray-300 p-2 font-semibold">Stud Size</td>
              <td className="border border-gray-300 p-2">{formData?.studSize || "Not provided"}</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2 font-semibold">Contact Person Name</td>
              <td className="border border-gray-300 p-2">{formData?.contactPersonName || "Not provided"}</td>
              <td className="border border-gray-300 p-2 font-semibold">Contact Person Email</td>
              <td className="border border-gray-300 p-2">{formData?.contactPersonEmail || "Not provided"}</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2 font-semibold">Planned Activity</td>
              <td className="border border-gray-300 p-2">{formData?.plannedActivity || "Not provided"}</td>
              <td className="border border-gray-300 p-2 font-semibold">Activity Performed</td>
              <td className="border border-gray-300 p-2">{formData?.activityPerformed || "Not provided"}</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2 font-semibold">Visit Status</td>
              <td className="border border-gray-300 p-2">{visitStatus || "Not provided"}</td>
              <td className="border border-gray-300 p-2 font-semibold">
                {visitStatus === "Pending" ? "Reason for Pending" : ""}
              </td>
              <td className="border border-gray-300 p-2">{visitStatus === "Pending" ? reason || "Not provided" : ""}</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2 font-semibold">Activity Points/Observation</td>
              <td className="border border-gray-300 p-2" colSpan={3}>
                {formData?.activityPoints || "Not provided"}
              </td>
            </tr>
          </tbody>
        </table>


        {/* signature */}
        <div className="mt-8 ">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Sign Document</h2>
          <SignatureCanvas
            ref={signatureRef}
            penColor="black"
            backgroundColor=""
            canvasProps={{
              className: "border-2 border-gray-300 rounded-lg",

            }}
          />
          <div className="mt-4 flex justify-start gap-60">
            <button
              onClick={handleClearSignature}
              className="px-4 py-2 bg-red-500 text-white rounded-md"
            >
              Clear
            </button>
            <button
              onClick={handleSaveSignature}
              className="px-4 py-2 bg-green-500 text-white rounded-md"
            >
              Save Signature
            </button>
          </div>
          {signatureDataUrl && (
            <div className="mt-4">
              <p className="text-sm text-gray-500">Signature saved successfully!</p>
              <img src={signatureDataUrl} alt="Signature" className="mt-2 border-2 border-gray-300 rounded-lg" />
            </div>
          )}
        </div>

        {/* Checkbox and Buttons */}
        <div className="mt-6 flex items-center space-x-4">
          <input
            type="checkbox"
            id="editCheckbox"
            checked={isChecked}
            onChange={handleCheckboxChange}
            className="h-4 w-4 text-blue-500"
          />
          <label htmlFor="editCheckbox" className="text-sm text-gray-700">
            I agree to edit or download the data
          </label>
        </div>

        {/* Buttons */}
        <div className="mt-6 flex space-x-4">
          <button
            onClick={handleEdit}
            className={`px-4 py-2 bg-blue-500 text-white rounded-md ${!isChecked ? "opacity-50 cursor-not-allowed" : ""}`}
            disabled={!isChecked}
          >
            Edit
          </button>
          <button
            onClick={handleDownloadPdf}
            className={`px-4 py-2 bg-green-500 text-white rounded-md ${!isChecked ? "opacity-50 cursor-not-allowed" : ""}`}
            disabled={!isChecked}
          >
            Download PDF
          </button>
        </div>

        <div className="mt-6">
          <p className="text-sm text-gray-500">Note: This report is generated based on the submitted data.</p>
        </div>
      </div>

    </div>
  );
}

export default DisplayData;
