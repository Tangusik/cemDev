import React from 'react';
import styles from './index.module.css';
import {IEditModalProps} from "./types.ts";


const EditModal = (props: IEditModalProps) => {
    return (
        <div className={styles.modal}>
            <div className={styles.modalContent}>
                <div className={styles.close} onClick={props.onClose}>&times;</div>
                {props.children}
            </div>
        </div>
    );
}

export default EditModal;