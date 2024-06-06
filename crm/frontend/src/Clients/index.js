import React, { useEffect, useState } from 'react';
import Header from "../components/Header";
import Footer from "../components/Footer";
import Button from "../components/Button";
import ClientCard from "../components/ClientCard";
import styles from "./index.module.css";
import EditModal from "../components/EditModal";
import Form from "../components/Form";
import {fetchGet} from "../api/get";
import {fetchPost} from "../api/post";

const Clients = () => {
    const [clients, setClients] = useState([]);
    const [chosenClientState, setChosenClientState] = useState([]);
    const [clientsStates, setClientsStates] = useState([]);

    const [groups, setGroups] = useState([]);

    const [showModalAllClients, setShowModalAllClients] = useState(false);
    const [showModalGroups, setShowModalGroups] = useState(false);

    const [showModalAddClient, setShowModalAddClient] = useState(false);
    const [showModalAddGroup, setShowModalAddGroup] = useState(false);

    const [firstName, setFirstName] = useState([]);
    const [lastName, setLastName] = useState([]);
    const [birthDate, setBirthDate] = useState([]);
    const [balance, setBalance] = useState([]);
    const [middleName, setMiddleName] = useState([]);

    const fileInputRef = React.useRef(null);
    const [selectedFiles, setSelectedFiles] = useState(null);

    const [sports, setSports] = useState(null);
    const [selectedSport, setSelectedSport] = useState(null);
    const [trainers, setTrainers] = useState(null);
    const [selectedTrainer, setSelectedTrainer] = useState(null);
    const [abonements, setAbonements] = useState(null);

    const handleFileSelect = (event) => {
        const fileList = event.target.files;

        if (fileList) {
            const file = Array.from(fileList);

            setSelectedFiles(file);
        }
    };

    const handleAttachButton = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

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

            const sports = await fetchGet('sport_types');
            setSports(sports)

            const trainers = await fetchGet('trainer_list');
            setTrainers(trainers)

            const abonements = await fetchGet('abonements');
            setAbonements(abonements)
        }

        fetchData();
    }, []);

    const handleFetchAddClient = async (event) => {
        event.preventDefault();

        const data = {
            firstName: firstName,
            lastName: lastName,
            birthDate: birthDate,
            middleName: middleName,
            address: 'Address',
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
                            {clients.length === 0 && <p>Нет клиентов</p>}
                            {clients.length !== 0 && clients.map((client) => (
                                <ClientCard
                                    key={client.id}
                                    id={client.id}
                                    firstName={client.firstName}
                                    lastName={client.lastName}
                                    birthday={client.birthDate}
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
                        children={
                            <Form
                                onSubmit={handleFetchAddClient}
                                title={'Добавление клиента'}
                                children={
                                    <div>
                                        <input type="text" required placeholder="Имя"
                                               onChange={(e) => setFirstName(e.target.value)}/>
                                        <input type="text" required placeholder="Фамилия"
                                               onChange={(e) => setLastName(e.target.value)}/>
                                        <input type="text" required placeholder="Отчество"
                                               onChange={(e) => setMiddleName(e.target.value)}/>
                                        <input className={styles.date} type="date" required placeholder="Дата рождения"
                                               onChange={(e) => setBirthDate(e.target.value)}/>
                                        <input type="text" required placeholder="Баланс"
                                               onChange={(e) => setBalance(e.target.value)}/>
                                        <select required className={styles.select}
                                                onChange={(e) => setChosenClientState(e.target.value)}>
                                            {clientsStates.map((state) =>
                                                (<option key={state.id} value={state.id}>{state.title}</option>)
                                            )}
                                        </select>
                                        <button className={styles.addPhoto} onClick={handleAttachButton}>Добавить фото</button>
                                        <input type="file" ref={fileInputRef} style={{display: 'none'}}
                                               onChange={handleFileSelect} multiple/>
                                        <input type="submit" value="Добавить" style={{ cursor: "pointer" }}/>
                                    </div>}
                            ></Form>}>
                    </EditModal>
                }
                {showModalGroups ? (
                    <div>
                        {groups.map((group) => (
                            <div>{group.title} {group.sportType} {group.trainer.user.first_name} {group.trainer.user.last_name}</div>
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
                        children={
                            <Form
                                title={'Добавление группы'}
                                children={
                                    <div>
                                        <input type="text" placeholder="Название"/>
                                        <select
                                            className={styles.selectAbonement}
                                            onChange={(e) => setSelectedSport(e.target.value)}
                                        >
                                            <option value="" disabled>Выбрать спорт</option>
                                            {sports && sports.map((sport) =>
                                                (<option
                                                    key={sport.id}
                                                    value={sport.id}
                                                >
                                                    {sport.title}
                                                </option>)
                                            )}
                                        </select>
                                        <select
                                            className={styles.selectAbonement}
                                            onChange={(e) => setSelectedTrainer(e.target.value)}
                                        >
                                            <option value="" disabled>Выбрать тренера</option>
                                            {trainers && trainers.map((trainer) =>
                                                (<option
                                                    key={trainer.id}
                                                    value={trainer.id}
                                                >
                                                    {trainer.title}
                                                </option>)
                                            )}
                                        </select>

                                        <Button type="main">Добавить</Button>
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
