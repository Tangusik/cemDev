import styles from './index.module.css';
import React from 'react';
const Photo = () => {
    return (
        <div className={styles.photoContainer}>
            <div className={styles.photo}></div>
        </div>
    );
};

export default Photo;