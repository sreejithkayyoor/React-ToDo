import { Fragment } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarCheck } from '@fortawesome/free-solid-svg-icons'
import { faCalendarMinus } from '@fortawesome/free-solid-svg-icons'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import Card from '../../UI/Card';
import styles from './Task.module.css';
import EditTask from "../EditTask/EditToDoItem";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../../../store/ui-slice";
import Modal from '../../UI/Modal';

function ToDoItem(props) {
    const dispatch = useDispatch();
    const taskData = useSelector(state => state.todo.tasks);
    const task = { ...taskData.filter(item => item.id === props.id)[0] };
    const isShowEditModal = useSelector(state => state.ui.isEditTask);

    const completeHandler = () => {
        props.markAsCompleteHandler(props.id);
    }
    const editTaskHandler = () => {
        dispatch(uiActions.toggleEditModal({
            id: props.id,
            title: props.title,
            description: props.description,
            creationTime: props.creationTime,
            completionTime: ''
        }));
    }

    const deleteHandler = () => {
        props.deleteHandler(props.id)
    }

    const btnElements = props.isComplete ?
        <button className={styles['btn-delete']} title='Delete Task' onClick={deleteHandler}><FontAwesomeIcon icon={faCalendarMinus} /></button>
        :
        <Fragment>
            <button className={styles['btn-complete']} title='Mark as Completed' onClick={completeHandler}><FontAwesomeIcon icon={faCalendarCheck} /></button>
            <button className={styles['btn-edit']} title='Edit Task' onClick={editTaskHandler}><FontAwesomeIcon icon={faEdit} /></button>
            <button className={styles['btn-delete']} title='Delete Task' onClick={deleteHandler}><FontAwesomeIcon icon={faCalendarMinus} /></button>
        </Fragment>
    return (<Fragment>
        <Card styles={styles.card}>
            <div className={styles.task}>
                <h2>{props.title}</h2>
                {props.description && <label>Description: <span>{props.description}</span></label>}
                {btnElements}
            </div>
        </Card>
    </Fragment>
    );
}
export default ToDoItem