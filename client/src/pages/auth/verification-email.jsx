import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useToast } from "../../hooks/use-toast";
import axios from "axios";

const EmailVerification = () => {
  const [verificationStatus, setVerificationStatus] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get("token");
    const phoneNumber = queryParams.get("phoneNumber");

    const verifyEmail = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/auth/mail-verification',
            { params: { token, phoneNumber } }
        );
        const { success, message } = response.data;

        setVerificationStatus(message);
        toast({ title: message, variant: success ? "default" : "destructive" });
      } catch (error) {
        setVerificationStatus("Token Expired.");
        toast({ title: "Token Expired.", variant: "destructive" });
        console.error(error);
      }
    };

    verifyEmail();
  }, [location.search, navigate, toast]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-8 bg-white bg-opacity-30 backdrop-blur-lg rounded-xl shadow-lg">
        <h1 className="text-2xl font-bold mb-4 text-black">Email Verification</h1>
        <p className="text-black mb-6">{verificationStatus}</p>
        {verificationStatus.includes("successfully") && (
          <button
            onClick={() => navigate("/auth/login")}
            className="bg-green-500 text-black py-2 px-4 rounded hover:bg-green-700 transition"
          >
            Back to Login
          </button>
        )}
      </div>
    </div>
  );
};

export default EmailVerification;
