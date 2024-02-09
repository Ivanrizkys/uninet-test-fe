import { useParams } from "react-router-dom";
import ProfileData from "@/components/organims/ProfileData";
import ProfileTemplate from "@/components/templates/Profile";

function DetailUser () {
  const params = useParams();
  
  return (
    <ProfileTemplate 
      data={<ProfileData 
        id={params.id ?? ""}
        name="Ivan Rizky Saputra"
        email="ivnriizky@gmail.com"
        username="ivanrizkys"
      />}
    />
  )
}

export default DetailUser;