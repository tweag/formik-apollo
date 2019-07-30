import { useCallback } from "react";
import { FormikHelpers } from "formik";
import { getValidationErrors } from "./errors";

export type SubmitHandler<T> = (
  data: T,
  actions: FormikHelpers<T>
) => Promise<void>;

export interface SubmitOptions {
  getStatus?: (error: Error) => any;
  getErrors?: (error: Error) => Record<string, string>;
}

const getStatusDefault = (error: Error) => ({
  error: error.message
});

/**
 * Wraps form submission with loading/error handling.
 */
export const useSubmit = <T>(
  onSubmit: SubmitHandler<T>,
  {
    getStatus = getStatusDefault,
    getErrors = getValidationErrors
  }: SubmitOptions = {}
): SubmitHandler<any> => {
  return useCallback(
    async (values, form) => {
      form.setSubmitting(true);

      try {
        await onSubmit(values, form);
        form.setSubmitting(false);
      } catch (error) {
        form.setStatus(getStatus(error));
        form.setErrors(getErrors(error));
        form.setSubmitting(false);
        throw error;
      }
    },
    [onSubmit, getStatus, getErrors]
  );
};
