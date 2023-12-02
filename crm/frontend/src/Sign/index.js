import styles from './index.module.css';
import { Link } from "react-router-dom";

const Sign = () => {
    return (
        <div>
            <h1>Sign In</h1>
            <div id="wrapper" className={styles.wrapper}>
                <form id="signin" className={styles.signin} action="" autoComplete="off" method="post">
                    {/*{% csrf_token %}*/}
                    <input type="text" id="username" className={styles.username} name="username" placeholder="username" required></input>
                    <input type="password" id="password" className={styles.password} name="password" placeholder="password" required></input>
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