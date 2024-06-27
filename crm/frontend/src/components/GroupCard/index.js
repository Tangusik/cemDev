import styles from './index.module.css';
import iconCross from "../../Icons/cross.svg";
import React, {useEffect, useState} from "react";
import {fetchDelete} from "../../api/delete";

const ClientCard = (props) =>{
    const { id, title, sportType, trainerFirstName, trainerLastName } = props;

    const handleDelete = async () => {
        await fetchDelete(`client/${id}`).then((res) => {
            if (res) {
                window.location.reload()
            }
        });
    }


    return (
        <>
            <div className={styles.summary}>
                <div className={styles.rowClient}>
                    <div className={styles.rowName}>
                        <div className={styles.name}>{title}</div>
                        <div style={{cursor: 'pointer'}}
                             onClick={(event) => {
                                 event.stopPropagation();
                                 handleDelete();
                             }}>
                            <img src={iconCross} alt=''/>
                        </div>
                    </div>
                    <div className={styles.balanceButton}>{sportType}</div>
                    <div className={styles.stateButton}>{trainerFirstName} {trainerLastName}</div>
                </div>
            </div>
        </>
    )
}
export default ClientCard;