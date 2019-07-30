import { useCallback } from "react";
import { getValidationErrors } from "./errors";
import { SubmitHandler, SubmitOptions } from "./types";

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
): SubmitHandler<T> => {
  return useCallback(
    async (values, form) => {
      form.setSubmitting(true);

      try {
        await onSubmit(values, form);
        form.setSubmitting(false);
      } catch (error) {
        form.setStatus(getStatus(error));
        form.setErrors(getErrors(error) as any);
        form.setSubmitting(false);
        throw error;
      }
    },
    [onSubmit, getStatus, getErrors]
  );
};
