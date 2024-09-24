import React from "react";
import { render } from "@testing-library/react";
import Tables from "./Tables";

test("renders Tables component with user data", () => {
  const mockData = [
    {
      username: "John Doe",
      role: "Admin",
      phone: "123-456-7890",
      email: "john@example.com",
      address: { country: "USA" },
      status: "Active",
    },
  ];

  const { getByText } = render(<Tables data={mockData} />);
  
  expect(getByText(/John Doe/i)).toBeInTheDocument();
  expect(getByText(/Admin/i)).toBeInTheDocument();
  expect(getByText(/123-456-7890/i)).toBeInTheDocument();
  expect(getByText(/john@example.com/i)).toBeInTheDocument();
  expect(getByText(/USA/i)).toBeInTheDocument();
  expect(getByText(/Active/i)).toBeInTheDocument();
});
