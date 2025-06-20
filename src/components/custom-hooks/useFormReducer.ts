import { useReducer } from "react";

type FormState<T> = T;

type Action<T> =
  | { type: "SET_FIELD"; field: keyof T; value: string }
  | { type: "RESET"; initialState: T };

export type SetFieldFunction<T> = (field: keyof T, value: any) => void;

function formReducer<T>(state: FormState<T>, action: Action<T>): FormState<T> {
  switch (action.type) {
    case "SET_FIELD":
      return { ...state, [action.field]: action.value };
    case "RESET":
      return action.initialState;
    default:
      return state;
  }
}

export function useFormReducer<T extends Record<string, any>>(initialState: T) {
  const [formState, dispatch] = useReducer(formReducer<T>, initialState);

  const setField = (field: keyof T, value: any): void => {
    dispatch({ type: "SET_FIELD", field, value });
  };

  const resetFormState = () => dispatch({ type: "RESET", initialState });

  return { formState, setField, resetFormState };
}
