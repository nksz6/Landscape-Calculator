import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import App from './App';

// Mock the global fetch function before all tests
beforeAll(() => {
  global.fetch = jest.fn();
});

test('renders the main calculator view after loading', async () => {
  // Set up our mock fetch to return a successful, empty array of services
  fetch.mockResolvedValue({
    ok: true,
    json: async () => [],
  });

  // We must wrap App in the providers it needs
  render(
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  );

  // Use "findByText" which waits for the element to appear.
  // This gives our component time to finish its "loading" state.
  // The test function must be "async" to use "await".
  const headingElement = await screen.findByText(/Choose Your Service/i);
  expect(headingElement).toBeInTheDocument();
});