import "@testing-library/jest-dom";
import Auth from "@/components/templates/Auth";
import { MemoryRouter } from "react-router-dom";
import AuthForm from "@/components/organims/AuthForm";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";

const mockLogin = jest.fn((email, password) => {
  return Promise.resolve({ email, password });
});

describe("Login", () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <Auth
          variant="login"
          title="Login to Dashboard"
          description="Please enter your email and password"
          form={
            <AuthForm
              variant="login"
              isLoading={false}
              handleAuth={mockLogin}
            />
          }
        />
      </MemoryRouter>
    );
  });

  it("renders login screen", async () => {
    expect(screen.getByRole("heading")).toHaveTextContent("Login to Dashboard");
    expect(
      screen.getByText("Please enter your email and password")
    ).toBeInTheDocument();
    expect(screen.getByText("Email")).toBeInTheDocument();
    expect(screen.getByText("Password")).toBeInTheDocument();
  });
});

describe("Form Login", () => {
  beforeEach(() => {
    render(
      <AuthForm isLoading={false} variant="login" handleAuth={mockLogin} />
    );
  });

  it("should display required error when value is invalid", async () => {
    fireEvent.submit(screen.getByRole("button"));

    expect(await screen.findAllByRole("alert")).toHaveLength(2);
    expect(mockLogin).not.toHaveBeenCalled();
  });

  it("should display matching error when email is invalid", async () => {
    const emailInput = screen.getByPlaceholderText(
      "Enter your email address"
    ) as HTMLInputElement;
    const passwordInput = screen.getByPlaceholderText(
      "Enter your password"
    ) as HTMLInputElement;

    fireEvent.input(emailInput, {
      target: {
        value: "test",
      },
    });

    fireEvent.input(passwordInput, {
      target: {
        value: "password",
      },
    });

    fireEvent.submit(screen.getByRole("button"));

    expect(await screen.findAllByRole("alert")).toHaveLength(1);
    expect(mockLogin).not.toHaveBeenCalled();
    expect(emailInput.value).toBe("test");
    expect(passwordInput.value).toBe("password");
  });

  it("submit form with valid value", async () => {
    const emailInput = screen.getByPlaceholderText(
      "Enter your email address"
    ) as HTMLInputElement;
    const passwordInput = screen.getByPlaceholderText(
      "Enter your password"
    ) as HTMLInputElement;

    fireEvent.input(emailInput, {
      target: {
        value: "hanare@gmail.com",
      },
    });

    fireEvent.input(passwordInput, {
      target: {
        value: "password",
      },
    });

    fireEvent.submit(screen.getByRole("button"));
    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledTimes(1);
    });
  });
});
