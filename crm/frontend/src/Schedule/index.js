import React, {useEffect, useState} from 'react';
import styles from './index.module.css';
import Header from "../components/Header";
import Footer from "../components/Footer";
import moment from 'moment';
import EditModal from "../components/EditModal";
import Button from "../components/Button";
import {fetchGet} from "../api/get";

const Calendar = () => {
    const now = new Date();
    const [selectedMonth, setSelectedMonth] = useState(now.getMonth());
    const [selectedYear, setSelectedYear] = useState(now.getFullYear());
    const [showCard, setShowCard] = useState(false);
    const [card, setCard] = useState({sport: '', area: '', trainer: '', time: '', date: '',});
    const [clientId, setClientId] = useState(null);
    const [clients, setClients] = useState([]);

    const [data, setData] = useState([]);

    const fetchData = async (url) => {
        const response = await fetchGet(url);
        setData(response);
    };

    useEffect( () => {
        const fetchData = async () => {
            const clients = await fetchGet('client_list');
            setClients(clients);
        }

        fetchData();
    }, []);

    useEffect( () => {
        if (clientId) {
            const fetchData = async () => {
                const responseClientActs = await fetchGet(`client/${clientId}/acts`);
                setData(responseClientActs);
            }

            fetchData();
        }
    }, [clientId]);

    const renderWeekdayHeaders = () => {
        const weekdays = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];
        return weekdays.map((day, index) => (
            <div key={index} className={styles.weekday}>
                {day}
            </div>
        ));
    };

    const getFirstDayOfMonth = (month, year) => {
        const day = new Date(year, month, 1).getDay();
        return day - 1;
    }

    const handleMonthChange = (event) => {
        setSelectedMonth(parseInt(event.target.value));
    };

    const handleYearChange = (event) => {
        setSelectedYear(parseInt(event.target.value));
    };

    const handleShowCard = (Obj) => {
        setShowCard(!showCard);
        setCard(Obj);
    };

    const getDaysInMonth = (month, year) => {
        const date = moment(`${year}-${month}`, 'YYYY-MM');
        return date.daysInMonth();
    };

    const handleChooseOwnSchedule = () => {
        fetchData('schedule').then(r => console.log(r));
    };

    const handleChooseCommonSchedule = () => {
        fetchData('scheduleAll').then(r => console.log(r));
    };


    const renderContent = (i) => {
        let content = [];
        data.map((Obj) => {
            Obj.date = new Date(Obj.act_date);
            const objDay = Obj.date.getDate();
            const objMonth = Obj.date.getMonth();
            const objYear = Obj.date.getFullYear();
            if (i === objDay-1 && selectedMonth === objMonth && selectedYear === objYear) {
                content.push (
                    <div className={styles.data}
                         style={{backgroundColor: Obj.status === 'Состоится' ? 'white' : '#FFDA73'}}
                         onClick={() => handleShowCard(Obj)}>
                        <div className={styles.openData}>
                            <div className={styles.sport}>{Obj.sport}</div>
                            <div className={styles.time}>
                                <span style={{fontSize: '10px', color: '#1b1b1b'}}>{Obj.act_time_begin.slice(0,5)}</span>
                                <span style={{fontSize: '10px', color: '#1b1b1b'}}>{Obj.act_time_end.slice(0,5)}</span>
                            </div>
                        </div>
                        {Obj.trainer.user &&
                            <div className={styles.hideData}>
                                {Obj.status !== 'Состоится' && <span style={{color: '#1b1b1b', fontWeight: 'bold'}}>{Obj.status}</span>}
                                <span style={{color: '#1b1b1b'}}>{Obj.trainer.user.last_name} {Obj.trainer.user.first_name}</span>
                            </div>}
                    </div>
                );
            };
        });
        return content;
    }

    const renderItems = () => {
        const items = [];
        const firstDay = getFirstDayOfMonth(selectedMonth, selectedYear);
        const daysInMonth = getDaysInMonth(selectedMonth + 1, selectedYear)

        for (let i = 0; i < firstDay; i++) {
            items.push(<div className={styles.emptyDay} key={`empty-${i}`}></div>);
        }

        for (let i = 0; i < daysInMonth; i++) {

                items.push(
                    <div className={styles.day} key={i}>
                        <div className={styles.number}>{i + 1}</div>
                        <div className={styles.content}>{renderContent(i)}</div>
                    </div>
                );
            }

        return items;
    };

    useEffect(() => {

    }, [selectedMonth, selectedYear])


    return (
        <div>
            <Header></Header>
            <div className={styles.page}>
            <div className={styles.scheduleType}>
                <Button title={'Мое расписание'} onClick={handleChooseOwnSchedule}></Button>
                <Button title={'Общее расписание'} onClick={handleChooseCommonSchedule}></Button>
            </div>
            <select id="clients" required name="clients" className={styles.selectClient}
                    onChange={(e) => setClientId(e.target.value)}>
                <option value="" disabled selected>клиенты</option>
                {clients.map((client) =>
                    (<option key={client.id} value={client.id}>{client.first_name} {client.last_name}</option>)
                )}
            </select>
            <div className={styles.selects}>
                <select value={selectedMonth} onChange={handleMonthChange} style={{color: "black"}} className={styles.select}>
                    {Array.from({ length: 12 }, (_, i) => (
                        <option key={`month-${i}`} value={i}>
                            {new Date(selectedYear, i).toLocaleString('default', { month: 'short' })}
                        </option>
                    ))}
                </select>
                <select value={selectedYear} onChange={handleYearChange} style={{color: "black"}} className={styles.select}>
                    {Array.from({ length: 9 }, (_, i) => now.getFullYear() - 4 + i).map((year) => (
                        <option key={`year-${year}`} value={year}>
                            {year}
                        </option>
                    ))}
                </select>
            </div>
                {showCard &&
                    <EditModal
                        onClose={handleShowCard}
                        children={
                            <div className={styles.cardMainContainer}>
                                <div className={styles.card}>{card.area}</div>
                            </div>
                        }>
                    </EditModal>
                }
                <div className={styles.weekdays}>{renderWeekdayHeaders()}</div>
                <div className={styles.calendar}><div className={styles.container}>{renderItems()}</div></div>
            </div>
            <Footer></Footer>
        </div>

    );
}

export default Calendar;