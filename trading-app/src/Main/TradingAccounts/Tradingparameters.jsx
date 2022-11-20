import React,{useState} from "react";
import Popup from "reactjs-popup";
import 'reactjs-popup/dist/index.css';

function Tradingparameters(){
    const[isopen, setIsOpen] = useState(false)

    const[formstate, setformstate] = useState({
        createdOn: "",
        variety : "",
        exchange : "",
        orderType: "",
        validity : "",
        status:"",
        lastModifiedOn:"",
    });
    function formbtn(e){
        e.preventDefault();
        setformstate(formstate);
        setIsOpen(!isopen);
        console.log(formstate)
        
    }
    return(
        <div>
            <div className="main_Container">
                <div className="right_side">
                    <div className="rightside_maindiv">
                        <Popup trigger={<button className="Ac_btn">Add Trading Parameters</button>}>
                            <form>
                                <label className="Ac_form" htmlFor="">Created On</label>
                                <input type="text" className="Ac_forminput" onChange={(e)=>{{formstate.createdOn = e.target.value}}} />
                                <label className="Ac_form" htmlFor="">Variety</label>
                                <input type="text" className="Ac_forminput" onChange={(e)=>{{formstate.variety = e.target.value}}}/>
                                <label className="Ac_form" htmlFor="">Exchange</label>
                                <input type="text" className="Ac_forminput"  onChange={(e)=>{{formstate.exchange = e.target.value}}} />
                                <label className="Ac_form" htmlFor="">Order Type</label>
                                <input type="text" className="Ac_forminput"  onChange={(e)=>{{formstate.orderType = e.target.value}}} />
                                <label className="Ac_form"htmlFor="">Validity</label>
                                <input type="text" className="Ac_forminput"  onChange={(e)=>{{formstate.validity = e.target.value}}} />
                                <label htmlFor="" className="Ac_form">Status</label>
                                <select name="" id="" className="Ac_forminput" onChange={(e)=>{{formstate.status = e.target.value}}}>
                                    <option value=""></option>
                                    <option value="Inactive">Inactive</option>
                                    <option value="Active">Active</option>
                                </select>
                                <label className="Ac_form"htmlFor="">Last Modified On</label>
                                <input type="text" className="Ac_forminput"  onChange={(e)=>{{formstate.lastModifiedOn = e.target.value}}} />                        
                                <br />
                                <button className="ACform_tbn" onClick={formbtn}>OK</button>
                            </form>
                        </Popup>

                        <div className="grid_1">
                            <span className="grid1_span">Active Trading Parameters</span>
                            <table className="grid1_table">
                            <tr className="grid2_tr">
                                <th className="grid2_th">Created On</th>
                                <th className="grid2_th">Variety</th>
                                <th className="grid2_th">Exchange</th>
                                <th className="grid2_th">Order Type</th>
                                <th className="grid2_th">Validity</th>
                                <th className="grid2_th">Status</th>
                                <th className="grid2_th">Last Modified On</th>
                            </tr>
                            </table>
                        </div>

                        <div className="grid_2">
                            <span className="grid2_span">Inactive Trading Parameters</span>
                            <table className="grid1_table">
                                <tr className="grid2_tr">
                                    <th className="grid2_th">Broker</th>
                                    <th className="grid2_th">Account ID</th>
                                    <th className="grid2_th">Account Name</th>
                                    <th className="grid2_th">API Key</th>
                                    <th className="grid2_th">API Secret</th>
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
export default Tradingparameters;