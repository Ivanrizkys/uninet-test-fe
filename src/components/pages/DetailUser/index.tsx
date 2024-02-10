import toast from "react-hot-toast";
import { User } from "@/types/users";
import { db } from "@/config/firebase";
import Toast from "@/components/ui/toast";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProfileData from "@/components/organims/ProfileData";
import ProfileTemplate from "@/components/templates/Profile";
import { collection, query, where, getDocs } from "firebase/firestore";

function DetailUser() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [user, setUser] = useState<Omit<User, "createdAt">>({
    id: "",
    name: "",
    email: "",
    username: "",
  });

  const params = useParams();

  useEffect(() => {
    (async function () {
      if (params.id) {
        setIsLoading(true);
        const q = query(collection(db, "users"), where("id", "==", params.id));
        const querySnapshot = await getDocs(q);
        if (querySnapshot.empty) {
          toast.custom(() => (
            <Toast variant="error" message="User does't exist" />
          ));
          setIsLoading(false);
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
        setIsLoading(false);
      }
    })();
  }, [params.id]);

  if (isLoading) return null;

  return (
    <ProfileTemplate
      data={
        <ProfileData
          id={user.id}
          name={user.name}
          email={user.email}
          username={user.username}
        />
      }
    />
  );
}

export default DetailUser;
