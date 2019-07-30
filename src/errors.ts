import { GraphQLError } from "graphql";
import { ApolloError, isApolloError } from "apollo-client";
import { Problems, ValidationError } from "./types";

const isString = (value: any) => typeof value === "string";
const isError = (value: any) => value instanceof Error;
const isObject = (value: any) => value && typeof value === "object";

/**
 * Indicates that an error is a validation error.
 */
export const VALIDATION_ERROR = "VALIDATION_ERROR";

/**
 * Create a validation error. Useful for testing.
 */
export const createValidationError = (message: string, problems: Problems) => {
  const gqlError = new GraphQLError(
    message,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    { code: VALIDATION_ERROR, problems }
  );

  return new ApolloError({
    errorMessage: message,
    graphQLErrors: [gqlError]
  });
};

/**
 * Get the code for an error.
 */
export const getErrorCode = (error: Error): string | undefined =>
  error instanceof GraphQLError &&
  isObject(error.extensions) &&
  error.extensions!.code;

/**
 * Is the error a validation error?
 */
export const isValidationError = (error: Error): error is ValidationError =>
  error instanceof GraphQLError &&
  isObject(error.extensions) &&
  isObject(error.extensions!.problems) &&
  error.extensions!.code === VALIDATION_ERROR;

/**
 * Extract all validation errors from an error.
 */
export const getValidationErrors = (
  error: ApolloError | GraphQLError | Error
): Record<string, string> => {
  if (!isError(error)) {
    return {};
  }

  if (isApolloError(error)) {
    return error.graphQLErrors.reduce(
      (acc, e) => Object.assign(acc, getValidationErrors(e)),
      {}
    );
  }

  if (!isValidationError(error)) {
    return {};
  }

  return Object.entries(error.extensions.problems).reduce(
    (acc, [key, value]) => {
      const message = Array.isArray(value) ? value[0] : value;
      const updates = isString(message) ? { [key]: message } : {};
      return Object.assign(acc, updates);
    },
    {}
  );
};
