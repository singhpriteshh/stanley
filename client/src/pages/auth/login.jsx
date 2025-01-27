import CommonForm from "@/components/common/form";
import { loginFormControl } from "@/config";
import { useToast } from "@/hooks/use-toast";
import { loginUser } from "@/store/auth-slice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

function AuthLogin() {

  const initialState = {
    email: '',
    password: '',
  }

  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const { toast } = useToast();

  function onSubmit(event) {
    event.preventDefault();
    dispatch(loginUser(formData)).then((data) => {

      if (data?.payload?.success) {
        toast({
          title: data?.payload?.message,
          variant: "destructive"
        })
      } else {
        toast({
          title: "Login unsuccessfull"
        })
      }

    })

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
    </div>
  );
};

export default AuthLogin;