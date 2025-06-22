import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';
import LoginView from './LoginView';

// Mock the fetch function
global.fetch = jest.fn();

// We need to wrap our component in AuthProvider and BrowserRouter
// because it uses hooks from both (useAuth, useNavigate)
const renderWithProviders = (component) => {
  return render(
    <BrowserRouter>
      <AuthProvider>{component}</AuthProvider>
    </BrowserRouter>
  );
};

describe('LoginView Component', () => {
  beforeEach(() => {
    // Reset the mock before each test
    fetch.mockClear();
  });

  test('allows a user to log in successfully', async () => {
    // 1. Set up our mock fetch to return a successful response
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ token: 'fake_jwt_token' }),
    });

    renderWithProviders(<LoginView />);

    // 2. Find form elements and simulate user input
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' },
    });

    fireEvent.change(screen.getByLabelText(/***REMOVED***/i), {
      target: { value: '***REMOVED***123' },
    });

    // 3. Simulate clicking the login button
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    // 4. Wait for the fetch call to be made and assert it was called correctly
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        'http://localhost:***REMOVED***/api/users/login',
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify({
            email: 'test@example.com',
            ***REMOVED***: '***REMOVED***123',
          }),
        })
      );
    });

    // You could add more assertions here, like checking for navigation,
    // but for now, we've proven the form submission works.
  });

  test('shows an error message on failed login', async () => {
    // 1. Set up our mock fetch to return a failed response
    fetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({ error: 'Invalid credentials.' }),
    });

    renderWithProviders(<LoginView />);

    // 2. Fill out and submit the form
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'wrong@example.com' } });
    fireEvent.change(screen.getByLabelText(/***REMOVED***/i), { target: { value: 'wrong***REMOVED***' } });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    // 3. Wait for the error message to appear in the document
    const errorMessage = await screen.findByText(/invalid credentials/i);
    expect(errorMessage).toBeInTheDocument();
  });
});