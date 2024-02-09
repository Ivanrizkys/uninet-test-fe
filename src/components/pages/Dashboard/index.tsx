import { User } from "@/types/users";
import { db } from "@/config/firebase";
import { useCallback, useEffect, useState } from "react";
import HeaderApp from "@/components/molecules/HeaderApp";
import UserDataTable from "@/components/organims/UserDataTable";
import DashboardTemplate from "@/components/templates/Dashboard";
import { Timestamp, collection, onSnapshot } from "firebase/firestore";

const dataCollectionRef = collection(db, "users");

function Dashboard() {
  const [ users, setUsers ] = useState<User[]>([])
  const [ deleteId, setDeleteId] = useState<string>("")
  const [ dialogDelete, setDialogDelete ] = useState<boolean>(false)
  
  useEffect(() => {
    const unSubscribe = onSnapshot(dataCollectionRef, (snapshot) => {
      const data: User[] = snapshot.docs.map((doc) => ({
        id: doc.data().id as string,
        name: doc.data().name as string,
        email: doc.data().email as string,
        username: doc.data().username as string,
        createdAt: doc.data().createdAt as Timestamp
      }));
      setUsers(data)
    });

    return () => unSubscribe();
  }, []);

  const handleDeleteUser = useCallback((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    console.log(deleteId)
  }, [deleteId])

  return (
    <DashboardTemplate
      header={
        <HeaderApp
          title="Welcome Admin!"
          description="This is your list users that you can find and modified!"
        />
      }
      dataTable={<UserDataTable 
        data={users}
        dialogDelete={dialogDelete}
        setDeleteId={setDeleteId}
        setDialogDelete={setDialogDelete}
        handleDeleteUser={handleDeleteUser}
      />}
    />
  );
}

export default Dashboard;
