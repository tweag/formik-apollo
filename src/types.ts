import { FormikConfig, FormikHelpers } from "formik";
import { GraphQLError } from "graphql";

/**
 * The problems associated with a validation error.
 */
export type Problems = Record<string, string | string[]>;

/**
 * A `GraphQLError` instance that looks like a validation error.
 */
export interface ValidationError extends GraphQLError {
  extensions: { problems: Problems };
}

/**
 * The function that is called when the form is submitted.
 */
export type SubmitHandler<T, R> = (
  values: T,
  actions: FormikHelpers<T>
) => Promise<R>;

/**
 * The function that is called when the form is successfully submitted.
 */
export type CompletedHandler<T, R> = (
  result: R,
  values: T,
  actions: FormikHelpers<T>
) => any;

/**
 * The function that is called when the form submission fails.
 */
export type ErrorHandler<T> = (
  error: Error,
  values: T,
  actions: FormikHelpers<T>
) => any;

/**
 * Options the can be passed to `useSubmit`.
 */
export interface SubmitOptions<T, R> {
  mutate: SubmitHandler<T, R>;
  onCompleted?: CompletedHandler<T, R>;
  onError?: ErrorHandler<T>;
  getStatus?: (error: Error) => any;
  getErrors?: (error: Error) => Record<string, string>;
}

/**
 * A shortcut for defining the props that a form component will take.
 */
export type FormProps<T, R = any> = Omit<
  FormikConfig<T>,
  "initialValues" | "onSubmit"
> & {
  initialValues?: T;
  onSubmit: SubmitHandler<T, R>;
};
