import React,{useState, useEffect} from "react";
import Popup from "reactjs-popup";
import 'reactjs-popup/dist/index.css';
import uniqid from "uniqid";
import axios from "axios";

function InstrumentMapping(){
    let uId = uniqid();
    let date = new Date();
    let createdOn = `${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()}`
    let lastModified = createdOn;
    let createdBy = "prateek"

    const [reRender, setReRender] = useState(true);
    const [data, setData] = useState([]);

    useEffect(()=>{
        axios.get("http://localhost:3000/readInstrumentAlgo")
        .then((res)=>{
            setData(res.data)
            console.log(res.data);
        })
    },[])
    const[formstate, setformstate] = useState({
        InstrumentNameIncoming: "",
        IncomingInstrumentCode : "",
        InstrumentNameOutgoing : "",
        OutgoingInstrumentCode:"",
        Status : "",
    });

    async function formbtn(e){
        e.preventDefault();
        setformstate(formstate);
        console.log(formstate)


        const {InstrumentNameIncoming, IncomingInstrumentCode, InstrumentNameOutgoing, OutgoingInstrumentCode, Status} = formstate;

        const res = await fetch("http://localhost:5000/instrumentAlgo", {
            method: "POST",
            headers: {
                "content-type" : "application/json"
            },
            body: JSON.stringify({
                InstrumentNameIncoming, IncomingInstrumentCode, InstrumentNameOutgoing, OutgoingInstrumentCode, Status, lastModified, uId, createdBy, createdOn
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
                        <Popup trigger={<button className="Ac_btn">Create Instrument Mapping</button>}>
                            <form>
                                <label className="Ac_form" htmlFor="">Instrument Name (Incoming)</label>
                                <input type="text" className="Ac_forminput" onChange={(e)=>{{formstate.InstrumentNameIncoming = e.target.value}}} />
                                <label htmlFor="" className="Ac_form">Incoming Instrument Code</label>
                                <input type="text" className="Ac_forminput" onChange={(e)=>{{formstate.IncomingInstrumentCode = e.target.value}}} />
                                <label htmlFor="" className="Ac_form">Instrument Name (Outgoing)</label>
                                <input type="text" className="Ac_forminput" onChange={(e)=>{{formstate.InstrumentNameOutgoing = e.target.value}}} />
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
                            <span className="grid1_span">Instrument Mapping</span>
                            <table className="grid1_table">
                                <tr className="grid2_tr">
                                    <th className="grid2_th">Created On</th>
                                    <th className="grid2_th">Instrument Name (Incoming)</th>
                                    <th className="grid2_th">Incoming Instrument Code</th>
                                    <th className="grid2_th">Instrument Name (Outgoing)</th>
                                    <th className="grid2_th">Outgoing Instrument Code</th>
                                    <th className="grid2_th">Status</th>
                                </tr>
                            {
                                data.map((elem)=>{
                                    return(
                                        <tr className="grid2_tr" key={elem.uId}>
                                            <td className="grid2_td">{elem.createdOn}</td>
                                            <td className="grid2_td">{elem.InstrumentNameIncoming}</td>
                                            <td className="grid2_td">{elem.IncomingInstrumentCode}</td>
                                            <td className="grid2_td">{elem.InstrumentNameOutgoing}</td>
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
export default InstrumentMapping;