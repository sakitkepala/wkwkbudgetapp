import * as React from 'react';
import * as styles from './screen-auth-login.css';

export function ScreenAuthLogin() {
  const $form = React.useRef<HTMLFormElement>(null);
  return (
    <div className={styles.login}>
      <form ref={$form}>
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
    </div>
  );
}

export default ScreenAuthLogin;
