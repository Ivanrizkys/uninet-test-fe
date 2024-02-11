import { useState } from "react";
import toast from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";
import { db } from "@/config/firebase";
import Toast from "@/components/ui/toast";
import { useNavigate } from "react-router-dom";
import { SubmitHandler } from "react-hook-form";
import HeaderApp from "@/components/molecules/HeaderApp";
import { Timestamp, addDoc, collection } from "firebase/firestore";
import UserForm, { UserFormValues } from "@/components/organims/UserForm";
import UserManagementTemplate from "@/components/templates/UserManagement";

function CreateUser() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  // * function handler for create user
  const handleCreateUser: SubmitHandler<UserFormValues> = async (data) => {
    setIsLoading(true);
    try {
      await addDoc(collection(db, "users"), {
        id: uuidv4(),
        name: data.name,
        email: data.email,
        username: data.username,
        createdAt: Timestamp.now(),
      });
      setIsLoading(false);
      toast.custom(() => (
        <Toast variant="success" message="Success create new user!" />
      ));
      navigate("/");
    } catch (err) {
      setIsLoading(false);
      toast.custom(() => (
        <Toast variant="error" message="Error when create new user, please try again!" />
      ));
    }
  };

  return (
    <UserManagementTemplate
      header={
        <HeaderApp
          title="Create New User"
          description="Insert name, username, and email for create new user"
        />
      }
      form={<UserForm isLoading={isLoading} handleUser={handleCreateUser} />}
    />
  );
}

export default CreateUser;
