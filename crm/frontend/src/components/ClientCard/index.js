import styles from './index.module.css';
import { useNavigate } from 'react-router-dom';
import iconCross from "../../Icons/cross.svg";
import React, {useEffect} from "react";
import {fetchDelete} from "../../api/delete";

const ClientCard = (props) =>{
    const { id, firstName, lastName, birthday, state, balance } = props;

    let navigate = useNavigate();

    const handleOnClick = () => {
        navigate(`/client/${id}`);
    };

    const handleDelete = async () => {
        await fetchDelete('client', id).then((res) => {
            if (res) {
                window.location.reload()
            }
        });
    }

    return (
            <details>
                <summary>
                    <div className={styles.summary}>
                        <div>{firstName} {lastName}</div>
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
                            <p>{birthday}</p>
                            <h1>
                                {firstName} {lastName}
                            </h1>
                            <p>{balance}</p>
                            <p>{state}</p>
                        </div>
                        <div className={styles.back}>
                            <p>{birthday}</p>
                            <h1>
                                {firstName} {lastName}
                            </h1>
                            <p onClick={handleOnClick}>Студент.Ссылка</p>
                        </div>
                    </div>
                </div>
            </details>
    )
}
export default ClientCard;