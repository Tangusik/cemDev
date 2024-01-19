import {Link, useNavigate} from "react-router-dom";
import styles from './index.module.css';

const Header = () => {
    const navigate = useNavigate();
    const handleLogout = async (event) => {
        event.preventDefault();

        const port = 8000;
        const url = `http://localhost:${port}/crm/logout`;

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                console.log('Successfully logged out');
                navigate('/');
            } else {
                console.error('Error during logout:', response.statusText);
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    };
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
            <form className={styles.form_logout} onSubmit={handleLogout} method="post">
                <input className={styles.exit} type="submit" value="Выйти"></input>
            </form>
        </div>
    );
}

export default Header;