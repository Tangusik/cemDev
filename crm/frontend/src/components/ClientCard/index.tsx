import styles from './index.module.css';
import { useNavigate } from 'react-router-dom';
import iconCross from "../../Icons/cross.svg";
import React, {useEffect} from "react";
import {fetchDelete} from "../../api/delete/index.ts";
import {IClientCard} from "./types.ts";

const ClientCard = (props: IClientCard) =>{
    const client = props.client;

    let navigate = useNavigate();

    const handleOnClick = () => {
        navigate(`/client/${client.id}`);
    };

    const handleDelete = async () => {
        await fetchDelete(`client/${client.id}`).then((res) => {
            if (res) {
                window.location.reload()
            }
        });
    }

    return (
            <details>
                <summary>
                    <div className={styles.summary}>
                        <div className={styles.name}>{client.firstName} {client.lastName}</div>
                        <div style={{cursor: 'pointer'}}
                             onClick={(event)=> {
                                 event.stopPropagation();
                                 handleDelete();
                             }}>
                            <img src={iconCross} alt=''/>
                        </div>
                    </div>
                </summary>
                <div className={styles.cards_elements}>
                    <div className={styles.card}>
                        <div className={styles.front}>
                            <div>{client.birthDate}</div>
                            <div className={styles.center} style={{fontWeight: 'bold', fontSize: '20px'}}>{client.firstName} {client.lastName}</div>
                            <div>баланс: {client.balance}</div>
                            <div>{client.state.title}</div>
                        </div>
                        <div className={styles.back}>
                            <div onClick={handleOnClick} className={styles.center}>ссылка на страничку</div>
                        </div>
                    </div>
                </div>
            </details>
    )
}
export default ClientCard;