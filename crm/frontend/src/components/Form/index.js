import React from "react";
import styles from './index.module.css';


const Form = (props) => {
    const { onSubmit, title, children } = props;
    return (
    <div className={styles.form}>
        <form className={styles.decor} action="" method="post" onSubmit={onSubmit}>
            <div className={styles.formLeftDecoration}/>
            <div className={styles.formRightDecoration}/>
            <div className={styles.circle}/>
            <div className={styles.formInner}>
                <h3 style={{marginBottom: '25px'}}>{title}</h3>
                {children}
            </div>
        </form>
    </div>
    )}
export default Form;