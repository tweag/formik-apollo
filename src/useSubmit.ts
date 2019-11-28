import { isApolloError } from "apollo-client";
import { useCallback } from "react";
import { getStatusFromError, getValidationErrors } from "./errors";
import { SubmitHandler, SubmitOptions } from "./types";

/**
 * Wraps form submission with loading/error handling.
 */
export const useSubmit = <T, R = any>(
  onSubmit: SubmitHandler<T, Promise<R>>,
  {
    onCompleted,
    getStatus = getStatusFromError,
    getErrors = getValidationErrors
  }: SubmitOptions<R> = {}
): SubmitHandler<T> => {
  return useCallback(
    async (values, form) => {
      form.setSubmitting(true);

      try {
        const result = await onSubmit(values, form);
        form.setSubmitting(false);
        onCompleted && onCompleted(result);
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
