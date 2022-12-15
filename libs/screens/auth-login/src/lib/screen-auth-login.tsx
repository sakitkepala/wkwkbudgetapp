import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@wkwkbudgetapp/data-access';

import * as styles from './screen-auth-login.css';

export function ScreenAuthLogin() {
  const navigate = useNavigate();
  const { login } = useAuth();

  return (
    <div className={styles.login}>
      <LoginForm
        onSubmit={async (data) => {
          try {
            const resData = await login(data);
            if (resData.id) {
              navigate('/dashboard');
            }
          } catch (error) {
            return;
          }
        }}
      />
    </div>
  );
}

type FormSubmitData = {
  email: string;
  password: string;
};

type LoginFormProps = {
  onSubmit: (data: FormSubmitData) => void;
};

function LoginForm({ onSubmit }: LoginFormProps) {
  return (
    <form
      onSubmit={(ev: React.FormEvent<HTMLFormElement>) => {
        ev.preventDefault();
        if (ev.target instanceof HTMLFormElement) {
          const formData = new FormData(ev.target);
          const data = {
            email: formData.get('email')?.toString() || '',
            password: formData.get('password')?.toString() || '',
          };
          onSubmit(data);
        }
      }}
    >
      <div>
        <label htmlFor="email">Email&#42;</label>
        <input id="email" type="text" name="email" />
      </div>
      <div>
        <label htmlFor="password">Password&#42;</label>
        <input id="password" type="password" name="password" />
      </div>
      <button type="submit">Masuk</button>
    </form>
  );
}

export default ScreenAuthLogin;
