import {ReactNode} from "react";

export interface IFormProps {
    onSubmit: () => void;
    title: string;
    formChildren: ReactNode;
}