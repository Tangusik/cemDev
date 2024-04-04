import React, {useEffect, useState} from 'react';
import Header from "../components/Header/index.tsx";
import Footer from "../components/Footer/index.tsx";
import axios from "axios";
import styles from "../Colleagues/index.module.css";
import ColleagueCard from "../components/ColleagueCard/index.tsx";
import {ITrainer} from "../api/types/types.ts";

const Colleagues = () => {
    const [colleagues, setColleagues] = useState([]);

    useEffect(() => {
        const fetchColleagues = async () => {
            try {
                const port = 8000;
                axios.defaults.baseURL = `http://localhost:${port}`;
                axios.defaults.withCredentials = true;
                const response = await axios.get('crm/trainer_list');
                setColleagues(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchColleagues();
    }, []);

    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (e: any) => {
        setSearchTerm(e.target.value);
    };

    const getFullName = (colleague: ITrainer) => {
        return `${colleague.user.first_name} ${colleague.user.last_name}`;
    };

    const filteredColleagues = colleagues.filter(colleague => {
        const fullName = getFullName(colleague).toLowerCase();
        return fullName.includes(searchTerm.toLowerCase());
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
                {filteredColleagues.length===0 && <p>Нет клиентов</p>}
                {filteredColleagues.map((colleague: ITrainer) => (
                    <ColleagueCard trainer={colleague}/>
                ))}
            </div>
            <Footer></Footer>
        </div>
    );
}

export default Colleagues;
