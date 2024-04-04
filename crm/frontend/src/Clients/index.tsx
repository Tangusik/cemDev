import React, { useEffect, useState } from 'react';
import Header from "../components/Header/index.tsx";
import Footer from "../components/Footer/index.tsx";
import Button from "../components/Button/index.tsx";
import ClientCard from "../components/ClientCard/index.tsx";
import styles from "./index.module.css";
import EditModal from "../components/EditModal/index.tsx";
import Form from "../components/Form/index.tsx";
import { fetchGet } from "../api/get/index.ts";
import { fetchPost } from "../api/post/index.ts";

const Clients = () => {
    const [clients, setClients] = useState([]);
    const [chosenClientState, setChosenClientState] = useState([]);
    const [clientsStates, setClientsStates] = useState([]);

    const [sportTypes, setSportTypes] = useState([]);
    const [trainers, setTrainers] = useState([]);
    const [groups, setGroups] = useState([]);

    const [areas, setAreas] = useState([]);
    const [abonementSportType, setAbonementSportType] = useState([]);
    const [trainerId, setTrainerId] = useState([]);

    const [showModalAllClients, setShowModalAllClients] = useState(false);
    const [showModalGroups, setShowModalGroups] = useState(false);

    const [showModalAddClient, setShowModalAddClient] = useState(false);
    const [showModalAddGroup, setShowModalAddGroup] = useState(false);

    const [firstName, setFirstName] = useState([]);
    const [lastName, setLastName] = useState([]);
    const [birthDate, setBirthDate] = useState([]);
    const [balance, setBalance] = useState([]);

    const handleAllClients = () => {
        setShowModalAllClients(!showModalAllClients);
        setShowModalGroups(false);
    }
    const handleGroups = () => {
        setShowModalGroups(!showModalGroups);
        setShowModalAllClients(false);
    }

    const handleAddClient = () => {
        setShowModalAddClient(!showModalAddClient);
    }
    const handleAddGroup = () => {
        setShowModalAddGroup(!showModalAddGroup);
    }

    useEffect( () => {
        const fetchData = async () => {
            const clients = await fetchGet('client_list');
            setClients(clients);

            const clientsStates = await fetchGet('cl_statuses');
            setClientsStates(clientsStates)

            const groups = await fetchGet('all_groups');
            setGroups(groups)

            const sportTypes = await fetchGet('sport_types');
            setSportTypes(sportTypes)

            const trainers = await fetchGet('trainer_list');
            setTrainers(trainers)

            const areas = await fetchGet('areas');
            setAreas(areas)
        }

        fetchData();
    }, []);

    const handleFetchAddClient = async (event) => {
        event.preventDefault();

        const data = {
            first_name: firstName,
            last_name: lastName,
            birth_date: birthDate,
            state: chosenClientState,
            balance: balance,
        };
        await fetchPost( 'add_client', data);
        setShowModalAddClient(false)
        window.location.reload();
    };

    return (
        <div>
            <Header></Header>
            <div className={styles.mainContent}>
                <div className={styles.buttons}>
                    <Button type={"main"} title={"Все клиенты"} onClick={handleAllClients}></Button>
                    <Button type={"main"} title={"Группы"} onClick={handleGroups}></Button>
                </div>
                {showModalAllClients ? (
                    <div>
                        <span style={{  display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                            <Button type={"change"} title={"Добавить клиента"} onClick={handleAddClient}></Button>
                        </span>
                        <div className={styles.cards}>
                            {clients.length===0 && <p>Нет клиентов</p>}
                            {clients.map((client) => (
                                <ClientCard
                                    key={client.id}
                                    id={client.id}
                                    firstName={client.first_name}
                                    lastName={client.last_name}
                                    birthday={client.birth_date}
                                    state={client.state}
                                    balance={client.balance}
                                >
                                </ClientCard>
                            ))}
                        </div>
                    </div>
                ):(
                    <div></div>
                )}
                {showModalAddClient &&
                    <EditModal
                        onClose={handleAddClient}
                        modalChildren={
                            <Form
                                onSubmit={handleFetchAddClient}
                                title={'Добавление клиента'}
                                children={
                                    <div>
                                        <input type="text" name="first_name" id="first_name" placeholder="Имя" onChange={(e) => setFirstName(e.target.value)}/>
                                        <input type="text" name="last_name" id="last_name" placeholder="Фамилия" onChange={(e) => setLastName(e.target.value)}/>
                                        <input type="date" name="birth_date" id="birth_date" placeholder="Дата рождения" onChange={(e) => setBirthDate(e.target.value)}/>
                                        <input type="text" name="balance" id="balance" placeholder="Баланс" onChange={(e) => setBalance(e.target.value)}/>
                                        <select id="state" required name="state" className={styles.select} onChange={(e) => setChosenClientState(e.target.value)}>
                                            {clientsStates.map((state)=>
                                                (<option key={state.id} value={state.id}>{state.name}</option>)
                                            )}
                                        </select>
                                        <input type="submit" value="Добавить"/>
                                    </div>}
                            ></Form>}>
                    </EditModal>
                }
                {showModalGroups ? (
                    <div>
                        {groups.map((group) => (
                            <div>{group.name} {group.sport_type} {group.trainer.user.first_name} {group.trainer.user.last_name}</div>
                        ))}
                         <span style={{  display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                            <Button type={"change"} title={"Добавить группу"} onClick={handleAddGroup}></Button>
                         </span>
                    </div>
                ):(
                    <div></div>
                )}
                {showModalAddGroup &&
                    <EditModal
                        onClose={handleAddGroup}
                        modalChildren={
                            <Form
                                title={'Добавление группы'}
                                children={
                                    <div className={styles.col}>
                                        <input type="text" id="name" name="title" placeholder="Название"/>
                                        <select required className={styles.select}
                                                onChange={(e) => setTrainerId(e.target.value)}>
                                            <option value="" disabled selected>тренер</option>
                                            {trainers.map((trainer) =>
                                                (<option key={trainer.id} value={trainer.id}>{trainer.user.first_name} {trainer.user.last_name}</option>)
                                            )}
                                        </select>
                                        <select id="select_sport" name="sport" className={styles.select} onChange={(e) => setAbonementSportType(e.target.value)}>
                                            <option value="" disabled selected>вид спорта</option>
                                            {sportTypes && sportTypes.map((sportType)=>
                                                (<option key={sportType.id} value={sportType.id}>{sportType.title}</option>)
                                            )}
                                        </select>
                                        <select className={styles.select} onChange={(e) => setAreas(e.target.value)}>
                                            <option value="" disabled selected>площадка</option>
                                            {areas && areas.map((area)=>
                                                (<option key={area.id} value={area.id}>{area.address}</option>)
                                            )}
                                        </select>

                                        <div>До какого числа будут проходить занятия: <input type="date"/></div>
                                        <select className={styles.select} onChange={(e) => setAreas(e.target.value)}>
                                            <option value="" disabled selected>дни недели</option>
                                            <option value="0">Понедельник</option>
                                            <option value="1">Вторник</option>
                                            <option value="2">Среда</option>
                                            <option value="3">Четверг</option>
                                            <option value="4">Пятница</option>
                                            <option value="5">Суббота</option>
                                            <option value="6">Воскресенье</option>
                                        </select>
                                            <div>Время начала занятий: <input type="time"/></div>
                                            <div>Время конца занятий: <input type="time"/></div>
                                            <input type="submit" value="Добавить"/>
                                    </div>}
                            ></Form>}
                    ></EditModal>
                }
            </div>
            <Footer></Footer>
        </div>
    );
}

export default Clients;
