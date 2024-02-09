import { useState } from "react";
import { SubmitHandler } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import HeaderApp from "@/components/molecules/HeaderApp";
import UserForm, { UserFormValues } from "@/components/organims/UserForm";
import UserManagementTemplate from "@/components/templates/UserManagement";

function EditUser() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [searchParams] = useSearchParams();

  const handleEditUser: SubmitHandler<UserFormValues> = (data) => {
    setIsLoading(true);
    console.log(data);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  return (
    <UserManagementTemplate
      header={
        <HeaderApp
          title="Edit User"
          description="Insert name, username, and email for edit user"
        />
      }
      form={
        <UserForm
          defaultValue={{
            name: searchParams.get("name") ?? "",
            email: searchParams.get("email") ?? "",
            username: searchParams.get("username") ?? "",
          }}
          isLoading={isLoading}
          handleUser={handleEditUser}
        />
      }
    />
  );
}

export default EditUser;
