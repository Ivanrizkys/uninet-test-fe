import {
  Timestamp,
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import toast from "react-hot-toast";
import { User } from "@/types/users";
import { db } from "@/config/firebase";
import Toast from "@/components/ui/toast";
import { useCallback, useEffect, useState } from "react";
import HeaderApp from "@/components/molecules/HeaderApp";
import UserDataTable from "@/components/organims/UserDataTable";
import DashboardTemplate from "@/components/templates/Dashboard";

const dataCollectionRef = collection(db, "users");

function Dashboard() {
  const [users, setUsers] = useState<User[]>([]);
  const [deleteId, setDeleteId] = useState<string>("");
  const [dialogDelete, setDialogDelete] = useState<boolean>(false);

  useEffect(() => {
    const unSubscribe = onSnapshot(dataCollectionRef, (snapshot) => {
      const data: User[] = snapshot.docs.map((doc) => ({
        id: doc.data().id as string,
        name: doc.data().name as string,
        email: doc.data().email as string,
        username: doc.data().username as string,
        createdAt: doc.data().createdAt as Timestamp,
      }));
      setUsers(data);
    });

    return () => unSubscribe();
  }, []);

  const handleDeleteUser = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault();
      try {
        const q = query(dataCollectionRef, where("id", "==", deleteId));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((document) => {
          deleteDoc(doc(db, "users", document.id));
        });
        setDialogDelete(false);
        toast.custom(() => (
          <Toast variant="success" message="Successfully delete user!" />
        ));
      } catch (err) {
        setDialogDelete(false);
        toast.custom(() => (
          <Toast variant="error" message="Error when delete user!" />
        ));
      }
    },
    [deleteId]
  );

  return (
    <DashboardTemplate
      header={
        <HeaderApp
          title="Welcome Admin!"
          description="This is your list users that you can find and modified!"
        />
      }
      dataTable={
        <UserDataTable
          data={users}
          dialogDelete={dialogDelete}
          setDeleteId={setDeleteId}
          setDialogDelete={setDialogDelete}
          handleDeleteUser={handleDeleteUser}
        />
      }
    />
  );
}

export default Dashboard;
