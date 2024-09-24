import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Login from "./Login";

jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

test("renders Login component and submits form", () => {
  const { getByPlaceholderText, getByText } = render(<Login />);
  
  const emailInput = getByPlaceholderText(/info@provistechnologies.com/i);
  fireEvent.change(emailInput, { target: { value: "test@example.com" } });
  
  const passwordInput = getByPlaceholderText(/Enter your password/i);
  fireEvent.change(passwordInput, { target: { value: "password123" } });

  fireEvent.click(getByText(/Login now/i));
  
});
