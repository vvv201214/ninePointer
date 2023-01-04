import React, { useContext } from "react";
import { useState } from "react";
import './CompanyPosition.css';
import ByModal from './ByModal';
import SellModel from "./SellModel";
import { useEffect } from 'react';
import axios from "axios"
import { userContext } from "../../AuthContext";
import RunningPnl from "../PnlParts/RunningPnl";
import ClosedPnl from "../PnlParts/ClosedPnl";
import OverallPnl from "../PnlParts/OverallPnl";
import TradersPnlCompany from "../PnlParts/TradersPnlCompany";
import TradersPnlLiveCompany from "../PnlParts/TradersPnlLiveCompany";
import Styles from "../Dashboard.module.css";

function CompanyPositionTable({ socket }) {
    const getDetails = useContext(userContext);
    const setDetails = useContext(userContext);
    let baseUrl = process.env.NODE_ENV === "production" ? "/" : "http://localhost:5000/"
    
    const [tradeData, setTradeData] = useState([]);
    const [reRender, setReRender] = useState(true);
    const [marketData, setMarketData] = useState([]);
    const [data, setData] = useState([]);
    const [livedata, setLiveData] = useState([]);
    let date = new Date();
    let todayDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`
    let fake_date = "16-12-2022"
    useEffect(() => {

        axios.get(`${baseUrl}api/v1/readmocktradecompanyDate`)
            .then((res) => {
                // let data = (res.data).filter((elem) => {
                //     return elem.order_timestamp.includes(todayDate) && elem.status === "COMPLETE";
                // })
                console.log("data", res.data)
                setData(res.data);
            }).catch((err) => {
                return new Error(err);
            })
        
            axios.get(`${baseUrl}api/v1/readlivetradecompanyDate`)
            .then((res) => {
                // let data = (res.data).filter((elem) => {
                //     return elem.order_timestamp.includes(todayDate) && elem.status === "COMPLETE";
                // })
                console.log("data", res.data)
                setLiveData(res.data);
            }).catch((err) => {
                return new Error(err);
            })

        axios.get(`${baseUrl}api/v1/getliveprice`)
            .then((res) => {
                console.log("live price data", res)
                setMarketData(res.data);
                // setDetails.setMarketData(data);
            }).catch((err) => {
                return new Error(err);
            })

        axios.get(`${baseUrl}api/v1/readInstrumentDetails`)
            .then((res) => {
                let dataArr = (res.data).filter((elem) => {
                    return elem.status === "Active"
                })
                setTradeData(dataArr)
            }).catch((err) => {

                return new Error(err);
            })
        console.log("hii");

        socket.on("tick", (data) => {
            console.log("this is live market data", data);
            setMarketData(data);
            // setDetails.setMarketData(data);
        })


        console.log(marketData);
        console.log(tradeData);
        // reRender ? setReRender(false) : setReRender(true)
        // setReRender(true);
    }, [getDetails])
    console.log(marketData);
    useEffect(() => {
        return () => {
            console.log('closing');
            socket.close();
        }
    }, [])


    return (
        <div>
            <div className="main_Container">
                <div className="right_side">
                    <div className="rightside_maindiv">

                    <div class="row1">
                    <div class="col-12">
                    <div class="card my-4">
                        <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                        <div class="bg-gradient-secondary shadow-secondary border-radius-lg pt-0 pb-0">
                            <h6 class="text-white text-capitalize text-sm-center ps-3">Instruments</h6>
                        </div>
                        </div>
                        <div class="card-body px-0 pb-2">
                        <div class="table-responsive p-0">
                            <table class="table align-items-center mb-0">
                            <thead>
                                <tr>
                                <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Trading Date</th>
                                <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Contract Date</th>
                                <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Symbol</th>
                                <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Instrument</th>
                                <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">LTP</th>
                                <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Change(%)</th>
                                <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Action</th>
                                <th class="text-secondary opacity-7"></th>
                                </tr>
                            </thead>
                    {/* <div className={Styles.gridheader}>
                    <div className={Styles.box}>
                    <span class="btnnew bg-gradient-secondary mt-0 w-100">Instruments Details</span>
                            <table className="grid1_table">
                                <tr className="grid2_tr">
                                    <th className="grid2_th">Trading Date</th>
                                    <th className="grid2_th">Contract Date</th>
                                    <th className="grid2_th">Symbol</th>
                                    <th className="grid2_th">Instrument</th>
                                    <th className="grid2_th">LTP</th>
                                    <th className="grid2_th">Change(%)</th>
                                    <th className="grid2_th">Action</th>
                                </tr> */}
                                {tradeData.map((elem, index) => {
                                    let updatedMarketData = marketData.filter((subElem) => {
                                        return elem.instrumentToken === subElem.instrument_token;
                                    })
                                    return (
                                        <tbody>

                                        <tr>
                      <td>
                        <div class="d-flex px-2 py-1">
                          <div class="d-flex flex-column justify-content-center">
                            <h6 class="mb-0 text-sm">{todayDate}</h6>
                            <p class="text-xs text-secondary mb-0"></p>
                          </div>
                        </div>
                      </td>
                      <td>
                      <span class="align-middle text-center text-secondary text-xs font-weight-bold">{elem.contractDate}</span>
                      </td>
                      <td class="align-middle text-center text-sm">
                        <span class="badge badge-sm bg-gradient-success">{elem.symbol}</span>
                      </td>
                      <td class="align-middle text-center">
                        <span class="text-secondary text-xs font-weight-bold">{elem.instrument}</span>
                      </td>
                      
                      {(updatedMarketData[0]?.last_price) === undefined ?
                      <td class="align-middle text-center text-sm">
                        <span class="badge badge-sm bg-gradient-success">₹{(updatedMarketData[0]?.last_price)}</span>
                      </td>
                      :
                      <td class="align-middle text-center text-sm">
                        <span class="badge badge-sm bg-gradient-success">₹{(updatedMarketData[0]?.last_price).toFixed(2)}</span>
                      </td>}
                      {(updatedMarketData[0]?.change === undefined) ?
                      <td class="align-middle text-center">
                        <span class="text-secondary text-xs font-weight-bold">{(Math.abs((updatedMarketData[0]?.last_price - updatedMarketData[0]?.average_price) / updatedMarketData[0]?.average_price)).toFixed(2)}%</span>
                      </td>
                      :
                      <td class="align-middle text-center">
                        <span class="text-secondary text-xs font-weight-bold">{updatedMarketData[0]?.change.toFixed(2)}%</span>
                      </td>}
                      <td class="align-middle">
                      <div className="companyPosition_BSbtn">
                            <ByModal symbol={elem.instrument} ltp={(updatedMarketData[0]?.last_price)} maxlot={(elem.maxLot)} lotsize={(elem.lotSize)} Render={{ setReRender, reRender }} marketData={marketData} uIdProps={elem.uId} isCompany={true} />
                            <SellModel symbol={elem.instrument} ltp={(updatedMarketData[0]?.last_price)} maxlot={(elem.maxLot)} lotsize={(elem.lotSize)} Render={{ setReRender, reRender }} marketData={marketData} uIdProps={elem.uId} isCompany={true} />
                      </div>
                      </td>

                                            {/* <td className="grid2_td">{todayDate}</td>
                                            <td className="grid2_td">{elem.contractDate}</td>
                                            <td className="grid2_td">{elem.symbol}</td>
                                            <td className="grid2_td">{elem.instrument}</td>
                                            {(updatedMarketData[0]?.last_price) === undefined ?
                                            <td className="grid2_td">₹{(updatedMarketData[0]?.last_price)}</td>
                                            :
                                            <td className="grid2_td">₹{(updatedMarketData[0]?.last_price).toFixed(2)}</td>}

                                            {console.log(updatedMarketData[0], updatedMarketData[0]?.change)}
                                            {(updatedMarketData[0]?.change === undefined) ?
                                                <td className="grid2_td">{(Math.abs((updatedMarketData[0]?.last_price - updatedMarketData[0]?.average_price) / updatedMarketData[0]?.average_price)).toFixed(2)}%</td>
                                                :
                                                <td className="grid2_td">{updatedMarketData[0]?.change.toFixed(2)}%</td>}
                                            <td className="grid2_th companyPosition_BSbtn2">
                                                <div className="companyPosition_BSbtn">
                                                    <ByModal symbol={elem.instrument} ltp={(updatedMarketData[0]?.last_price)} maxlot={(elem.maxLot)} lotsize={(elem.lotSize)} Render={{ setReRender, reRender }} marketData={marketData} uIdProps={elem.uId} isCompany={true} />
                                                    <SellModel symbol={elem.instrument} ltp={(updatedMarketData[0]?.last_price)} maxlot={(elem.maxLot)} lotsize={(elem.lotSize)} Render={{ setReRender, reRender }} marketData={marketData} uIdProps={elem.uId} isCompany={true} />
                                                </div>
                                            </td> */}
                                        </tr>
                                        </tbody>
                                    )
                                })}
                            </table>
                            </div>
                            </div>
                            </div>
                        </div>
                        </div>


                        <div class="row1" style={{zIndex : "0"}}>
                            <div class="col-12">
                            <div class="card my-4">
                                <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                                <div class="bg-gradient-primary shadow-primary border-radius-lg pt-0 pb-0">
                            <h6 class="text-white text-capitalize text-sm-center ps-3">Overall P&L (Company) - Mock</h6>
                            </div>
                            </div>
                            <OverallPnl marketData={marketData} tradeData={tradeData} data={data} />
                        </div></div>
                        </div>
                        <div class="row1 " style={{zIndex : "0"}}>
                            <div class="col-12">
                            <div class="card my-4">
                                <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                                <div class="bg-gradient-success shadow-success border-radius-lg pt-0 pb-0">
                            <h6 class="text-white text-capitalize text-sm-center ps-3">Overall P&L (Company) - Live</h6>
                                </div></div>
                            <OverallPnl marketData={marketData} tradeData={tradeData} data={livedata} />
                        </div>
                        </div>
                        </div>
                      \
                        
                        {/* <span className="grid2_span">Running PNL-Company</span>
                        <div className="grid_2">
                            <RunningPnl marketData={marketData} tradeData={tradeData} data={data} />
                        </div>
                        <span className="grid2_span">Closed Trades PNL-Company</span>
                        <div className="grid_2">
                            <ClosedPnl marketData={marketData} tradeData={tradeData} data={data} />
                        </div> */}
                        <div class="row1" style={{zIndex : "0"}}>
                            <div class="col-12">
                            <div class="card my-4">
                                <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                                <div class="bg-gradient-primary shadow-primary border-radius-lg pt-0 pb-0">
                            <h6 class="text-white text-capitalize text-sm-center ps-3">Trader Wise P&L (Company) - Mock</h6>
                                </div></div>
                            <TradersPnlCompany marketData={marketData} tradeData={tradeData}/>          
                        </div>
                        </div>
                        </div>
                        <div class="row1" style={{zIndex : "0"}}>
                            <div class="col-12">
                            <div class="card my-4">
                                <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                                <div class="bg-gradient-success shadow-success border-radius-lg pt-0 pb-0">
                            <h6 class="text-white text-capitalize text-sm-center ps-3">Trader Wise P&L (Company) - Live</h6>
                                </div></div>
                                <TradersPnlLiveCompany marketData={marketData} tradeData={tradeData}/>          
                        </div>
                        </div>
                        </div>
                </div>
            </div>
            </div>
        </div>
    )
}
export default CompanyPositionTable;