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
                            <table className="grid1_table">
                                <tr className="grid2_tr">
                                <th className="grid2_th">Created On</th>
                                <th className="grid2_th">Role Name</th>
                                <th className="grid2_th">Instruments</th>
                                <th className="grid2_th">Trading Account</th>
                                <th className="grid2_th">API Parameters</th>
                                <th className="grid2_th">Users</th>
                                <th className="grid2_th">AlgoBox</th>
                                <th className="grid2_th">Reports</th>
                            </tr>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
export default Roles;