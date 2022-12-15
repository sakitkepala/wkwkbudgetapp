import { screen, render, waitFor } from '@testing-library/react';
import user from '@testing-library/user-event';

import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import ScreenAuthLogin from './screen-auth-login';

const routes = [
  { path: '/login', element: <ScreenAuthLogin /> },
  { path: '/dashboard', element: <h1>Dashboard</h1> },
];

const router = createMemoryRouter(routes, {
  initialEntries: ['/login'],
});

describe('ScreenAuthLogin', () => {
  test('Sukses login', async () => {
    render(<RouterProvider router={router} />);

    const inputEmail = screen.getByLabelText(/email/i);
    const inputPassword = screen.getByLabelText(/password/i);
    const buttonLogin = screen.getByRole('button', { name: /masuk/i });

    expect(inputEmail).toBeInTheDocument();
    expect(inputPassword).toBeInTheDocument();
    expect(buttonLogin).toBeInTheDocument();

    await user.type(inputEmail, 'jahenipis@gmail.com');
    await user.type(inputPassword, '87654321');
    await user.click(buttonLogin);

    await waitFor(() => {
      const { location } = router.state;
      expect(location.pathname).toBe('/dashboard');
    });
  });
});
