import { createSlice } from "@reduxjs/toolkit";

const toDoSlice = createSlice({
    name: 'todo',
    initialState: { tasks: [] },
    reducers: {
        initializeTask: (state, action) => {
            state.tasks = action.payload;
        },
        addTask: (state, action) => {
            state.tasks.push(action.payload);
        },
        updateTask: (state, action) => {
            const taskIndex = state.tasks.findIndex(item => item.id === action.payload.id);
            state.tasks[taskIndex] = action.payload;
        },
        markAsCompleted: (state, action) => {
            const taskIndex = state.tasks.findIndex(item => item.id === action.id);
            state.tasks[taskIndex].completionTime = new Date().toISOString();
        },
        deleteTask: (state, action) => {
            const updateTasks = state.tasks.filter(item => item.id !== action.payload);
            state.tasks = updateTasks;
        }
    }
});

export const toDoActions = toDoSlice.actions;
export default toDoSlice;