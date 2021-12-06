import toDoSlice from "./toDo-slice";
import uiSlice from "./ui-slice";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
    reducer: {
        todo: toDoSlice.reducer,
        ui: uiSlice.reducer
    }
});