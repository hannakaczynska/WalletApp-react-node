//strengthBar - changing width on password strenght with external package/api
import css from "./registration-form.module.css";
import {registerUser} from "../../redux/user/userThunks";
import {useDispatch} from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const RegistrationForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .max(12, "Password must be at most 12 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm password is required"),
    name: Yup.string()
      .min(1, "Name must be at least 1 character")
      .max(12, "Name must be at most 12 characters")
      .required("Name is required"),
  });

  const initialValues = {
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    const userData = {
      name: values.name,
      email: values.email,
      password: values.password,
    };
   const result = dispatch(registerUser(userData));
    if (result) {
      navigate("/home");
    }
    setSubmitting(false);
  };

  return (
    <div className={css.formWrapper}>
      <img src="/logo.svg" alt="Logo" className={css.logo} />
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className={css.form}>
            {/* Email Input */}
            <div className={css.inputGroup}>
              <img src="/email.svg" alt="Email icon" className={css.icon} />
              <Field
                type="email"
                name="email"
                className={css.input}
                placeholder="E-mail"
              />
              <ErrorMessage
                name="email"
                component="div"
                className={css.error}
              />
            </div>

            {/* Password Input */}
            <div className={css.inputGroup}>
              <img src="/lock.svg" alt="Lock icon" className={css.icon} />
              <Field
                type="password"
                name="password"
                className={css.input}
                placeholder="Password"
              />
              <ErrorMessage
                name="password"
                component="div"
                className={css.error}
              />
            </div>

            {/* Confirm Password Input */}
            <div className={css.inputGroup}>
              <img src="/lock.svg" alt="Lock icon" className={css.icon} />
              <Field
                type="password"
                name="confirmPassword"
                className={css.input}
                placeholder="Confirm password"
              />
              <div className={css.strengthStrip}></div>
              <div className={css.strengthBar}></div>
              <ErrorMessage
                name="confirmPassword"
                component="div"
                className={`${css.error} ${css.confirmPasswordError}`}
              />
            </div>

            {/* Name Input */}
            <div className={css.inputGroup}>
              <img src="/account.svg" alt="Account icon" className={css.icon} />
              <Field
                type="text"
                name="name"
                className={`${css.input} ${css.nameInput}`}
                placeholder="First name"
              />
              <ErrorMessage
                name="name"
                component="div"
                className={css.error}
              />
            </div>

            {/* Buttons */}
            <div className={css.buttonGroup}>
              <button
                type="submit"
                className={css.registerButton}
                disabled={isSubmitting}
              >
                Register
              </button>
              <Link to="/login">
              <button type="button" className={css.loginButton}>
                Login
              </button>
              </Link>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default RegistrationForm;
