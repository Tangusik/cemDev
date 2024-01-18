import styles from './index.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Sign = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const handleSubmit = async (event) => {
        event.preventDefault();

        const port = 8000;
        const url = `http://localhost:${port}/crm/login`;
        const data = {
            username: username,
            password: password
        };

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                const responseData = await response.json();
                console.log(responseData);
                navigate('/main');
            } else {
                console.error('Ошибка при отправке запроса:', response.statusText);
                alert('Ошибка при входе, убедитесь в корректности данных')
            }
        } catch (error) {
            console.error('Произошла ошибка:', error);
        }
    };
    return (
        <div>
            <h1>Sign In</h1>
            <div id="wrapper" className={styles.wrapper}>
                <form className={styles.signin} onSubmit={handleSubmit} method="post">
                    <input type="text" id="username" className={styles.username} name="username" placeholder="username" onChange={(e) => setUsername(e.target.value)} required></input>
                    <input type="password" id="password" className={styles.password} name="password" placeholder="password" onChange={(e) => setPassword(e.target.value)} required></input>
                    <button id="btn" className={styles.btn} type="submit">
                        <div id="btn_img" className={styles.btn_img}></div>
                    </button>
                    <Link to={"main"}>Забыли пароль? </Link>
                </form>
            </div>
        </div>
    );
}
export default Sign;