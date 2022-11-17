import React,{useState} from "react";
import UserButtonModel from "./UserButtonModel";

function Users(){

    return(
        <div>
             <div className="main_Container">
                <div className="right_side">
                    <div className="rightside_maindiv">
                    <UserButtonModel/>
                        {/* <Popup trigger={<button className="Ac_btn">Create User</button>}>
                            <form>
                                <label className="Ac_form" htmlFor="">Instrument</label>
                                <input type="text" className="Ac_forminput" onChange={(e) => { { formstate.Instrument = e.target.value } }} />
                                <label className="Ac_form" htmlFor="">Exchange</label>
                                <input type="text" className="Ac_forminput" onChange={(e) => { { formstate.Exchange = (e.target.value).toUpperCase() } }} />
                                <label className="Ac_form" htmlFor="">Symbol</label>
                                <input type="text" className="Ac_forminput" onChange={(e) => { { formstate.Symbole = e.target.value.toUpperCase() } }} />
                                <label htmlFor="" className="Ac_form">Lot Size</label>
                                <input type="text" className="Ac_forminput" onChange={(e) => { { formstate.LotSize = e.target.value } }} />
                                <label htmlFor="" className="Ac_form">Status</label>
                                <select name="" id="" className="Ac_forminput" onChange={(e) => { { formstate.Status = e.target.value } }}>
                                    <option value=""></option>
                                    <option value="Inactive">Inactive</option>
                                    <option value="Active">Active</option>
                                </select>

                                <button className="ACform_tbn" onClick={formbtn}>OK</button>
                            </form>
                        </Popup> */}

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
                            </table>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
export default Users;