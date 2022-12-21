import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { MaribuLogoType } from '../components/maribu-logotype';
import * as styles from './home.css';

function ScreenHome() {
  const navigate = useNavigate();
  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <MaribuLogoType />
        <SignUpLink />
      </header>
      <div>
        <LoginForm onSubmit={() => navigate('/u/home')} />
      </div>
      <footer className={styles.footer}>
        &copy; {new Date().getFullYear()}
      </footer>
    </div>
  );
}

function SignUpLink({ children = 'Daftar' }: React.PropsWithChildren) {
  return (
    <a href="/" className={styles.signupLink}>
      {children}
    </a>
  );
}

function LoginForm({ onSubmit }: { onSubmit: () => void }) {
  const email = React.useRef<HTMLInputElement>(null);
  React.useEffect(() => {
    email.current?.focus();
  }, []);
  return (
    <div className={styles.loginCard}>
      <form className={styles.form}>
        <div className={styles.field}>
          <label htmlFor="email" className={styles.label}>
            Email
          </label>
          <input
            ref={email}
            className={styles.input}
            id="email"
            name="email"
            type="text"
            placeholder="jahenipis@gmail.com"
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="password" className={styles.label}>
            Password
          </label>
          <input
            className={styles.input}
            id="password"
            name="password"
            type="password"
          />
        </div>

        <div className={styles.action}>
          <button
            className={styles.submit}
            onClick={(ev) => {
              ev.preventDefault();
              onSubmit();
            }}
          >
            Masuk
          </button>
        </div>
      </form>
    </div>
  );
}

export default ScreenHome;
