import styles from './index.module.css';

const Search = () => {
    return (
        <div className={styles.search_div}>
            <h3>Поиск</h3>
            <div className={styles.sub}>
                <input type="text" placeholder="Что желаете найти?"></input>
                    <button>Найти</button>
            </div>
        </div>
    );
}
export default Search;