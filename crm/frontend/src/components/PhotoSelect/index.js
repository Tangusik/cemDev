import styles from './index.module.css';
import React, { useState } from 'react';
import man1 from "../../Icons/man-1.svg";
import man2 from "../../Icons/man-2.svg";
import man3 from "../../Icons/man-3.svg";
import man4 from "../../Icons/man-4.svg";
import man5 from "../../Icons/man-5.svg";
import man6 from "../../Icons/man-6.svg";
import girl1 from "../../Icons/girl-1.svg";
import girl2 from "../../Icons/girl-2.svg";
const PhotoSelect = () => {
    const [selectedPhoto, setSelectedPhoto] = useState(man6);
    const photos = [
        man1, man2, man3, man5, man6, man4, girl1, girl2
    ];

    const handlePhotoSelect = (photo) => {
        setSelectedPhoto(photo);
    };

    return (
        <div className={styles.photoContainer}>
            <img src={selectedPhoto}></img>
            <div className={styles.photo}></div>
            <div className={styles.gallery}>
                {photos.map((photo, index) => (
                    <img
                        key={index}
                        src={photo}
                        alt={`Option ${index + 1}`}
                        className={styles.galleryPhoto}
                        onClick={() => handlePhotoSelect(photo)}
                        style={{ border: selectedPhoto === photo ? '2px solid blue' : 'none' }}
                    />
                ))}
            </div>
        </div>
    );
};

export default PhotoSelect;