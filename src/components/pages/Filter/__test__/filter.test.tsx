import Filter from "..";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

describe("Login", () => {
  beforeEach(() => {
    render(<Filter />);
  });

  it("renders login screen", async () => {
    expect(screen.getByText("Data yang belum di filter")).toBeInTheDocument();
    expect(
      screen.getByText("Data yang sudah di filter (ditampilkan semua data)")
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Data yang sudah di filter (ditampilkan data di billdetails)"
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText("Data yang sudah di filter (ditampilkan denomnya saja)")
    ).toBeInTheDocument();
  });
});
