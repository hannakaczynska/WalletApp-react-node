  import * as Yup from "yup";

  export const getValidationSchema = (isIncome) =>
    Yup.object({
      category: isIncome
        ? Yup.string().notRequired()
        : Yup.string().required("Category is required for expenses"),
      amount: Yup.number()
        .min(0.01, "Amount must be greater than 0")
        .required("Amount is required"),
      date: Yup.date().required("Date is required").typeError("Invalid date"),
      comment: Yup.string().max(200, "Comment must be 200 characters or less"),
    });