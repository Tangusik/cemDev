import React, {useEffect, useState} from 'react';
import Header from "../components/Header";
import Footer from "../components/Footer";
import Search from "../components/Search";
import axios from "axios";
import styles from "../Colleagues/index.module.css";
import ColleagueCard from "../components/ColleagueCard";

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

    return (
        <div>
            <Header></Header>
            <div className={styles.cards}>
                {colleagues.length===0 && <p>Нет клиентов</p>}
                {colleagues.map((colleague) => (
                    <ColleagueCard
                        id={colleague.id}
                        name={colleague.user.first_name}
                        lastName={colleague.user.last_name}
                        surname={colleague.otchestv}
                        birthdate={colleague.birthdate}
                        role={colleague.role.name}
                        state={colleague.state.name}
                    ></ColleagueCard>
                ))}
            </div>
            <Search></Search>
            <Footer></Footer>
        </div>
    );
}

export default Colleagues;
