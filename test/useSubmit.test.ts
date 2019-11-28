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

const createFormikActions = () => ({
  setErrors: jest.fn(),
  setStatus: jest.fn(),
  setSubmitting: jest.fn()
});

describe("useSubmit", () => {
  it("handles successful submissions", async () => {
    const mutate = jest.fn().mockResolvedValue(99);
    const onCompleted = jest.fn();
    const { result } = renderHook(() => useSubmit({ mutate, onCompleted }));
    const actions = createFormikActions();

    await result.current({}, actions as any);
    expect(actions.setSubmitting).toHaveBeenCalledTimes(2);
    expect(actions.setErrors).not.toBeCalled();
    expect(actions.setStatus).not.toBeCalled();
    expect(onCompleted).toHaveBeenCalledWith(99);
  });

  it("handles submissions with GraphQL errors", async () => {
    const error = createValidationError("GraphQL error: invalid", {
      name: ["is required"]
    });

    const mutate = jest.fn().mockRejectedValue(error);
    const onError = jest.fn();
    const { result } = renderHook(() => useSubmit({ mutate, onError }));
    const actions = createFormikActions();

    await result.current({}, actions as any);

    expect(actions.setSubmitting).toHaveBeenCalledTimes(2);
    expect(actions.setErrors).toHaveBeenCalledWith({ name: "is required" });
    expect(actions.setStatus).toBeCalledWith({ error: "invalid" });
    expect(onError).toHaveBeenCalledWith(error);
  });

  it("handles submissions with other errors errors", async () => {
    const error = new Error("boom");
    const mutate = jest.fn().mockRejectedValue(error);
    const onError = jest.fn();
    const { result } = renderHook(() => useSubmit({ mutate, onError }));
    const actions = createFormikActions();

    await expect(result.current({}, actions as any)).rejects.toThrow(error);

    expect(actions.setSubmitting).toHaveBeenCalledTimes(2);
    expect(actions.setErrors).not.toHaveBeenCalled();
    expect(actions.setStatus).not.toHaveBeenCalled();
    expect(onError).toHaveBeenCalledWith(error);
  });
});
