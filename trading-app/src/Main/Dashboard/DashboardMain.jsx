import React, { useContext } from "react";
import { useEffect } from "react";
import { userContext } from "../AuthContext";
import DashboardHeader from "./DashboardHeader";

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
                <div className="indexes"><span>Nifty 50</span><span> : </span><span>18,300</span><span> </span><span>+3.45%</span></div>
                <div className="indexes"><span>Nifty Bank</span><span> : </span><span>43,500</span><span> </span><span>+2.45%</span></div>
                </div>
                <div className="logo_btn" >ninepointer</div>
            </div>
            <DashboardHeader role = {getDetails.userDetails.role}/>
        </>
    )
}
export default DashboardMain;