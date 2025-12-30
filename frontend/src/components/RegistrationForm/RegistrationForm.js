import css from "./RegistrationForm.module.css";
import { useState } from "react";
import { registerUser } from "../../redux/user/userThunks";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import zxcvbn from "zxcvbn";

const RegistrationForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const error = useSelector((state) => state.session.error);
  const isLoading = useSelector((state) => state.session.loading);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

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
    setFormSubmitted(true);
    const userData = {
      name: values.name,
      email: values.email,
      password: values.password,
    };
   const result = await dispatch(registerUser(userData));
    if (result) {
      navigate("/home");
    }
    setSubmitting(false);
  };

  const onInputChange = (e, handleChange) => {
    if (formSubmitted) {
      setFormSubmitted(false);
    }
    handleChange(e);
  };

    const onPasswordChange = (e, handleChange) => {
    const password = e.target.value;

    const strength = zxcvbn(password).score;
    setPasswordStrength(strength); 

    handleChange(e);
  };

  return (
    <div className={css.formWrapper}>
      <img src="/logo.svg" alt="Logo" className={css.logo} />
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, values, handleChange }) => (
          <Form className={css.form} autoComplete="off">
            {/* Email Input */}
            <div className={css.inputGroup}>
              <img src="/email.svg" alt="Email icon" className={css.icon} />
              <Field
                type="email"
                name="email"
                className={css.input}
                placeholder="E-mail"
                onChange={(e) => onInputChange(e, handleChange)}
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
                onChange={(e) => onPasswordChange(e, handleChange)}
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
                onChange={(e) => onInputChange(e, handleChange)}
              />
              <div className={css.strengthStrip}></div>
              <div className={css.strengthBar} 
              style={{      width: values.password ? `${(passwordStrength + 1) * 20}%` : "0%",}}></div>
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
                onChange={(e) => onInputChange(e, handleChange)}
              />
              <ErrorMessage
                name="name"
                component="div"
                className={css.error}
              />
              {!isLoading && formSubmitted &&
                values.email &&
                values.password &&
                values.name &&
                values.confirmPassword &&
                error && <div className={css.error}>{error}</div>}
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
