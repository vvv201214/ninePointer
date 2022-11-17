import React from "react";
import {NavLink} from "react-router-dom";
import "./TradingAccounts.css";
import TradingHeader from "./TradingHeader";
import Header1 from "./TradingHeader";

function TradingACMain(){
    return(
        <>
            <div className="User_header">
                <h1 className="header_para">Hello Admin! Welcome Back</h1>
                <button className="logo_btn" >NINEPOINTER</button>
            </div>
            <TradingHeader/>
        </>
    )
}
export default TradingACMain;