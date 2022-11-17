import React,{useState, useEffect} from "react";
import "./TradingAccounts.css";
import "./Accounts.css";
import Popup from "reactjs-popup";
import 'reactjs-popup/dist/index.css';
import { NavLink } from "react-router-dom";
import uniqid from "uniqid"
import TradingHeader from "./TradingHeader";
import axios from "axios"

function Brokerage() {
    let uId = uniqid();
    let date = new Date();
    let createdOn = `${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
    let lastModified = createdOn;
    let createdBy = "prateek"

    const [reRender, setReRender] = useState(true);
    const [data, setData] = useState([]);
    const[formstate, setformstate] = useState({
        Broker: "",
        Transaction:"",
        Type: "",
        Exchange:"",
        BrokerageCharge : "",
        ExchangeCharge : "",
        GST : "",
        SEBICharge:"",
        StampDuty: "",
        SST:"",
        CTT:"",
        DPCharges:""
    });

    useEffect(()=>{
        axios.get("http://localhost:5000/readBrokerage")
        .then((res)=>{
            setData(res.data)
            console.log(res.data);
        })
    },[reRender])

    async function formbtn(e){
        e.preventDefault();
        setformstate(formstate);
        console.log(formstate)

        const {Broker, Transaction, Type, Exchange, BrokerageCharge, ExchangeCharge, GST, SEBICharge, StampDuty, SST, CTT, DPCharges} = formstate;

        const res = await fetch("http://localhost:5000/brokerage", {
            method: "POST",
            headers: {
                "content-type" : "application/json"
            },
            body: JSON.stringify({
                brokerName:Broker, transaction:Transaction, type:Type, exchange:Exchange, brokerageCharge:BrokerageCharge, exchangeCharge:ExchangeCharge, gst:GST, sebiCharge:SEBICharge, stampDuty:StampDuty, sst:SST, ctt:CTT, dpCharge:DPCharges, uId, createdBy, createdOn, lastModified
            })
        });
        
        const data = await res.json();
        console.log(data);
        if(data.status === 422 || data.error || !data){
            window.alert(data.error);
            console.log("invalid entry");
        }else{
            window.alert("entry succesfull");
            console.log("entry succesfull");
        }
        reRender ? setReRender(false) : setReRender(true)
    }
    return (
        <div>
            <div className="main_Container">
                <div className="right_side">
                    <div className="rightside_maindiv">
                        <Popup trigger={<button className="Ac_btn">Create Brokerage Details</button>}>
                            <form>
                                <label className="Ac_form" htmlFor="">Broker</label>
                                <input type="text" className="Ac_forminput" onChange={(e)=>{{formstate.Broker = e.target.value}}} />
                                <label className="Ac_form" htmlFor="">Transaction</label>
                                <select name="" id="" className="Ac_forminput" onChange={(e)=>{{formstate.Transaction = e.target.value}}}>
                                    <option value=""></option>
                                    <option value="BUY">BUY</option>
                                    <option value="SELL">SELL</option>
                                </select>
                                <label className="Ac_form" htmlFor="">Type</label>
                                <select name="" id="" className="Ac_forminput" onChange={(e)=>{{formstate.Type = e.target.value}}}>
                                    <option value=""></option>
                                    <option value="Stocks">Stocks</option>
                                    <option value="Option">Option</option>
                                    <option value="Futures">Futures</option>
                                    <option value="Currency">Currency</option>
                                    <option value="Commodities">Commodities</option>
                                </select>
                                <label className="Ac_form" htmlFor="">Exchange</label>
                                <select name="" id="" className="Ac_forminput" onChange={(e)=>{{formstate.Exchange = e.target.value}}}>
                                    <option value=""></option>
                                    <option value="NSE">NSE</option>
                                    <option value="BSE">BSE</option>
                                </select>
                                <label className="Ac_form" htmlFor="">Brokerage Change</label>
                                <input type="text" className="Ac_forminput" onChange={(e)=>{{formstate.BrokerageCharge = e.target.value}}}/>
                                <label htmlFor="" className="Ac_form">Exchange Charge</label>
                                <input type="text" name="" id="" className="Ac_forminput" onChange={(e)=>{{formstate.ExchangeCharge = e.target.value}}} />
                                <label htmlFor=""className="Ac_form">GST</label>
                                <input type="text" className="Ac_forminput" onChange={(e)=>{{formstate.GST = e.target.value}}} />
                                <label htmlFor="" className="Ac_form">SEBI Charges</label>
                                <input type="text" className="Ac_forminput" onChange={(e)=>{{formstate.SEBICharge = e.target.value}}} />
                                <label htmlFor="" className="Ac_form">Stamp Duty Charges</label>
                                <input type="text" className="Ac_forminput" onChange={(e)=>{{formstate.StampDuty = e.target.value}}}/>
                                <label htmlFor="" className="Ac_form">SST</label>
                                <input type="text" className="Ac_forminput" onChange={(e)=>{{formstate.SST = e.target.value}}}/>
                                <label htmlFor="" className="Ac_form">CTT</label>
                                <input type="text" className="Ac_forminput" onChange={(e)=>{{formstate.CTT = e.target.value}}}/>        
                                <label htmlFor="" className="Ac_form">DP Charges</label>
                                <input type="text" className="Ac_forminput" onChange={(e)=>{{formstate.DPCharges = e.target.value}}}/>                    
                                <br />
                                <button className="ACform_tbn" onClick={formbtn}>OK</button>
                            </form>
                        </Popup>

                        <div className="grid_1">
                            <span className="grid1_span">Brokerage Details</span>
                            <table className="grid1_table">
                                <tr className="grid2_tr">
                                <th className="grid2_th">Broker</th>
                                <th className="grid2_th">Transaction</th>
                                <th className="grid2_th">Type</th>
                                <th className="grid2_th">Exchange</th>
                                <th className="grid2_th">Brokerage Charge</th>
                                <th className="grid2_th">Exchange Charge</th>
                                <th className="grid2_th">GST</th>
                                <th className="grid2_th">SEBI Charges</th>
                                <th className="grid2_th">Stamp Duty Charges</th>
                                <th className="grid2_th">SST</th>
                                <th className="grid2_th">CTT</th>
                                <th className="grid2_th">DP Charges</th>
                            </tr>
                            {data.map((elem)=>{
                                return(
                                    <tr className="grid2_tr">
                                    <td className="grid2_td">{elem.brokerName}</td>
                                    <td className="grid2_td">{elem.transaction}</td>
                                    <td className="grid2_td">{elem.type}</td>
                                    <td className="grid2_td">{elem.exchange}</td>
                                    <td className="grid2_td">{elem.brokerageCharge}</td>
                                    <td className="grid2_td">{elem.exchangeCharge}</td>
                                    <td className="grid2_td">{elem.gst}</td>
                                    <td className="grid2_td">{elem.sebiCharge}</td>
                                    <td className="grid2_td">{elem.stampDuty}</td>
                                    <td className="grid2_td">{elem.sst}</td>
                                    <td className="grid2_td">{elem.ctt}</td>
                                    <td className="grid2_td">{elem.dpCharge}</td>
                                </tr>
                                )
                                })
                            }
                            </table>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    )
}
export default Brokerage;
