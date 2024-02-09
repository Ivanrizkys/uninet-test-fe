import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SubmitHandler, useForm } from "react-hook-form";
import InputLabel from "@/components/molecules/InputLabel";

export type UserFormValues = {
  email: string;
  username: string;
  name: string;
};

interface UserFormProps {
  isLoading: boolean;
  defaultValue?: UserFormValues;
  handleUser: SubmitHandler<UserFormValues>;
}

function UserForm({ isLoading, defaultValue, handleUser }: UserFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormValues>({
    defaultValues: {
      email: defaultValue ? defaultValue.email : "",
      name: defaultValue ? defaultValue.name : "",
      username: defaultValue ? defaultValue.username : "",
    },
  });
  const navigate = useNavigate();

  return (
    <form onSubmit={handleSubmit(handleUser)}>
      <InputLabel
        label="Name"
        className="mb-4"
        placeholder="Enter name"
        {...register("name", {
          required: "Name is required",
        })}
        error={errors.name}
        errorMessage={errors.name?.message}
      />
      <InputLabel
        label="Username"
        className="mb-4"
        placeholder="Enter name"
        {...register("username", {
          required: "Username is required",
        })}
        error={errors.username}
        errorMessage={errors.username?.message}
      />
      <InputLabel
        label="Email"
        className="mb-4"
        placeholder="Enter email address"
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
      <div className="flex items-center justify-between">
        <Button type="button" variant="secondary" onClick={() => navigate(-1)}>
          Back
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Save
        </Button>
      </div>
    </form>
  );
}

export default UserForm;
