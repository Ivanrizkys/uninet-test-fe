import "@testing-library/jest-dom";
import Auth from "@/components/templates/Auth";
import { MemoryRouter } from "react-router-dom";
import AuthForm from "@/components/organims/AuthForm";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";

const mockRegister = jest.fn((email, password) => {
  return Promise.resolve({ email, password });
});

describe("Register", () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <Auth
          variant="register"
          title="Create an Account"
          description="Please enter your email and password"
          form={
            <AuthForm
              variant="register"
              isLoading={false}
              handleAuth={mockRegister}
            />
          }
        />
      </MemoryRouter>
    );
  });

  it("renders register screen", async () => {
    expect(screen.getByRole("heading")).toHaveTextContent("Create an Account");
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
      <AuthForm isLoading={false} variant="register" handleAuth={mockRegister} />
    );
  });

  it("should display required error when value is invalid", async () => {
    fireEvent.submit(screen.getByRole("button"));

    expect(await screen.findAllByRole("alert")).toHaveLength(2);
    expect(mockRegister).not.toHaveBeenCalled();
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
    expect(mockRegister).not.toHaveBeenCalled();
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
      expect(mockRegister).toHaveBeenCalledTimes(1);
    });
  });
});
