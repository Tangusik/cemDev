import { Link } from "react-router-dom";
import styles from './index.module.css';
// import { useEffect } from "react";

const Header = () => {
    // useEffect(()=>{
    //     let words = document.getElementsByClassName(styles.word);
    //     let wordArray = [];
    //     let currentWord = 0;
    //
    //     if (words.length === 0) {
    //         console.error("No elements found with the class name 'word'");
    //         return;
    //     }
    //
    //     words[currentWord].style.opacity = 1;
    //
    //     for (let i = 0; i < words.length; i++) {
    //         splitLetters(words[i]);
    //     }
    //
    //     function changeWord() {
    //         let cw = wordArray[currentWord];
    //         let nw = currentWord === words.length-1 ? wordArray[0] : wordArray[currentWord+1];
    //         for (let i = 0; i < cw.length; i++) {
    //             animateLetterOut(cw, i);
    //         }
    //
    //         for (let i = 0; i < nw.length; i++) {
    //             nw[i].className = 'letter behind';
    //             nw[0].parentElement.style.opacity = 1;
    //             animateLetterIn(nw, i);
    //         }
    //
    //         currentWord = (currentWord === wordArray.length-1) ? 0 : currentWord+1;
    //     }
    //
    //     function animateLetterOut(cw, i) {
    //         setTimeout(function() {
    //             cw[i].className = 'letter out';
    //         }, i*80);
    //     }
    //
    //     function animateLetterIn(nw, i) {
    //         setTimeout(function() {
    //             nw[i].className = 'letter in';
    //         }, 340+(i*80));
    //     }
    //
    //     function splitLetters(word) {
    //         let content = word.innerHTML;
    //         word.innerHTML = '';
    //         let letters = [];
    //         for (let i = 0; i < content.length; i++) {
    //             let letter = document.createElement('span');
    //             letter.className = 'styles.word';
    //             letter.innerHTML = content.charAt(i);
    //             word.appendChild(letter);
    //             letters.push(letter);
    //         }
    //
    //         wordArray.push(letters);
    //     }
    //
    //     changeWord();
    //     setInterval(changeWord, 4000);
    // }, [])

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
                <Link to={"../trainers"}>Коллеги</Link>
                <Link to={"../clients"}>Клиенты</Link>
                <Link to={"../schedule"}>Расписание</Link>
                <Link to={"../main"}>Главная</Link>
            </div>
            <form id="form_logout" className={styles.form_logout}>
                <input id="exit" className={styles.exit} type="submit" value="Выйти"></input>
            </form>
        </div>
    );
}

export default Header;