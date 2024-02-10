import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import HeaderApp from "@/components/molecules/HeaderApp";
import UserForm, { UserFormValues } from "@/components/organims/UserForm";
import UserManagementTemplate from "@/components/templates/UserManagement";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";

const mockDefaultValue: UserFormValues = {
  name: "Hana",
  email: "hana@gmail.com",
  username: "hanasara",
};

const mockEditUser = jest.fn(({ email, name, username }: UserFormValues) => {
  return Promise.resolve({ email, name, username });
});

describe("Edit User", () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <UserManagementTemplate
          header={
            <HeaderApp
              title="Edit User"
              description="Insert name, username, and email for edit user"
            />
          }
          form={
            <UserForm
              defaultValue={{
                name: mockDefaultValue.name,
                email: mockDefaultValue.email,
                username: mockDefaultValue.username,
              }}
              isLoading={false}
              handleUser={mockEditUser}
            />
          }
        />
      </MemoryRouter>
    );
  });

  it("renders edit user screen", async () => {
    expect(screen.getByRole("heading")).toHaveTextContent("Edit User");
    expect(
      screen.getByText("Insert name, username, and email for edit user")
    ).toBeInTheDocument();
    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Email")).toBeInTheDocument();
    expect(screen.getByText("Username")).toBeInTheDocument();
  });
});

describe("Form Edit User", () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <UserForm
          defaultValue={{
            name: mockDefaultValue.name,
            email: mockDefaultValue.email,
            username: mockDefaultValue.username,
          }}
          isLoading={false}
          handleUser={mockEditUser}
        />
      </MemoryRouter>
    );
  });

  it("should have initial value", async () => {
    const nameInput = screen.getByPlaceholderText(
      "Enter name"
    ) as HTMLInputElement;
    const usernameInput = screen.getByPlaceholderText(
      "Enter username"
    ) as HTMLInputElement;
    const emailInput = screen.getByPlaceholderText(
      "Enter email address"
    ) as HTMLInputElement;

    expect(nameInput.value).toBe(mockDefaultValue.name);
    expect(usernameInput.value).toBe(mockDefaultValue.username);
    expect(emailInput.value).toBe(mockDefaultValue.email);
  });

  it("should display required error when value is invalid", async () => {
    const nameInput = screen.getByPlaceholderText(
      "Enter name"
    ) as HTMLInputElement;
    const usernameInput = screen.getByPlaceholderText(
      "Enter username"
    ) as HTMLInputElement;
    const emailInput = screen.getByPlaceholderText(
      "Enter email address"
    ) as HTMLInputElement;

    fireEvent.input(nameInput, {
      target: {
        value: "",
      },
    });

    fireEvent.input(usernameInput, {
      target: {
        value: "",
      },
    });

    fireEvent.input(emailInput, {
      target: {
        value: "",
      },
    });

    fireEvent.submit(screen.getByText("Save"));

    expect(await screen.findAllByRole("alert")).toHaveLength(3);
    expect(mockEditUser).not.toHaveBeenCalled();
  });

  it("should display matching error when email is invalid", async () => {
    const nameInput = screen.getByPlaceholderText(
      "Enter name"
    ) as HTMLInputElement;
    const usernameInput = screen.getByPlaceholderText(
      "Enter username"
    ) as HTMLInputElement;
    const emailInput = screen.getByPlaceholderText(
      "Enter email address"
    ) as HTMLInputElement;

    fireEvent.input(nameInput, {
      target: {
        value: "name",
      },
    });

    fireEvent.input(usernameInput, {
      target: {
        value: "username",
      },
    });

    fireEvent.input(emailInput, {
      target: {
        value: "test",
      },
    });

    fireEvent.submit(screen.getByText("Save"));

    expect(await screen.findAllByRole("alert")).toHaveLength(1);
    expect(mockEditUser).not.toHaveBeenCalled();
    expect(nameInput.value).toBe("name");
    expect(usernameInput.value).toBe("username");
    expect(emailInput.value).toBe("test");
  });

  it("submit form with valid value", async () => {
    const nameInput = screen.getByPlaceholderText(
      "Enter name"
    ) as HTMLInputElement;
    const usernameInput = screen.getByPlaceholderText(
      "Enter username"
    ) as HTMLInputElement;
    const emailInput = screen.getByPlaceholderText(
      "Enter email address"
    ) as HTMLInputElement;

    fireEvent.input(nameInput, {
      target: {
        value: "name",
      },
    });

    fireEvent.input(usernameInput, {
      target: {
        value: "username",
      },
    });

    fireEvent.input(emailInput, {
      target: {
        value: "hanare@gmail.com",
      },
    });

    fireEvent.submit(screen.getByText("Save"));
    await waitFor(() => {
      expect(mockEditUser).toHaveBeenCalledTimes(1);
    });
  });
});
