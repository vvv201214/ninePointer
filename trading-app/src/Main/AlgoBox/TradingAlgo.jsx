import React,{useState, useEffect} from "react";
import Popup from "reactjs-popup";
import 'reactjs-popup/dist/index.css';
import uniqid from "uniqid";
import axios from "axios"

function TradingAlgo(){
    let uId = uniqid();
    let date = new Date();
    let createdOn = `${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()}`
    let lastModified = createdOn;
    let createdBy = "prateek"

    const [reRender, setReRender] = useState(true);
    const [data, setData] = useState([]);
    const[formstate, setformstate] = useState({
        algoName: "",
        transactionChange : "",
        instrumentChange : "",
        status : "",
        exchangeChange:"",
        lotMultipler:"",
        productChange : "",
        tradingAccount:""
    });

    useEffect(()=>{
        axios.get("http://localhost:3000/readtradingAlgo")
        .then((res)=>{
            setData(res.data)
            console.log(res.data);
        })
    },[])

    async function formbtn(e){
        e.preventDefault();
        setformstate(formstate);
        console.log(formstate)

        const {algoName, transactionChange, instrumentChange, status, exchangeChange, lotMultipler, productChange, tradingAccount} = formstate;

        const res = await fetch("http://localhost:5000/tradingalgo", {
            method: "POST",
            headers: {
                "content-type" : "application/json"
            },
            body: JSON.stringify({
                algoName, transactionChange, instrumentChange, status, exchangeChange, lotMultipler, productChange, tradingAccount, lastModified, uId, createdBy, createdOn
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


    return(
        <div>
            <div className="main_Container">
                <div className="right_side">
                    <div className="rightside_maindiv">
                        <Popup trigger={<button className="Ac_btn">Create Trading Algo</button>}>
                            <form>
                                <label className="Ac_form" htmlFor="">Algo Name</label>
                                <input type="text" className="Ac_forminput" onChange={(e)=>{{formstate.algoName = e.target.value}}} />
                                <label htmlFor="" className="Ac_form">Transaction Change</label>
                                <select name="" id="" className="Ac_forminput" onChange={(e)=>{{formstate.transactionChange = e.target.value}}}>
                                    <option value=""></option>
                                    <option value="TRUE">TRUE</option>
                                    <option value="FALSE">FALSE</option>
                                </select>
                                <label htmlFor="" className="Ac_form">Instrument Change</label>
                                <select name="" id="" className="Ac_forminput" onChange={(e)=>{{formstate.instrumentChange = e.target.value}}}>
                                    <option value=""></option>
                                    <option value="TRUE">TRUE</option>
                                    <option value="FALSE">FALSE</option>
                                </select>
                                <label htmlFor="" className="Ac_form">Exchange Change</label>
                                <select name="" id="" className="Ac_forminput" onChange={(e)=>{{formstate.exchangeChange = e.target.value}}}>
                                    <option value=""></option>
                                    <option value="TRUE">TRUE</option>
                                    <option value="FALSE">FALSE</option>
                                </select>
                                <label htmlFor="" className="Ac_form">Product Change</label>
                                <select name="" id="" className="Ac_forminput" onChange={(e)=>{{formstate.productChange = e.target.value}}}>
                                    <option value=""></option>
                                    <option value="TRUE">TRUE</option>
                                    <option value="FALSE">FALSE</option>
                                </select>
                                <label htmlFor="" className="Ac_form">Lot Multipler</label>
                                <input type="text" className="Ac_forminput" onChange={(e)=>{{formstate.lotMultipler = e.target.value}}} />
                                <label htmlFor="" className="Ac_form">Trading Account</label>
                                <input type="text" className="Ac_forminput" onChange={(e)=>{{formstate.tradingAccount = e.target.value}}} />
                                <label htmlFor="" className="Ac_form">Status</label>
                                <select name="" id="" className="Ac_forminput" onChange={(e)=>{{formstate.status = e.target.value}}}>
                                    <option value=""></option>
                                    <option value="Active">Active</option>
                                    <option value="InActive">InActive</option>
                                </select>
                                <br />
                                <button className="ACform_tbn" onClick={formbtn}>OK</button>
                            </form>
                        </Popup>

                        <div className="grid_1">
                            <span className="grid1_span">Trading Algos</span>
                            <ul className="grid1_ul grid2_ul">
                                <li className="grid1_li">Created On</li>
                                <li className="grid1_li">Algo Name</li>
                                <li className="grid1_li">Transaction Change</li>
                                <li className="grid1_li">Instrument Change</li>
                                <li className="grid1_li">Exchange Change</li>
                                <li className="grid1_li">Product Change</li>
                                <li className="grid1_li">Lot Multipler</li>
                                <li className="grid1_li">Trading Account</li>
                                <li className="grid1_li">Status</li>
                            </ul>
                            {
                                data.map((elem)=>{
                                    return(
                                        <ul key={elem.uId} className="grid1_ul grid2_ul">
                                            <li className="grid1_li">{elem.createdOn}</li>
                                            <li className="grid1_li">{elem.algoName}</li>
                                            <li className="grid1_li">{elem.transactionChange}</li>
                                            <li className="grid1_li">{elem.instrumentChange}</li>
                                            <li className="grid1_li">{elem.exchangeChange}</li>
                                            <li className="grid1_li">{elem.productChange}</li>
                                            <li className="grid1_li">{elem.lotMultipler}</li>
                                            <li className="grid1_li">{elem.tradingAccount}</li>
                                            <li className="grid1_li">{elem.status}</li>
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
export default TradingAlgo;