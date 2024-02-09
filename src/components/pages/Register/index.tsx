import { useState } from "react";
import { SubmitHandler } from "react-hook-form";
import Auth from "@/components/templates/Auth";
import AuthForm, { AuthFormValues } from "@/components/organims/AuthForm";

function Register() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleRegister: SubmitHandler<AuthFormValues> = (data) => {
    setIsLoading(true);
    console.log(data);
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  };

  return (
    <Auth
      variant="register"
      title="Create an Account"
      description="Please enter your email and password"
      form={<AuthForm isLoading={isLoading} handleAuth={handleRegister} />}
    />
  );
}

export default Register;
