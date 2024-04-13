import React from 'react';
import styles from './index.module.css';
import {IButtonProps} from "./types.ts";

export const ButtonType = ['main', 'change'];

const Button = (props: IButtonProps) => {
    return (
        <button
            style={props.style}
            className={props.buttonType === "primary" ? styles.main : styles.change}
            onClick={props.onClick}
        >
            {props.title}
            {props.children}
        </button>
    );
}

export default Button;