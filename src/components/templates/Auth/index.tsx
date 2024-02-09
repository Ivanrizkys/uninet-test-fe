import { ReactNode } from "react";

interface AuthProps {
  title: string;
  description: string;
  form: ReactNode;
}

function Auth({ title, description, form }: AuthProps) {
  return (
    <main className="min-h-dvh grid grid-cols-1 lg:grid-cols-2 overflow-y-hidden">
      <section className="bg-zinc-900 hidden lg:block"></section>
      <section className="flex flex-col items-center justify-center px-6 relative">
        <div className="max-w-[25rem] w-full text-center">
          <h1 className="text-foreground text-4xl font-bold">{title}</h1>
          <p className="text-muted-foreground text-sm mt-2 mb-6">{description}</p>
          {form}
        </div>
      </section>
    </main>
  );
}

export default Auth;
