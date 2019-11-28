# formik-apollo

![Build](https://img.shields.io/travis/promptworks/formik-apollo/master?style=flat-square)
![Version](https://img.shields.io/npm/v/formik-apollo?style=flat-square)
![Size](https://img.shields.io/bundlephobia/min/formik-apollo?style=flat-square)
![License](https://img.shields.io/npm/l/formik-apollo?style=flat-square)

A React hook to extract validation errors from a GraphQL request and apply them to a Formik form.

## `useSubmit`

This is a React hook that will automatically extract validation errors from a failed GraphQL response and apply them to a Formik form.

```typescript
const handleSubmit = useSubmit({
  mutate(data, actions) {
    return client.mutate(MyMutation, { variables: { data } });
  }
});
```

On the server side, a failed GraphQL response should look like this:

```json
{
  "errors": [
    {
      "message": "Some generic error message",
      "extensions": {
        "code": "VALIDATION_ERROR",
        "problems": {
          "email": ["is required"]
        }
      }
    }
  ]
}
```

#### Options

| Name          | Required | Type     | Description                                           |
| ------------- | -------- | -------- | ----------------------------------------------------- |
| `mutate`      | ✔️       | Function | Performs the form submission.                         |
| `onCompleted` |          | Function | Add behavior after a successful submission.           |
| `onError`     |          | Function | Add behavior after a failed submission.               |
| `getStatus`   |          | Function | Extracts the error message from the GraphQL response. |
| `getErrors`   |          | Function | Extracts field validation errors from the response.   |
