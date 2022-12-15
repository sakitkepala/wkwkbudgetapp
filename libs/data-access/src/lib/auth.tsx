import * as React from 'react';
import { request, gql } from 'graphql-request';
import { useMutation } from '@tanstack/react-query';

const MUTATION_LOGIN = gql`
  mutation userLogin($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
    }
  }
`;

type GQLVariables = {
  email: string;
  password: string;
};

type GQLLoginData = {
  id: string;
};

async function loginMutationFn(params: GQLVariables): Promise<GQLLoginData> {
  const { login } = await request<{ login: GQLLoginData }>(
    'http://localhost:7654/graphql',
    MUTATION_LOGIN,
    params
  );
  return login;
}

type LoginParams = {
  email: string;
  password: string;
};

function useAuth() {
  const {
    data: user,
    error: loginError,
    mutateAsync: mutateLogin,
    isLoading: isLoggingIn,
  } = useMutation<GQLLoginData, string, LoginParams>(loginMutationFn);

  const login = React.useCallback(
    async (params: LoginParams): Promise<{ id: number }> => {
      const data = await mutateLogin(params);
      return { id: parseInt(data.id) };
    },
    [mutateLogin]
  );

  return React.useMemo(
    () => ({
      user,
      login,
      isLoggingIn,
      loginError,
    }),
    [user, login, isLoggingIn, loginError]
  );
}

export { useAuth };
