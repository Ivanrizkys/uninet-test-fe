import { useState } from "react";
import Auth from "@/components/templates/Auth";
import { SubmitHandler } from "react-hook-form";
import LoginForm, { LoginFormValues } from "@/components/organims/LoginForm";

function Login() {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  
  const handleLogin: SubmitHandler<LoginFormValues> = (data) => {
    setIsLoading(true)
    console.log(data);
    setTimeout(() => {
      setIsLoading(false)
    }, 3000)
  };

  return (
    <Auth
      title="Login to Dashboard"
      description="Please enter your email and password"
      form={<LoginForm isLoading={isLoading} handleLogin={handleLogin}  />}
    />
  );
}

export default Login;
