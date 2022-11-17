import React from "react";
import {NavLink} from "react-router-dom";
import AlgoHeader from "./AlgoHeader";

function AlgoMain(){
    return(
        <>
            <div className="User_header">
            <h1 className="header_para">Hello Admin! Welcome Back</h1>
                <button className="logo_btn" >NINEPOINTER</button>
            </div>
            <AlgoHeader/>
        </>
    )
}
export default AlgoMain;