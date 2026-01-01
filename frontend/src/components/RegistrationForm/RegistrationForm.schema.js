  import * as Yup from "yup";
  
  export const validationSchema = Yup.object({
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
