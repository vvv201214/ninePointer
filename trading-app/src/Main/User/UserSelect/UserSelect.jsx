import React from "react";
import Style from "./UserSelect.module.css";

export default function UserSelect(props){
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
                               <th className="grid2_th">Enable trading</th>
                               <th className="grid2_th">User Email</th>
                               <th className="grid2_th">Algo Name</th>
                               <th className="grid2_th">Algo Status</th>
                           </tr>
                           <tr className="grid2_tr">
                               <td className="grid2_td">Sachin Gour</td>
                               <td className="grid2_td"><input type="checkbox" /></td>
                               <td className="grid2_td">admin@ninepointer.in</td>
                               <td className="grid2_td">Algo1</td>
                               <td className="grid2_td"><input type="checkbox" /></td>
                           </tr>
                       </table>
                   </div>
               </div>
           </div>
       </div>

   </div>
    )
}