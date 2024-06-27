import styles from './index.module.css';
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {fetchDelete} from "../../api/delete";
import {fetchGet} from "../../api/get";
import iconCross from "../../Icons/cross.svg";

const ColleagueCard = (props) =>{
    const { firstName, lastName, middleName, birthday, role, state } = props;
    const [showCake, setShowCake] = useState(false);

    const isBirthdaySoon = (birthdate) => {
        const today = new Date();
        const birthday = new Date(birthdate);
        birthday.setFullYear(today.getFullYear());
        const diffTime = Math.abs(birthday - today);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (birthday < today) {
            birthday.setFullYear(today.getFullYear() + 1);
            const diffTimeNextYear = Math.abs(birthday - today);
            const diffDaysNextYear = Math.ceil(diffTimeNextYear / (1000 * 60 * 60 * 24));
            return diffDaysNextYear <= 7;
        }

        return diffDays <= 7;
    };

    useEffect(() => {
        setShowCake(isBirthdaySoon(birthday));
    }, [birthday]);

    return (
        <>
            <div className={styles.summary}>
                <div className={styles.rowClient}>
                    <div className={styles.rowName}>
                        <div className={styles.name}>{lastName} {firstName} {middleName}</div>
                        <div>{showCake && '🎂'}</div>
                    </div>
                    <div className={styles.balanceButton}>{role}</div>
                    {state && <div className={styles.stateButton}>{state}</div>}
                </div>
            </div>
        </>
    )
}
export default ColleagueCard;