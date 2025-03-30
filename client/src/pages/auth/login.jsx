import { loginUser } from "@/apis/api";
import CommonForm from "@/components/common/form";
import { loginFormControl } from "@/config";
import { toast } from 'react-toastify';
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function AuthLogin() {

  const initialState = {
    email: '',
    password: '',
  }

  const [formData, setFormData] = useState(initialState);
  const navigate = useNavigate();

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await loginUser(formData);

      if (response.data.success && response.data) {
        const { token, user } = response.data;

        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        toast.success(response.data.message)
        navigate("/productpage")

      } else {
        const errorMsg = response.data.error || response.data.message;
        toast.error(errorMsg)
      }
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <div className="bg-white-600 bg-opacity-50 p-6 rounded-lg shadow-md backdrop-blur-md">
      <div className="mb-6 text-left">
        <h1 className="text-2xl font-bold text-black">Sign in to an account</h1>
        <p className="text-black-200 mt-2"> Dont have an account ?
          <Link to="/auth/register" className="text-blue-800 hover:underline"> Register</Link>
        </p>
      </div>
      <CommonForm
        formControls={loginFormControl}
        buttonText={"LogIn"}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
      <p className="flex justify-center">
        Forget Password?
        <Link to="/auth/forget-password" className="text-blue-800 hover:underline"> Reset It </Link>
      </p>
    </div>
  );
};

export default AuthLogin;