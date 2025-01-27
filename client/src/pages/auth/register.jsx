import CommonForm from "@/components/common/form";
import { registerFormControl } from "@/config";
import { useToast } from "@/hooks/use-toast";
import { registerUser } from "@/store/auth-slice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

function AuthRegister() {
  const initialState = {
    userName: "",
    email: "",
    password: "",
  };

  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {toast} = useToast();
  
  function onSubmit(event) {
    event.preventDefault();
    dispatch(registerUser(formData)).then((data)=> {
      if(data?.payload?.message) {
        toast({
          title : "Register Successfull",
          variant : "destructive"

        })
        navigate('/auth/login')
    }else{
      toast({
        title : data?.payload?.message,
        variant : "destructive"
      })
    }
  })
  }

  console.log(formData);
  
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
