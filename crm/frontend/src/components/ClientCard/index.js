import styles from './index.module.css';
import { useNavigate } from 'react-router-dom';
import iconCross from "../../Icons/cross.svg";
import React, {useEffect, useState} from "react";
import {fetchDelete} from "../../api/delete";

const ClientCard = (props) =>{
    const { id, firstName, lastName, birthday, state, balance } = props;
    const [showCard, setShowCard] = useState(false);

    let navigate = useNavigate();

    const handleOnClick = () => {
        navigate(`/client/${id}`);
    };

    const handleDelete = async () => {
        await fetchDelete(`client/${id}`).then((res) => {
            if (res) {
                window.location.reload()
            }
        });
    }

    const handleShowCard = () => {
        setShowCard(!showCard);
    }

    return (
        <>
            <div className={styles.summary}>
                <div className={styles.name} onClick={handleShowCard}>{firstName} {lastName}</div>
                <div style={{cursor: 'pointer'}}
                     onClick={(event)=> {
                         event.stopPropagation();
                         handleDelete();
                     }}>
                    <img src={iconCross} alt=''/>
                </div>
            </div>
            {showCard &&
                <div className={styles.cards_elements}>
                    <div className={styles.card}>
                        <div className={styles.front}>
                            <div>{birthday}</div>
                            <div className={styles.center} style={{fontWeight: 'bold', fontSize: '20px'}}>{firstName} {lastName}</div>
                            <div>баланс: {balance}</div>
                            <div>{state}</div>
                        </div>
                        <div className={styles.back}>
                            <div onClick={handleOnClick} className={styles.center}>ссылка на страничку</div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}
export default ClientCard;