import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from 'react';
import { fetchTasks, updateTasks, deleteTask } from "../../../store/task-actions";

import ToDoItem from '../Task/Task';
import styles from './TaskList.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'
import { faCaretRight } from '@fortawesome/free-solid-svg-icons'
import Loading from "../../UI/Loading";
import Card from "../../UI/Card";

function TaskList() {
    const [panelState, setPanelState] = useState({ faCaretProgress: faCaretDown, faCaretComplete: faCaretDown });
    const dispatch = useDispatch();
    let inProgressTasks = [];
    let completedTasks = [];

    const markAsCompleteHandler = (id) => {
        const taskData = toDos.filter(item => item.id === id);
        dispatch(updateTasks({
            ...taskData[0],
            completionTime: new Date().toISOString()
        }))
    }

    const deleteHandler = (id) => {
        dispatch(deleteTask(id))
    }
    const toDos = useSelector(state => state.todo.tasks);
    const isLoading = useSelector(state => state.ui.isLoading);
    useEffect(() => {
        dispatch(fetchTasks())
    }, [dispatch])
    const togglePanel = (event) => {
        const elId = event.target.id === 'btn-inprogress' ? 'inprogress-content' : 'completed-content';
        const element = document.querySelector(`#${elId}`);
        element.classList.toggle(`${styles.hidden}`);
        if (elId === 'inprogress-content')
            setPanelState(state => {
                const faCaretProgress = state.faCaretProgress === faCaretRight ? faCaretDown : faCaretRight;
                return {
                    ...state,
                    faCaretProgress
                }
            });

        if (elId === 'completed-content')
            setPanelState(state => {
                const faCaretComplete = state.faCaretComplete === faCaretRight ? faCaretDown : faCaretRight;
                return {
                    ...state,
                    faCaretComplete
                }
            });
    }

    if (toDos && toDos.length > 0) {
        inProgressTasks = toDos.filter(item => item.completionTime === '').sort((a, b) => {
            return new Date(b.creationTime) - new Date(a.creationTime)
        });
        completedTasks = toDos.filter(item => item.completionTime !== '').sort((a, b) => {
            return new Date(b.completionTime) - new Date(a.completionTime)
        });
    }
    const displaNoContentMessage = (message) => {
        return (
            <Card styles={styles.card}>
                <h2 className={styles['no-tasks']}>
                    {message}
                </h2>
            </Card>
        )
    }

    function createHtmlElements(section) {
        if (section === 'inprogress')
            return (
                <div className={styles['container-item']} id='inprogress-content'>
                    {
                        inProgressTasks.length > 0 ? inProgressTasks.map(item =>
                            <ToDoItem
                                key={item.id}
                                id={item.id}
                                title={item.title}
                                description={item.description}
                                creationTime={item.creationTime}
                                markAsCompleteHandler={markAsCompleteHandler}
                                deleteHandler={deleteHandler}
                                completionTime={item.completionTime}
                            />) : displaNoContentMessage('Kudos.. you completed all your Tasks')
                    }
                </div>
            );
        else
            return (<div className={styles['container-item']} id='completed-content'>
                {
                    completedTasks.length > 0 ? completedTasks.map(item =>
                        <ToDoItem
                            key={item.id}
                            id={item.id}
                            title={item.title}
                            description={item.description}
                            creationTime={item.creationTime}
                            completionTime={item.completionTime}
                            isComplete={true}
                            deleteHandler={deleteHandler}
                        />) : displaNoContentMessage("No tasks completed")
                }
            </div>);

    }

    return (
        <div >
            <button className={styles.collapsible} id='btn-inprogress' onClick={togglePanel}>
                <FontAwesomeIcon icon={panelState.faCaretProgress} style={{ marginRight: '15px' }} /> In-Progress
                <span className={styles.count}>({inProgressTasks.length})</span>
            </button>
            {toDos && toDos.length > 0 ? createHtmlElements('inprogress') :
                <div className={styles['container-item']} id='inprogress-content'>
                    {!isLoading && displaNoContentMessage('Kudos.. you completed all your Tasks')}
                </div>
            }
            {isLoading && <Loading />}
            <button className={styles.collapsible} onClick={togglePanel} id='btn-completed'>
                <FontAwesomeIcon icon={panelState.faCaretComplete} style={{ marginRight: '15px' }} /> Completed
                <span className={styles.count}>
                    ({completedTasks.length})
                </span>
            </button>
            {toDos && toDos.length > 0 ? createHtmlElements('completed') :
                <div className={styles['container-item']} id='inprogress-content'>
                    {!isLoading && displaNoContentMessage("No tasks completed")}
                </div>
            }
            {isLoading && <Loading />}
        </div>
    );
}
export default TaskList