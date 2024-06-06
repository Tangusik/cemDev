import styles from './index.module.css';
import {useEffect, useState} from "react";

const ColleagueCard = (props) =>{
    const { id, name, lastName, surname, birthdate, role, state } = props;
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
        setShowCake(isBirthdaySoon(birthdate));
    }, [birthdate]);

    return (
            <div className={styles.card}>
                <div className={styles.front}>
                    <div>{birthdate} {showCake && '🎂'}</div>
                    <div className={styles.center} style={{fontWeight: 'bold', fontSize: '20px'}}>
                        {lastName} {name} {surname}
                    </div>
                    <div>{role}</div>
                    <div>{state}</div>
                </div>
                <div className={styles.back}>
                    <div className={styles.center} >ссылка на страничку</div>
                </div>
            </div>
    )
}
export default ColleagueCard;