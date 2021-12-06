import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        isAddTask: false,
        isEditTask: false,
        notification: null,
        selectedTask: {},
        isLoading: false
    },
    reducers: {
        showNotification: (state, action) => {
            state.notification = action.payload;
        },
        clearNotification: (state) => {
            state.notification = null;
        },
        toggleModal: (state) => {
            state.isAddTask = !state.isAddTask;
        },
        toggleEditModal: (state, action) => {
            state.isEditTask = !state.isEditTask;
            state.selectedTask = action.payload;
        },
        toggleIsLoading: (state) => {
            state.isLoading = !state.isLoading;
        }

    }
});

export const uiActions = uiSlice.actions;
export default uiSlice;