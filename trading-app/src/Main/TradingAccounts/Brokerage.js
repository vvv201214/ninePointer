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
    let createdOn = `${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()}`
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
                            <ul className="grid1_ul grid2_ul">
                                <li className="grid1_li">Broker</li>
                                <li className="grid1_li">Transaction</li>
                                <li className="grid1_li">Type</li>
                                <li className="grid1_li">Exchange</li>
                                <li className="grid1_li">Brokerage Charge</li>
                                <li className="grid1_li">Exchange Charge</li>
                                <li className="grid1_li">GST</li>
                                <li className="grid1_li">SEBI Charges</li>
                                <li className="grid1_li">Stamp Duty Charges</li>
                                <li className="grid1_li">SST</li>
                                <li className="grid1_li">CTT</li>
                                <li className="grid1_li">DP Charges</li>
                            </ul>
                            {data.map((elem)=>{
                                return(
                                <ul className="grid1_ul grid2_ul">
                                    <li className="grid1_li">{elem.brokerName}</li>
                                    <li className="grid1_li">{elem.transaction}</li>
                                    <li className="grid1_li">{elem.type}</li>
                                    <li className="grid1_li">{elem.exchange}</li>
                                    <li className="grid1_li">{elem.brokerageCharge}</li>
                                    <li className="grid1_li">{elem.exchangeCharge}</li>
                                    <li className="grid1_li">{elem.gst}</li>
                                    <li className="grid1_li">{elem.sebiCharge}</li>
                                    <li className="grid1_li">{elem.stampDuty}</li>
                                    <li className="grid1_li">{elem.sst}</li>
                                    <li className="grid1_li">{elem.ctt}</li>
                                    <li className="grid1_li">{elem.dpCharge}</li>
                                </ul>
                                )
                                })
                            }
                        </div>
                    </div>

                </div>

            </div>
        </div>
    )
}
export default Brokerage;
