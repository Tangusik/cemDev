import Container from "../Container";
import React, {useEffect, useState} from "react";
import axios from "axios";
import GroupItem from "./GroupItem";

const Trainer = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const port = 8000;
                axios.defaults.baseURL = `http://localhost:${port}`;
                axios.defaults.withCredentials = true;
                const response = await axios.get('crm/trainer_groups');
                setData(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <Container
                title={"Мои группы и клиенты"}
                polosa={true}
                children={
                    <>
                        {data.map((group, index) => (
                            <GroupItem key={index} group={group}></GroupItem>
                        ))}
                    </>
                }
            >
            </Container>

            <Container
                title={"Ближайшие занятия"}
                polosa={true}
            ></Container>
            <Container
                title={"Прошедшие занятия"}
            ></Container>
        </div>
    );
}
export default Trainer;