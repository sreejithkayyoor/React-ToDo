import { Fragment } from 'react';
import styles from './Modal.module.css';

function Modal(props) {

    return (
        <Fragment>
            <div className={styles.modal}>
                {props.children}
            </div>
            <div className={styles.backdrop}></div>
        </Fragment>
    );
}
export default Modal