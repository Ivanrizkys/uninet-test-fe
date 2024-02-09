import { useState } from "react";
import { SubmitHandler } from "react-hook-form";
import HeaderApp from "@/components/molecules/HeaderApp";
import UserForm, { UserFormValues } from "@/components/organims/UserForm";
import UserManagementTemplate from "@/components/templates/UserManagement";

function CreateUser() {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  
  const handleCreateUser: SubmitHandler<UserFormValues> = (data) => {
    setIsLoading(true)
    console.log(data)
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }
  
  return (
    <UserManagementTemplate
      header={
        <HeaderApp
          title="Create New User"
          description="Insert name, username, and email for create new user"
        />
      }
      form={<UserForm 
        isLoading={isLoading}
        handleUser={handleCreateUser}
      />}
    />
  );
}

export default CreateUser;
