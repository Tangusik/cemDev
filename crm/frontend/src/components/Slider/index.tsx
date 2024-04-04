import styles from './index.module.css';

const Slider = (props) => {
    const { title, text } = props;
    return (
        <div className={styles.slider}>
            <div className={styles.sliderField}>
                <h2 className={styles.name}>{title}</h2>
                <div className={styles.sliderText}>
                    <h4>{text}</h4>
                </div>
            </div>
            <button className={styles.prevSlider}>Prev</button>
            <button className={styles.nextSlider}>Next</button>
        </div>
    );
}
export default Slider;