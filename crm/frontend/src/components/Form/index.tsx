import React from "react";
import styles from './index.module.css';
import {IFormProps} from "./types.ts";


const Form = (props: IFormProps) => {
    return (
    <div className={styles.form}>
        <form className={styles.decor} action="" method="post" onSubmit={props.onSubmit}>
            <div className={styles.formLeftDecoration}/>
            <div className={styles.formRightDecoration}/>
            <div className={styles.circle}/>
            <div className={styles.formInner}>
                <h3 style={{marginBottom: '25px'}}>{props.title}</h3>
                {props.formChildren}
            </div>
        </form>
    </div>
    )}
export default Form;