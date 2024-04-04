import styles from './index.module.css';
import React, { useState } from "react";
import {ISearchProps} from "./types.ts";
import {ITrainer} from "../../api/types/types.ts";

const Search = (props: ISearchProps) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (e: any) => {
        setSearchTerm(e.target.value);
    };

    const getFullName = (colleague: ITrainer) => {
        return `${colleague.user.first_name} ${colleague.user.last_name}`;
    };

    const filteredColleagues = props.colleagues.filter(colleague => {
        const fullName = getFullName(colleague).toLowerCase();
        return fullName.includes(searchTerm.toLowerCase());
    });

    return (
        <div className={styles.search_div}>
            <h3>Поиск</h3>
            <div className={styles.sub}>
                <input
                    type="text"
                    placeholder="Кого желаете найти?"
                    value={searchTerm}
                    onChange={handleSearchChange}>
                </input>
                    <button>Найти</button>
            </div>
            <div>
                {filteredColleagues.map(colleague => (
                    <div key={colleague.user.id}>{getFullName(colleague)}</div>
                ))}
            </div>
        </div>
    );
}
export default Search;