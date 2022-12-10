import React, { useState } from "react";
import { useEffect } from "react";
import Select from 'react-select';
import Styles from "./UserList.module.css"
import axios from "axios"


export default function UserList({addUser, setAddUser}) {
    let baseUrl = process.env.NODE_ENV === "production" ? "/" : "http://localhost:5000/"
    const [data, setData] = useState([]);

    useEffect(()=>{
        axios.get(`${baseUrl}api/v1/readuserdetails`)
        .then((res)=>{
            setData(res.data);
            console.log(res.data);

        }).catch((err)=>{
            window.alert("Server Down");
            return new Error(err);
        })
    },[])

    let options = [];
    for(let elem of data){
        console.log(elem);
        options.push({value: elem.email, label: elem.name});
        console.log(options);
    }
    console.log(data);
    console.log(options);


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