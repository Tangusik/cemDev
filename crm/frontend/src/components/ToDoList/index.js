import styles from './index.module.css';
import React from "react";

const ToDoList = () => {
    return (
        <div className={styles.todo}>
            <h3>Трекер задач</h3>
            <div className={styles.inputField}>
                <input type="text" className={styles.myInput} placeholder="Add your new todo"></input>
                    <button className={styles.addBtn}>Добавить</button>
            </div>
            <ul className={styles.myUL}></ul>
            <div className={styles.footer}>
                <span>You have <span className="pendingTasks"></span>pending tasks</span>
                <button>Clear All</button>
            </div>
        </div>
   );
}
export default ToDoList
