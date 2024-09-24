import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Dashboard from "./Dashboard";

jest.mock("./Tables", () => () => <div>Tables Component</div>);
jest.mock("./Header", () => () => <div>Header Component</div>);
jest.mock("./Status", () => () => <div>Status Component</div>);

test("renders Dashboard component and handles search", async () => {
  const { getByPlaceholderText, getByText } = render(<Dashboard />);
  
  expect(getByText(/Hello Evano/i)).toBeInTheDocument();
  
  const searchInput = getByPlaceholderText(/Search/i);
  fireEvent.change(searchInput, { target: { value: "John" } });
  
  
});
