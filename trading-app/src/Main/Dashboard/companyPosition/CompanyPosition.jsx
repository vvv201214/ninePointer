import React from "react";
import './CompanyPosition.css';
import { useEffect } from 'react';
import { io } from "socket.io-client";
import CompanyPositionTable from "./CompanyPositionTable";


function CompanyPosition() {
    const socket = io.connect("http://localhost:9000/")
    useEffect(()=>{
        console.log("rendering")
        console.log(socket);
        socket.on("connect", ()=>{
            console.log(socket.id);
            socket.emit("hi","ok")
        })
    }, []);

    return (
        <div>
            <CompanyPositionTable socket={socket}/>
        </div>
    )
}
export default CompanyPosition;
