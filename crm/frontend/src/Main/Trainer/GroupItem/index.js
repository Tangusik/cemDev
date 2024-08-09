import React, {useState} from "react";


const GroupItem = (props) => {
    const { group } = props;
    const [showModalAllClients, setShowModalAllClients] = useState(false);

    const handleAllClients = () => {
        setShowModalAllClients(!showModalAllClients);
    }
    return (
        <div style={{color: '#3D5A80', fontWeight: 'bold'}} onClick={handleAllClients}>
            <div style={{display: 'flex', flexDirection: 'row', gap: '1em'}}>
                <div style={{color: '#5b80b2', fontWeight: 'normal'}}>{props.group.title}</div>
                <div style={{ backgroundColor: '#5b80b2', color: 'white',
                    padding: '5px 10px', borderRadius: '1em', fontWeight: 'normal',
                    fontSize: '14px', width: 'min-content'
                }}>{props.group.sportType}</div>
            </div>
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
