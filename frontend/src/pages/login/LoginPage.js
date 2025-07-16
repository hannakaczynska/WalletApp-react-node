import css from "./login-page.module.css";
import LoginForm from "../../components/login-form/login-form";

const LoginPage = () => {
  return (
    <div>
      <div className={css.registrationPage}>
        <LoginForm />
        <h1 className={css.title}>Finance App</h1>
        <img
          src="/ellipse2.svg"
          alt="Ellipse background"
          className={css.ellipseTwo}
        />
        <img src="/frame.svg" alt="Frame background" className={css.frame} />
        <img
          src="/ellipse1.svg"
          alt="Ellipse background"
          className={css.ellipseOne}
        />
      </div>
      <div className={css.registrationDesktopPage}>
        <h1 className={css.title}>Finance App</h1>
        <img src="/frame.svg" alt="Frame background" className={css.frame} />
        <img
          src="/ellipse1.svg"
          alt="Ellipse background"
          className={css.ellipseOne}
        />
        <div className={css.formContainer}>
          <img
            src="/rectangle3.png"
            alt="Rectangle background"
            className={css.rectangleThree}
          />
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;