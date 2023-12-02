import React from 'react';
import Header from "../components/Header";
import Footer from "../components/Footer";
import styles from './index.module.css';

const Schedule = () => {
    let cal = {
// ХАРАКТЕРИСТИКИ
// ОБЩИЙ КАЛЕНДАРЬ
        sMon: true, // Неделя начинается в понедельник
        mName: ["Янв", "Фев", "Март", "Апр", "Май", "Июнь", "Июль", "Авг", "Сен", "Окт", "Ноя", "Дек"], // Названия месяцев
// КАЛЕНДАРНЫЕ ДАННЫЕ
        data: null, // События за выбранный период
        sDay: 0,
        sMth: 0,
        sYear: 0, // Текущий выбранный день, месяц, год
// ОБЩИЕ HTML-ЭЛЕМЕНТЫ
        hMth: null,
        hYear: null, // выбор месяца/года
// КАЛЕНДАРЬ НАЧАЛА

        init: () => {
// ПОЛУЧИТЬ + УСТАНОВИТЬ ОБЩИЕ ЭЛЕМЕНТЫ HTML
            cal.hMth = document.querySelector("#cal-mth");
            cal.hYear = document.querySelector("#cal-yr");
// ДАТА СЕЙЧАС
            let now = new Date(),
                nowMth = now.getMonth(),
                nowYear = parseInt(now.getFullYear());
// ДОБАВИТЬ ВЫБОР МЕСЯЦЕВ
            for (let i = 0; i <= 11; i++) {
                let opt = document.createElement("option");
                opt.value = i;
                opt.innerHTML = cal.mName[i];
                if (i === nowMth) {
                    opt.selected = true;
                }

                cal.hMth.appendChild(opt);
            }
            // cal.hMth.onchange = cal.list;
            cal.hMth.onchange = function(event) {
                event.preventDefault();
                cal.list();
            };
// ДОБАВИТЬ ВЫБОР ГОДОВ
// Установим в диапазоне 4 лет. Измените это, как вам нравится.
            for (let i = nowYear - 4; i <= nowYear + 4; i++) {
                let opt = document.createElement("option");
                opt.value = i;
                opt.innerHTML = i;
                if (i === nowYear) {
                    opt.selected = true;
                }
                cal.hYear.appendChild(opt);
            }
            cal.hYear.onchange = cal.list;
// СТАРТ - ВЫВОДА КАЛЕНДАРЯ
            cal.list();
        },




// СОЗДАТЬ КАЛЕНДАРЬ НА ВЫБРАННЫЙ МЕСЯЦ
        list: () => {
// ОСНОВНЫЕ РАСЧЕТЫ - ДНИ В МЕСЯЦЕ, ДЕНЬ НАЧАЛА + КОНЕЦ
// Примечание. Январь равен 0, а декабрь — 11.
// Примечание. Воскресенье равно 0, а суббота - 6.
            cal.sMth = parseInt(cal.hMth.value); // выбранный месяц
            cal.sYear = parseInt(cal.hYear.value); // выбранный год

            let daysInMth = new Date(cal.sYear, cal.sMth + 1, 0).getDate(), // количество дней в выбранном месяце
                startDay = new Date(cal.sYear, cal.sMth, 1).getDay(), // первый день месяца
                endDay = new Date(cal.sYear, cal.sMth, daysInMth).getDay(), // последний день месяца
                now = new Date(), // текущая дата
                nowMth = now.getMonth(), // текущий месяц
                nowYear = parseInt(now.getFullYear()), // текущий год
                nowDay = cal.sMth === nowMth && cal.sYear === nowYear ? now.getDate() : null;


// ЗАГРУЗИТЬ ДАННЫЕ ИЗ ЛОКАЛЬНОГО ХРАНИЛИЩА
            cal.data = localStorage.getItem("cal-" + cal.sMth + "-" + cal.sYear);
            if (cal.data == null) {
                localStorage.setItem("cal-" + cal.sMth + "-" + cal.sYear, "{}");
                cal.data = {};
            } else {
                cal.data = JSON.parse(cal.data);
            }


// ЧЕРТЕЖНЫЕ РАСЧЕТЫ
// Пустые квадраты перед началом месяца
            let squares = [];
            if (cal.sMon && startDay !== 1) {
                let blanks = startDay === 0 ? 7 : startDay;
                for (let i = 1; i < blanks; i++) {
                    squares.push("b");
                }
            }
            if (!cal.sMon && startDay !== 0) {
                for (let i = 0; i < startDay; i++) {
                    squares.push("b");
                }
            }
// Дни месяца
            for (let i = 1; i <= daysInMth; i++) {
                squares.push(i);
            }
// Пустые квадраты после окончания месяца
            if (cal.sMon && endDay !== 0) {
                let blanks = endDay === 6 ? 1 : 7 - endDay;
                for (let i = 0; i < blanks; i++) {
                    squares.push("b");
                }
            }
            if (!cal.sMon && endDay !== 6) {
                let blanks = endDay === 0 ? 6 : 6 - endDay;
                for (let i = 0; i < blanks; i++) {
                    squares.push("b");
                }
            }
// ВЫВЕСТИ HTML КАЛЕНДАРЬ
// Получить контейнер
            let container = document.querySelector("#cal-container"),
                cTable = document.createElement("table");
            cTable.id = "calendar";
            container.innerHTML = "";
            container.appendChild(cTable);
// Первая строка - названия дней
            let cRow = document.createElement("tr"),
                days = ["Вс", "пн", "Вт", "Ср", "Чт", "пт", "Сб"];
            if (cal.sMon) {
                days.push(days.shift());
            }
            for (let d of days) {
                let cCell = document.createElement("td");
                cCell.innerHTML = d;
                cRow.appendChild(cCell);
            }
            cRow.classList.add("head");
            cTable.appendChild(cRow);
// Дни в месяце
            let total = squares.length;
            cRow = document.createElement("tr");
            cRow.classList.add("day");
            for (let i = 0; i < total; i++) {
                let cCell = document.createElement("td");
                if (squares[i] === "b") {
                    cCell.classList.add("blank");
                } else {
                    if (nowDay === squares[i]) {
                        cCell.classList.add("today");
                    }
                    cCell.innerHTML = `<div class="dd">${squares[i]}</div>`;
                    if (cal.data[squares[i]]) {
                        cCell.innerHTML += "<div class='evt'>" + cal.data[squares[i]] + "</div>";
                    }
                    cCell.onclick = () => {
                        cal.show(cCell);
                    };
                }
                cRow.appendChild(cCell);
                if (i !== 0 && (i + 1) % 7 === 0) {
                    cTable.appendChild(cRow);
                    cRow = document.createElement("tr");
                    cRow.classList.add("day");
                }
            }
        },
    };


    window.addEventListener("load", cal.init);

    return (
        <div>
            <Header></Header>
            <div className={styles.calWrap} id="cal-wrap">
                <h1>Расписание</h1>
                <div className={styles.calDate} id="cal-date" style={{marginBottom: '50px'}}>
                    <form id="monthForm" method="GET" action="">
                        <select name="selectedMonth" className={styles.calMth} id="cal-mth"></select>
                    </form>
                    <select className={styles.calYr} id="cal-yr"></select>
                </div>

                <div className={styles.calContainer} id="cal-container"></div>
            </div>
            <Footer></Footer>
        </div>
    );
}

export default Schedule;
