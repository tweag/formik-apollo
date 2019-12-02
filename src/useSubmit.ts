import { isApolloError } from "apollo-client";
import { useCallback } from "react";
import { getStatusFromError, getValidationErrors } from "./errors";
import { SubmitHandler, SubmitOptions } from "./types";

const noop = () => undefined;

/**
 * Wraps form submission with loading/error handling.
 */
export const useSubmit = <T, R = any>({
  mutate,
  onCompleted = noop,
  onError = noop,
  getStatus = getStatusFromError,
  getErrors = getValidationErrors
}: SubmitOptions<T, R>): SubmitHandler<T, R | undefined> => {
  return useCallback(
    async (values, form) => {
      form.setSubmitting(true);

      try {
        const result = await mutate(values, form);
        form.setSubmitting(false);
        await onCompleted(result, values, form);
        return result;
      } catch (error) {
        if (isApolloError(error)) {
          form.setStatus(getStatus(error));
          form.setErrors(getErrors(error) as any);
          form.setSubmitting(false);
          await onError(error, values, form);
        } else {
          form.setSubmitting(false);
          await onError(error, values, form);
          throw error;
        }
      }
    },
    [mutate, onCompleted, onError, getStatus, getErrors]
  );
};
