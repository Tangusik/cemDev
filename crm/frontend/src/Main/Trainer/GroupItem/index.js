import React, {useState} from "react";


const GroupItem = (props) => {
    const { group } = props;
    const [showModalAllClients, setShowModalAllClients] = useState(false);

    const handleAllClients = () => {
        setShowModalAllClients(!showModalAllClients);
    }
    return (
        <div style={{color: '#3D5A80', fontWeight: 'bold'}} onClick={handleAllClients}>
            {props.group.name}
            {showModalAllClients ? (
                <div>
                    {group.clients.map((client) => (
                        <div style={{color: '#3D5A80', fontWeight: 'normal'}}>{client.first_name}</div>
                    ))}
                </div>
            ):(
                <div></div>
            )}
        </div>
    );
}

export default GroupItem;
