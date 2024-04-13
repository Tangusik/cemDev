import React from 'react';
import styles from './index.module.css';
import {IColleagueCard} from "./types.ts";

const ColleagueCard = (props: IColleagueCard) => {
    const trainer = props.trainer;
    return (
            <div className={styles.card}>
                <div className={styles.front}>
                    <div>{trainer.birthDate}</div>
                    <div className={styles.center} style={{fontWeight: 'bold', fontSize: '20px'}}>
                        {trainer.user.last_name} {trainer.user.first_name} {trainer.middleName}
                    </div>
                    <div>{trainer.role.title}</div>
                    <div>{trainer.state.title}</div>
                </div>
                <div className={styles.back}>
                    <div className={styles.center} >ссылка на страничку</div>
                </div>
            </div>
    )
}
export default ColleagueCard;