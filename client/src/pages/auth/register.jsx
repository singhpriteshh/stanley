import { registerUser } from "@/apis/api";
import CommonForm from "@/components/common/form";
import { registerFormControl } from "@/config";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function AuthRegister() {
  const initialState = {
    first_name: "",
    last_name: "",
    phone_number: "",
    email: "",
    password: "",
  };

  const [formData, setFormData] = useState(initialState);
  const navigate = useNavigate();
  const {toast} = useToast();
  
  const onSubmit = async(event) => {
    event.preventDefault();
    try {
      const response = await registerUser(formData);
      if (response.status == 200) {
          toast({
              title: response.message
          })
          navigate("/auth/login");
      } else {
          toast({
              title: response.message,
              variant: "destructive"
          })
      }
  } catch (error) {
      console.log(error);
  }
  }

  return (
    <div className="bg-white-600 bg-opacity-50 p-6 rounded-lg shadow-md backdrop-blur-md">
      <div className="mb-6 text-left">
        <h2 className="text-2xl font-bold text-black">Create New Account</h2>
        <p className="text-black-200 mt-2">
          Already have an account?{" "}
          <Link to="/auth/login" className="text-blue-800 hover:underline">
            Login
          </Link>
        </p>
      </div>
      <CommonForm
        formControls={registerFormControl}
        buttonText={"Sign Up"}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
    </div>
  );
  
}

export default AuthRegister;
