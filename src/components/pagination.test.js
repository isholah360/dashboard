import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Pagination from "./Pagination";

test("renders Pagination component and handles page changes", () => {
  const onPageChange = jest.fn();
  const { getByText } = render(<Pagination currentPage={1} totalPages={5} onPageChange={onPageChange} />);

  expect(getByText(/Showing data 1 to 10 of 50 entries/i)).toBeInTheDocument();

  // Next page
  fireEvent.click(getByText(/Next/i));
  expect(onPageChange).toHaveBeenCalledWith(2);

  // Previous page
  fireEvent.click(getByText(/Previous/i));
  expect(onPageChange).toHaveBeenCalledWith(1);
});
