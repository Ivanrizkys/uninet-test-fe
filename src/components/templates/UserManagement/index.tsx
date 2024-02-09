import { ReactNode } from "react";

interface UserManagementTemplateProps {
  header: ReactNode;
  form: ReactNode;
}

function UserManagementTemplate({ header, form }: UserManagementTemplateProps) {
  return (
    <main className="px-6 md:px-12 pt-24 pb-8">
      <section>{header}</section>
      <section className="mt-8">
        {form}
      </section>
    </main>
  );
}

export default UserManagementTemplate;
