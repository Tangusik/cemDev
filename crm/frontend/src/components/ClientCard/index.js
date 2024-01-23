import styles from './index.module.css';

const ClientCard = (props) =>{
    const { id, firstName, lastName, birthday, state, balance } = props;
    return (
            <details>
                <summary>
                    {firstName} {lastName}
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
                            <p><a href='client/{id}'>Студент.Ссылка</a></p>
                        </div>
                    </div>
                </div>
            </details>
    )
}
export default ClientCard;