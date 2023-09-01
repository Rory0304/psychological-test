/* eslint-disable @typescript-eslint/no-restricted-imports */
import { TypedUseSelectorHook, useSelector } from "react-redux";
import { RootState } from "src/store";

// ref: https://redux.js.org/usage/usage-with-typescript#define-typed-hooks
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
