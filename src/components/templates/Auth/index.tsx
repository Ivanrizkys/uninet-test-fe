import { ReactNode } from "react";
import { Link } from "react-router-dom";

interface AuthProps {
  title: string;
  description: string;
  form: ReactNode;
  variant: "login" | "register";
}

function Auth({ title, description, form, variant }: AuthProps) {
  return (
    <main className="min-h-dvh grid grid-cols-1 lg:grid-cols-2 overflow-y-hidden">
      <section className="bg-zinc-900 hidden lg:block"></section>
      <section className="flex flex-col items-center justify-center px-6 relative">
        <div className="max-w-[25rem] w-full text-center">
          <h1 className="text-foreground text-4xl font-bold">{title}</h1>
          <p className="text-muted-foreground text-sm mt-2 mb-6">
            {description}
          </p>
          {form}
          {variant === "login" && (
            <p className="text-muted-foreground text-sm text-center mt-4">
              Don't have an account yet ?{" "}
              <Link
                className="underline underline-offset-4 hover:text-primary"
                to="/auth/register"
              >
                Register
              </Link>
            </p>
          )}
          {variant === "register" && (
            <p className="text-muted-foreground text-sm text-center mt-4">
              Already have an account yet ?{" "}
              <Link
                className="underline underline-offset-4 hover:text-primary"
                to="/auth/login"
              >
                Login
              </Link>
            </p>
          )}
        </div>
      </section>
    </main>
  );
}

export default Auth;
