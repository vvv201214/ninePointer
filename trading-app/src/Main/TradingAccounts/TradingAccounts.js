import React, { useEffect } from "react";
import "./TradingAccounts.css";
import "./Accounts.css";
import Popup from "reactjs-popup";
import 'reactjs-popup/dist/index.css';
import { useState } from "react";
import uniqid from "uniqid";
import axios from "axios";

function TradingAccounts() {
    let uId = uniqid();
    let date = new Date();
    let createdOn = `${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
    let lastModified = createdOn;
    let createdBy = "prateek"

    const[open, setOpen] = useState(false);
    const [activeData, setActiveData] = useState([]);
    const [inactiveData, setInactiveData] = useState([]);
    const [reRender, setReRender] = useState(true);
    const[formstate, setformstate] = useState({
        Broker: "",
        AccountID : "",
        AccountName : "",
        APIKey : "",
        APISecret : "",
        Status:""
    });


    async function formbtn(e){
        e.preventDefault();
        setformstate(formstate);
        console.log(formstate)
        const {AccountID, Broker, AccountName, APIKey, APISecret, Status} = formstate;

        const res = await fetch("http://localhost:5000/account", {
            method: "POST",
            headers: {
                "content-type" : "application/json"
            },
            body: JSON.stringify({
                accountId:AccountID, accountName:AccountName, apiKey:APIKey, apiSecret:APISecret, status:Status, brokerName:Broker, uId, createdBy, createdOn, lastModified
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

        setOpen(false);
    }
    useEffect(()=>{
        axios.get("http://localhost:5000/readAccountDetails")
        .then((res)=>{
            let data = res.data;
            let active = data.filter((elem)=>{
                console.log(elem.createdOn, createdOn);
                return (elem.createdOn).includes(`${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()}`) && elem.status === "Active"
            })
            setActiveData(active);
            console.log(active);

            let inActive = data.filter((elem)=>{
                return !(elem.createdOn).includes(`${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()}`) || (elem.status) === "Inactive"
            })
            setInactiveData(inActive);
        })
    },[reRender])


    return (
        <div>
            <div className="main_Container">
                <div className="right_side">
                    <div className="rightside_maindiv">
                        <Popup trigger={<button className="Ac_btn">Add Company Trading Account</button>} open={open} closeOnDocumentClick onClose={formbtn}>
                            <form>
                                <label className="Ac_form" htmlFor="">Broker</label>
                                <input type="text" className="Ac_forminput" onChange={(e)=>{{formstate.Broker = e.target.value}}} />
                                <label className="Ac_form" htmlFor="">Account ID</label>
                                <input type="text" className="Ac_forminput" onChange={(e)=>{{formstate.AccountID = e.target.value}}}/>
                                <label className="Ac_form" htmlFor="">Acccount Name</label>
                                <input type="text" className="Ac_forminput"  onChange={(e)=>{{formstate.AccountName = e.target.value}}} />
                                <label className="Ac_form" htmlFor="">API Key</label>
                                <input type="text" className="Ac_forminput"  onChange={(e)=>{{formstate.APIKey = e.target.value}}} />
                                <label className="Ac_form"htmlFor="">API Secret</label>
                                <input type="text" className="Ac_forminput"  onChange={(e)=>{{formstate.APISecret = e.target.value}}} />
                                <label htmlFor="" className="Ac_form">Status</label>
                                <select name="" id="" className="Ac_forminput" onChange={(e)=>{{formstate.Status = e.target.value}}}>
                                    <option value=""></option>
                                    <option value="Inactive">Inactive</option>
                                    <option value="Active">Active</option>
                                </select>                            
                                <br />
                                <button className="ACform_tbn" onClick={formbtn}>OK</button>
                            </form>
                        </Popup>

                        <div className="grid_1">
                            <span className="grid1_span">Active Company Trading Accounts</span>
                            <table className="grid1_table">
                            <tr className="grid2_tr">
                                <th className="grid2_th">Broker</th>
                                <th className="grid2_th">Account ID</th>
                                <th className="grid2_th">Account Name</th>
                                <th className="grid2_th">API Key</th>
                                <th className="grid2_th">API Secret</th>
                                <th className="grid2_th">Status</th>
                            </tr>
                            {activeData.map((elem)=>{
                                return(
                                <tr className="grid2_tr" key={elem.uId} >
                                    <td className="grid2_td">{elem.brokerName}</td>
                                    <td className="grid2_td">{elem.accountId}</td>
                                    <td className="grid2_td">{elem.accountName}</td>
                                    <td className="grid2_td">{elem.apiKey}</td>
                                    <td className="grid2_td">{elem.apiSecret}</td>
                                    <td className="grid2_td">{elem.status}</td>
                                </tr>
                                )
                                })
                            }
                            </table>
                        </div>

                        <div className="grid_2">
                            <span className="grid2_span">Inactive Company Trading Accounts</span>
                            <table className="grid1_table">
                            <tr className="grid2_tr">
                                <th className="grid2_th">Broker</th>
                                <th className="grid2_th">Account ID</th>
                                <th className="grid2_th">Account Name</th>
                                <th className="grid2_th">API Key</th>
                                <th className="grid2_th">API Secret</th>
                                <th className="grid2_th">Status</th>
                            </tr>
                            {inactiveData.map((elem) =>{
                                return(
                                <tr className="grid2_tr" key={elem.uId} >
                                    <td className="grid2_td">{elem.brokerName}</td>
                                    <td className="grid2_td">{elem.accountId}</td>
                                    <td className="grid2_td">{elem.accountName}</td>
                                    <td className="grid2_td">{elem.apiKey}</td>
                                    <td className="grid2_td">{elem.apiSecret}</td>
                                    <td className="grid2_td">{elem.status}</td>
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
export default TradingAccounts;

