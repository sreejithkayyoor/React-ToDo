import { useSelector } from "react-redux";

import styles from './ToDos.module.css';
import TaskList from "./TaskList/TaskList";
import Modal from "../UI/Modal";
import AddTask from './AddTask/AddTask';
import EditTask from "./EditTask/EditToDoItem";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ToDos(props) {
    const showAddTaskWindow = useSelector(state => state.ui.isAddTask);
    const isShowEditModal = useSelector(state => state.ui.isEditTask);
    const notification = useSelector(state => state.ui.notification);
    if (notification && notification.message) {
        if (notification.status === 'error')
            toast.error(notification.message);
        if (notification.status === 'warning')
            toast.warning(notification.message)
    }


    return (
        <div className={styles.container}>
            <ToastContainer />
            {/* <AddTask /> */}
            <TaskList />
            {showAddTaskWindow && <Modal>
                <AddTask />
            </Modal>}

            {isShowEditModal && <Modal><EditTask
                id={props.id}
                title={props.title}
                description={props.description}
                creationTime={props.creationTime}
                completionTime={props.completionTime}
            /></Modal>}
        </div>
    );
}
export default ToDos