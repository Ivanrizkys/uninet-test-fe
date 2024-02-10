import Cookies from "js-cookie";
import { useState } from "react";
import toast from "react-hot-toast";
import Toast from "@/components/ui/toast";
import axiosInstance from "@/config/axios";
import Auth from "@/components/templates/Auth";
import { useNavigate } from "react-router-dom";
import { SubmitHandler } from "react-hook-form";
import AuthForm, { AuthFormValues } from "@/components/organims/AuthForm";

function Login() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

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
      setIsLoading(false);
      toast.custom(() => (
        <Toast variant="error" message="Login failed, please try again!" />
      ));
    }
  };

  return (
    <Auth
      variant="login"
      title="Login to Dashboard"
      description="Please enter your email and password"
      form={<AuthForm isLoading={isLoading} handleAuth={handleLogin} />}
    />
  );
}

export default Login;
