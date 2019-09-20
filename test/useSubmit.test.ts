/**
 * @jest-environment jsdom
 */

import { useSubmit, createValidationError } from "../src";
import { renderHook } from "@testing-library/react-hooks";

/**
 * Be quiet.
 */
const originalConsoleError = console.error;
console.error = (...args: any[]) => {
  if (!/Warning.*not wrapped in act/.test(args[0].toString())) {
    originalConsoleError(...args);
  }
};

const createFormikProps = () => ({
  setErrors: jest.fn(),
  setStatus: jest.fn(),
  setSubmitting: jest.fn()
});

describe("useSubmit", () => {
  it("handles successful submissions", async () => {
    const onSubmit = jest.fn().mockResolvedValue(null);
    const { result } = renderHook(() => useSubmit(onSubmit));
    const formikProps = createFormikProps();

    await result.current({}, formikProps as any);
    expect(formikProps.setSubmitting).toHaveBeenCalledTimes(2);
    expect(formikProps.setErrors).not.toBeCalled();
    expect(formikProps.setStatus).not.toBeCalled();
  });

  it("handles submissions with errors", async () => {
    const error = createValidationError("GraphQL error: invalid", {
      name: ["is required"]
    });

    const onSubmit = jest.fn().mockRejectedValue(error);
    const { result } = renderHook(() => useSubmit(onSubmit));
    const formikProps = createFormikProps();

    await result.current({}, formikProps as any);

    expect(formikProps.setSubmitting).toHaveBeenCalledTimes(2);
    expect(formikProps.setErrors).toHaveBeenCalledWith({ name: "is required" });
    expect(formikProps.setStatus).toBeCalledWith({
      error: "invalid"
    });
  });
});
