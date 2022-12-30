import React, { useContext } from "react";
import { useEffect } from "react";
import { userContext } from "../AuthContext";
import UserFundsHeader from "./UserFundsHeader";

function UserFundsMain(){
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
                <button className="logo_btn" >ninepointer</button>
            </div>
            <UserFundsHeader role = {getDetails.userDetails.role}/>
        </>
    )
}
export default UserFundsMain;