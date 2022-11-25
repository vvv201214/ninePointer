import React,{useState, useEffect} from "react";
import UserButtonModel from "./UserButtonModel";
import axios from "axios";
import { TiEdit } from "react-icons/ti";

function Users(){

    const [data, setData] = useState([]);
    useEffect(()=>{
        axios.get("http://localhost:5000/readuserdetails")
        .then((res)=>{
            setData(res.data);
            console.log(res.data);
        })
    },[])

    function Editfunc(id){
        console.log("edit me");
        let newData = data.filter((elem)=>{
            return elem._id === id
        })
        console.log(newData);

    }

    return(
        <div>
             <div className="main_Container">
                <div className="right_side">
                    <div className="rightside_maindiv">
                    <UserButtonModel/>
                        <div className="grid_1">
                            <span className="grid1_span">User Details</span>
                            <table className="grid1_table">
                                <tr className="grid2_tr">
                                    <th className="grid2_th">Name</th>
                                    <th className="grid2_th">Designation</th>
                                    <th className="grid2_th">Email ID</th>
                                    <th className="grid2_th">Mobile No.</th>
                                    <th className="grid2_th">Degree</th>
                                    <th className="grid2_th">DOB</th>
                                    <th className="grid2_th">Gender</th>
                                    <th className="grid2_th">Trading Exp.</th>
                                    <th className="grid2_th">Location</th>
                                    <th className="grid2_th">Last Occupation</th>
                                    <th className="grid2_th">Date of Joining</th>
                                    <th className="grid2_th">Role</th>
                                    <th className="grid2_th">Status</th>
                                </tr>
                            {data.map((elem)=>{
                                return(
                                <tr className="grid2_tr" key={elem._id}>
                                    <td className="grid2_td"><span className="Editbutton" onClick={()=>{Editfunc(elem._id)}}><TiEdit/></span>{elem.name}</td>
                                    <td className="grid2_td">{elem.designation}</td>
                                    <td className="grid2_td">{elem.email}</td>
                                    <td className="grid2_td">{elem.mobile}</td>
                                    <td className="grid2_td">{elem.degree}</td>
                                    <td className="grid2_td">{elem.dob}</td>
                                    <td className="grid2_td">{elem.gender}</td>
                                    <td className="grid2_td">{elem.trading_exp}</td>
                                    <td className="grid2_td">{elem.location}</td>
                                    <td className="grid2_td">{elem.last_occupation}</td>
                                    <td className="grid2_td">{elem.joining_date}</td>
                                    <td className="grid2_td">{elem.role}</td>
                                    <td className="grid2_td">{elem.status}</td>
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
export default Users;