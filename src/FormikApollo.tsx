import React from "react";
import { Formik, FormikConfig } from "formik";
import { useSubmit, SubmitHandler } from "./useSubmit";

/**
 * A utility type that allows all values to be `null`.
 */
export type Nullable<T> = { [K in keyof T]: T[K] | null };

/**
 * The props that a `Formik` expects.
 */
export interface ApolloFormikConfig<T> extends Omit<FormikConfig<T>, "onSubmit"> {
  onSubmit: SubmitHandler<T>;
}

/**
 * A utility type for defining your own forms.
 */
export interface FormProps<T> extends Omit<ApolloFormikConfig<T>, "initialValues"> {
  onSubmit: SubmitHandler<T>;
  initialValues?: Nullable<T>;
}

/**
 * Behaves exactly the same as a normal Formik, but handles GraphQL errors.
 */
export function FormikApollo<T>({ onSubmit, ...props }: ApolloFormikConfig<T>) {
  return <Formik {...props} onSubmit={useSubmit(onSubmit)} />;
}
