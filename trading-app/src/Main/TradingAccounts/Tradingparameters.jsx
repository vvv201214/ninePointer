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
                            <ul className="grid1_ul grid2_ul">
                                <li className="grid1_li">Created On</li>
                                <li className="grid1_li">Variety</li>
                                <li className="grid1_li">Exchange</li>
                                <li className="grid1_li">Order Type</li>
                                <li className="grid1_li">Validity</li>
                                <li className="grid1_li">Status</li>
                                <li className="grid1_li">Last Modified On</li>
                                
                            </ul>
                        </div>

                        <div className="grid_2">
                            <span className="grid2_span">Inactive Trading Parameters</span>
                            <ul className="grid1_ul grid2_ul">
                                <li className="grid1_li">Broker</li>
                                <li className="grid1_li">Account ID</li>
                                <li className="grid1_li">Account Name</li>
                                <li className="grid1_li">API Key</li>
                                <li className="grid1_li">API Secret</li>
                                <li className="grid1_li">Status</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}
export default Tradingparameters;