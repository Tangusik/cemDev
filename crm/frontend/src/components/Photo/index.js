import styles from './index.module.css';
import React, {useState} from "react";
import Button from "../Button";

const Photo = () => {
    const fileInputRef = React.useRef(null);
    const [selectedFiles, setSelectedFiles] = useState(null);

    const handleFileSelect = (event) => {
        const fileList = event.target.files;

        if (fileList) {
            const file = Array.from(fileList);

            setSelectedFiles(file);
        }
    };

    const handleAttachButton = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    return (
        <div className={styles.photoContainer}>
            <div className={styles.photo}></div>
            <Button title={"Изменить фото"} onClick={handleAttachButton}></Button>
            <input type="file" ref={fileInputRef} style={{ display: 'none' }} onChange={handleFileSelect} multiple />
        </div>
    );
};

export default Photo;