import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import Style from "./UserSelect.module.css";
import axios from "axios";

export default function UserSelect(props){
    let baseUrl = process.env.NODE_ENV === "production" ? "/" : "http://localhost:5000/"

    const [data, setData] = useState([]);
    useEffect(()=>{
        axios.get(`${baseUrl}api/v1/readuserdetails`)
        .then((res) => {
            setData(res.data);
        }).catch((err)=>{
            return new Error(err);
        })
    },[])
    console.log(data);
    return(
        <div>
        <div className="main_Container">
           <div className="right_side">
               <div className="rightside_maindiv">
                   <div className="grid_1">
                       <span className="grid1_span">User Details</span>
                       <table className="grid1_table">
                           <tr className="grid2_tr">
                               <th className="grid2_th">UserName</th>
                               <th className="grid2_th">User Email</th>
                               <th className="grid2_th">Enable trading</th>
                               <th className="grid2_th">Enable Algo</th>
                               <th className="grid2_th">Enable Real Trade</th>
                           </tr>
                           {data.map((elem, index)=>{
                                return(
                                    <tr key={elem._id} className="grid2_tr">
                                        <td className="grid2_td">{elem.name}</td>
                                        <td className="grid2_td">{elem.email}</td>
                                        <td className="grid2_td"><input type="checkbox" /></td>
                                        <td className="grid2_td"><input type="checkbox" /></td>
                                        <td className="grid2_td"><input type="checkbox" /></td>
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