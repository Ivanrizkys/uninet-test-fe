import Cookies from "js-cookie";
import { useState } from "react";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import useAuth from "@/hooks/useAuth";
import { ResponseError } from "@/types";
import Toast from "@/components/ui/toast";
import axiosInstance from "@/config/axios";
import Auth from "@/components/templates/Auth";
import { SubmitHandler } from "react-hook-form";
import { Navigate, useNavigate } from "react-router-dom";
import AuthForm, { AuthFormValues } from "@/components/organims/AuthForm";

function Register() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const auth = useAuth();
  const navigate = useNavigate();

  // * handler function to register
  const handleRegister: SubmitHandler<AuthFormValues> = async (data) => {
    setIsLoading(true);
    try {
      const res = await axiosInstance.post("/register", {
        email: data.email,
        password: data.password,
      });
      Cookies.set("token", res.data.token as string);
      toast.custom(() => (
        <Toast variant="success" message="Register successfully!" />
      ));
      setIsLoading(false);
      navigate("/");
    } catch (err) {
      const error = err as AxiosError<ResponseError>;
      setIsLoading(false);
      toast.custom(() => (
        <Toast
          variant="error"
          message={
            error.response?.data.error ?? "Register failed, please try again!"
          }
        />
      ));
    }
  };

  // * prevent user access register if they are already authenticated (have a token)
  if (auth) return <Navigate to="/" />;

  return (
    <Auth
      variant="register"
      title="Create an Account"
      description="Please enter your email and password"
      form={
        <AuthForm
          variant="register"
          isLoading={isLoading}
          handleAuth={handleRegister}
        />
      }
    />
  );
}

export default Register;
