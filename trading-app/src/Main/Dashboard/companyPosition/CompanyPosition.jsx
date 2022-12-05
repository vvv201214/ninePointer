import React from "react";
import './CompanyPosition.css';
import { useEffect } from 'react';
import { io } from "socket.io-client";
import CompanyPositionTable from "./CompanyPositionTable";

function CompanyPosition() {
    let socket;
    try{
        socket = io.connect("http://localhost:9000/")
    } catch(err){
        throw new Error(err);
    }
    
    useEffect(()=>{

        console.log(socket);
        socket.on("connect", ()=>{
            console.log(socket.id);
            socket.emit("hi","ok")
        })
        socket.on("noToken", (data)=>{
            console.log("no token");
            window.alert(data);
        })

    }, []);

    return (
        <div>
            <CompanyPositionTable socket={socket}/>
        </div>
    )
}
export default CompanyPosition;
