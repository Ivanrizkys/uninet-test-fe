import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import ProfileData from "@/components/organims/ProfileData";
import ProfileTemplate from "@/components/templates/Profile";

interface MockProfileData {
  id: string
  name: string
  email: string
  username: string
}

const mockProfileData: MockProfileData = {
  id: "4f0d2542-e28f-4207-9159-88fef5fc4103",
  name: "Sasa",
  email: "sasa@gmail.com",
  username: "sasasasa"
}

describe("Edit User", () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <ProfileTemplate
          data={
            <ProfileData
              id={mockProfileData.id}
              name={mockProfileData.name}
              email={mockProfileData.email}
              username={mockProfileData.username}
            />
          }
        />
      </MemoryRouter>
    );
  });

  it("renders detail user screen", async () => {
    expect(screen.getByText(mockProfileData.id)).toBeInTheDocument();
    expect(screen.getByText(mockProfileData.name)).toBeInTheDocument();
    expect(screen.getByText(mockProfileData.email)).toBeInTheDocument();
    expect(screen.getByText(mockProfileData.username)).toBeInTheDocument();
  });
});
