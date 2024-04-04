import React from "react";
import styles from './index.module.css';
import {IFormProps} from "./types.ts";


const Form = (props: IFormProps) => {
    return (
    <div className={styles.form}>
        <div className={styles.decor}>
            <div className={styles.formLeftDecoration}/>
            <div className={styles.formRightDecoration}/>
            <div className={styles.circle}/>
            <div className={styles.formInner}>
                <h3 style={{marginBottom: '25px'}}>{props.title}</h3>
                {props.children}
            </div>
        </div>
    </div>
    )}
export default Form;