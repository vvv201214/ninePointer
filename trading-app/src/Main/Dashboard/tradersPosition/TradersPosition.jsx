import React from "react";
// import './CompanyPosition.css';
import { useEffect } from 'react';
import { io } from "socket.io-client";
import TraderPositionTable from "./TraderPositionTable";


function TraderPosition() {
    let socket;
    try{
        socket = io.connect("http://localhost:9000/")
    } catch(err){
        throw new Error(err);
    }
    useEffect(()=>{
        console.log("rendering")
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
            <TraderPositionTable socket={socket}/>
        </div>
    )
}
export default TraderPosition;
