import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Tables from '../components/Tables';

// Mock the fetch function
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ users: mockUsers }),
  })
);

const mockUsers = [
  { id: 1, username: 'john', role: 'admin', phone: '1234567890', email: 'john@example.com', address: { country: 'USA' }, status: 'Active' },
  { id: 2, username: 'jane', role: 'user', phone: '0987654321', email: 'jane@example.com', address: { country: 'Canada' }, status: 'Inactive' },
];

describe('Tables Component', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  test('renders table headers', () => {
    render(<Tables />);
    expect(screen.getByText('Users Name')).toBeInTheDocument();
    expect(screen.getByText('Company')).toBeInTheDocument();
    expect(screen.getByText('Phone Number')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('Country')).toBeInTheDocument();
    expect(screen.getByText('Status')).toBeInTheDocument();
  });

  test('renders correct number of rows', async () => {
    render(<Tables />);
    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));
    const rows = await screen.findAllByRole('row');
    expect(rows).toHaveLength(3); // 2 data rows + 1 header row
  });

  test('renders status with correct styling', async () => {
    render(<Tables />);
    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));
    const activeStatus = await screen.findByText('Active');
    const inactiveStatus = await screen.findByText('Inactive');
    expect(activeStatus).toHaveClass('text-[#008767]');
    expect(inactiveStatus).toHaveClass('text-[#df0404]');
  });



  test('uses provided data when available', () => {
    const customData = [
      { id: 3, username: 'custom', role: 'tester', phone: '1111111111', email: 'custom@example.com', address: { country: 'UK' }, status: 'Active' },
    ];
    render(<Tables data={customData} />);
    expect(screen.getByText('custom')).toBeInTheDocument();
    expect(fetch).not.toHaveBeenCalled();
  });
});