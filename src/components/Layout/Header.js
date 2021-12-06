import { useSelector, useDispatch } from "react-redux";
import { uiActions } from "../../store/ui-slice";

import styles from './Header.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarPlus } from '@fortawesome/free-solid-svg-icons'

function Header(props) {
    const dispatch = useDispatch();

    const toggleModal = () => {
        dispatch(uiActions.toggleModal());
    }
    return (
        <header className={styles.header}>
            <h1>React ToDo</h1>
            <nav>
                <ul>
                    <li>
                        <button className={styles.btn} onClick={toggleModal}>Add Task <FontAwesomeIcon icon={faCalendarPlus} /></button>
                    </li>
                </ul>
            </nav>
        </header>
    );
}
export default Header