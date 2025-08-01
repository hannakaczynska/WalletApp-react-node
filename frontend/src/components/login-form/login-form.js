import css from "./login-form.module.css";
import { Link, useNavigate } from "react-router-dom";
import {useDispatch} from "react-redux";
import { loginUser } from "../../redux/user/userThunks";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required"),
  });

  const initialValues = {
    email: "",
    password: "",
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    const result = await dispatch(loginUser(values));
    if (result) {
      navigate("/home");
    }
    console.log("Login result:", result);
    console.log("Login data:", values);
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
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginForm;
