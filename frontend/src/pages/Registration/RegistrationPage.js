import css from "./RegistrationPage.module.css";
import RegistrationForm from "../../components/RegistrationForm/RegistrationForm";

const RegistrationPage = () => {
  return (
    <div>
      <div className={css.registrationPage}>
        <RegistrationForm />
        <h1 className={css.title}>Finance App</h1>
        <img
          src="/ellipse2.svg"
          alt="Ellipse background"
          className={css.ellipseTwo}
        />
        <img src="/frame1.svg" alt="Frame background" className={css.frame} />
        <img
          src="/ellipse1.svg"
          alt="Ellipse background"
          className={css.ellipseOne}
        />
      </div>
      <div className={css.registrationDesktopPage}>
        <h1 className={css.title}>Finance App</h1>
        <img src="/frame1.svg" alt="Frame background" className={css.frame} />
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
          <RegistrationForm />
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;
