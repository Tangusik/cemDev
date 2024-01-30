import Container from "../Container";
import styles from './index.module.css';
import Button from "../../components/Button";
import React, {useEffect, useState} from "react";
import Form from "../../components/Form";
import EditModal from "../../components/EditModal";
import axios from "axios";

const Admin = () => {
    const [showModalRoles, setShowModalRoles] = useState(false);
    const [showModalEmployeeStates, setShowModalEmployeeStates] = useState(false);
    const [showModalClientStates, setShowModalClientStates] = useState(false);
    const [showModalAreas, setShowModalAreas] = useState(false);
    const [showModalTypeSports, setShowModalTypeSports] = useState(false);
    const [showModalAbonements, setShowModalAbonements] = useState(false);

    const [isDurationActive, setIsDurationActive] = useState(false);
    const [isCountActive, setIsCountActive] = useState(false);

    const [roles, setRoles] = useState([]);
    const [employeeStates, setEmployeeStates] = useState([]);
    const [clientsStates, setClientsStates] = useState([]);
    const [areas, setAreas] = useState([]);
    const [sportTypes, setSportTypes] = useState([]);
    const [abonements, setAbonements] = useState([]);

    const handleRoles = () => {
        setShowModalRoles(!showModalRoles)
    }
    const handleEmployeeStates = () => {
        setShowModalEmployeeStates(!showModalEmployeeStates)
    }
    const handleClientStates = () => {
        setShowModalClientStates(!showModalClientStates)
    }
    const handleAreas = () => {
        setShowModalAreas(!showModalAreas)
    }
    const handleTypeSports = () => {
        setShowModalTypeSports(!showModalTypeSports)
    }
    const handleAbonements = () => {
        setShowModalAbonements(!showModalAbonements)
    }

    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const port = 8000;
                axios.defaults.baseURL = `http://localhost:${port}`;
                axios.defaults.withCredentials = true;
                const response = await axios.get('crm/roles');
                setRoles(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchRoles();
    }, []);

    useEffect(() => {
        const fetchEmployeeStates = async () => {
            try {
                const port = 8000;
                axios.defaults.baseURL = `http://localhost:${port}`;
                axios.defaults.withCredentials = true;
                const response = await axios.get('crm/tr_statuses');
                setEmployeeStates(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchEmployeeStates();
    }, []);

    useEffect(() => {
        const fetchClientsStates = async () => {
            try {
                const port = 8000;
                axios.defaults.baseURL = `http://localhost:${port}`;
                axios.defaults.withCredentials = true;
                const response = await axios.get('crm/cl_statuses');
                setClientsStates(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchClientsStates();
    }, []);

    useEffect(() => {
        const fetchAreas = async () => {
            try {
                const port = 8000;
                axios.defaults.baseURL = `http://localhost:${port}`;
                axios.defaults.withCredentials = true;
                const response = await axios.get('crm/areas');
                setAreas(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchAreas();
    }, []);

    useEffect(() => {
        const fetchSportTypes = async () => {
            try {
                const port = 8000;
                axios.defaults.baseURL = `http://localhost:${port}`;
                axios.defaults.withCredentials = true;
                const response = await axios.get('crm/sport_types');
                setSportTypes(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchSportTypes();
    }, []);

    useEffect(() => {
        const fetchAbonements = async () => {
            try {
                const port = 8000;
                axios.defaults.baseURL = `http://localhost:${port}`;
                axios.defaults.withCredentials = true;
                const response = await axios.get('crm/abonements');
                setAbonements(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchAbonements();
    }, []);

    return (
        <div>
            <Container
                title={"Роли сотрудников"}
                polosa={true}
                children={
                <>
                {roles.map((role)=>
                    (<div style={{color: '#293241'}}>{role.name}</div>)
                )}
                    <Button style={{marginTop: '1em'}} type={"change"} title={"Добавить роль"} onClick={handleRoles}></Button>
                </>
                }
            ></Container>
            {showModalRoles &&
                <EditModal
                    onClose={handleRoles}
                    children={
                        <Form
                            title={'Добавление роли'}
                            children={
                                <div>
                                    <input type="text" name="role" placeholder="Название роли" required/>
                                    <input type="submit" value="Добавить"/>
                                </div>}
                        ></Form>}>
                </EditModal>
            }
            <Container
                title={"Статусы сотрудников"}
                polosa={true}
                children={
                <>
                    {employeeStates.map((employeeState)=>
                        (<div style={{color: '#293241'}}>{employeeState.name}</div>)
                    )}
                    <Button style={{marginTop: '1em'}} type={"change"} title={"Добавить статус"} onClick={handleEmployeeStates}></Button>
                </>
                }
            ></Container>
            {showModalEmployeeStates &&
                <EditModal
                    onClose={handleEmployeeStates}
                    children={
                        <Form
                            title={'Добавление статуса сотрудников'}
                            children={
                                <div>
                                    <input type="text" name="trainer_state" placeholder="Название статуса" required/>
                                    <input type="submit" value="Добавить"/>
                                </div>}
                        ></Form>}>
                </EditModal>
            }
            <Container
                title={"Статусы клиентов"}
                polosa={true}
                children={
                <>
                    {clientsStates.map((clientsState)=>
                        (<div style={{color: '#293241'}}>{clientsState.name}</div>)
                    )}
                    <Button style={{marginTop: '1em'}} type={"change"} title={"Добавить статус"} onClick={handleClientStates}></Button>
                </>
                }
            ></Container>
            {showModalClientStates &&
                <EditModal
                    onClose={handleClientStates}
                    children={
                        <Form
                            title={'Добавление статуса клиентов'}
                            children={
                                <div>
                                    <input type="text" name="client_state" placeholder="Название статуса" required/>
                                    <input type="submit" value="Добавить"/>
                                </div>}
                        ></Form>}>
                </EditModal>
            }
            <Container
                title={"Площадки"}
                polosa={true}
                children={
                <>
                    {areas.map((area)=>
                        (<div style={{color: '#293241'}}>{area.address}</div>)
                    )}
                    <Button style={{marginTop: '1em'}} type={"change"} title={"Добавить площадку"} onClick={handleAreas}></Button>
                </>
                }
            ></Container>
            {showModalAreas &&
                <EditModal
                    onClose={handleAreas}
                    children={
                        <Form
                            title={'Добавление площадки'}
                            children={
                                <div>
                                    <input type="text" name="address" placeholder="Адрес площадки" required/>
                                    <input type="submit" value="Добавить"/>
                                </div>}
                        ></Form>}>
                </EditModal>
            }
            <Container
                title={"Виды спорта"}
                polosa={true}
                children={
                <>
                    {sportTypes.map((sportType)=>
                        (<div style={{color: '#293241'}}>{sportType.title}</div>)
                    )}
                    <Button style={{marginTop: '1em'}} type={"change"} title={"Добавить вид спорта"} onClick={handleTypeSports}></Button>
                </>
                }
            ></Container>
            {showModalTypeSports &&
                <EditModal
                    onClose={handleTypeSports}
                    children={
                        <Form
                            title={'Добавление вида спорта'}
                            children={
                                <div>
                                    <input type="text" name="title" placeholder="Вид спорта" required/>
                                    <input type="submit" value="Добавить"/>
                                </div>}
                        ></Form>}>
                </EditModal>
            }
            <Container
                title={"Абонементы"}
                polosa={true}
                children={
                <>
                    {abonements.map((abonement)=>
                        (<div style={{color: '#293241'}}>{abonement.title}</div>)
                    )}
                    <Button style={{marginTop: '1em'}} type={"change"} title={"Добавить абонемент"} onClick={handleAbonements}></Button>
                </>
                }
            ></Container>
            {showModalAbonements &&
                <EditModal
                    onClose={handleAbonements}
                    children={
                        <Form
                            title={'Добавление абонемента'}
                            children={
                                <div>
                                    <input type="text" name="title" placeholder="Название абонемента" required/>
                                        <input type="text" name="price" placeholder="Цена абонемента" required/>
                                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                            <input
                                                type="checkbox"
                                                checked={isDurationActive}
                                                onChange={e => setIsDurationActive(e.target.checked)}
                                                style={{width: '20px', marginLeft: '-20px'}}
                                            />
                                            <input
                                                type="text"
                                                name="duration"
                                                placeholder="Длительность"
                                                style={{ marginRight: '1em'}}
                                                disabled={!isDurationActive}
                                            />
                                            <select name="duration_type" required className={styles.selectSport} style={{width:'fit-content'}}>
                                                <option value="days">Дней</option>
                                                <option value="weeks">Недель</option>
                                                <option value="month">Месяцев</option>
                                            </select>
                                        </div>
                                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                            <input
                                                type="checkbox"
                                                checked={isCountActive}
                                                onChange={e => setIsCountActive(e.target.checked)}
                                                style={{width: '20px', marginLeft: '-20px'}}
                                            />
                                            <input
                                                type="text"
                                                name="count"
                                                placeholder="Количество занятий"
                                                disabled={!isCountActive}
                                            />
                                        </div>
                                        <select id="select_sport" name="sport" className={styles.selectSport}>
                                            {sportTypes.map((sportType)=>
                                                (<option>{sportType.title}</option>)
                                            )}
                                        </select>
                                    <input type="submit" value="Добавить"/>
                                </div>}
                        ></Form>}>
                </EditModal>
            }
        </div>
    );
}
export default Admin;