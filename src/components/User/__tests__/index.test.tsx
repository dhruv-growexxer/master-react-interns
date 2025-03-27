import { cleanup, render, screen } from '@testing-library/react';
import UsersList from '../index';
import { useFetch } from '../../../hooks/useFetch';
import { API_URL } from '../../../utils/constants';
import React from 'react';

// Mock the useFetch hook
jest.mock('../../../hooks/useFetch');
const mockedUseFetch = useFetch as jest.MockedFunction<typeof useFetch>;

describe('UsersList', () => {
  it('shows loading state', () => {
    mockedUseFetch.mockReturnValue({
      data: null,
      loading: true,
      error: null,
    });

    render(<UsersList />);
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
  });

  it('shows error message when fetch fails', () => {
    const errorMessage = 'Failed to fetch users';
    mockedUseFetch.mockReturnValue({
      data: null,
      loading: false,
      error: errorMessage,
    });

    render(<UsersList />);
    expect(screen.getByText(`Error: ${errorMessage}`)).toBeInTheDocument();
  });

  it('renders list of users when fetch succeeds', () => {
    const mockUsers = [{ name: 'John Doe' }, { name: 'Jane Smith' }, { name: 'Bob Johnson' }];

    mockedUseFetch.mockReturnValue({
      data: mockUsers,
      loading: false,
      error: null,
    });

    render(<UsersList />);

    // Check if all users are rendered
    mockUsers.forEach((user) => {
      expect(screen.getByText(user.name)).toBeInTheDocument();
    });
  });

  it('calls useFetch with correct URL', () => {
    mockedUseFetch.mockReturnValue({
      data: [],
      loading: false,
      error: null,
    });

    render(<UsersList />);
    expect(mockedUseFetch).toHaveBeenCalledWith(API_URL.USERS);
  });

  it('handles null data gracefully', () => {
    mockedUseFetch.mockReturnValue({
      data: null,
      loading: false,
      error: null,
    });

    render(<UsersList />);
    expect(screen.getByRole('list')).toBeInTheDocument();
    expect(screen.queryByRole('listitem')).not.toBeInTheDocument();
  });
});
