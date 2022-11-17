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
                            <ul className="grid1_ul grid2_ul">
                                <li className="grid1_li">Name</li>
                                <li className="grid1_li">Designation</li>
                                <li className="grid1_li">Email ID</li>
                                <li className="grid1_li">Mobile No.</li>
                                <li className="grid1_li">Degree</li>
                                <li className="grid1_li">DOB</li>
                                <li className="grid1_li">Gender</li>
                                <li className="grid1_li">Trading Exp.</li>
                                <li className="grid1_li">Location</li>
                                <li className="grid1_li">Last Occupation</li>
                                <li className="grid1_li">Date of Joining</li>
                                <li className="grid1_li">Role</li>
                                <li className="grid1_li">Status</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
export default Users;