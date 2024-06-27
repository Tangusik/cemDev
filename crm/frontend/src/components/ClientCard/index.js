import styles from './index.module.css';
import { useNavigate } from 'react-router-dom';
import iconCross from "../../Icons/cross.svg";
import React, {useEffect, useState} from "react";
import {fetchDelete} from "../../api/delete";
import {fetchGet} from "../../api/get";

const ClientCard = (props) =>{
    const { id, firstName, lastName, middleName, birthday, state, balance } = props;
    const [clientAbonements, setClientAbonements] = useState(null);
    const [showCake, setShowCake] = useState(false);

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

    useEffect( () => {
        const fetchData = async () => {
            const responseClientAbonements = await fetchGet(`client/${id}/abonements`);
            setClientAbonements(responseClientAbonements);
        }

        fetchData();
    }, [id])

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
                        <div className={styles.name} onClick={handleOnClick}>{lastName} {firstName} {middleName}</div>
                        <div>{showCake && '🎂'}</div>
                        <div style={{cursor: 'pointer'}}
                             onClick={(event) => {
                                 event.stopPropagation();
                                 handleDelete();
                             }}>
                            <img src={iconCross} alt=''/>
                        </div>
                    </div>
                    <div className={styles.balanceButton}>{balance}</div>
                    {state && <div className={styles.stateButton}>{state}</div>}
                    {clientAbonements && clientAbonements.map((abonement) => (
                        <div className={styles.abonementButton}>
                            <div className={styles.ellipsis}>{abonement.abonement.title}</div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}
export default ClientCard;