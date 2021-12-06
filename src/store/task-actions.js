import { uiActions } from "./ui-slice";
import { toDoActions } from "./toDo-slice";

export const addTaskData = (taskData) => {
    return async (dispatch) => {
        const sendRequest = async () => {
            const response = await fetch('https://react-todo-f3205-default-rtdb.firebaseio.com/tasks.json', {
                method: 'POST',
                body: JSON.stringify({
                    ...taskData
                })
            });
            if (!response.ok)
                throw Error('Sending cart data failed');
            const data = await response.json();
            return data;
        }
        try {
            const response = await sendRequest();
            const newTask = {
                id: response['name'],
                ...taskData
            }
            dispatch(toDoActions.addTask(newTask))

        } catch (error) {
            dispatch(uiActions.showNotification({
                status: 'error',
                message: 'Connection Error.. Task not updated in DB.'
            }))
            setTimeout(() => {
                dispatch(uiActions.clearNotification());
            }, 3000);
        }
    }
}
export const fetchTasks = () => {
    return async (dispatch, state) => {
        dispatch(uiActions.toggleIsLoading())
        const sendRequest = async () => {
            let result = [];
            const response = await fetch('https://react-todo-f3205-default-rtdb.firebaseio.com/tasks.json');
            if (!response.ok)
                throw Error('Sending cart data failed');
            const data = await response.json();
            for (let item in data) {
                const obj = {
                    id: item,
                    ...data[item]
                }
                result.push(obj)
            }
            dispatch(toDoActions.initializeTask(result))
            dispatch(uiActions.toggleIsLoading())
        }
        try {
            await sendRequest();
        } catch (error) {
            dispatch(uiActions.toggleIsLoading());
            dispatch(uiActions.showNotification({
                status: 'error',
                message: 'Connection Error.. Could not fetch task data'
            }));
            setTimeout(() => {
                dispatch(uiActions.clearNotification());
            }, 3000);
        }
    }
}
export const updateTasks = (taskData) => {
    return async (dispatch) => {
        const sendRequest = async () => {
            const response = await fetch(`https://react-todo-f3205-default-rtdb.firebaseio.com/tasks/${taskData.id}.json`, {
                method: 'PUT',
                body: JSON.stringify({
                    title: taskData.title,
                    description: taskData.description,
                    creationTime: taskData.creationTime,
                    completionTime: taskData.completionTime
                })
            });
            if (!response.ok) {
                throw Error('Sending cart data failed');
            }
            return response.json();
        }
        try {
            await sendRequest();
            dispatch(toDoActions.updateTask(taskData));
        } catch (error) {
            dispatch(uiActions.showNotification({
                status: 'error',
                message: 'Connection Error.. Could not fetch task data'
            }))
            setTimeout(() => {
                dispatch(uiActions.clearNotification());
            }, 3000);
        }
    }
}
export const deleteTask = (id) => {
    return async (dispatch) => {
        const sendRequest = async () => {
            const response = await fetch(`https://react-todo-f3205-default-rtdb.firebaseio.com/tasks/${id}.json`, {
                method: 'DELETE'
            });
            if (!response.ok) {
                throw Error('Sending cart data failed');
            }
            return await response.json();
        }
        try {
            const data = await sendRequest();
            dispatch(toDoActions.deleteTask(id));
        } catch (error) {
            dispatch(uiActions.showNotification({
                status: 'error',
                message: 'Connection Error.. Could not fetch task data'
            }))
            setTimeout(() => {
                dispatch(uiActions.clearNotification());
            }, 3000);
        }
    }
}