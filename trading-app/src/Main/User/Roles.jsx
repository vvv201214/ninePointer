import React,{useState} from "react";
import RoleButtonModel from "./Roles/RoleButtonModel";


function Roles(){

    return(
        <div>
             <div className="main_Container">
                <div className="right_side">
                    <div className="rightside_maindiv">
                        <RoleButtonModel/>
                        <div className="grid_1">
                            <span className="grid1_span">User Roles</span>
                            <ul className="grid1_ul grid2_ul">
                                <li className="grid1_li">Created On</li>
                                <li className="grid1_li">Role Name</li>
                                <li className="grid1_li">Instruments</li>
                                <li className="grid1_li">Trading Account</li>
                                <li className="grid1_li">API Parameters</li>
                                <li className="grid1_li">Users</li>
                                <li className="grid1_li">AlgoBox</li>
                                <li className="grid1_li">Reports</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
export default Roles;