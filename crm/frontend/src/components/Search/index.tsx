import styles from './index.module.css';
import { useState } from "react";

const Search = (props) => {
    const { colleagues } = props;
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const getFullName = (colleague) => {
        return `${colleague.user.first_name} ${colleague.user.last_name}`;
    };

    const filteredColleagues = colleagues.filter(colleague => {
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