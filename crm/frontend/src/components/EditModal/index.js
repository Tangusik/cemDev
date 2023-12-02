import React from 'react';
import styles from './index.module.css';


const EditModal = (props) => {
    const { onClose, children } = props;
    return (
        <div className={styles.modal}>
            <div className={styles.modalContent}>
                <div className={styles.close} onClick={onClose}>&times;</div>
                {children}
            </div>
        </div>
    );
}

export default EditModal;