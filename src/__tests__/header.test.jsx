import React from "react";
import { render } from "@testing-library/react";
import Header from "../components/Header";
import '@testing-library/jest-dom';


import { screen, fireEvent } from '@testing-library/react';

// Mock the Wave image import
jest.mock('../assets/images/wave.png', () => 'mocked-wave-image');

describe('Header Component', () => {
  test('renders greeting with name', () => {
    render(<Header />);
    expect(screen.getByText(/Hello Evano/i)).toBeInTheDocument();
  });

  test('renders wave image', () => {
    render(<Header />);
    const waveImage = screen.getByAltText('');
    expect(waveImage).toBeInTheDocument();
    expect(waveImage).toHaveAttribute('src', 'mocked-wave-image');
  });

  test('renders search input', () => {
    render(<Header />);
    expect(screen.getByPlaceholderText('Search')).toBeInTheDocument();
  });

  test('search input is functional', () => {
    render(<Header />);
    const searchInput = screen.getByPlaceholderText('Search');
    fireEvent.change(searchInput, { target: { value: 'test search' } });
    expect(searchInput.value).toBe('test search');
  });

  // test('renders search icon', () => {
  //   render(<Header />);
  //   expect(screen.getByTestId('search-icon')).toBeInTheDocument();
  // });
});
