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
                            <ul className="grid1_ul grid2_ul">
                                <li className="grid1_li">Created On</li>
                                <li className="grid1_li">Instrument Name (Incoming)</li>
                                <li className="grid1_li">Incoming Instrument Code</li>
                                <li className="grid1_li">Instrument Name (Outgoing)</li>
                                <li className="grid1_li">Outgoing Instrument Code</li>
                                <li className="grid1_li">Status</li>
                            </ul>
                            {
                                data.map((elem)=>{
                                    return(
                                        <ul key={elem.uId} className="grid1_ul grid2_ul">
                                            <li className="grid1_li">{elem.createdOn}</li>
                                            <li className="grid1_li">{elem.InstrumentNameIncoming}</li>
                                            <li className="grid1_li">{elem.IncomingInstrumentCode}</li>
                                            <li className="grid1_li">{elem.InstrumentNameOutgoing}</li>
                                            <li className="grid1_li">{elem.OutgoingInstrumentCode}</li>
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
export default InstrumentMapping;