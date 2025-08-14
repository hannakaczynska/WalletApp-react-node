import css from "./login-form.module.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/user/userThunks";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const error = useSelector((state) => state.session.error);
  const isLoading = useSelector((state) => state.session.loading);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const initialValues = {
    email: "",
    password: "",
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    setFormSubmitted(true);
    const result = await dispatch(loginUser(values));
    if (loginUser.fulfilled.match(result)) {
      navigate("/home");
    } else {
      console.error("Login failed:", result.error.message);
    }
    setSubmitting(false);
  };

  const onInputChange = (e, handleChange) => {
    if (formSubmitted) {
      setFormSubmitted(false);
    }
    handleChange(e);
  };

  const handleDemo = async () => {
    const result = await dispatch(
      loginUser({ email: "demo@example.com", password: "password123" })
    );
    if (loginUser.fulfilled.match(result)) {
      navigate("/home");
    } else {
      console.error("Login failed:", result.error.message);
    }
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
                onChange={(e) => onInputChange(e, handleChange)}
              />
              <ErrorMessage
                name="password"
                component="div"
                className={css.error}
              />
              {!isLoading &&
                formSubmitted &&
                values.email &&
                values.password &&
                error && <div className={css.error}>{error}</div>}
            </div>

            {/* Buttons */}
            <div className={css.buttonGroup}>
              <button
                type="submit"
                className={css.loginButton}
                disabled={isSubmitting}
              >
                Login
              </button>
              <Link to="/register">
                <button type="button" className={css.registerButton}>
                  Register
                </button>
              </Link>
              <button
                type="button"
                className={css.demoButton}
                onClick={handleDemo}
              >
                Try Demo
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginForm;
