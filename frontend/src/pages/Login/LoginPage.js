import css from "./LoginPage.module.css";
import LoginForm from "../../components/LoginForm/LoginForm";
import MediaQuery from "react-responsive";

const LoginPage = () => {
  return (
    <div className={css.loginPage}>
      <MediaQuery maxWidth={1279}>
        <LoginForm className={css.loginForm} />
      </MediaQuery>
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
      <div className={css.formContainer}>
        <img
          src="/rectangle3.png"
          alt="Rectangle background"
          className={css.rectangleThree}
        />
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
