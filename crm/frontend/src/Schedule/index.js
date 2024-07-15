import React, {useEffect, useState} from 'react';
import styles from './index.module.css';
import Header from "../components/Header";
import Footer from "../components/Footer";
import moment from 'moment';
import EditModal from "../components/EditModal";
import Button from "../components/Button";
import {fetchGet} from "../api/get";
import {fetchPost} from "../api/post";

const Calendar = () => {
    const now = new Date();
    const [selectedMonth, setSelectedMonth] = useState(now.getMonth());
    const [selectedYear, setSelectedYear] = useState(now.getFullYear());
    const [showLesson, setShowLesson] = useState(false);
    const [lesson, setLesson] = useState({id: '', sport: '', area: '', trainer: '', time: '', date: '', clients: []});

    const [clientId, setClientId] = useState(null);
    const [clients, setClients] = useState([]);

    const [trainerId, setTrainerId] = useState(null);
    const [trainers, setTrainers] = useState([]);

    const [data, setData] = useState([]);

    const [isClicked, setIsClicked] = useState({});
    const [checkedClients, setCheckedClients] = useState({});

    const [clientsAbonements, setClientsAbonements] = useState({});
    const [abonement, setAbonement] = useState({});

    const fetchData = async (url) => {
        const response = await fetchGet(url);
        setData(response);
    };

    useEffect( () => {
        const fetchData = async () => {
            const clients = await fetchGet('client_list');
            setClients(clients);

            const trainers = await fetchGet('trainer_list');
            setTrainers(trainers)
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

    useEffect( () => {
        if (trainerId) {
            const fetchData = async () => {
                const responseTrainerActs = await fetchGet(`schedule_trainer/${trainerId}`);
                setData(responseTrainerActs);
            }

            fetchData();
        }
    }, [trainerId]);

    const fetchDataAbonements = async (clientId) => {
        const abonements = await fetchGet(`client/${clientId}/abonements`);
        setClientsAbonements(prevState => ({
            ...prevState,
            [clientId]: abonements,
        }));
    };

    const handleClick = (clientId) => {
        setIsClicked(prevState => ({
            ...prevState,
            [clientId]: !prevState[clientId],
        }));
    };

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

    const handleShowLesson = (Obj) => {
        setShowLesson(!showLesson);
        setLesson(Obj);
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

    const handleCheckboxChange = async (clientId, isChecked) => {
        setCheckedClients(prevState => ({
            ...prevState,
            [clientId]: isChecked
        }));

        if (isChecked) {
            await fetchDataAbonements(clientId);
        }
    };

    useEffect(() => {
        const initialCheckedState = {};
        if (lesson && lesson.clients){
            lesson.clients.forEach(client => {
                initialCheckedState[client.id] = false;
            });
            setCheckedClients(initialCheckedState);
        }

    }, [lesson]);

    const handleSelectAbonement = (clientId, abonementId) => {
        setAbonement(prevState => ({
            ...prevState,
            [clientId]: abonementId,
        }));
    }
    const handleMark = async () => {
        const data = Object.keys(checkedClients).map(clientId => ({
            client: parseInt(clientId),
            presence: checkedClients[clientId],
            paid_by: abonement[clientId] || null,
            paid_missing: !(isClicked[clientId] || false),
        }));

        const dataSend = {
            presences: data,
        };

        console.log(dataSend);

        await fetchPost(`mark/${lesson.id}`, dataSend);

        // window.location.reload();
    };
    // const handleMark = async () => {
    //     const data = Object.keys(checkedClients).map(clientId => {
    //         const presence = checkedClients[clientId];
    //         let paidBy = abonement[clientId] || null;
    //         let paidMissing = isClicked[clientId] || false;
    //
    //         if (presence) {
    //             if (paidBy === null) {
    //                 paidBy = null;
    //             }
    //             else {
    //                 paidBy = parseInt(paidBy, 10);
    //             }
    //             paidMissing = false;
    //         } else {
    //             paidBy = null;
    //         }
    //
    //         return {
    //             client: parseInt(clientId),
    //             presence: presence,
    //             paid_by: paidBy,
    //             paid_missing: !paidMissing,
    //         };
    //     });
    //
    //     const dataSend = {
    //         presences: data,
    //     };
    //
    //     console.log(dataSend);
    //
    //     await fetchPost(`mark/${lesson.id}`, dataSend);
    // };

    const renderContent = (i) => {
        let content = [];
        data.map((Obj) => {
            Obj.date = new Date(Obj.actDate);
            const objDay = Obj.date.getDate();
            const objMonth = Obj.date.getMonth();
            const objYear = Obj.date.getFullYear();
            if (i === objDay - 1 && selectedMonth === objMonth && selectedYear === objYear) {
                content.push({
                    component: (
                        <div className={styles.data}
                             style={{backgroundColor: Obj.status === 'Состоится' ? 'white' : '#FFDA73'}}
                             onClick={() => handleShowLesson(Obj)}>
                            <div className={styles.openData}>
                                <div className={styles.sport}>{Obj.group.sportType}</div>
                                <div className={styles.time}>
                                    <span style={{fontSize: '10px', color: '#1b1b1b'}}>{Obj.actTimeBegin.slice(0, 5)}</span>
                                    <span style={{fontSize: '10px', color: '#1b1b1b'}}>{Obj.actTimeEnd.slice(0, 5)}</span>
                                </div>
                            </div>
                            {Obj.trainer.user &&
                                <div className={styles.hideData}>
                                    {Obj.status !== 'Состоится' && <span style={{color: '#1b1b1b', fontWeight: 'bold'}}>{Obj.status}</span>}
                                    <span style={{color: '#1b1b1b'}}>{Obj.trainer.user.lastName} {Obj.trainer.user.firstName}</span>
                                </div>}
                        </div>
                    ),
                    time: Obj.actTimeBegin
                });
            }
        });

        content.sort((a, b) => a.time.localeCompare(b.time));

        return content.map(item => item.component);
    };

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

    return (
        <div>
            <Header></Header>
            <div className={styles.page}>
                <div className={styles.headerShedule}>
                    <div className={styles.scheduleType}>
                        <div onClick={handleChooseOwnSchedule} className={styles.selectClient}>Мое расписание</div>
                        <div onClick={handleChooseCommonSchedule} className={styles.selectClient}>Общее расписание</div>
                    </div>
                    <div className={styles.selects}>
                        <select value={selectedMonth} onChange={handleMonthChange} className={styles.select}>
                            {Array.from({ length: 12 }, (_, i) => (
                                <option key={`month-${i}`} value={i}>
                                    {new Date(selectedYear, i).toLocaleString('default', { month: 'short' })}
                                </option>
                            ))}
                        </select>
                        <select value={selectedYear} onChange={handleYearChange} className={styles.select}>
                            {Array.from({ length: 9 }, (_, i) => now.getFullYear() - 4 + i).map((year) => (
                                <option key={`year-${year}`} value={year}>
                                    {year}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className={styles.optionalSelects}>
                        <select required name="clients" className={styles.selectClient}
                                onChange={(e) => setClientId(e.target.value)}>
                            <option value="" selected>клиенты</option>
                            {clients && clients.map((client) =>
                                (<option key={client.id} value={client.id}>{client.firstName} {client.lastName}</option>)
                            )}
                        </select>
                        <select required name="clients" className={styles.selectClient}
                                onChange={(e) => setTrainerId(e.target.value)}>
                            <option value="" selected>сотрудники</option>
                            {trainers && trainers.map((trainer) =>
                                (<option key={trainer.user.id} value={trainer.user.id}>{trainer.user.first_name} {trainer.user.last_name}</option>)
                            )}
                        </select>
                    </div>
                </div>
                {showLesson &&
                    <EditModal
                        onClose={handleShowLesson}
                        children={
                            <div className={styles.cardMainContainer}>
                                <div className={styles.card} key={lesson.id}>
                                    <div className={styles.row}>
                                        <div>{lesson.trainer.user && lesson.trainer.user.first_name} {lesson.trainer.user && lesson.trainer.user.last_name}</div>
                                        <div className={styles.status}>{lesson.status && lesson.status}</div>
                                    </div>
                                    <div className={styles.row}>
                                        <div>{lesson.area && lesson.area}</div>
                                        <div
                                            className={styles.status}>{lesson.actTimeBegin && lesson.actTimeBegin.slice(0, 5)} - {lesson.actTimeEnd && lesson.actTimeEnd.slice(0, 5)}</div>
                                    </div>
                                    <div>{lesson.clients && lesson.clients.map((client) => (
                                        <div className={styles.client} key={client.id}>
                                            <input
                                                type="checkbox"
                                                checked={checkedClients[client.id] || false}
                                                onChange={(e) => handleCheckboxChange(client.id, e.target.checked)}
                                            ></input>
                                            <div>{client.firstName} {client.lastName}</div>
                                            {checkedClients[client.id] &&
                                                <select
                                                    className={styles.selectAbonement}
                                                    onChange={(e) => handleSelectAbonement(client.id, e.target.value)}
                                                >
                                                    <option value="" disabled>Выбрать абонемент</option>
                                                    {clientsAbonements[client.id] && clientsAbonements[client.id].map((clientsAbonement) =>
                                                        (<option
                                                            key={clientsAbonement.abonement.id}
                                                            value={clientsAbonement.abonement.id}
                                                        >
                                                            {clientsAbonement.abonement.title}
                                                        </option>)
                                                    )}
                                                </select>
                                            }
                                            {!checkedClients[client.id] &&
                                                <button
                                                    onClick={() => handleClick(client.id)}
                                                    className={isClicked[client.id] ? styles.buttonActive : styles.button}
                                                >
                                                    Уважительная причина
                                                </button>
                                            }
                                        </div>
                                        ))}</div>
                                        <Button onClick={handleMark}>Отметить</Button>
                                    </div>
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