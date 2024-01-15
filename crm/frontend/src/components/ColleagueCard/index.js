import styles from './index.module.css';

const ClientCard = (props) =>{
    const { id, name, birthdate, role, state } = props;
    return (
                <div className={styles.cards_elements}>
                    <div className={styles.card}>
                        <div className={styles.front}>
                            <p>{name}</p>
                            <p>{birthdate}</p>
                            <p>{role}</p>
                            <p>{state}</p>
                        </div>
                        <div className={styles.back}>
                            <p>{name}</p>
                            <p>{birthdate}</p>
                            <p>{role}</p>
                            <p>{state}</p>
                        </div>
                    </div>
                </div>
    )
}
export default ClientCard;