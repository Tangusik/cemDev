// import React, {useEffect} from 'react';
// import Header from "../components/Header";
// import Footer from "../components/Footer";
// import styles from './index.module.css';
//
// const Schedule = () => {
//     useEffect(()=> {
//         let cal = {
//             sMon: true,
//             mName: ["Янв", "Фев", "Март", "Апр", "Май", "Июнь", "Июль", "Авг", "Сен", "Окт", "Ноя", "Дек"],
//             data: null,
//             sDay: 0,
//             sMth: 0,
//             sYear: 0,
//             hMth: null,
//             hYear: null,
//
//             init: () => {
//                 cal.hMth = document.querySelector("#calMth");
//                 console.log(cal.hMth)
//                 cal.hYear = document.querySelector("#calYr");
//                 let now = new Date(),
//                     nowMth = now.getMonth(),
//                     nowYear = parseInt(now.getFullYear());
// // ДОБАВИТЬ ВЫБОР МЕСЯЦЕВ
//                 for (let i = 0; i <= 11; i++) {
//                     let opt = document.createElement("option");
//                     opt.value = i;
//                     opt.innerHTML = cal.mName[i];
//                     if (i === nowMth) {
//                         opt.selected = true;
//                     }
//
//                     cal.hMth.appendChild(opt);
//                 }
//                 // cal.hMth.onchange = cal.list;
//                 cal.hMth.onchange = function (event) {
//                     event.preventDefault();
//                     cal.list();
//                 };
// // ДОБАВИТЬ ВЫБОР ГОДОВ
//                 for (let i = nowYear - 4; i <= nowYear + 4; i++) {
//                     let opt = document.createElement("option");
//                     opt.value = i;
//                     opt.innerHTML = i;
//                     if (i === nowYear) {
//                         opt.selected = true;
//                     }
//                     cal.hYear.appendChild(opt);
//                 }
//                 cal.hYear.onchange = cal.list;
// // СТАРТ - ВЫВОДА КАЛЕНДАРЯ
//                 cal.list();
//             },
//
//
// // СОЗДАТЬ КАЛЕНДАРЬ НА ВЫБРАННЫЙ МЕСЯЦ
//             list: () => {
// // ОСНОВНЫЕ РАСЧЕТЫ - ДНИ В МЕСЯЦЕ, ДЕНЬ НАЧАЛА + КОНЕЦ
// // Примечание. Январь равен 0, а декабрь — 11.
// // Примечание. Воскресенье равно 0, а суббота - 6.
//                 cal.sMth = parseInt(cal.hMth.value); // выбранный месяц
//                 cal.sYear = parseInt(cal.hYear.value); // выбранный год
//
//                 let daysInMth = new Date(cal.sYear, cal.sMth + 1, 0).getDate(), // количество дней в выбранном месяце
//                     startDay = new Date(cal.sYear, cal.sMth, 1).getDay(), // первый день месяца
//                     endDay = new Date(cal.sYear, cal.sMth, daysInMth).getDay(), // последний день месяца
//                     now = new Date(), // текущая дата
//                     nowMth = now.getMonth(), // текущий месяц
//                     nowYear = parseInt(now.getFullYear()), // текущий год
//                     nowDay = cal.sMth === nowMth && cal.sYear === nowYear ? now.getDate() : null;
//
//
// // ЗАГРУЗИТЬ ДАННЫЕ ИЗ ЛОКАЛЬНОГО ХРАНИЛИЩА
//                 cal.data = localStorage.getItem("cal-" + cal.sMth + "-" + cal.sYear);
//                 if (cal.data == null) {
//                     localStorage.setItem("cal-" + cal.sMth + "-" + cal.sYear, "{}");
//                     cal.data = {};
//                 } else {
//                     cal.data = JSON.parse(cal.data);
//                 }
//
//
// // ЧЕРТЕЖНЫЕ РАСЧЕТЫ
// // Пустые квадраты перед началом месяца
//                 let squares = [];
//                 if (cal.sMon && startDay !== 1) {
//                     let blanks = startDay === 0 ? 7 : startDay;
//                     for (let i = 1; i < blanks; i++) {
//                         squares.push("b");
//                     }
//                 }
//                 if (!cal.sMon && startDay !== 0) {
//                     for (let i = 0; i < startDay; i++) {
//                         squares.push("b");
//                     }
//                 }
// // Дни месяца
//                 for (let i = 1; i <= daysInMth; i++) {
//                     squares.push(i);
//                 }
// // Пустые квадраты после окончания месяца
//                 if (cal.sMon && endDay !== 0) {
//                     let blanks = endDay === 6 ? 1 : 7 - endDay;
//                     for (let i = 0; i < blanks; i++) {
//                         squares.push("b");
//                     }
//                 }
//                 if (!cal.sMon && endDay !== 6) {
//                     let blanks = endDay === 0 ? 6 : 6 - endDay;
//                     for (let i = 0; i < blanks; i++) {
//                         squares.push("b");
//                     }
//                 }
// // ВЫВЕСТИ HTML КАЛЕНДАРЬ
// // Получить контейнер
//                 let container = document.querySelector("#cal-container"),
//                     cTable = document.createElement("table");
//                 cTable.id = "calendar";
//                 container.innerHTML = "";
//                 container.appendChild(cTable);
// // Первая строка - названия дней
//                 let cRow = document.createElement("tr"),
//                     days = ["Вс", "пн", "Вт", "Ср", "Чт", "пт", "Сб"];
//                 if (cal.sMon) {
//                     days.push(days.shift());
//                 }
//                 for (let d of days) {
//                     let cCell = document.createElement("td");
//                     cCell.innerHTML = d;
//                     cRow.appendChild(cCell);
//                 }
//                 cRow.classList.add("head");
//                 cTable.appendChild(cRow);
// // Дни в месяце
//                 let total = squares.length;
//                 cRow = document.createElement("tr");
//                 cRow.classList.add("day");
//                 for (let i = 0; i < total; i++) {
//                     let cCell = document.createElement("td");
//                     if (squares[i] === "b") {
//                         cCell.classList.add("blank");
//                     } else {
//                         if (nowDay === squares[i]) {
//                             cCell.classList.add("today");
//                         }
//                         cCell.innerHTML = `<div class="dd">${squares[i]}</div>`;
//                         if (cal.data[squares[i]]) {
//                             cCell.innerHTML += "<div class='evt'>" + cal.data[squares[i]] + "</div>";
//                         }
//                         cCell.onclick = () => {
//                             cal.show(cCell);
//                         };
//                     }
//                     cRow.appendChild(cCell);
//                     if (i !== 0 && (i + 1) % 7 === 0) {
//                         cTable.appendChild(cRow);
//                         cRow = document.createElement("tr");
//                         cRow.classList.add("day");
//                     }
//                 }
//             },
//         };
//         cal.init
//     }, [])
//
//     // window.addEventListener("load", cal.init);
//
//     return (
//         <div>
//             <Header></Header>
//             <div className={styles.calWrap} id="cal-wrap">
//                 <h1>Расписание</h1>
//                 <div className={styles.calDate} id="cal-date" style={{marginBottom: '50px'}}>
//                     <form id="monthForm" method="GET" action="">
//                         <select name="selectedMonth" className={styles.calMth} id="calMth"></select>
//                     </form>
//                     <select className={styles.calYr} id="calYr"></select>
//                 </div>
//
//                 <div className={styles.calContainer} id="cal-container"></div>
//             </div>
//             <Footer></Footer>
//         </div>
//     );
// }
//
// export default Schedule;


// import React, { Component } from 'react';
//
// class Calendar extends Component {
//     constructor(props) {
//         super(props);
//         const now = new Date();
//         this.state = {
//             selectedMonth: now.getMonth(),
//             selectedYear: now.getFullYear(),
//         };
//     }
//
//     handleMonthChange = (event) => {
//         this.setState({ selectedMonth: parseInt(event.target.value) }, this.updateCalendar);
//     };
//
//     handleYearChange = (event) => {
//         this.setState({ selectedYear: parseInt(event.target.value) }, this.updateCalendar);
//     };
//
//     updateCalendar = () => {
//         // Здесь вы можете обновить календарь в соответствии с выбранным месяцем и годом
//         // Например, загрузить события из вашего хранилища или выполнить другие операции
//     };
//
//     render() {
//         const { selectedMonth, selectedYear } = this.state;
//         const months = ["Янв", "Фев", "Март", "Апр", "Май", "Июнь", "Июль", "Авг", "Сен", "Окт", "Ноя", "Дек"];
//         const now = new Date();
//
//         return (
//             <div>
//                 <div>
//                     <select value={selectedMonth} onChange={this.handleMonthChange}>
//                         {months.map((month, index) => (
//                             <option key={index} value={index}>
//                                 {month}
//                             </option>
//                         ))}
//                     </select>
//                     <select value={selectedYear} onChange={this.handleYearChange}>
//                         {Array.from({ length: 9 }, (_, i) => now.getFullYear() - 4 + i).map((year) => (
//                             <option key={year} value={year}>
//                                 {year}
//                             </option>
//                         ))}
//                     </select>
//                 </div>
//                 {/* Здесь вы можете рендерить календарь на основе выбранных значений месяца и года */}
//             </div>
//         );
//     }
// }
//
// export default Calendar;



//
// import React, {Component, useEffect, useState} from 'react';
// import styles from './index.module.css';
// import Header from "../components/Header";
// import Footer from "../components/Footer";
// import axios from "axios";
//
// const Calendar = () => {
//     const [schedule, setSchedule] = useState([]);
//
//     const now = new Date();
//     const [selectedMonth, setSelectedMonth] = useState(now.getMonth());
//     const [selectedYear, setSelectedYear] = useState(now.getFullYear());
//     const [calendar, setCalendar] = useState([]);
//
//     const handleMonthChange = (event) => {
//         setSelectedMonth(parseInt(event.target.value));
//     };
//
//     const handleYearChange = (event) => {
//         setSelectedYear(parseInt(event.target.value));
//     };
//
//     useEffect(() => {
//         const now = new Date(selectedYear, selectedMonth, 1);
//         const daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();
//         const startDay = now.getDay();
//
//         const newCalendar = [];
//         let week = [];
//
//         for (let i = 0; i < startDay - 1; i++) {
//             week.push(
//                 <div
//                     key={`empty-${i}`}
//                     className={`${styles.calendarDay} ${styles.emptyDay}`}
//                 ></div>
//             );
//         }
//
//         for (let day = 1; day <= daysInMonth; day++) {
//             week.push(
//                 <div key={`day-${day}`} className={styles.calendarDay} style={{color: "darkgray"}}>
//                     {day}
//                 </div>
//             );
//
//             if (week.length === 7) {
//                 newCalendar.push(
//                     <div
//                         key={`week-${newCalendar.length}`}
//                         className={styles.calendarWeek}
//                     >
//                         {week}
//                     </div>
//                 );
//                 week = [];
//             }
//         }
//
//         while (week.length < 7) {
//             week.push(
//                 <div
//                     key={`empty-end-${week.length}`}
//                     className={`${styles.calendarDay} ${styles.emptyDay}`}
//                 ></div>
//             );
//         }
//
//         newCalendar.push(
//             <div
//                 key={`week-${newCalendar.length}`}
//                 className={styles.calendarWeek}
//             >
//                 {week}
//             </div>
//         );
//
//         setCalendar(newCalendar);
//     }, [selectedMonth, selectedYear]);
//
//
//     return (
//             <div>
//                 <Header></Header>
//                 <div>
//                     <select value={selectedMonth} onChange={handleMonthChange} style={{color: "black"}}>
//                         {Array.from({ length: 12 }, (_, i) => (
//                             <option key={`month-${i}`} value={i}>
//                                 {new Date(selectedYear, i).toLocaleString('default', { month: 'short' })}
//                             </option>
//                         ))}
//                     </select>
//                     <select value={selectedYear} onChange={handleYearChange} style={{color: "black"}}>
//                         {Array.from({ length: 9 }, (_, i) => now.getFullYear() - 4 + i).map((year) => (
//                             <option key={`year-${year}`} value={year}>
//                                 {year}
//                             </option>
//                         ))}
//                     </select>
//                 </div>
//                 <div className={styles.calendarGrid}>{calendar}</div> {/* Использование класса из модуля стилей */}
//                 <Footer></Footer>
//             </div>
//
//         );
// }
//
// export default Calendar;




import React, {Component, useEffect, useState} from 'react';
import styles from './index.module.css';
import Header from "../components/Header";
import Footer from "../components/Footer";
import moment from 'moment';

const Calendar = () => {
    const [schedule, setSchedule] = useState([]);

    const now = new Date();
    const [selectedMonth, setSelectedMonth] = useState(now.getMonth());
    const [selectedYear, setSelectedYear] = useState(now.getFullYear());

    const handleMonthChange = (event) => {
        setSelectedMonth(parseInt(event.target.value));
    };

    const handleYearChange = (event) => {
        setSelectedYear(parseInt(event.target.value));
    };

    const getDaysInMonth = (month, year) => {
        const date = moment(`${year}-${month}`, 'YYYY-MM');
        const days = date.daysInMonth();
        return days;
    };

    const renderItems = () => {
        const items = [];
        for (let i = 0; i < getDaysInMonth(selectedMonth + 1, selectedYear); i++) {
            items.push(<div className={styles.day} key={i}>{i+1}</div>);
        }
        return items;
    };


    return (
        <div>
            <Header></Header>
            <div className={styles.page}>
            <div>
                <select value={selectedMonth} onChange={handleMonthChange} style={{color: "black"}}>
                    {Array.from({ length: 12 }, (_, i) => (
                        <option key={`month-${i}`} value={i}>
                            {new Date(selectedYear, i).toLocaleString('default', { month: 'short' })}
                        </option>
                    ))}
                </select>
                <select value={selectedYear} onChange={handleYearChange} style={{color: "black"}}>
                    {Array.from({ length: 9 }, (_, i) => now.getFullYear() - 4 + i).map((year) => (
                        <option key={`year-${year}`} value={year}>
                            {year}
                        </option>
                    ))}
                </select>
            </div>

            <div style={{color: 'black'}}>{selectedMonth + 1} {selectedYear}</div>
            <div style={{color: 'black'}}>{getDaysInMonth(selectedMonth + 1, selectedYear)}</div>
                <div className={styles.calendar}><div className={styles.container}>{renderItems()}</div></div>
            </div>
            <Footer></Footer>
        </div>

    );
}

export default Calendar;