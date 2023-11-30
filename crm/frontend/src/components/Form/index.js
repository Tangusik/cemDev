import React from "react";
import styles from './index.module.css';


const Form = (props) => {
    return (
    <div className={styles.form}>
        <form className={styles.decor} action="" method="post">
            {/*{% csrf_token %}*/}
            <div className={styles.formLeftDecoration}></div>
            <div className={styles.formRightDecoration}></div>
            <div className={styles.circle}></div>
            <div className={styles.formInner}>
                <h3>Редактирование пользователя</h3>
                <input type="text" id="name" name="name"  placeholder="Имя"></input>
                <input type="text" id="last_name" name="last_name"  placeholder="Фамилия"></input>
                <input type="text" id="otchestcv" name="otchestcv" placeholder="Отчество"></input>
                <input type="text" id="email" name="email" placeholder="Почта"></input>
                <input type="submit" value="Добавить"></input>
            </div>
        </form>
    </div>
    )}
export default Form;