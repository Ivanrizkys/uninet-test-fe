import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SubmitHandler, useForm } from "react-hook-form";
import InputLabel from "@/components/molecules/InputLabel";
import { Link } from "react-router-dom";

export type LoginFormValues = {
  email: string;
  password: string;
};

interface LoginFormProps {
  isLoading: boolean;
  handleLogin: SubmitHandler<LoginFormValues>;
}

function LoginForm({ isLoading, handleLogin }: LoginFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>();

  return (
    <>
      <form className="text-left" onSubmit={handleSubmit(handleLogin)}>
        <InputLabel
          label="Email"
          className="mb-4"
          placeholder="Enter your email address"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/,
              message: "Must be a valid email",
            },
          })}
          error={errors.email}
          errorMessage={errors.email?.message}
        />
        <InputLabel
          label="Password"
          className="mb-4"
          placeholder="Enter your password"
          {...register("password", {
            required: "Password is required",
          })}
          error={errors.password}
          errorMessage={errors.password?.message}
        />
        <Button disabled={isLoading} type="submit" className="w-full">
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Login
        </Button>
      </form>
      <p className="text-muted-foreground text-sm text-center mt-4">
        Don't have an account yet ?{" "}
        <Link
          className="underline underline-offset-4 hover:text-primary"
          to="/auth/register"
        >
          Register
        </Link>
      </p>
    </>
  );
}

export default LoginForm;
