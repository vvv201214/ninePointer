import React, {useState, useEffect} from "react";
import "./TradingAccounts.css";
import "./Accounts.css";
import Popup from "reactjs-popup";
import 'reactjs-popup/dist/index.css';
import uniqid from "uniqid"
import axios from "axios"

function TradingARToken() {
    let uId = uniqid();
    let date = new Date();
    let generatedOn = `${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
    let lastModified = generatedOn;
    let createdBy = "prateek"

    const [activeData, setActiveData] = useState([]);
    const [inactiveData, setInactiveData] = useState([]);
    const [reRender, setReRender] = useState(true);
    const[formstate, setformstate] = useState({
        AccountID: "",
        AccesToken : "",
        RequestToken : "",
        Status : ""
    });

    useEffect(()=>{
        axios.get("http://localhost:5000/readRequestToken")
        .then((res)=>{
            let data = res.data;
            let active = data.filter((elem)=>{
                
                return (elem.generatedOn).includes(`${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()}`) && elem.status === "Active"
            })
            setActiveData(active);
            console.log(active);

            let inActive = data.filter((elem)=>{
                return !(elem.generatedOn).includes(`${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()}`) || (elem.status) === "Inactive"
            })
            setInactiveData(inActive);
        })
    },[reRender])


    async function formbtn(e){
        e.preventDefault();
        setformstate(formstate);
        console.log(formstate)

        const {AccountID, AccesToken, RequestToken, Status} = formstate;

        const res = await fetch("http://localhost:5000/requestToken", {
            method: "POST",
            headers: {
                "content-type" : "application/json"
            },
            body: JSON.stringify({
                accountId:AccountID, accessToken:AccesToken, requestToken:RequestToken, status:Status, uId, createdBy, generatedOn, lastModified
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
                        <Popup trigger={<button className="Ac_btn">Generate Access & Request Token</button>}>
                            <form>
                                <label className="Ac_form" htmlFor="">Account ID</label>
                                <input type="text" className="Ac_forminput" onChange={(e)=>{{formstate.AccountID = e.target.value}}} />
                                <label className="Ac_form" htmlFor="">Account Token</label>
                                <input type="text" className="Ac_forminput" onChange={(e)=>{{formstate.AccesToken = e.target.value}}} />
                                <label className="Ac_form" htmlFor="">Request Token</label>
                                <input type="text" className="Ac_forminput" onChange={(e)=>{{formstate.RequestToken = e.target.value}}} />
                                
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
                            <span className="grid1_span">Active Access & Request Token</span>
                            <ul className="grid1_ul grid2_ul">
                                <li className="grid1_li">Account ID</li>
                                <li className="grid1_li">Access Token</li>
                                <li className="grid1_li">Request Token</li>
                                <li className="grid1_li">Status</li>
                                <li className="grid1_li">Generated On</li>
                            </ul>
                            {activeData.map((elem)=>{
                                return(
                                <ul className="grid1_ul grid2_ul" key={elem.uId}>
                                    <li className="grid1_li">{elem.accountId}</li>
                                    <li className="grid1_li">{elem.accessToken}</li>
                                    <li className="grid1_li">{elem.requestToken}</li>
                                    <li className="grid1_li">{elem.status}</li>
                                    <li className="grid1_li">{elem.generatedOn}</li>
                                </ul>
                                    )
                                })
                            }
                        </div>
                        </div>
                        <div className="grid_2">
                            <span className="grid2_span">Expired Access & Request Token</span>
                                <ul className="grid1_ul grid2_ul">
                                    <li className="grid1_li">Account ID</li>
                                    <li className="grid1_li">Access Token</li>
                                    <li className="grid1_li">Request Token</li>
                                    <li className="grid1_li">Status</li>
                                    <li className="grid1_li">Generated On</li>
                                </ul>
                                    {inactiveData.map((elem)=>{
                                        return(
                                            <ul className="grid1_ul grid2_ul" key={elem.uId}>
                                                <li className="grid1_li">{elem.accountId}</li>
                                                <li className="grid1_li">{elem.accessToken}</li>
                                                <li className="grid1_li">{elem.requestToken}</li>
                                                <li className="grid1_li">{elem.status}</li>
                                                <li className="grid1_li">{elem.generatedOn}</li>
                                            </ul>
                                            )
                                        })
                                    }
                        </div>
                    </div>
                </div>
            </div>
    )
}
export default TradingARToken;

