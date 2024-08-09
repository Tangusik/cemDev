import Container from "../Container";
import React, {useEffect, useState} from "react";
import axios from "axios";
import GroupItem from "./GroupItem";
import {fetchGet} from "../../api/get";

const Trainer = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const responseClientData = await fetchGet(`trainer_groups`);
            setData(responseClientData);
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

            {/*<Container*/}
            {/*    title={"Ближайшие занятия"}*/}
            {/*    polosa={true}*/}
            {/*></Container>*/}
            {/*<Container*/}
            {/*    title={"Прошедшие занятия"}*/}
            {/*></Container>*/}
        </div>
    );
}
export default Trainer;