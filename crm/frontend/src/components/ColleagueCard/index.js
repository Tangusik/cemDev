import styles from './index.module.css';

const ColleagueCard = (props) =>{
    const { id, name, lastName, surname, birthdate, role, state } = props;
    return (
                    <div className={styles.card}>
                        <div className={styles.front}>
                            <p>{birthdate}</p>
                            <div style={{lineHeight: '10px'}}>
                                <p>{lastName}</p>
                                <p>{name}</p>
                                <p>{surname}</p>
                            </div>
                            <p>{role}</p>
                            <p>{state}</p>
                        </div>
                        <div className={styles.back}>
                            <p>{birthdate}</p>
                            <div style={{lineHeight: '10px'}}>
                                <p>{lastName}</p>
                                <p>{name}</p>
                                <p>{surname}</p>
                            </div>
                            <p>{role}</p>
                            <p>{state}</p>
                            <p>ссылка</p>
                        </div>
                    </div>
    )
}
export default ColleagueCard;