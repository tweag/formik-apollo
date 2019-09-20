# formik-apollo

A React hook to extract validation errors from a GraphQL request and apply them to a Formik form.

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

| Name | Type | Description |
| ---- | ---- | ----------- |


</details>

## getStatusFromError

Get the form status based on an error.

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
