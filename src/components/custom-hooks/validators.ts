/* eslint-disable @typescript-eslint/no-explicit-any */

import React from "react";
import type { ZodObject } from "zod";

export type FieldError = {
  error: boolean;
  message: string;
};

export type ErrorState<T> = {
  [K in keyof T]: FieldError;
};

type Action<T> =
  | { type: "SET_ERROR"; field: keyof T; value: FieldError }
  | { type: "RESET"; initialState: ErrorState<T> };

export type ValidateFieldFunction<T> = (field: keyof T, value: T[typeof field]) => void

function errorReducer<T>(state: ErrorState<T>, action: Action<T>): ErrorState<T> {
  switch (action.type) {
    case "SET_ERROR":
      return { ...state, [action.field]: action.value };
    case "RESET":
      return action.initialState;
    default:
      return state;
  }
}

function createValidator<T>(zodSchema: ZodObject<any>) {
  return {
    fieldCheck<K extends keyof T>(field: K, value: T[K]): FieldError {
      const fieldSchema = zodSchema.shape[field];
      const result = fieldSchema?.safeParse(value);

      if (!result.success) {
        return {
          error: true,
          message: result.error.errors[0]?.message || "Invalid input.",
        };
      }

      return { error: false, message: "" };
    },
  };
}

export function useFieldValidator<T extends Record<string, any>>(
  initialValues: T,
  zodSchema: ZodObject<any>
) {
  const initialState: ErrorState<T> = Object.keys(initialValues).reduce((acc, key) => {
    acc[key as keyof T] = { error: false, message: "" };
    return acc;
  }, {} as ErrorState<T>);

  const [errorState, dispatch] = React.useReducer(errorReducer<T>, initialState);
  const { fieldCheck } = createValidator<T>(zodSchema);

  const validateField = (field: keyof T, value: T[keyof T]) => {
    const error = fieldCheck(field, value);
    dispatch({ type: "SET_ERROR", field, value: error });
  };

  const resetErrorsState = () => dispatch({ type: "RESET", initialState });

  return { errorState, validateField, resetErrorsState };
}