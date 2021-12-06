import { useRef, Fragment, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../../../store/ui-slice";
import { updateTasks } from "../../../store/task-actions";

import styles from './EditToDoItem.module.css';
import Modal from "../../UI/Modal";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

function EditToDoItem(props) {
    const dispatch = useDispatch();
    const titleRef = useRef();
    const descriptionRef = useRef();
    const selectedTask = useSelector(state => state.ui.selectedTask);
    useEffect(() => {
        titleRef.current.value = selectedTask.title;
        descriptionRef.current.value = selectedTask.description;
    }, [selectedTask])


    const updateHandler = () => {
        const title = titleRef.current.value;
        const description = descriptionRef.current.value;
        if (!title.trim()) {
            dispatch(uiActions.showNotification({
                status: 'warning',
                message: 'Title is required!!!!'
            }))
            setTimeout(() => {
                dispatch(uiActions.clearNotification())
            }, 3000)
        }
        dispatch(updateTasks({
            ...selectedTask,
            title,
            description
        }));
        dispatch(uiActions.toggleEditModal(''));
    }

    const dismissModal = () => {
        dispatch(uiActions.toggleEditModal());
    }

    return (
        <Fragment>
            <h2>Edit Task</h2>
            <div className={styles["flex-container"]}>
                <input required={true} className={styles["fill-width"]} type="text" placeholder="Please enter title" ref={titleRef} />
                <input className={styles["fill-width"]} type="text" placeholder="Please enter description" ref={descriptionRef} />
            </div>
            <button className={styles['btn-update']} onClick={updateHandler}>Update <FontAwesomeIcon icon={faEdit} /></button>
            <button className={styles['btn-cancel']} onClick={dismissModal}>Cancel <FontAwesomeIcon icon={faTimes} /></button>
        </Fragment>
    );
}
export default EditToDoItem