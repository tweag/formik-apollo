import { useCallback } from "react";
import { isApolloError } from "apollo-client";
import { SubmitHandler, SubmitOptions } from "./types";
import { getValidationErrors, getStatusFromError } from "./errors";

/**
 * Wraps form submission with loading/error handling.
 */
export const useSubmit = <T>(
  onSubmit: SubmitHandler<T>,
  {
    getStatus = getStatusFromError,
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
