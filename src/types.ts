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
export type SubmitHandler<T, R = any> = (
  data: T,
  actions: FormikHelpers<T>
) => Promise<R>;

/**
 * Options the can be passed to `useSubmit`.
 */
export interface SubmitOptions<T, R = any> {
  mutate: SubmitHandler<T, R>;
  onCompleted?: (result: R) => void | Promise<void>;
  onError?: (error: Error) => void | Promise<void>;
  getStatus?: (error: Error) => any;
  getErrors?: (error: Error) => Record<string, string>;
}

/**
 * Allow all values to be `null`.
 */
export type Nullable<T> = { [K in keyof T]: T[K] | null };

/**
 * Define the props that a form component will take.
 *
 * This will allow `initialValues` to be nullable.
 *
 * It assumes that validation will occur before `onSubmit` function
 * is called, and therefore the values passed to `onSubmit` are
 * not nullable.
 */
export type FormProps<T, R = any> = Omit<
  FormikConfig<Nullable<T>>,
  "initialValues" | "onSubmit"
> & {
  initialValues?: Nullable<T>;
  onSubmit: SubmitHandler<T, R>;
};
