import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const EmailVerification = () => {
  const [verificationStatus, setVerificationStatus] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get("token");
    const phoneNumber = queryParams.get("phoneNumber");

    const verifyEmail = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/auth/mail-verification',
            { params: { token, phoneNumber } }
        );
        const { message } = response.data;

        setVerificationStatus(message);
        toast.success(message);
      } catch (error) {
        setVerificationStatus("Token Expired.");
        toast.error("Token Expired.");
        console.error(error);
      }
    };

    verifyEmail();
  }, [location.search, navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-8 bg-white bg-opacity-30 backdrop-blur-lg rounded-xl shadow-lg">
        <h1 className="text-2xl font-bold mb-4 text-black">Email Verification</h1>
        <p className="text-black mb-6">{verificationStatus}</p>
        {verificationStatus.includes("successfully") && (
          <button
            onClick={() => navigate("/auth/login")}
            className="bg-blue-500 text-black py-2 px-4 rounded hover:bg-green-700 transition"
          >
            Back to Login
          </button>
        )}
      </div>
    </div>
  );
};

export default EmailVerification;
