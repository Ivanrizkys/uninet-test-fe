import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import HeaderApp from "@/components/molecules/HeaderApp";
import DashboardTemplate from "@/components/templates/Dashboard";

describe("Dashboard", () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <DashboardTemplate
          header={
            <HeaderApp
              title="Welcome Admin!"
              description="This is your list users that you can find and modified!"
            />
          }
          dataTable={<></>}
        />
      </MemoryRouter>
    );
  });

  it("renders dashboard screen", async () => {
    expect(screen.getByRole("heading")).toHaveTextContent("Welcome Admin!");
    expect(screen.getByText("This is your list users that you can find and modified!")).toBeInTheDocument();
  });
});
