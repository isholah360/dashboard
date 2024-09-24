import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Dashboard from '../Pages/Dashboard';

// Mock the components and icons
jest.mock('../components/Sidebar', () => ({
  __esModule: true,
  default: ({ children }) => <div data-testid="sidebar">{children}</div>,
  SidebarItem: ({ text }) => <div>{text}</div>,
}));
jest.mock('../components/Header', () => () => <div data-testid="header">Header</div>);
jest.mock('../components/Status', () => () => <div data-testid="status">Status</div>);
jest.mock('../components/Tables', () => ({ data }) => <div data-testid="tables">{JSON.stringify(data)}</div>);

// Mock fetch function
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ users: [{ id: 1, username: 'testuser' }] }),
  })
);

describe('Dashboard Component', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  test('renders all components', () => {
    render(
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>
    );
    expect(screen.getByTestId('sidebar')).toBeInTheDocument();
    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByTestId('status')).toBeInTheDocument();
    expect(screen.getByTestId('tables')).toBeInTheDocument();
  });

  test('renders sidebar items', () => {
    render(
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>
    );
    expect(screen.getByText('Users')).toBeInTheDocument();
    expect(screen.getByText('Help')).toBeInTheDocument();
  });

  test('renders search input', () => {
    render(
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>
    );
    expect(screen.getByPlaceholderText('Search')).toBeInTheDocument();
  });

  test('renders sort dropdown', () => {
    render(
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>
    );
    expect(screen.getByText('Sort by :')).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  test('performs search', async () => {
    render(
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>
    );
    const searchInput = screen.getByPlaceholderText('Search');
    fireEvent.change(searchInput, { target: { value: 'test' } });
    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));
    expect(fetch).toHaveBeenCalledWith('https://dummyjson.com/users/search?q=test');
  });

  test('displays search results', async () => {
    render(
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>
    );
    const searchInput = screen.getByPlaceholderText('Search');
    fireEvent.change(searchInput, { target: { value: 'test' } });
    await waitFor(() => {
      const tablesComponent = screen.getByTestId('tables');
      expect(tablesComponent).toHaveTextContent('testuser');
    });
  });
});