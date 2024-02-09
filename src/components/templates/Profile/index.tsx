import { Button } from "@/components/ui/button";
import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

interface ProfileTemplateProps {
  data: ReactNode;
}

function ProfileTemplate({ data }: ProfileTemplateProps) {
  const navigate = useNavigate();
  
  return (
    <main className="pt-24 px-6 md:px-12 flex flex-col items-center gap-10">
      <section className="flex flex-col items-center gap-2">{data}</section>
      <section>
        <Button onClick={() => navigate(-1)}>Back</Button>
      </section>
    </main>
  );
}

export default ProfileTemplate;
