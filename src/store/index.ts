import { configureStore } from "@reduxjs/toolkit";

import rootReducer from "src/modules";

export const store = configureStore({ reducer: rootReducer });

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
