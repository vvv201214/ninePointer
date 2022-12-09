import React, { useState } from "react";
import Select from 'react-select';
import Styles from "./UserList.module.css"


export default function UserList() {
    const options = [
        { value: 'Sachin', label: 'Sachin' },
        { value: 'Vijay', label: 'Vijay' },
        { value: '1', label: '1' },
        { value: '2', label: '2' },
        { value: '3', label: '3' },
        { value: '4', label: '4' },
        { value: '5', label: '5' },
    ]

    const [addUser, setAddUser] = useState({});

    console.log(addUser);

    return (
        <div className={Styles.selectUser}>
            <Select
                placeholder="Select User"
                onChange={setAddUser}
                isMulti
                options={options}
                className="primary"
            />
        </div>
    )
}