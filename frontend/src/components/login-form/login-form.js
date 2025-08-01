import css from "./login-form.module.css";
import { Link } from "react-router-dom";

const LoginForm = () => {
  return (
    <div className={css.formWrapper}>
      <img src="/logo.svg" alt="Logo" className={css.logo} />
      <form className={css.form}>
        <div className={css.inputGroup}>
          <img src="/email.svg" alt="Email icon" className={css.icon} />
          <input
            type="email"
            id="email"
            name="email"
            className={css.input}
            placeholder="E-mail"
            required
          />
        </div>

        <div className={css.inputGroup}>
          <img src="/lock.svg" alt="Lock icon" className={css.icon} />
          <input
            type="password"
            id="password"
            name="password"
            className={css.input}
            placeholder="Password"
            required
          />
        </div>

        <div className={css.buttonGroup}>
          <button type="submit" className={css.loginButton}>
            Login
          </button>
          <Link to="/register">
          <button type="button" className={css.registerButton}>
            Register
          </button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
