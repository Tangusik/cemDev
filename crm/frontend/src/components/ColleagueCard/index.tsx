import styles from './index.module.css';

const ColleagueCard = (props) =>{
    const { id, name, lastName, surname, birthdate, role, state } = props;
    return (
            <div className={styles.card}>
                <div className={styles.front}>
                    <div>{birthdate}</div>
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