import React from "react";
// import './CompanyPosition.css';
import { useEffect } from 'react';
import { io } from "socket.io-client";
import TraderPositionTable from "./TraderPositionTable";


function TraderPosition() {
    const socket = io.connect("http://localhost:9000/")
    useEffect(()=>{
        console.log("rendering")
        console.log(socket);
        socket.on("connect", ()=>{
            console.log(socket.id);
            socket.emit("hi","ok")
        })
        // socket.on("disconnect", ()=>{
        //     console.log(socket.id);
        // return ()=>{
        //     console.log('closing');
        //     socket.close();
        // }
        }, []);

        // useEffect(()=>{
        //     return ()=>{
        //         console.log('closing');
        //         socket.close();
        //     }
        // },[])

    return (
        <div>
            <TraderPositionTable socket={socket}/>
        </div>
    )
}
export default TraderPosition;