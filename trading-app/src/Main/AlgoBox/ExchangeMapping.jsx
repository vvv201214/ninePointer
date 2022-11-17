import React,{useState, useEffect} from "react";
import Popup from "reactjs-popup";
import 'reactjs-popup/dist/index.css';
import uniqid from "uniqid";
import axios from "axios"


function ExchangeMapping(){
    let uId = uniqid();
    let date = new Date();
    let createdOn = `${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
    let lastModified = createdOn;
    let createdBy = "prateek"

    const [reRender, setReRender] = useState(true);
    const [data, setData] = useState([]);
    const [formstate, setformstate] = useState({
        ExchangeNameIncoming: "",
        IncomingExchangeCode : "",
        ExchangeNameOutgoing : "",
        OutgoingInstrumentCode:"",
        Status : "",
    });

    useEffect(()=>{
        axios.get("http://localhost:3000/readExchangeMapping")
        .then((res)=>{
            setData(res.data)
            console.log(res.data);
        })
    },[])

    async function formbtn(e){
        e.preventDefault();
        setformstate(formstate);
        console.log(formstate)


        const {ExchangeNameIncoming, IncomingExchangeCode, ExchangeNameOutgoing, OutgoingInstrumentCode, Status} = formstate;

        const res = await fetch("http://localhost:5000/exchangeMapping", {
            method: "POST",
            headers: {
                "content-type" : "application/json"
            },
            body: JSON.stringify({
                ExchangeNameIncoming, IncomingExchangeCode, ExchangeNameOutgoing, OutgoingInstrumentCode, Status, lastModified, uId, createdBy, createdOn
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
                        <Popup trigger={<button className="Ac_btn">Create Exchange Mapping</button>}>
                            <form>
                                <label className="Ac_form" htmlFor="">Exchange Name (Incoming)</label>
                                <input type="text" className="Ac_forminput" onChange={(e)=>{{formstate.ExchangeNameIncoming = e.target.value}}} />
                                <label htmlFor="" className="Ac_form">Incoming Exchange Code</label>
                                <input type="text" className="Ac_forminput" onChange={(e)=>{{formstate.IncomingExchangeCode = e.target.value}}} />
                                <label htmlFor="" className="Ac_form">Exchange Name (Outgoing)</label>
                                <input type="text" className="Ac_forminput" onChange={(e)=>{{formstate.ExchangeNameOutgoing = e.target.value}}} />
                                <label htmlFor="" className="Ac_form">Outgoing Instrument Code</label>
                                <input type="text" className="Ac_forminput" onChange={(e)=>{{formstate.OutgoingInstrumentCode = e.target.value}}} />
                                <label htmlFor="" className="Ac_form">Status</label>
                                <select name="" id="" className="Ac_forminput" onChange={(e)=>{{formstate.Status = e.target.value}}}>
                                    <option value=""></option>
                                    <option value="Active">Active</option>
                                    <option value="Inactive">Inactive</option>
                                </select>
                                <br />
                                <button className="ACform_tbn" onClick={formbtn}>OK</button>
                            </form>
                        </Popup>

                        <div className="grid_1">
                            <span className="grid1_span">Exchange Mapping</span>
                            <table className="grid1_table">
                                <tr className="grid2_tr">
                                <th className="grid2_th">Created On</th>
                                <th className="grid2_th">Exchange Name (Incoming)</th>
                                <th className="grid2_th">Incoming Exchange Code</th>
                                <th className="grid2_th">Exchange Name (Outgoing)</th>
                                <th className="grid2_th">Outgoing Instrument Code</th>
                                <th className="grid2_th">Status</th>
                            </tr>
                            {
                                data.map((elem)=>{
                                    return(
                                        <tr className="grid2_tr" key={elem.uId} >
                                            <td className="grid2_td">{elem.createdOn}</td>
                                            <td className="grid2_td">{elem.ExchangeNameIncoming}</td>
                                            <td className="grid2_td">{elem.IncomingExchangeCode}</td>
                                            <td className="grid2_td">{elem.ExchangeNameOutgoing}</td>
                                            <td className="grid2_td">{elem.OutgoingInstrumentCode}</td>
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
export default ExchangeMapping;