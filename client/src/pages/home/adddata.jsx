import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { saveData } from "@/apis/api";


function AddData() {
  const location = useLocation();
  const { product, category, date } = location.state || {}; // Get state passed from the previous page

  const [visitStatus, setVisitStatus] = useState(""); // State to track visit status
  const [reason, setReason] = useState(""); // State to track the reason
  const [formData, setFormData] = useState({
    customerName: "",
    customerLocation: "",
    equipment: "",
    partNo: "",
    orderNo: "",
    studSize: "",
    contactPersonName: "",
    contactPersonEmail: "",
    plannedActivity: "",
    activityPerformed: "",
    activityPoints: "", // Added this for the observation textarea
  });

  const navigate = useNavigate();

  const handleVisitStatusChange = (e) => {
    setVisitStatus(e.target.value);
  };

  const handleReasonChange = (e) => {
    setReason(e.target.value);
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const isFormValid = () => {
    // Check if all fields are filled
    return (
      Object.values(formData).every((value) => value !== "") && visitStatus !== ""
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (isFormValid()) {
      const requestData = {
        ...formData,
        visitStatus,
        reason,
        product,
        category,
        date,
      };
  
      try {
        // Use your preferred method to send data to the backend
        const response = await saveData(requestData);
        if (response.status === 200) {
          navigate('/protected/displaydata', {
            state: {
              data: { formData, visitStatus, reason },
              data1: { product, category, date },
            },
          });
        } else {
          console.error('Failed to save data', response.data);
        }
      } catch (error) {
        console.error('Error while submitting data:', error);
      }
    }
  };
  

  return (
    <div className="p-6 md:p-10">
      <div className="flex flex-col md:flex-row md:gap-10">
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

        <form
          className="w-full md:w-full bg-white p-6 rounded-lg shadow-md flex flex-col gap-6"
          onSubmit={handleSubmit}
        >
          <h1 className="text-3xl font-bold">Service visit</h1>

          {/* Inputs in 3 columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {/* Customer Name */}
            <div className="flex flex-col">
              <label htmlFor="customerName" className="text-sm font-medium text-gray-700">
                Customer Name:
              </label>
              <input
                id="customerName"
                type="text"
                value={formData.customerName}
                onChange={handleInputChange}
                placeholder="Enter customer name"
                className="mt-1 py-2 px-3 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            {/* Customer Location */}
            <div className="flex flex-col">
              <label htmlFor="customerLocation" className="text-sm font-medium text-gray-700">
                Customer Location:
              </label>
              <input
                id="customerLocation"
                type="text"
                value={formData.customerLocation}
                onChange={handleInputChange}
                placeholder="Enter customer location"
                className="mt-1 py-2 px-3 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            {/* Equipment */}
            <div className="flex flex-col">
              <label htmlFor="equipment" className="text-sm font-medium text-gray-700">
                Equipment:
              </label>
              <input
                id="equipment"
                type="text"
                value={formData.equipment}
                onChange={handleInputChange}
                placeholder="Enter equipment"
                className="mt-1 py-2 px-3 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            {/* Part No */}
            <div className="flex flex-col">
              <label htmlFor="partNo" className="text-sm font-medium text-gray-700">
                Part No:
              </label>
              <input
                id="partNo"
                type="text"
                value={formData.partNo}
                onChange={handleInputChange}
                placeholder="Enter part number"
                className="mt-1 py-2 px-3 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            {/* Order No */}
            <div className="flex flex-col">
              <label htmlFor="orderNo" className="text-sm font-medium text-gray-700">
                Order No:
              </label>
              <input
                id="orderNo"
                type="text"
                value={formData.orderNo}
                onChange={handleInputChange}
                placeholder="Enter order number"
                className="mt-1 py-2 px-3 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            {/* Stud Size */}
            <div className="flex flex-col">
              <label htmlFor="studSize" className="text-sm font-medium text-gray-700">
                Stud Size:
              </label>
              <input
                id="studSize"
                type="text"
                value={formData.studSize}
                onChange={handleInputChange}
                placeholder="Enter stud size"
                className="mt-1 py-2 px-3 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            {/* Contact Person Name */}
            <div className="flex flex-col">
              <label htmlFor="contactPersonName" className="text-sm font-medium text-gray-700">
                Contact Person Name:
              </label>
              <input
                id="contactPersonName"
                type="text"
                value={formData.contactPersonName}
                onChange={handleInputChange}
                placeholder="Enter contact person name"
                className="mt-1 py-2 px-3 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            {/* Contact Person Email */}
            <div className="flex flex-col">
              <label htmlFor="contactPersonEmail" className="text-sm font-medium text-gray-700">
                Contact Person Email:
              </label>
              <input
                id="contactPersonEmail"
                type="text"
                value={formData.contactPersonEmail}
                onChange={handleInputChange}
                placeholder="Enter contact person email"
                className="mt-1 py-2 px-3 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            {/* Planned Activity */}
            <div className="flex flex-col">
              <label htmlFor="plannedActivity" className="text-sm font-medium text-gray-700">
                Planned Activity:
              </label>
              <input
                id="plannedActivity"
                type="text"
                value={formData.plannedActivity}
                onChange={handleInputChange}
                placeholder="Enter planned activity"
                className="mt-1 py-2 px-3 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            {/* Activity Performed */}
            <div className="flex flex-col">
              <label htmlFor="activityPerformed" className="text-sm font-medium text-gray-700">
                Activity Performed:
              </label>
              <input
                id="activityPerformed"
                type="text"
                value={formData.activityPerformed}
                onChange={handleInputChange}
                placeholder="Enter activity performed"
                className="mt-1 py-2 px-3 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>

          {/* Dropdowns in 2 columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Visit Plan Type Dropdown */}
            <div className="flex flex-col">
              <label htmlFor="dropdown1" className="text-sm font-medium text-gray-700">
                Visit Plan Type:
              </label>
              <select
                id="dropdown1"
                value={formData.visitPlanType}
                onChange={handleInputChange}
                className="mt-1 py-2 px-3 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="">Select Visit plan Type</option>
                <option value="Call">Call</option>
                <option value="Mail">Mail</option>
              </select>
            </div>

            {/* Visit Status Dropdown */}
            <div className="flex flex-col">
              <label htmlFor="dropdown2" className="text-sm font-medium text-gray-700">
                Visit Status:
              </label>
              <select
                id="dropdown2"
                value={visitStatus}
                onChange={handleVisitStatusChange}
                className="mt-1 py-2 px-3 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="">Select Visit Status</option>
                <option value="Completed">Completed</option>
                <option value="Pending">Pending</option>
              </select>
            </div>
          </div>

          {/* Conditionally render the "Reason" text field if "Pending" is selected */}
          {visitStatus === "Pending" && (
            <div className="flex flex-col">
              <label htmlFor="reason" className="text-sm font-medium text-gray-700">
                Reason for Pending Status:
              </label>
              <input
                id="reason"
                type="text"
                value={reason}
                onChange={handleReasonChange}
                placeholder="Enter reason for pending visit"
                className="mt-1 py-2 px-3 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          )}

          {/* Activity Points (Textarea) */}
          <div className="flex flex-col">
            <label htmlFor="activityPoints" className="text-sm font-medium text-gray-700 mb-1">
              Activity points/Observation:
            </label>
            <div className="bg-white border border-gray-300 rounded-md shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-indigo-500 ">
              <ReactQuill
                id="activityPoints"
                value={formData.activityPoints}
                onChange={(value) =>
                  setFormData((prev) => ({
                    ...prev,
                    activityPoints: value,
                  }))
                }
                placeholder="Enter Observations"
                modules={quillModules}
                formats={quillFormats}
              />
            </div>
          </div>


          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              disabled={!isFormValid()}
              className="w-full md:w-auto py-2 px-6 text-sm font-medium text-white bg-indigo-600 rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

const quillModules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ['bold', 'italic', 'underline'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['clean'],
  ],
};

const quillFormats = [
  'header',
  'bold', 'italic', 'underline',
  'list', 'bullet',
];


export default AddData;
