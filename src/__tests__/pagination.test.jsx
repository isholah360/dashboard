import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Pagination from '../components/Pagination';
import '@testing-library/jest-dom';

describe('Pagination Component', () => {
  const mockOnPageChange = jest.fn();

  beforeEach(() => {
    mockOnPageChange.mockClear();
  });

  test('renders correct page information', () => {
    render(<Pagination currentPage={2} totalPages={5} onPageChange={mockOnPageChange} />);
    expect(screen.getByText('Showing data 11 to 20 of 50 entries')).toBeInTheDocument();
  });

  test('renders correct number of page buttons', () => {
    render(<Pagination currentPage={1} totalPages={5} onPageChange={mockOnPageChange} />);
    const pageButtons = screen.getAllByRole('button', { name: /[1-5]/ });
    expect(pageButtons).toHaveLength(5);
  });


  test('calls onPageChange when a page button is clicked', () => {
    render(<Pagination currentPage={1} totalPages={5} onPageChange={mockOnPageChange} />);
    fireEvent.click(screen.getByRole('button', { name: '3' }));
    expect(mockOnPageChange).toHaveBeenCalledWith(3);
  });

  test('renders mobile version on small screens', () => {
    global.innerWidth = 500;
    global.dispatchEvent(new Event('resize'));

    render(<Pagination currentPage={2} totalPages={5} onPageChange={mockOnPageChange} />);
    expect(screen.getByText('Previous')).toBeInTheDocument();
    expect(screen.getByText('Next')).toBeInTheDocument();
    expect(screen.getByText('SHOWING 11-20 OF 50')).toBeInTheDocument();
  });
});