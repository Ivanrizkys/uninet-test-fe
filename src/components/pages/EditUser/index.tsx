import toast from "react-hot-toast";
import { User } from "@/types/users";
import { db } from "@/config/firebase";
import Toast from "@/components/ui/toast";
import { useEffect, useState } from "react";
import { SubmitHandler } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import HeaderApp from "@/components/molecules/HeaderApp";
import UserForm, { UserFormValues } from "@/components/organims/UserForm";
import UserManagementTemplate from "@/components/templates/UserManagement";
import { collection, query, where, getDocs, updateDoc, doc } from "firebase/firestore";

const dataCollectionRef = collection(db, "users");

function EditUser() {
  const [loadingEdit, setLoadingEdit] = useState<boolean>(false);
  const [loadingGet, setLoadingGet] = useState<boolean>(true);
  const [user, setUser] = useState<Omit<User, "createdAt">>({
    id: "",
    name: "",
    email: "",
    username: "",
  });

  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    (async function () {
      if (params.id) {
        setLoadingGet(true);
        const q = query(dataCollectionRef, where("id", "==", params.id));
        const querySnapshot = await getDocs(q);
        if (querySnapshot.empty) {
          toast.custom(() => (
            <Toast variant="error" message="User does't exist" />
          ));
          setLoadingGet(false);
          return;
        }
        querySnapshot.forEach((doc) => {
          if (doc.exists()) {
            setUser({
              id: doc.data().id as string,
              name: doc.data().name as string,
              email: doc.data().email as string,
              username: doc.data().username as string,
            });
          }
        });
        setLoadingGet(false);
      }
    })();
  }, [params.id]);

  const handleEditUser: SubmitHandler<UserFormValues> = async (data) => {
    setLoadingEdit(true)
    try {
      const q = query(dataCollectionRef, where("id", "==", user.id));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((document) => {
        updateDoc(doc(db, "users", document.id), {
          name: data.name,
          email: data.email,
          username: data.username,
        });
      });
      setLoadingEdit(false)
      toast.custom(() => (
        <Toast variant="success" message="Successfully edit user!" />
      ));
      navigate("/")
    } catch (err) {
      setLoadingEdit(false)
      toast.custom(() => (
        <Toast variant="error" message="Error when edit user!" />
      ));
    }
  };

  if (loadingGet) return null

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
            name: user.name,
            email: user.email,
            username: user.username,
          }}
          isLoading={loadingEdit}
          handleUser={handleEditUser}
        />
      }
    />
  );
}

export default EditUser;
