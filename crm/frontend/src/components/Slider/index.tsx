import styles from './index.module.css';
import {ISliderProps} from "./types.ts";
import React from "react";

const Slider = (props: ISliderProps) => {
    return (
        <div className={styles.slider}>
            <div className={styles.sliderField}>
                <h2 className={styles.name}>{props.title}</h2>
                <div className={styles.sliderText}>
                    <h4>{props.text}</h4>
                </div>
            </div>
            <button className={styles.prevSlider}>Prev</button>
            <button className={styles.nextSlider}>Next</button>
        </div>
    );
}
export default Slider;