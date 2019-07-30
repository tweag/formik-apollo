# formik-apollo

A React hooks to extract validation errors from a GraphQL request and apply them to a Formik form.

## VALIDATION_ERROR

Indicates that an error is a validation error.

### Props

<details>

| Name | Type | Description |
| ---- | ---- | ----------- |


</details>

## createValidationError

Create a validation error. Useful for testing.

### Props

<details>

| Name | Type | Description |
| ---- | ---- | ----------- |


</details>

## getErrorCode

Get the code for an error.

### Props

<details>

| Name                                                  | Type     | Description |
| ----------------------------------------------------- | -------- | ----------- |
| <strong>name</strong> <sup><em>required</em></sup>    | `string` |             |
| <strong>message</strong> <sup><em>required</em></sup> | `string` |             |
| <strong>stack</strong>                                | `string` |             |

</details>

## isValidationError

Is the error a validation error?

### Props

<details>

| Name                                                  | Type     | Description |
| ----------------------------------------------------- | -------- | ----------- |
| <strong>name</strong> <sup><em>required</em></sup>    | `string` |             |
| <strong>message</strong> <sup><em>required</em></sup> | `string` |             |
| <strong>stack</strong>                                | `string` |             |

</details>

## getValidationErrors

Extract all validation errors from an error.

### Props

<details>

| Name                                                  | Type     | Description                                                                                                                                                                                   |
| ----------------------------------------------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <strong>name</strong> <sup><em>required</em></sup>    | `string` |                                                                                                                                                                                               |
| <strong>message</strong> <sup><em>required</em></sup> | `string` | A message describing the Error for debugging purposes.<br><br>Enumerable, and appears in the result of JSON.stringify().<br><br>Note: should be treated as readonly, despite invariant usage. |
| <strong>stack</strong>                                | `string` |                                                                                                                                                                                               |

</details>

## useSubmit

Wraps form submission with loading/error handling.

### Props

<details>

| Name | Type | Description |
| ---- | ---- | ----------- |


</details>

## FormikApollo

Behaves exactly the same as a normal Formik, but handles GraphQL errors.

### Props

<details>

| Name                                                        | Type                                                                                                                                                                                                                                                                                                         | Description |
| ----------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------- |
| <strong>onSubmit</strong> <sup><em>required</em></sup>      | `SubmitHandler<T>`                                                                                                                                                                                                                                                                                           |             |
| <strong>component</strong>                                  | `string \| number \| boolean \| {} \| ReactElement<any, string \| ((props: any) => ReactElement<any, string \| ... \| (new (props: any) => Component<any, any, any>)>) \| (new (props: any) => Component<any, any, any>)> \| ReactNodeArray \| ReactPortal \| ComponentClass<...> \| FunctionComponent<...>` |             |
| <strong>render</strong>                                     | `(props: FormikProps<T>) => ReactNode`                                                                                                                                                                                                                                                                       |             |
| <strong>initialValues</strong> <sup><em>required</em></sup> | `T`                                                                                                                                                                                                                                                                                                          |             |
| <strong>initialStatus</strong>                              | `any`                                                                                                                                                                                                                                                                                                        |             |
| <strong>initialErrors</strong>                              | `FormikErrors<T>`                                                                                                                                                                                                                                                                                            |             |
| <strong>initialTouched</strong>                             | `FormikTouched<T>`                                                                                                                                                                                                                                                                                           |             |
| <strong>onReset</strong>                                    | `(values: T, formikHelpers: FormikHelpers<T>) => void`                                                                                                                                                                                                                                                       |             |
| <strong>validationSchema</strong>                           | `any`                                                                                                                                                                                                                                                                                                        |             |
| <strong>validate</strong>                                   | `(values: T) => void \| object \| Promise<FormikErrors<T>>`                                                                                                                                                                                                                                                  |             |
| <strong>validateOnChange</strong>                           | `boolean`                                                                                                                                                                                                                                                                                                    |             |
| <strong>validateOnBlur</strong>                             | `boolean`                                                                                                                                                                                                                                                                                                    |             |
| <strong>isInitialValid</strong>                             | `boolean \| ((props: {}) => boolean)`                                                                                                                                                                                                                                                                        |             |
| <strong>enableReinitialize</strong>                         | `boolean`                                                                                                                                                                                                                                                                                                    |             |

</details>
