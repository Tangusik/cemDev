import React, {useEffect, useState} from 'react';
import Header from "../components/Header";
import Footer from "../components/Footer";
import axios from "axios";
import styles from "../Colleagues/index.module.css";
import ColleagueCard from "../components/ColleagueCard";
import {fetchGet} from "../api/get";

const Colleagues = () => {
    const [colleagues, setColleagues] = useState([]);
    const [employeeStates, setEmployeeStates] = useState([]);
    const [employeeRoles, setEmployeeRoles] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('');
    const [selectedRole, setSelectedRole] = useState('');

    useEffect(() => {
        const fetchColleagues = async () => {
            try {
                const colleagues = await fetchGet('trainer_list');
                setColleagues(colleagues);

                const employeeStates = await fetchGet('tr_statuses');
                setEmployeeStates(employeeStates);

                const employeeRoles = await fetchGet('roles');
                setEmployeeRoles(employeeRoles);
            } catch (error) {
                console.error(error);
            }
        };

        fetchColleagues();
    }, []);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleStatusChange = (e) => {
        setSelectedStatus(e.target.value);
    };

    const handleRoleChange = (e) => {
        setSelectedRole(e.target.value);
    };

    const getFullName = (colleague) => {
        return `${colleague.user.first_name} ${colleague.user.last_name}`;
    };

    const filteredColleagues = colleagues.filter(colleague => {
        const fullName = getFullName(colleague).toLowerCase();
        const matchesSearchTerm = fullName.includes(searchTerm.toLowerCase());
        const matchesStatus = selectedStatus ? colleague.state === selectedStatus : true;
        const matchesRole = selectedRole ? colleague.role === selectedRole : true;
        return matchesSearchTerm && matchesStatus && matchesRole;
    });

    return (
        <div>
            <Header></Header>
            <div className={styles.search_div}>
                <h3>Поиск</h3>
                <div className={styles.sub}>
                    <input
                        type="text"
                        placeholder="Кого желаете найти?"
                        value={searchTerm}
                        onChange={handleSearchChange}>
                    </input>
                </div>
            </div>
            <div className={styles.cards}>
                <div className={styles.optionalSelects}>
                    <select value={selectedStatus} className={styles.select} onChange={handleStatusChange}>
                        <option value="" selected>все статусы</option>
                        {employeeStates.map((status, id) => (
                            <option key={id} value={status.title}>
                                {status.title}
                            </option>
                        ))}
                    </select>
                    <select value={selectedRole} className={styles.select} onChange={handleRoleChange}>
                        <option value="" selected>все роли</option>
                        {employeeRoles.map((role, id) => (
                            <option key={id} value={role.title}>
                                {role.title}
                            </option>
                        ))}
                    </select>
                </div>
                {filteredColleagues.length === 0 && <p>Нет клиентов</p>}
                {filteredColleagues.map((colleague) => (
                    <ColleagueCard
                        id={colleague.id}
                        firstName={colleague.user.first_name}
                        lastName={colleague.user.last_name}
                        middleName={colleague.middleName}
                        birthday={colleague.birthDate}
                        role={colleague.role}
                        state={colleague.state}
                    ></ColleagueCard>
                ))}
            </div>
            <Footer></Footer>
        </div>
    );
}

export default Colleagues;
