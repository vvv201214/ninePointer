import React from "react";
import {NavLink} from "react-router-dom";
import MainSideBar from "../MainSideBar";
import DashboardHeader from "./DashboardHeader";

function DashboardMain(){
    return(
        <>     
        {/* <div className='main'>
              <div className='left_Side_comp'>
                <MainSideBar/>
            </div> */}
            <div className='right_Side_comp'>
            <div className="User_header">
            <h1 className="header_para">Hello Admin! Welcome Back</h1>
                <button className="logo_btn" >NINEPOINTER</button>
            </div>
            <DashboardHeader/>
            </div>
        {/* </div> */}
            
        </>
    )
}
export default DashboardMain;