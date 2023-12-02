import styles from './index.module.css';

const Container = (props) => {
    const { title, children } = props;
    return (
        <div>
            <div className={styles.container}>
                <h3>{title}</h3>
                {children}
            </div>
            <div className={styles.polosa}></div>
        </div>
    );
}
export default Container;