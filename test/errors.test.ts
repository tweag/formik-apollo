import { getValidationErrors, VALIDATION_ERROR } from "../src";
import { GraphQLError } from "graphql";
import { ApolloError } from "apollo-client";

const graphQLError = new GraphQLError("whoops!");
const nameError = new GraphQLError(
  "invalid",
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  { code: VALIDATION_ERROR, problems: { name: "is required" } }
);
const ageError = new GraphQLError(
  "invalid",
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  {
    code: VALIDATION_ERROR,
    problems: { age: ["is invalid", "will be ignored"] }
  }
);

const apolloError = new ApolloError({
  graphQLErrors: [nameError, graphQLError, ageError]
});

describe("getValidationErrors", () => {
  it("guards against garbage", () => {
    expect(getValidationErrors(null as any)).toEqual({});
    expect(getValidationErrors("hello" as any)).toEqual({});
  });

  it("builds errors from a GraphQL error", () => {
    expect(getValidationErrors(graphQLError)).toEqual({});
  });

  it("builds errors from a validation error", () => {
    expect(getValidationErrors(nameError)).toEqual({
      name: "is required"
    });
  });

  it("builds errors from an ApolloError", () => {
    expect(getValidationErrors(apolloError)).toEqual({
      name: "is required",
      age: "is invalid"
    });
  });
});
