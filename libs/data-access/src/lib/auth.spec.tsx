import { render, screen, waitFor } from '@testing-library/react';
import user from '@testing-library/user-event';
import { server, graphql, db } from '@wkwkbudgetapp/tests';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useAuth } from './auth';

beforeAll(() => {
  server.use(
    graphql.mutation('userLogin', async (req, res, context) => {
      const user = await db.user({
        email: req.variables['email'],
        password: req.variables['password'],
      });
      const data = user ? { ...user } : null;
      return res(context.data({ login: data }));
    })
  );
});

describe('useAuth()', () => {
  test('Sukses kirim request mutasi userLogin', async () => {
    const queryClient = new QueryClient();
    const loginPayload = {
      email: 'jahenipis@gmail.com',
      password: '87654321',
    };
    const userData = await db.user(loginPayload);
    const userId = userData ? userData.id.toString() : '';

    function Page() {
      const { login, user } = useAuth();
      return (
        <div>
          <button onClick={() => login(loginPayload)}>Masuk</button>
          {user && <div>id: {user.id}</div>}
        </div>
      );
    }

    render(
      <QueryClientProvider client={queryClient}>
        <Page />
      </QueryClientProvider>
    );

    expect(screen.queryByText(/id:/i)).not.toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: /masuk/i }));
    await waitFor(() => {
      expect(screen.getByText(/id:/i)).toHaveTextContent(userId);
    });
  });
});
