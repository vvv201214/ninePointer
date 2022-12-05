import React, { useState } from "react";
import { useEffect } from "react";
import { TiEdit } from "react-icons/ti";
import Styles from "./InstrumentsEditModel.module.css";


export default function InstrumentsEditModel({ data, id, Render }) {
    let date = new Date();
    let lastModified = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`

    const { reRender, setReRender } = Render;
    const [editData, setEditData] = useState(data);

    const [instrument, setInstrument] = useState();
    const [exchange, setexchange] = useState();
    const [symbol, setsymbol] = useState();
    const [lotSize, setlotSize] = useState();
    const [status, setStatus] = useState();

    useEffect(() => {
        let updatedData = data.filter((elem) => {
            return elem._id === id
        })
        setEditData(updatedData)
    }, [])

    useEffect(() => {
        console.log("edit data", editData);

        setInstrument(editData[0].instrument)
        setexchange(editData[0].exchange);
        setsymbol(editData[0].symbol);
        setlotSize(editData[0].lotSize);
        setStatus(editData[0].status);

    }, [editData, reRender])
    console.log(editData, id);
    console.log(editData[0].instrument, instrument);
    const [formstate, setformstate] = useState({
        Instrument: "",
        Exchange: "",
        Status: "",
        Symbole: "",
        LotSize: "",
        LastModifiedOn: ""
    });

    console.log(formstate);
    const [modal, setModal] = useState(false);
    const toggleModal = () => {
        setModal(!modal);
    };

    if (modal) {
        document.body.classList.add('active-modal')
    } else {
        document.body.classList.remove('active-modal')
    }

    async function formbtn(e) {
        e.preventDefault();

        formstate.Instrument = instrument;
        formstate.Exchange = exchange;
        formstate.Symbole = symbol;
        formstate.LotSize = lotSize;
        formstate.Status = status;
        setModal(!modal);
        setformstate(formstate);


        const { Instrument, Exchange, Symbole,LotSize, Status } = formstate;

        const res = await fetch(`http://localhost:5000/instrument/${id}`, {
            method: "PUT",
            headers: {
                "Accept": "application/json",
                "content-type": "application/json"
            },
            body: JSON.stringify({
                Instrument, Exchange, Symbole,LotSize, Status
            })
        });
        const dataResp = await res.json();
        console.log(dataResp);
        if (dataResp.status === 422 || dataResp.error || !dataResp) {
            window.alert(dataResp.error);
            console.log("Failed to Edit");
        } else {
            console.log(dataResp);
            window.alert("Edit succesfull");
            console.log("Edit succesfull");
        }
        setModal(!modal);
        reRender ? setReRender(false) : setReRender(true)
    }

    async function Ondelete() {
        console.log(editData)
        setModal(!modal);
        const res = await fetch(`http://localhost:5000/instrument/${id}`, {
            method: "DELETE",
        });

        const dataResp = await res.json();
        console.log(dataResp);
        if (dataResp.status === 422 || dataResp.error || !dataResp) {
            window.alert(dataResp.error);
            console.log("Failed to Delete");
        } else {
            console.log(dataResp);
            window.alert("Delete succesfull");
            console.log("Delete succesfull");
        }

        setModal(!modal);
        reRender ? setReRender(false) : setReRender(true)
    }
    return (
        <>
            <button onClick={toggleModal}><TiEdit /></button>
            {modal && (
                <div className="modal">
                    <div onClick={toggleModal} className="overlay"></div>
                    <div className={Styles.modalContent}>
                        <form className={Styles.main_instrument_form}>
                            <label className={Styles.Ac_form} htmlFor="">Instrument</label>
                            <input type="text" value={instrument} className={Styles.Ac_forminput} onChange={(e) => { { setInstrument(e.target.value) } }} />
                            <label className={Styles.Ac_form} htmlFor="">Exchange</label>
                            <input type="text" value={exchange} className={Styles.Ac_forminput} onChange={(e) => { { setexchange(e.target.value).toUpperCase() } }} />
                            <label className={Styles.Ac_form} htmlFor="">Symbol</label>
                            <input type="text" value={symbol} className={Styles.Ac_forminput} onChange={(e) => { { setsymbol(e.target.value).toUpperCase() } }} />
                            <label htmlFor="" className={Styles.Ac_form}>Lot Size</label>
                            <input type="text" value={lotSize} className={Styles.Ac_forminput} onChange={(e) => { { setlotSize(e.target.value) } }} />
                            <label htmlFor="" className={Styles.Ac_form}>Status</label>
                            <select name="" id="" value={status} className={Styles.Ac_forminput} onChange={(e) => { { setInstrument(e.target.value) } }}>
                                <option value=""></option>
                                <option value="Inactive">Inactive</option>
                                <option value="Active">Active</option>
                            </select>
                        </form>
                        <button className={Styles.ACform_tbn} onClick={formbtn}>OK</button> <button className={Styles.ACform_tbn} onClick={Ondelete}>Delete</button>

                    </div>
                </div>
            )}
        </>
    )
}