import React, { useState, useEffect } from "react";
import Popup from "reactjs-popup";
import 'reactjs-popup/dist/index.css';
import uniqid from "uniqid";
import axios from "axios";


function Instruments() {
    let uId = uniqid();
    let date = new Date();
    let createdOn = `${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()}`
    let lastModified = `${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()}`;

    let createdBy = "prateek"

    const [activeData, setActiveData] = useState([]);
    const [inactiveData, setInActiveData] = useState([]);
    const [reRender, setReRender] = useState(true);


    const [formstate, setformstate] = useState({

        Instrument: "",
        Exchange: "",
        Status: "",
        Symbole: "",
        LotSize: "",
        LastModifiedOn: ""
    });

    useEffect(() => {
        axios.get("http://localhost:5000/readInstrumentDetails")
            .then((res) => {
                let data = res.data;
                let active = data.filter((elem) => {
                    console.log(elem.createdOn, createdOn);
                    return (elem.createdOn).includes(`${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`) && elem.status === "Active"
                })
                setActiveData(active);
                console.log(active);

                let inActive = data.filter((elem) => {
                    if (elem.status === "Active" && !(elem.createdOn).includes(`${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`)) {
                        elem.status = "Inactive"
                    }
                    return elem.status === "Inactive"
                })
                setInActiveData(inActive);
                console.log(inactiveData);
            })
    }, [reRender])

    async function formbtn(e) {
        e.preventDefault();
        setformstate(formstate);
        console.log(formstate)

        const { Instrument, Exchange, Status, Symbole, LotSize } = formstate;

        const res = await fetch("http://localhost:5000/instrument", {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                instrument: Instrument, exchange: Exchange, status: Status, symbol: Symbole, lotSize: LotSize, lastModified, uId, createdBy, createdOn
            })
        });

        const data = await res.json();
        console.log(data);
        if (data.status === 422 || data.error || !data) {
            window.alert(data.error);
            console.log("invalid entry");
        } else {
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
                        <Popup trigger={<button className="Ac_btn">Create instrument</button>}>
                            <form>
                                <label className="Ac_form" htmlFor="">Instrument</label>
                                <input type="text" className="Ac_forminput" onChange={(e) => { { formstate.Instrument = e.target.value } }} />
                                <label className="Ac_form" htmlFor="">Exchange</label>
                                <input type="text" className="Ac_forminput" onChange={(e) => { { formstate.Exchange = (e.target.value).toUpperCase() } }} />
                                <label className="Ac_form" htmlFor="">Symbol</label>
                                <input type="text" className="Ac_forminput" onChange={(e) => { { formstate.Symbole = e.target.value.toUpperCase() } }} />
                                <label htmlFor="" className="Ac_form">Lot Size</label>
                                <input type="text" className="Ac_forminput" onChange={(e) => { { formstate.LotSize = e.target.value } }} />
                                <label htmlFor="" className="Ac_form">Status</label>
                                <select name="" id="" className="Ac_forminput" onChange={(e) => { { formstate.Status = e.target.value } }}>
                                    <option value=""></option>
                                    <option value="Inactive">Inactive</option>
                                    <option value="Active">Active</option>
                                </select>

                                <button className="ACform_tbn" onClick={formbtn}>OK</button>
                            </form>
                        </Popup>

                        <div className="grid_1">
                            <span className="grid1_span">Active Instruments</span>
                            <ul className="grid1_ul grid2_ul">
                                <li className="grid1_li">Created On</li>
                                <li className="grid1_li">Instrument</li>
                                <li className="grid1_li">Exchange</li>
                                <li className="grid1_li">Symbol</li>
                                <li className="grid1_li">Lot Size</li>
                                <li className="grid1_li">Status</li>
                                <li className="grid1_li">Last Modified</li>
                            </ul>

                            {
                                activeData.map((elem) => {
                                    return (
                                        <ul className="grid1_ul">
                                            <li className="grid1_li">{elem.createdOn}</li>
                                            <li className="grid1_li">{elem.instrument}</li>
                                            <li className="grid1_li">{elem.exchange}</li>
                                            <li className="grid1_li">{elem.symbol}</li>
                                            <li className="grid1_li">{elem.lotSize}</li>
                                            <li className="grid1_li">{elem.status}</li>
                                            <li className="grid1_li">{elem.lastModified}</li>
                                        </ul>
                                    )
                                })
                            }
                        </div>
                        <div className="grid_2">
                            <span className="grid2_span">Inactive Instruments</span>
                            <ul className="grid1_ul grid2_ul">
                                <li className="grid1_li">Created On</li>
                                <li className="grid1_li">Instrument</li>
                                <li className="grid1_li">Exchange</li>
                                <li className="grid1_li">Symbol</li>
                                <li className="grid1_li">Lot Size</li>
                                <li className="grid1_li">Status</li>
                                <li className="grid1_li">Last Modified</li>
                            </ul>
                            {inactiveData.map((elem) => {
                                return (
                                    <ul className="grid2_ul">
                                        <li className="grid2_li">{elem.createdOn}</li>
                                        <li className="grid2_li">{elem.instrument}</li>
                                        <li className="grid2_li">{elem.exchange}</li>
                                        <li className="grid2_li">{elem.symbol}</li>
                                        <li className="grid2_li">{elem.lotSize}</li>
                                        <li className="grid2_li">{elem.status}</li>
                                        <li className="grid2_li">{elem.lastModified}</li>
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
export default Instruments;


