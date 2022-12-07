import * as React from 'react';

export function ScreenAuthRegister() {
  const $form = React.useRef<HTMLFormElement>(null);
  return (
    <div>
      <form ref={$form}>
        <div>
          <label htmlFor="email">Email&#42;</label>
          <input id="email" type="text" name="email" />
        </div>
        <div>
          <label htmlFor="password">Password&#42;</label>
          <input id="password" type="password" name="password" />
        </div>
        <div>
          <label htmlFor="username">Username &#x28;opsional&#x29;</label>
          <input id="username" type="username" name="username" />
        </div>
        <button type="submit">Masuk</button>
      </form>
    </div>
  );
}

export default ScreenAuthRegister;
