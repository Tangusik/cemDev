import Container from "../Container/index.tsx";
import styles from './index.module.css';
import Button from "../../components/Button/index.tsx";
import React, {useEffect, useState} from "react";
import Form from "../../components/Form/index.tsx";
import EditModal from "../../components/EditModal/index.tsx";
import {fetchGet} from '../../api/get/index.ts';
import {fetchPost} from '../../api/post/index.ts';
import {fetchDelete} from '../../api/delete/index.ts';
import iconCross from '../../Icons/cross.svg';
import {IEmployeeStates, IRoles, ITrainer} from "../../api/types/types.ts";

const Admin = () => {
    const [showModalRoles, setShowModalRoles] = useState(false);
    const [showModalEmployeeStates, setShowModalEmployeeStates] = useState(false);
    const [showModalClientStates, setShowModalClientStates] = useState(false);
    const [showModalAreas, setShowModalAreas] = useState(false);
    const [showModalTypeSports, setShowModalTypeSports] = useState(false);
    const [showModalAbonements, setShowModalAbonements] = useState(false);
    const [showModalTrainers, setShowModalTrainers] = useState(false);

    const [roles, setRoles] = useState<IRoles[]>([]);
    const [employeeStates, setEmployeeStates] = useState<IEmployeeStates>();
    const [clientsStates, setClientsStates] = useState<string>('');
    const [areas, setAreas] = useState<string>('');
    const [sportTypes, setSportTypes] = useState<string>('');
    const [abonements, setAbonements] = useState<string>('');
    const [trainers, setTrainers] = useState<ITrainer[]>([]);

    const [role, setRole] = useState<string>('');
    const [employeeState, setEmployeeState] = useState<string>('');
    const [clientsState, setClientsState] = useState<string>('');
    const [area, setArea] = useState<string>('');
    const [sportType, setSportType] = useState<string>('');

    const [abonementName, setAbonementName] = useState<string>('');
    const [abonementPrice, setAbonementPrice] = useState<string>('');
    const [abonementIsDuration, setAbonementIsDuration] = useState(false);
    const [abonementDuration, setAbonementDuration] = useState<string>('');
    const [abonementDurationType, setAbonementDurationType] = useState<string>('');
    const [abonementIsLessonCount, setAbonementIsLessonCount] = useState(false);
    const [abonementLessonCount, setAbonementLessonCount] = useState<string>('');
    const [abonementSportType, setAbonementSportType] = useState<string>('');

    const [deletedItemEndpoint, setDeletedEndpoint] = useState<string>('');

    const [trainerLastName, setTrainerLastName] = useState<string>('');
    const [trainerFirstName, setTrainerFirstName] = useState<string>('');
    const [trainerMiddleName, setTrainerMiddleName] = useState<string>('');
    const [trainerEmail, setTrainerEmail] = useState<string>('');
    const [trainerBirthday, setTrainerBirthday] = useState<string>('');
    const [trainerRole, setTrainerRole] = useState<string>('');
    const [trainerPassword, setTrainerPassword] = useState<string>('');

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
    const handleTrainers = () => {
        setShowModalTrainers(!showModalTrainers)
    }

    useEffect(() => {
        const fetchGetData = async () => {
            const roles = await fetchGet('roles');
            setRoles(roles);

            const employeeStates = await fetchGet('tr_statuses');
            setEmployeeStates(employeeStates)

            const clientsStates = await fetchGet('cl_statuses');
            setClientsStates(clientsStates)

            const areas = await fetchGet('areas');
            setAreas(areas)

            const sportTypes = await fetchGet('sport_types');
            setSportTypes(sportTypes)

            const abonements = await fetchGet('abonements');
            setAbonements(abonements)

            const trainers = await fetchGet('trainer_list');
            setTrainers(trainers)

        };

        fetchGetData();
    }, []);

    const handleAddRole = async (event: any) => {
        event.preventDefault();

        const data = {
            name: role,
        };
        await fetchPost( 'roles', data);
        setShowModalRoles(false)
        window.location.reload();
    };

    const handleAddEmployeeState = async (event: any) => {
        event.preventDefault();

        const data = {
            name: employeeState,
        };
        await fetchPost( 'tr_statuses', data);
        setShowModalEmployeeStates(false)
        window.location.reload();
    };

    const handleAddClientState = async (event: any) => {
        event.preventDefault();

        const data = {
            name: clientsState,
        };
        await fetchPost( 'cl_statuses', data);
        setShowModalClientStates(false)
        window.location.reload();
    };

    const handleAddAreas = async (event: any) => {
        event.preventDefault();

        const data = {
            address: area,
        };
        await fetchPost( 'areas', data);
        setShowModalAreas(false)
        window.location.reload();
    };

    const handleAddTypeSports = async (event: any) => {
        event.preventDefault();

        const data = {
            title: sportType,
            trainers: [],
        };
        await fetchPost( 'sport_types', data);
        setShowModalTypeSports(false)
        window.location.reload();
    };

    const handleAddAbonements = async (event: any) => {
        event.preventDefault();

        const data = {
            title: abonementName,
            price: abonementPrice,
            is_duration: abonementIsDuration,
            is_lesson_count: abonementIsLessonCount,
            sport_type: abonementSportType,
            ...(abonementIsDuration && {
                duration: abonementDuration,
                duration_type: abonementDurationType,
            }),
            ...(abonementIsLessonCount && {
                lesson_count: abonementLessonCount,
            }),
        };
        await fetchPost( 'abonements', data);
        setShowModalAbonements(false)
        window.location.reload();
    };

    const handleAddTrainer = async (event: any) => {
        event.preventDefault();

        const data = {
            first_name: trainerFirstName,
            last_name: trainerLastName,
            otchestv: trainerMiddleName,
            birth_date: trainerBirthday,
            email: trainerEmail,
            role: trainerRole,
            password: trainerPassword,
        };
        await fetchPost( 'trainer_create', data);
        setShowModalTrainers(false)
        window.location.reload();
    }

    useEffect(() => {
        const performDeletion = async () => {
            if (deletedItemEndpoint !== '') {
                await fetchDelete(deletedItemEndpoint).then((res) => {
                    if (res){
                        window.location.reload()
                    }
                });
                setDeletedEndpoint('');
            }
        };

        performDeletion();
    }, [deletedItemEndpoint]);



    // @ts-ignore
    return (
        <div>
            <Container
                title={"Тренера"}
                polosa={true}
                children={
                    <>
                        {trainers && trainers.map((trainer: ITrainer) =>
                            <div key={trainer.id} className={styles.row}>
                                <div style={{color: '#293241'}}>{trainer.user.first_name} {trainer.user.last_name}</div>
                                <div style={{cursor: 'pointer'}} onClick={() => {
                                    setDeletedEndpoint(`trainer_delete/${trainer.user.id}`);
                                }}><img src={iconCross} alt=''/></div>
                            </div>
                        )}
                        <Button style={{marginTop: '1em'}} type={"change"} title={"Добавить сотрудника"} onClick={handleTrainers}></Button>
                    </>
                }
            ></Container>
            {showModalTrainers &&
                <EditModal
                    onClose={handleRoles}
                    >
                        <Form
                            onSubmit={handleAddTrainer}
                            title={'Добавление сотрудника'}
                            >
                                <div>
                                    <input type="text" placeholder="Имя" onChange={(e) => setTrainerFirstName(e.target.value)} required/>
                                    <input type="text" placeholder="Фамилия" onChange={(e) => setTrainerLastName(e.target.value)} required/>
                                    <input type="text" placeholder="Отчество" onChange={(e) => setTrainerMiddleName(e.target.value)} required/>
                                    <input type="date" placeholder="Дата рождения" onChange={(e) => setTrainerBirthday(e.target.value)} required/>
                                    <input type="text" placeholder="Почта" onChange={(e) => setTrainerEmail(e.target.value)} required/>
                                    <input type="text" placeholder="Пароль" onChange={(e) => setTrainerPassword(e.target.value)} required/>
                                    <select className={styles.select} onChange={(e) => setTrainerRole(e.target.value)}>
                                        <option value="" disabled selected>роль</option>
                                        {roles.map((role)=>
                                            (<option key={role.id} value={role.id}>{role.name}</option>)
                                        )}
                                    </select>
                                    <input type="submit" value="Добавить"/>
                                </div>
                        </Form>
                </EditModal>
            }



            <Container
                title={"Роли сотрудников"}
                polosa={true}
                children={
                <>
                {roles && roles.map((role) =>
                    <div key={role.id} className={styles.row}>
                        <div style={{color: '#293241'}}>{role.name}</div>
                        <div style={{cursor: 'pointer'}} onClick={() => {
                            setDeletedEndpoint(`delete_role/${role.id}`);
                        }}><img src={iconCross} alt=''/></div>
                    </div>
                )}
                    <Button style={{marginTop: '1em'}} type={"change"} title={"Добавить роль"} onClick={handleRoles}></Button>
                </>
                }
            ></Container>
            {showModalRoles &&
                <EditModal
                    onClose={handleRoles}
                    modalChildren={
                        <Form
                            onSubmit={handleAddRole}
                            title={'Добавление роли'}
                            children={
                                <div>
                                    <input type="text" name="role" placeholder="Название роли" onChange={(e) => setRole(e.target.value)} required/>
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
                    {employeeStates && employeeStates.map((employeeState) =>
                        <div key={employeeState.id} className={styles.row}>
                            <div style={{color: '#293241'}}>{employeeState.name}</div>
                            <div style={{cursor: 'pointer'}} onClick={() => {
                                setDeletedEndpoint(`tr_status_delete/${employeeState.id}`);
                            }}><img src={iconCross} alt=''/></div>
                        </div>
                    )}
                    <Button style={{marginTop: '1em'}} type={"change"} title={"Добавить статус"} onClick={handleEmployeeStates}></Button>
                </>
                }
            ></Container>
            {showModalEmployeeStates &&
                <EditModal
                    onClose={handleEmployeeStates}
                    modalChildren={
                        <Form
                            onSubmit={handleAddEmployeeState}
                            title={'Добавление статуса сотрудников'}
                            children={
                                <div>
                                    <input type="text" name="trainer_state" placeholder="Название статуса" onChange={(e) => setEmployeeState(e.target.value)} required/>
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
                    {clientsStates && clientsStates.map((clientsState) =>
                        <div key={clientsState.id} className={styles.row}>
                            <div style={{color: '#293241'}}>{clientsState.name}</div>
                            <div style={{cursor: 'pointer'}} onClick={() => {
                                setDeletedEndpoint(`cl_status_delete/${clientsState.id}`);
                            }}><img src={iconCross} alt=''/></div>
                        </div>
                    )}
                    <Button style={{marginTop: '1em'}} type={"change"} title={"Добавить статус"} onClick={handleClientStates}></Button>
                </>
                }
            ></Container>
            {showModalClientStates &&
                <EditModal
                    onClose={handleClientStates}
                    modalChildren={
                        <Form
                            onSubmit={handleAddClientState}
                            title={'Добавление статуса клиентов'}
                            children={
                                <div>
                                    <input type="text" name="client_state" placeholder="Название статуса" onChange={(e) => setClientsState(e.target.value)} required/>
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
                    {areas && areas.map((area) =>
                        <div key={area.id} className={styles.row}>
                            <div style={{color: '#293241'}}>{area.address}</div>
                            <div style={{cursor: 'pointer'}} onClick={() => {
                                setDeletedEndpoint(`area_delete/${area.id}`);
                            }}><img src={iconCross} alt=''/></div>
                        </div>
                    )}
                    <Button style={{marginTop: '1em'}} type={"change"} title={"Добавить площадку"} onClick={handleAreas}></Button>
                </>
                }
            ></Container>
            {showModalAreas &&
                <EditModal
                    onClose={handleAreas}
                    modalChildren={
                        <Form
                            onSubmit={handleAddAreas}
                            title={'Добавление площадки'}
                            children={
                                <div>
                                    <input type="text" name="address" placeholder="Адрес площадки" onChange={(e) => setArea(e.target.value)} required/>
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
                    {sportTypes && sportTypes.map((sportType)=>
                        <div key={sportType.id} className={styles.row}>
                            <div style={{color: '#293241'}}>{sportType.title}</div>
                            <div style={{cursor: 'pointer'}} onClick={() => {
                                setDeletedEndpoint(`sport_type_delete/${sportType.id}`);
                            }}><img src={iconCross} alt=''/></div>
                        </div>
                    )}
                    <Button style={{marginTop: '1em'}} type={"change"} title={"Добавить вид спорта"} onClick={handleTypeSports}></Button>
                </>
                }
            ></Container>
            {showModalTypeSports &&
                <EditModal
                    onClose={handleTypeSports}
                    modalChildren={
                        <Form
                            onSubmit={handleAddTypeSports}
                            title={'Добавление вида спорта'}
                            children={
                                <div>
                                    <input type="text" name="title" placeholder="Вид спорта" onChange={(e) => setSportType(e.target.value)} required/>
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
                    {abonements && abonements.map((abonement)=>
                        <div key={abonement.id} className={styles.row}>
                            <div style={{color: '#293241'}}>{abonement.title}</div>
                            <div style={{cursor: 'pointer'}} onClick={() => {
                                setDeletedEndpoint(`abonement_delete/${abonement.id}`);
                            }}><img src={iconCross} alt=''/></div>
                        </div>
                    )}
                    <Button style={{marginTop: '1em'}} type={"change"} title={"Добавить абонемент"} onClick={handleAbonements}></Button>
                </>
                }
            ></Container>
            {showModalAbonements &&
                <EditModal
                    onClose={handleAbonements}
                    modalChildren={
                        <Form
                            onSubmit={handleAddAbonements}
                            title={'Добавление абонемента'}
                            children={
                                <div>
                                    <input type="text" name="title" placeholder="Название абонемента" onChange={(e) => setAbonementName(e.target.value)} required/>
                                        <input type="text" name="price" placeholder="Цена абонемента" onChange={(e) => setAbonementPrice(e.target.value)} required/>
                                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                            <input
                                                type="checkbox"
                                                checked={abonementIsDuration}
                                                onChange={e => setAbonementIsDuration(e.target.checked)}
                                                style={{width: '20px', marginLeft: '-20px'}}
                                            />
                                            <input
                                                type="text"
                                                name="duration"
                                                placeholder="Длительность"
                                                style={{ marginRight: '1em'}}
                                                disabled={!abonementIsDuration}
                                                onChange={e => setAbonementDuration(e.target.value)}
                                            />
                                            <select name="duration_type" className={styles.select} onChange={(e) => setAbonementDurationType(e.target.value)} style={{width:'fit-content'}}>
                                                <option value="" disabled selected>диапазон</option>
                                                <option value="days">Дней</option>
                                                <option value="weeks">Недель</option>
                                                <option value="month">Месяцев</option>
                                            </select>
                                        </div>
                                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                            <input
                                                type="checkbox"
                                                checked={abonementIsLessonCount}
                                                onChange={e => setAbonementIsLessonCount(e.target.checked)}
                                                style={{width: '20px', marginLeft: '-20px'}}
                                            />
                                            <input
                                                type="text"
                                                name="count"
                                                placeholder="Количество занятий"
                                                disabled={!abonementIsLessonCount}
                                                onChange={(e) => setAbonementLessonCount(e.target.value)}
                                            />
                                        </div>
                                        <select id="select_sport" name="sport" className={styles.select} onChange={(e) => setAbonementSportType(e.target.value)}>
                                            <option value="" disabled selected>вид спорта</option>
                                            {sportTypes.map((sportType)=>
                                                (<option key={sportType.id} value={sportType.id}>{sportType.title}</option>)
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