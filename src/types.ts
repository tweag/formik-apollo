import { FormikHelpers, FormikConfig } from "formik";
import { GraphQLError } from "graphql";

export type Problems = Record<string, string | string[]>;
export type Nullable<T> = { [K in keyof T]: T[K] | null };

export interface ValidationError extends GraphQLError {
  extensions: { problems: Problems };
}

export type SubmitHandler<T> = (
  data: T,
  actions: FormikHelpers<T>
) => Promise<void>;

export interface SubmitOptions {
  getStatus?: (error: Error) => any;
  getErrors?: (error: Error) => Record<string, string>;
}

/**
 * A utility type for defining your own forms.
 */
export interface FormProps<T, V = Nullable<T>>
  extends Omit<FormikConfig<T>, "initialValues" | "onSubmit"> {
  initialValues?: V;
  onSubmit: SubmitHandler<T>;
}
