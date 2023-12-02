import React from 'react';
import styles from './index.module.css';

export const ButtonType = ['main', 'change'];

const Button = (props) => {
    const { type, style, className, children, onClick, title } = props;

    return (
        <button
            type={type}
            style={style}
            className={type === "main" ? styles.main : styles.change}
            onClick={onClick}
        >
            {title}
            {children}
        </button>
    );
}

export default Button;