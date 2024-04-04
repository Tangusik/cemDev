import {CSSProperties, ReactNode} from "react";

export enum buttonType {
    PRIMARY = 'primary',
    CHANGE = 'change',
}
export interface IButtonProps {
    buttonType: buttonType;
    style?: CSSProperties;
    className?: string;
    children?: ReactNode;
    onClick: () => void;
    title?: string;
}