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

function Login() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const auth = useAuth();
  const navigate = useNavigate();

  const handleLogin: SubmitHandler<AuthFormValues> = async (data) => {
    setIsLoading(true);
    try {
      const res = await axiosInstance.post("/login", {
        email: data.email,
        password: data.password,
      });
      Cookies.set("token", res.data.token as string);
      toast.custom(() => (
        <Toast variant="success" message="Login successfully!" />
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
            error.response?.data.error ?? "Login failed, please try again!"
          }
        />
      ));
    }
  };

  if (auth) return <Navigate to="/" />;

  return (
    <Auth
      variant="login"
      title="Login to Dashboard"
      description="Please enter your email and password"
      form={<AuthForm variant="login" isLoading={isLoading} handleAuth={handleLogin} />}
    />
  );
}

export default Login;
