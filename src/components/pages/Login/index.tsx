import { useState } from "react";
import Auth from "@/components/templates/Auth";
import { SubmitHandler } from "react-hook-form";
import AuthForm, { AuthFormValues } from "@/components/organims/AuthForm";

function Login() {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  
  const handleLogin: SubmitHandler<AuthFormValues> = (data) => {
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
      form={<AuthForm isLoading={isLoading} handleAuth={handleLogin}  />}
    />
  );
}

export default Login;
