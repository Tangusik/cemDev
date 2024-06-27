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
import GroupCard from "../components/GroupCard";

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
    // const [selectedFiles, setSelectedFiles] = useState(null);

    const [groupName, setGroupName] = useState(null);
    const [sports, setSports] = useState(null);
    const [selectedSport, setSelectedSport] = useState(null);
    const [trainers, setTrainers] = useState(null);
    const [selectedTrainer, setSelectedTrainer] = useState(null);
    const [abonements, setAbonements] = useState(null);

    const [showClients, setShowClients] = useState(false);
    const [showAbonements, setShowAbonements] = useState(false);

    const [checkedClients, setCheckedClients] = useState({});
    const [checkedAbonements, setCheckedAbonements] = useState({});

    const [selectedClientState, setSelectedClientState] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');

    const [selectedSportFilter, setSelectedSportFilter] = useState('');
    const [selectedTrainerFilter, setSelectedTrainerFilter] = useState('');

    const [searchTerm, setSearchTerm] = useState('');
    const [searchTermGroups, setSearchTermGroups] = useState('');

    const toggleClients = () => setShowClients(!showClients);
    const toggleAbonements = () => setShowAbonements(!showAbonements);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSearchChangeGroups = (e) => {
        setSearchTermGroups(e.target.value);
    };

    // const handleFileSelect = (event) => {
    //     const fileList = event.target.files;
    //
    //     if (fileList) {
    //         const file = Array.from(fileList);
    //
    //         setSelectedFiles(file);
    //     }
    // };

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

            const groups = await fetchGet('all_groups');
            setGroups(groups)

            const sports = await fetchGet('sport_types');
            setSports(sports)

            const trainers = await fetchGet('trainer_list');
            setTrainers(trainers)

            const abonements = await fetchGet('abonements');
            setAbonements(abonements)
        }

        fetchData();
    }, []);

    const handleCheckboxClients = async (clientId, isChecked) => {
        setCheckedClients(prevState => ({
            ...prevState,
            [clientId]: isChecked
        }));
    };

    const handleCheckboxAbonements = async (abonementId, isChecked) => {
        setCheckedAbonements(prevState => ({
            ...prevState,
            [abonementId]: isChecked
        }));
    };

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

    const handleAddgroup = async () => {
        const selectedAbonementsList = Object.keys(checkedAbonements).filter(id => checkedAbonements[id]);
        const selectedMembersList = Object.keys(checkedClients).filter(id => checkedClients[id]);

        const data = {
            team_name: groupName,
            trainer: selectedTrainer,
            sport_type: selectedSport,
            members: selectedMembersList,
            abonements: selectedAbonementsList,
        };

        console.log(data);
        await fetchPost( 'group_creation', data);

    };

    const handleStateChange = (e) => {
        setSelectedClientState(e.target.value);
    };

    const handleSportFilter = (e) => {
        setSelectedSportFilter(e.target.value);
    };

    const handleTrainerFilter = (e) => {
        setSelectedTrainerFilter(e.target.value);
    };

    const handleSortOrderChange = () => {
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    };

    const getFullName = (client) => {
        return `${client.firstName} ${client.lastName} ${client.middleName}`;
    };

    const filteredClients = clients.filter(client => {
        const fullName = getFullName(client).toLowerCase();
        const matchesSearchTerm = fullName.includes(searchTerm.toLowerCase());
        const matchesState = selectedClientState ? client.state === selectedClientState : true;
        return matchesSearchTerm && matchesState;
    }).sort((a, b) => {
        if (sortOrder === 'asc') {
            return a.balance - b.balance;
        } else {
            return b.balance - a.balance;
        }
    });

    const filteredGroups = groups.filter(group => {
        const matchesSearchTerm = group.title.toLowerCase().includes(searchTermGroups.toLowerCase());
        const matchesSport = selectedSportFilter ? group.sportType === selectedSportFilter : true;
        const fullName = `${group.trainer.user.first_name} ${group.trainer.user.last_name}`.toLowerCase();
        const matchesTrainerFullName = selectedTrainerFilter ? fullName.includes(selectedTrainerFilter.toLowerCase()) : true;
        return matchesSearchTerm && matchesSport && matchesTrainerFullName;
    });

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
                        <span className={styles.showListButton}>
                            <Button type={"change"} title={"Добавить клиента"} onClick={handleAddClient}></Button>
                        </span>
                        <div className={styles.optionalSelects}>
                            <div className={styles.sub}>
                                <input
                                    type="text"
                                    placeholder="Кого желаете найти?"
                                    value={searchTerm}
                                    onChange={handleSearchChange}
                                />
                            </div>
                            <select value={selectedClientState} className={styles.selectFilters}
                                    onChange={handleStateChange}>
                                <option value="" selected>все статусы</option>
                                {clientsStates.map((state, id) => (
                                    <option key={id} value={state.title}>
                                        {state.title}
                                    </option>
                                ))}
                            </select>
                            <button onClick={handleSortOrderChange} className={styles.selectFilters}>
                                Сортировать по балансу ({sortOrder === 'asc' ? 'возрастанию' : 'убыванию'})
                            </button>
                        </div>
                        <div className={styles.cards}>
                            {filteredClients.length === 0 && <p>Нет клиентов</p>}
                            {filteredClients.length !== 0 && filteredClients.map((client) => (
                                <ClientCard
                                    key={client.id}
                                    id={client.id}
                                    firstName={client.firstName}
                                    lastName={client.lastName}
                                    middleName={client.middleName}
                                    birthday={client.birthDate}
                                    state={client.state}
                                    balance={client.balance}
                                >
                                </ClientCard>
                            ))}
                        </div>
                    </div>
                ) : (
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
                                        {/*<input type="file" ref={fileInputRef} style={{display: 'none'}}*/}
                                        {/*       onChange={handleFileSelect} multiple/>*/}
                                        <input type="submit" value="Добавить" style={{ cursor: "pointer" }}/>
                                    </div>}
                            ></Form>}>
                    </EditModal>
                }
                {showModalGroups ? (
                    <div>
                         <span className={styles.showListButton}>
                            <Button type={"change"} title={"Добавить группу"} onClick={handleAddGroup}></Button>
                         </span>
                        <div className={styles.optionalSelects}>
                            <div className={styles.sub}>
                                <input
                                    type="text"
                                    placeholder="Кого желаете найти?"
                                    value={searchTermGroups}
                                    onChange={handleSearchChangeGroups}
                                />
                            </div>
                            <select value={selectedSportFilter} className={styles.selectFilters}
                                    onChange={handleSportFilter}>
                                <option value="" selected>все виды спорта</option>
                                {sports.map((sport, id) => (
                                    <option key={id} value={sport.title}>
                                        {sport.title}
                                    </option>
                                ))}
                            </select>
                            <select value={selectedTrainerFilter} className={styles.selectFilters}
                                    onChange={handleTrainerFilter}>
                                <option value="" selected>все тренера</option>
                                {trainers.map((trainer, id) => (
                                    <option key={id} value={`${trainer.user.first_name} ${trainer.user.last_name}`}>
                                        {trainer.user.first_name + ' ' + trainer.user.last_name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className={styles.cards}>
                            {filteredGroups.length === 0 && <p>Нет групп</p>}
                            {filteredGroups.length !== 0 && filteredGroups.map((group) => (
                                <GroupCard
                                    key={group.id}
                                    id={group.id}
                                    title={group.title}
                                    sportType={group.sportType}
                                    trainerFirstName={group.trainer.user.first_name}
                                    trainerLastName={group.trainer.user.last_name}
                                >
                                </GroupCard>
                            ))}
                         </div>
                    </div>
                ) : (
                    <div></div>
                )}
                {showModalAddGroup &&
                    <EditModal
                        onClose={handleAddGroup}
                        children={
                            <Form
                                title={'Добавление группы'}
                                children={
                                    <div className={styles.form}>
                                        <input type="text" placeholder="Название"
                                               onChange={(e) => setGroupName(e.target.value)}/>
                                        <select
                                            className={styles.selectAbonement}
                                            value={selectedSport || ""}
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
                                            value={selectedTrainer || ""}
                                            onChange={(e) => setSelectedTrainer(e.target.value)}
                                        >
                                            <option value="" disabled>Выбрать тренера</option>
                                            {trainers && trainers.map((trainer) =>
                                                (<option
                                                    key={trainer.user.id}
                                                    value={trainer.user.id}
                                                >
                                                    {trainer.user.first_name}  {trainer.user.last_name}
                                                </option>)
                                            )}
                                        </select>
                                        <Button type="button" onClick={toggleClients}>Добавить участников</Button>
                                        {showClients && (
                                            <div>
                                                {clients && clients.map((client) => (
                                                    <div key={client.id} className={styles.client}>
                                                        <input
                                                            type="checkbox"
                                                            style={{ width: '15px', margin: '0', cursor: 'pointer'}}
                                                            onChange={(e) => handleCheckboxClients(client.id, e.target.checked)}
                                                        ></input>
                                                        <div style={{ display: 'flex', flexDirection: 'row'}}>
                                                            <div>{client.firstName}</div>
                                                            <div>{client.lastName}</div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                        <Button type="button" onClick={toggleAbonements}>Добавить абонементы</Button>
                                        {showAbonements && (
                                            <div>
                                                {abonements && abonements.map((abonement) => (
                                                    <div key={abonement.id} className={styles.client}>
                                                        <input
                                                            type="checkbox"
                                                            style={{ width: '15px', margin: '0', cursor: 'pointer'}}
                                                            onChange={(e) => handleCheckboxAbonements(abonement.id, e.target.checked)}
                                                        ></input>
                                                        <div style={{ display: 'flex', flexDirection: 'row'}}>
                                                            <div>{abonement.title}</div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                        <Button type="button"  onClick={handleAddgroup}>Добавить</Button>
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
