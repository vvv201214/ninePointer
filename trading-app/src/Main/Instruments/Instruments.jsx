import React, { useState, useEffect } from "react";
import Styles from './InstrumentModel.module.css';
import uniqid from "uniqid";
import axios from "axios";
import InstrumentsEditModel from "./InstrumentEditModel/InstrumentsEditModel";
import EditIcon from '@mui/icons-material/Edit';


function Instruments() {
    let baseUrl = process.env.NODE_ENV === "production" ? "/" : "http://localhost:5000/"

    let uId = uniqid();
    let date = new Date();
    let createdOn = `${String(date.getDate()).padStart(2, '0')}-${String(date.getMonth() + 1).padStart(2, '0')}-${(date.getFullYear())} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}:${String(date.getSeconds()).padStart(2, '0')}`
    let lastModified = `${String(date.getDate()).padStart(2, '0')}-${String(date.getMonth() + 1).padStart(2, '0')}-${(date.getFullYear())} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}:${String(date.getSeconds()).padStart(2, '0')}`


    let createdBy = "prateek"

    const [modal, setModal] = useState(false);
    const [activeData, setActiveData] = useState([]);
    const [inactiveData, setInActiveData] = useState([]);
    const [reRender, setReRender] = useState(true);


    const [formstate, setformstate] = useState({
        contractDate:"",
        Instrument: "",
        Exchange: "",
        Status: "",
        Symbole: "",
        LotSize: "",
        maxLot:"",
        LastModifiedOn: ""
    });

    useEffect(() => {
        axios.get(`${baseUrl}api/v1/readInstrumentDetails`)
            .then((res) => {
                let data = res.data;
                let active = data.filter((elem) => {
                    console.log(elem.createdOn, createdOn);
                    return elem.status === "Active"
                })
                setActiveData(active);
                console.log(active);

                let inActive = data.filter((elem) => {
                    return elem.status === "Inactive"
                })
                setInActiveData(inActive);
                console.log(inactiveData);
            }).catch((err)=>{
                window.alert("Server Down");
                return new Error(err);
            })
    }, [reRender])

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
        setformstate(formstate);
        console.log(formstate)
        setModal(!modal);




        const { Instrument, Exchange, Status, Symbole, LotSize, contractDate, maxLot } = formstate;

        const res = await fetch(`${baseUrl}api/v1/instrument`, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                instrument: Instrument, exchange: Exchange, status: Status, symbol: Symbole, lotSize: LotSize, lastModified, uId, createdBy, createdOn, contractDate, maxLot
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
                        <button onClick={toggleModal} class="btnnew bg-gradient-info mt-3 w-15">Create Instrument</button>
                        {modal && (
                            <div className="modal" >
                                <div onClick={toggleModal} className="overlay"></div>
                                <div className={Styles.modalContent}>
                                    <div className={Styles.form_btn}>
                                        <form className={Styles.main_instrument_form}>
                                            <label className={Styles.Ac_form} htmlFor="">Contract Date</label>
                                            <input type="date" className={Styles.Ac_forminput} onChange={(e) => { { formstate.contractDate = e.target.value } }} />
                                            <label className={Styles.Ac_form} htmlFor="">Instrument</label>
                                            <input type="text" className={Styles.Ac_forminput} onChange={(e) => { { formstate.Instrument = e.target.value } }} />
                                            <label className={Styles.Ac_form} htmlFor="">Exchange</label>
                                            <input type="text" className={Styles.Ac_forminput} onChange={(e) => { { formstate.Exchange = (e.target.value).toUpperCase() } }} />
                                            <label className={Styles.Ac_form} htmlFor="">Symbol</label>
                                            <input type="text" className={Styles.Ac_forminput} onChange={(e) => { { formstate.Symbole = e.target.value.toUpperCase() } }} />
                                            <label htmlFor="" className={Styles.Ac_form}>Lot Size</label>
                                            <input type="number" className={Styles.Ac_forminput} onChange={(e) => { { formstate.LotSize = e.target.value } }} />
                                            <label htmlFor="" className={Styles.Ac_form}>Max Lot</label>
                                            <input type="number" className={Styles.Ac_forminput} onChange={(e) => { { formstate.maxLot = e.target.value } }} />
                                            <label htmlFor="" className={Styles.Ac_form}>Status</label>
                                            <select name="" id="" className={Styles.Ac_forminput} onChange={(e) => { { formstate.Status = e.target.value } }}>
                                                <option value=""></option>
                                                <option value="Inactive">Inactive</option>
                                                <option value="Active">Active</option>
                                            </select>
                                            <button className={Styles.ACform_tbn} onClick={formbtn}>OK</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        )}


<div class="row1">
        <div class="col-12">
          <div class="card my-4">
            <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
              <div class="bg-gradient-primary shadow-primary border-radius-lg pt-2 pb-1">
                <div><h6 class="text-white text-capitalize ps-3">Active Instruments</h6></div>

              </div>
            </div>
            <div class="card-body px-0 pb-2 py-0">
              <div class="table-responsive p-0">
                <table class="table align-items-center mb-0">
                  <thead>
                    <tr>
                      <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Instruments</th>
                      <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Contract Date</th>
                      <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Exchange</th>
                      <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Lot Size</th>
                      <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Max Quantity</th>
                      <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Status</th>
                      <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Created On</th>
                      <th class="text-secondary opacity-7"></th>
                    </tr>
                  </thead>
                {
                    activeData.map((elem) => {
                    return (
                  <tbody>
                    <tr >
                      <td >
                        <div class="d-flex px-2 py-0">
                          {/* <div>
                            <img src="../assets/img/team-2.jpg" class="avatar avatar-sm me-3 border-radius-lg" alt="user1"/>
                          </div> */}
                          <div class="d-flex flex-column justify-content-center">
                            <h6 class="mb-0 text-sm">{elem.instrument}</h6>
                            <p class="text-xs text-secondary mb-0">{elem.symbol}</p>
                          </div>
                        </div>
                      </td>
                      <td>
                      <span class="align-middle text-center text-secondary text-xs font-weight-bold">{elem.contractDate}</span>
                      </td>
                      <td class="align-middle text-center text-sm">
                        <span class="badge badge-sm bg-gradient-success">{elem.exchange}</span>
                      </td>
                      <td class="align-middle text-center">
                        <span class="text-secondary text-xs font-weight-bold">{elem.lotSize}</span>
                      </td>
                      <td class="align-middle text-center">
                        <span class="text-secondary text-xs font-weight-bold">{elem.maxLot}</span>
                      </td>
                      <td class="align-middle text-center text-sm">
                        <span class="badge badge-sm bg-gradient-success">{elem.status}</span>
                      </td>
                      <td class="align-middle text-center">
                        <span class="text-secondary text-xs font-weight-bold">{elem.createdOn}</span>
                      </td>
                      <td class="align-middle">
                        <a href="javascript:;" class="text-secondary font-weight-bold text-xs" data-toggle="tooltip" data-original-title="Edit user">
                        <InstrumentsEditModel data={activeData} id={elem._id} Render={{setReRender, reRender}}/>
                        </a>
                      </td>
                    </tr>
                  </tbody>
                    )}
                    )}
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

                        {/* <span className="grid2_span">Inactive Instruments</span>
                        <div className="grid_2">
                            <table className="grid1_table">
                                <tr className="grid2_tr">
                                    <th className="grid2_th">Created On</th>
                                    <th className="grid2_th">Contract Date</th>
                                    <th className="grid2_th">Instrument</th>
                                    <th className="grid2_th">Exchange</th>
                                    <th className="grid2_th">Symbol</th>
                                    <th className="grid2_th">Lot Size</th>
                                    <th className="grid2_th">Max Lot</th>
                                    <th className="grid2_th">Status</th>
                                    <th className="grid2_th">Last Modified</th>
                                </tr>
                                {inactiveData.map((elem) => {
                                    return (
                                        <tr className="grid2_tr">
                                            <td className="grid2_td"><span className="Editbutton"><InstrumentsEditModel data={inactiveData} id={elem._id} Render={{setReRender, reRender}}/></span>{elem.createdOn}</td>
                                            <td className="grid2_td">{elem.contractDate}</td>
                                            <td className="grid2_td">{elem.instrument}</td>
                                            <td className="grid2_td">{elem.exchange}</td>
                                            <td className="grid2_td">{elem.symbol}</td>
                                            <td className="grid2_td">{elem.lotSize}</td>
                                            <td className="grid2_td">{elem.maxLot}</td>
                                            <td className="grid2_td">{elem.status}</td>
                                            <td className="grid2_td">{elem.lastModified}</td>
                                        </tr>
                                    )
                                })
                                }
                            </table>
                        </div> */}

<div class="row1 z-index-0">
        <div class="col-12">
          <div class="card my-4">
          <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
              <div class="bg-gradient-primary shadow-primary border-radius-lg pt-2 pb-1">
                <div><h6 class="text-white text-capitalize ps-3">Inactive Instruments</h6></div>

              </div>
            </div>
            <div class="card-body px-0 pb-2 py-0">
              <div class="table-responsive p-0">
                <table class="table align-items-center mb-0">
                  <thead>
                    <tr>
                      <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Instruments</th>
                      <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Contract Date</th>
                      <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Exchange</th>
                      <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Lot Size</th>
                      <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Max Quantity</th>
                      <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Status</th>
                      <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Created On</th>
                      <th class="text-secondary opacity-7"></th>
                    </tr>
                  </thead>
                {
                    inactiveData.map((elem) => {
                    return (
                  <tbody>
                    <tr>
                      <td>
                        <div class="d-flex px-2 py-0">
                          {/* <div>
                            <img src="../assets/img/team-2.jpg" class="avatar avatar-sm me-3 border-radius-lg" alt="user1"/>
                          </div> */}
                          <div class="d-flex flex-column justify-content-center">
                            <h6 class="mb-0 text-sm">{elem.instrument}</h6>
                            <p class="text-xs text-secondary mb-0">{elem.symbol}</p>
                          </div>
                        </div>
                      </td>
                      <td>
                      <span class="align-middle text-center text-secondary text-xs font-weight-bold">{elem.contractDate}</span>
                      </td>
                      <td class="align-middle text-center text-sm">
                        <span class="badge badge-sm bg-gradient-success">{elem.exchange}</span>
                      </td>
                      <td class="align-middle text-center">
                        <span class="text-secondary text-xs font-weight-bold">{elem.lotSize}</span>
                      </td>
                      <td class="align-middle text-center">
                        <span class="text-secondary text-xs font-weight-bold">{elem.maxLot}</span>
                      </td>
                      <td class="align-middle text-center text-sm">
                        <span class="badge badge-sm bg-gradient-success">{elem.status}</span>
                      </td>
                      <td class="align-middle text-center">
                        <span class="text-secondary text-xs font-weight-bold">{elem.createdOn}</span>
                      </td>
                      {/* <td class="align-middle">
                        <a href="javascript:;" class="text-secondary font-weight-bold text-xs" data-toggle="tooltip" data-original-title="Edit user">
                        <InstrumentsEditModel data={inactiveData} id={elem._id} Render={{setReRender, reRender}}/>
                        </a>
                      </td> */}
                    </tr>
                  </tbody>
                    )}
                    )}
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

                    </div>
                </div>
            </div>
        </div>
    )
}
export default Instruments;




