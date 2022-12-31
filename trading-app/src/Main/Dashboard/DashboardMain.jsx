import React, { useContext } from "react";
import { useEffect } from "react";
import { userContext } from "../AuthContext";
import DashboardHeader from "./DashboardHeader";
import Styles from "../TodaysSummary/css/material-dashboard.css"

function DashboardMain(){
    const getDetails = useContext(userContext);
    useEffect(()=>{
        console.log(getDetails)
    }, [])

    return(
        < >
            <div className="User_header">
            <h1>{`Hello ${getDetails.userDetails.name}! Welcome Back`}</h1>
            <div className="indexheader">
                <div className="indexes"><span>Nifty 50</span><span> : </span><span>&nbsp;NA&nbsp;  </span><span> </span><span> NA </span></div>
                <div className="indexes"><span>Nifty Bank</span><span> : </span><span>&nbsp; NA &nbsp; </span><span> </span><span> NA </span></div>
                </div>
                <div className="logo_btn" >ninepointer</div>
            </div>
             
            <DashboardHeader role = {getDetails.userDetails.role}/>
        </>
    )
}
export default DashboardMain;