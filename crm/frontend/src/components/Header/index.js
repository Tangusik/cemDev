import { Link } from "react-router-dom";
import styles from './index.module.css';

const Header = () => {

    return (
        <div className={styles.nav}>
            <div className={styles.text}>
                <p>ARENA</p>
                <p>
                    <span className={styles.word}>sport.</span>
                    <span className={styles.word}>health.</span>
                    <span className={styles.word}>friends.</span>
                    <span className={styles.word}>work.</span>
                </p>
            </div>
            <div className={styles.container_header}>
                <Link to={"../colleagues"}>Коллеги</Link>
                <Link to={"../clients"}>Клиенты</Link>
                <Link to={"../schedule"}>Расписание</Link>
                <Link to={"../main"}>Главная</Link>
            </div>
            <form className={styles.form_logout}>
                <input className={styles.exit} type="submit" value="Выйти"></input>
            </form>
        </div>
    );
}

export default Header;