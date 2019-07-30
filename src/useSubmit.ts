import { useCallback } from "react";
import { isApolloError } from "apollo-client";
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
        const result = await onSubmit(values, form);
        form.setSubmitting(false);
        return result;
      } catch (error) {
        if (!isApolloError(error)) {
          throw error;
        }

        form.setStatus(getStatus(error));
        form.setErrors(getErrors(error) as any);
        form.setSubmitting(false);
      }
    },
    [onSubmit, getStatus, getErrors]
  );
};
