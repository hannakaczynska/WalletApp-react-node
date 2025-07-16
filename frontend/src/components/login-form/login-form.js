//strengthBar - changing width on password strenght with external package/api

import css from "./login-form.module.css";

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
          <button type="button" className={css.loginButton}>
            Login
          </button>
          <button type="submit" className={css.registerButton}>
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
