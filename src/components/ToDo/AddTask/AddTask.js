import { Fragment, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import styles from './AddTask.module.css';
import { uiActions } from "../../../store/ui-slice";
import { addTaskData } from "../../../store/task-actions";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AddTask(props) {

    const titleRef = useRef();
    const descriptionRef = useRef();
    const dispatch = useDispatch();
    const tasks = useSelector(state => state.todo.tasks);

    const addHandler = () => {
        const title = titleRef.current.value;
        const description = descriptionRef.current.value;
        if (!title) {
            dispatch(uiActions.showNotification({
                status: 'error',
                message: 'Title is required'
            }));
            setTimeout(() => {
                dispatch(uiActions.clearNotification());
            }, 3000);
        }
        const isPresent = tasks.some(item => {
            if (item['title'] === title && item['isComplete'])
                return true
            return false;
        });
        if (isPresent) {
            dispatch(uiActions.showNotification({
                status: 'warning',
                message: 'Task is already in-progress!! Please add a new one.'
            }));
            setTimeout(() => {
                dispatch(uiActions.clearNotification());
            }, 3000);
            return;
        }
        const taskData = {
            title,
            description,
            creationTime: new Date().toISOString(),
            completionTime: null
        };
        dispatch(addTaskData({
            title,
            description,
            creationTime: new Date().toISOString(),
            completionTime: ""
        }));
        dispatch(uiActions.toggleModal())
    }
    const toggleModal = () => {
        dispatch(uiActions.toggleModal())
    }

    return (
        <Fragment>
            <h2>Add Task</h2>
            <div className={styles["flex-container"]}>
                <input required={true} className={styles["fill-width"]} type="text" placeholder="Please enter title" ref={titleRef} />
                <input className={styles["fill-width"]} type="text" placeholder="Please enter description" ref={descriptionRef} />
            </div>
            <button className={styles['btn-add']} onClick={addHandler}>Add <FontAwesomeIcon icon={faPlus} /></button>
            <button className={styles['btn-cancel']} onClick={toggleModal}>Cancel <FontAwesomeIcon icon={faTimes} /></button>
        </Fragment>
    );
}
export default AddTask