import { configureStore } from "@reduxjs/toolkit";

import issuesSlice from "./slices/issuesSlice";

export const store = configureStore({
    reducer: {
        issues: issuesSlice,
    },
});

export type RootState = ReturnType<typeof store.getState>;