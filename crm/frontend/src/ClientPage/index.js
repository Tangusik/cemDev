import React, {useEffect, useState} from 'react';
import Header from "../components/Header";
import Footer from "../components/Footer";
import Photo from "../components/Photo";
import styles from "./index.module.css";
import Button from "../components/Button";
import EditModal from "../components/EditModal";
import Form from "../components/Form";
import { useParams } from 'react-router-dom';
import { fetchGet } from '../api/get';
import {fetchPost} from "../api/post";
import {fetchDelete} from "../api/delete";

const ClientPage = () => {
    let { id }= useParams();
    const [client, setClient] = useState(null);
    const [clientGroups, setClientGroups] = useState(null);
    const [abonements, setAbonements] = useState([]);
    const [clientAbonements, setClientAbonements] = useState(null);
    const [showModalEditClient, setShowModalEditClient] = useState(false);
    const [showModalAddBalance, setShowModalAddBalance] = useState(false);
    const [showModalAddAbonement, setShowModalAddAbonement] = useState(false);
    const [clientsStates, setClientsStates] = useState([]);

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [state, setState] = useState('');

    const [abonementAdd, setAbonementAdd] = useState(null);
    const [balanceAdd, setBalanceAdd] = useState(null);

    const [deletedAbonementEndpoint, setDeletedAbonementEndpoint] = useState([]);

    const handleEditClientModal = () => {
        setShowModalEditClient(!showModalEditClient);
    }

    const handleAddBalanceModal = () => {
        setShowModalAddBalance(!showModalAddBalance);
    }

    const handleAddAbonementModal = () => {
        setShowModalAddAbonement(!showModalAddAbonement);
    }

    useEffect( () => {
        const fetchData = async () => {
            const responseClientData = await fetchGet(`client/${id}`);
            setClient(responseClientData);

            const responseClientGroups = await fetchGet(`client/${id}/groups`);
            setClientGroups(responseClientGroups);

            const responseClientAbonements = await fetchGet(`client/${id}/abonements`);
            setClientAbonements(responseClientAbonements);

            const abonements = await fetchGet('abonements');
            setAbonements(abonements)

            const clientsStates = await fetchGet('cl_statuses');
            setClientsStates(clientsStates)
        }

        fetchData();
    }, [id]);

    function filterObject(obj) {
        return Object.keys(obj).reduce((acc, key) => {
            if (obj[key] !== "") {
                acc[key] = obj[key];
            }
            return acc;
        }, {});
    }

    const handleEditClient = async (event) => {
        event.preventDefault();

        let noFilterData = {
            firstName: firstName,
            lastName: lastName,
            birthDate: birthDate,
            // state: state,
        };
        const data = filterObject(noFilterData);
        await fetchPost( `client/${id}`, data);
        setShowModalEditClient(false)
        window.location.reload();
    };

    const handleAddAbonement = async (event) => {
        event.preventDefault();

        let data = {
            abonement: abonementAdd,
        };
        await fetchPost( `client/${id}/abonements`, data);
        setShowModalAddAbonement(false)
        window.location.reload();
    };

    const handleAddBalance = async (event) => {
        event.preventDefault();

        let data = {
            balance: balanceAdd,
        };
        await fetchPost( `client/${id}/addbalance`, data);
        setShowModalAddBalance(false)
        window.location.reload();
    }

    useEffect(() => {
        const performDeletion = async () => {
            if (deletedAbonementEndpoint !== '') {
                await fetchDelete(deletedAbonementEndpoint).then((res) => {
                    if (res){
                        window.location.reload()
                    }
                });
                setDeletedAbonementEndpoint('');
            }
        };

        performDeletion();
    }, [deletedAbonementEndpoint]);

    if (!client) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Header></Header>
            <div className={styles.studentPage}>
                <div className={styles.side}>
                    <Photo></Photo>
                    <div className={styles.studentData}>
                        <div>{client.lastName} {client.firstName} {client.middleName}</div>
                        <div>{client.birthDate}</div>
                        <div>{client.balance}</div>
                        <div>{client.state}</div>
                        {clientGroups && clientGroups.map((group)=> (
                            <div key={group.id}>{group.name}</div>
                        ))}
                    </div>
                    <Button title={"Редактировать профиль"} style={{marginTop: '15px'}} onClick={handleEditClientModal}></Button>
                    <Button title={"Пополнить баланс"} style={{marginTop: '30px'}} onClick={handleAddBalanceModal}></Button>
                </div>

                <div className={styles.main}>

                    <div style={{textAlign: 'center'}}>
                        <div className={styles.containerText}>
                            <div className={styles.abonements}>
                                <div>Активные абонементы</div>
                                {clientAbonements && <div>{clientAbonements.length}</div>}
                            </div>
                            <Button onClick={handleAddAbonementModal}>Добавить</Button>
                        </div>
                        <div className={styles.list}>
                            {clientAbonements && clientAbonements.map((abonement) => (
                                <div style={{height: '400px', minWidth: '300px', backgroundColor: '#43638d', borderRadius: '10px'}}>
                                    <button style={{float: 'right', padding: '10px', borderRadius:'0 30px 0 30px', cursor: 'pointer'}} onClick={() => {
                                        setDeletedAbonementEndpoint(`client/${id}/abonements/${abonement.id}`);
                                    }}>Удалить</button>
                                    <h3 style={{color: 'white', marginTop: '50px'}}>{abonement.abonement.title}</h3>
                                    <h5 style={{color: 'white', marginTop: '50px'}}>Дата покупки: {abonement.purchaseDate}</h5>
                                    {abonement.endDate && <h5 style={{color: 'white', marginTop: '50px'}}>Дата окончания: {abonement.endDate}</h5>}
                                    {/*<h3 style={{color: 'white', marginTop: '50px'}}>{abonement.status.title}</h3>*/}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className={styles.container}>
                        <div className={styles.containerText}>
                            <h3>Другие абонементы</h3>
                            <h4>Нажми на интересующий тип абонементов и узнай больше!</h4>
                        </div>
                        <div>
                            <div className={`${styles.rectangle} ${styles.rectangleRight} ${styles.rectangleBack}`}
                                 style={{width: '12em', marginLeft: '10em'}}>
                                <h2 style={{fontSize: '1.2em', paddingTop: '3em'}}>Завершенные</h2>
                                <h1>39</h1>
                            </div>
                            <div className={`${styles.rectangle} ${styles.rectangleLeft} ${styles.rectangleFront}`} style={{width: '12em'}}>
                                <h2 style={{fontSize: '1.2em', paddingTop: '3em'}}>Остановленные</h2>
                                <h1>9</h1>
                            </div>
                        </div>
                    </div>

                    <div className={styles.container}>
                        <div>
                            <div className={`${styles.rectangle} ${styles.rectangleLeft} ${styles.rectangleBack}`}>
                                <a href="#"><h2 style={{fontSize: '1.2em', paddingTop: '1em'}}>Пропущено занятий:</h2>
                                    <h1>14</h1></a>
                            </div>
                            <div className={`${styles.rectangle} ${styles.rectangleRight} ${styles.rectangleFront}`}>
                                <a href="#"><h2 style={{fontSize: '1.2em', paddingTop: '2em'}}>Посещено занятий:</h2>
                                    <h1>15</h1></a>
                            </div>
                        </div>
                        <div className={styles.containerText}>
                            <h3>Занятия</h3>
                        </div>
                    </div>

                    <div className={styles.container}>
                        <div className={styles.containerText}>
                            <h3>Достижения</h3>
                            <h4>Тут очень увлекательный текст про достижения</h4>
                        </div>
                        <div>
                            <div className={`${styles.rectangle} ${styles.rectangleRight} ${styles.rectangleBack}`}>
                                <a href="#"><h2 style={{fontSize: '1.2em', paddingTop: '2em'}}>Награды</h2>
                                    <h1>28</h1></a>
                            </div>
                            <div className={`${styles.rectangle} ${styles.rectangleLeft} ${styles.rectangleFront}`}>
                                 <a href="#"><h2 style={{fontSize: '1.2em', paddingTop: '3em'}}>Участие</h2>
                                    <h1>39</h1></a>
                            </div>
                        </div>
                    </div>

                    <div className={styles.skills}>
                        <h3>Навыки</h3>
                        <p>Выносливость</p>
                        <div className={styles.containerSkills}>
                            <div className={`${styles.skills} ${styles.html}`}>90%</div>
                        </div>

                        <p>Координация</p>
                        <div className={styles.containerSkills}>
                            <div className={`${styles.skills} ${styles.css}`}>80%</div>
                        </div>

                        <p>Гибкость</p>
                        <div className={styles.containerSkills}>
                            <div className={`${styles.skills} ${styles.js}`}>65%</div>
                        </div>

                        <p>Реакция</p>
                        <div className={styles.containerSkills}>
                            <div className={`${styles.skills} ${styles.php}`}>60%</div>
                        </div>
                    </div>


                    <div className={styles.ecip}>
                        <h3>Экипировка</h3>
                        <h4>Нажмите на интересующую вас статистику, чтобы узнать больше</h4>
                    </div>

                </div>
            </div>
            {showModalEditClient &&
                <EditModal
                    onClose={handleEditClientModal}
                    children={
                        <Form
                            onSubmit={handleEditClient}
                            title={'Редактирование профиля'}
                            children={
                                <div>
                                    <input type="text" placeholder={client.firstName}
                                           defaultValue={client.firstName}
                                           onChange={(e) => setFirstName(e.target.value)}/>
                                    <input type="text" placeholder={client.lastName}
                                           defaultValue={client.lastName}
                                           onChange={(e) => setLastName(e.target.value)}/>
                                    <input type="date" placeholder={client.birthDate}
                                           defaultValue={client.birthDate}
                                           onChange={(e) => setBirthDate(e.target.value)}/>
                                    <select required className={styles.select}
                                            onChange={(e) => setState(e.target.value)}>
                                        {clientsStates.map((state) =>
                                            (<option key={state.id} value={state.id}>{state.title}</option>)
                                        )}
                                    </select>
                                    <input type="submit" value="Добавить"/>
                                </div>}
                        ></Form>}>
                </EditModal>
            }
            {showModalAddBalance &&
                <EditModal
                    onClose={handleAddBalanceModal}
                    children={
                        <Form
                            onSubmit={handleAddBalance}
                            title={'Пополнение баланса'}
                            children={
                                <div>
                                    <input type="text" name="client_balance" id="client_balance" placeholder="Сумма" onChange={(e) => setBalanceAdd(e.target.value)}/>
                                    <input type="submit" value="Добавить"/>
                                </div>}
                        ></Form>}>
                </EditModal>
            }
            {showModalAddAbonement &&
                <EditModal
                    onClose={handleAddAbonementModal}
                    children={
                        <Form
                            onSubmit={handleAddAbonement}
                            title={'Добавление абонемента'}
                            children={
                                <div>
                                    <select id="state" required name="state" className={styles.select} onChange={(e) => setAbonementAdd(e.target.value)}>
                                        <option value="" disabled selected>абонементы</option>
                                        {abonements.map((abonement)=>
                                            (<option key={abonement.id} value={abonement.id}>{abonement.title}</option>)
                                        )}
                                    </select>
                                    <input type="submit" value="Добавить"/>
                                </div>}
                        ></Form>}>
                </EditModal>
            }
            <Footer></Footer>
        </div>
    );
}

export default ClientPage;
