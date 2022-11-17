import RoleButtonModel from "./Roles/RoleButtonModel";
import React,{useState, useEffect} from "react";
import axios from "axios";


function Roles(){

    const [data, setData] = useState([]);
    useEffect(()=>{
        axios.get("http://localhost:5000/readeveryonerole")
        .then((res)=>{
            setData(res.data);
            console.log(res.data);
        })
    },[])

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
                                {data.map((elem)=>{
                                    return(
                                        <tr className="grid2_tr">
                                            <td className="grid2_td">{elem.createdOn}</td>
                                            <td className="grid2_td">{elem.roleName}</td>
                                            <td className="grid2_td">{elem.instruments}</td>
                                            <td className="grid2_td">{elem.tradingAccount}</td>
                                            <td className="grid2_td">{elem.APIParameters}</td>
                                            <td className="grid2_td">{elem.users}</td>
                                            <td className="grid2_td">{elem.algoBox}</td>
                                            <td className="grid2_td">{elem.reports}</td>
                                        </tr>
                                    )
                                })}
                            </table>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
export default Roles;