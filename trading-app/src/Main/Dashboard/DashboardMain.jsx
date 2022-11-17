import React from "react";
import {NavLink} from "react-router-dom";
import DashboardHeader from "./DashboardHeader";

function DashboardMain(){
    return(
        <>
            <div className="User_header">
            <h1 className="header_para">Hello Admin! Welcome Back</h1>
                <button className="logo_btn" >NINEPOINTER</button>
            </div>
            <DashboardHeader/>
        </>
    )
}
export default DashboardMain;