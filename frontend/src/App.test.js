import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import App from './App';

beforeAll(() => {
  global.fetch = jest.fn();
});

test('renders the main calculator view after loading', async () => {
  fetch.mockResolvedValue({
    ok: true,
    json: async () => [],
  });

  render(
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  );

  const headingElement = await screen.findByText(/Choose Your Service/i);
  expect(headingElement).toBeInTheDocument();
});