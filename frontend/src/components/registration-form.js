//strengthBar - changing width on password strenght with external package/api

import css from "./registration-form.module.css";

const RegistrationForm = () => {
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

        <div className={css.inputGroup}>
          <img src="/lock.svg" alt="Lock icon" className={css.icon} />
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            className={css.input}
            placeholder="Confirm password"
            required
          />
          <div className={css.strengthStrip}></div>
          <div className={css.strengthBar}></div>
        </div>
        <div className={css.inputGroup}>
          <img src="/account.svg" alt="Account icon" className={css.icon} />
          <input
            type="text"
            id="firstName"
            name="firstName"
            className={`${css.input} ${css.nameInput}`}
            placeholder="First name"
            required
          />
        </div>

        <div className={css.buttonGroup}>
          <button type="submit" className={css.registerButton}>
            Register
          </button>
          <button type="button" className={css.loginButton}>
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegistrationForm;
