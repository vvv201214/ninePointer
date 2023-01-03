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
                    <div className={Styles.gridheader}>
                    <div className={Styles.box}>
                    <span class="btn bg-gradient-secondary mt-0 w-100">Instruments Details</span>
                            <table className="grid1_table">
                                <tr className="grid2_tr">
                                    <th className="grid2_th">Trading Date</th>
                                    <th className="grid2_th">Contract Date</th>
                                    <th className="grid2_th">Symbol</th>
                                    <th className="grid2_th">Instrument</th>
                                    <th className="grid2_th">LTP</th>
                                    <th className="grid2_th">Change(%)</th>
                                    <th className="grid2_th">Action</th>
                                </tr>
                                {tradeData.map((elem, index) => {
                                    let updatedMarketData = marketData.filter((subElem) => {
                                        return elem.instrumentToken === subElem.instrument_token;
                                    })
                                    return (
                                        <tr>
                                            <td>
                                                <p class="text-xs font-weight-bold mb-0" style={{textAlign:"center"}}>{todayDate}</p>  
                                            </td>
                                            <td>
                                                <p class="text-xs font-weight-bold mb-0" style={{textAlign:"center"}}>{elem.contractDate}</p>  
                                            </td>
                                            <td>
                                                <p class="text-xs font-weight-bold mb-0" style={{textAlign:"center"}}>{elem.symbol}</p>  
                                            </td>
                                            <td>
                                                <p class="text-xs font-weight-bold mb-0" style={{textAlign:"center"}}>{elem.instrument}</p>  
                                            </td>

                                            {(updatedMarketData[0]?.last_price) === undefined ?
                                            <td>
                                                 <p class="text-xs font-weight-bold mb-0" style={{textAlign:"center"}}>₹{(updatedMarketData[0]?.last_price)}</p>
                                            </td>
                                            :
                                            <td>
                                                <p class="text-xs font-weight-bold mb-0" style={{textAlign:"center"}}>₹{(updatedMarketData[0]?.last_price).toFixed(2)}</p>
                                            </td>}

                                            {console.log(updatedMarketData[0], updatedMarketData[0]?.change)}
                                            {(updatedMarketData[0]?.change === undefined) ?
                                                <td>
                                                    <p class="text-xs font-weight-bold mb-0" style={{textAlign:"center"}}>{(Math.abs((updatedMarketData[0]?.last_price - updatedMarketData[0]?.average_price) / updatedMarketData[0]?.average_price)).toFixed(2)}%</p>
                                                </td>
                                                :
                                                <td>
                                                    <p class="text-xs font-weight-bold mb-0" style={{textAlign:"center"}}>{updatedMarketData[0]?.change.toFixed(2)}%</p>
                                                </td>}
                                            <td>  
                                            
                                            <div>
                                                        <div>
                                                            <p><ByModal symbol={elem.instrument} ltp={(updatedMarketData[0]?.last_price)} maxlot={(elem.maxLot)} lotsize={(elem.lotSize)} Render={{ setReRender, reRender }} marketData={marketData} uIdProps={elem.uId} isCompany={true} /></p>
                                                        </div>
                                                        <div>
                                                            <p><SellModel symbol={elem.instrument} ltp={(updatedMarketData[0]?.last_price)} maxlot={(elem.maxLot)} lotsize={(elem.lotSize)} Render={{ setReRender, reRender }} marketData={marketData} uIdProps={elem.uId} isCompany={true} /></p>
                                                        </div>
                                                        
                                            </div>

                                            {/* <div class="d-flex flex-column justify-content-center">
                                            <p class="text-xs font-weight-bold mb-0" style={{textAlign:"center"}}><ByModal symbol={elem.instrument} ltp={(updatedMarketData[0]?.last_price)} maxlot={(elem.maxLot)} lotsize={(elem.lotSize)} Render={{ setReRender, reRender }} marketData={marketData} uIdProps={elem.uId} isCompany={true} /></p>
                                            
                                            <p class="text-xs font-weight-bold mb-0" style={{textAlign:"center"}}><SellModel symbol={elem.instrument} ltp={(updatedMarketData[0]?.last_price)} maxlot={(elem.maxLot)} lotsize={(elem.lotSize)} Render={{ setReRender, reRender }} marketData={marketData} uIdProps={elem.uId} isCompany={true} /></p>   
                                            </div> */}
                                            </td>
                                        </tr>
                                    )
                                })}
                            </table>
                        </div>
                        </div>
                        <span className={Styles.gridheader}>
                            <div className={Styles.box}>
                                <div class="btn bg-gradient-primary mt-0 w-100">Overall P&L(Company) - Mock</div>
                            <OverallPnl marketData={marketData} tradeData={tradeData} data={data} />
                        </div></span>
                        <span className={Styles.gridheader}>
                        <div className={Styles.box}>
                                <div class="btn bg-gradient-success mt-0 w-100">Overall P&L(Company) - Live</div>
                            <OverallPnl marketData={marketData} tradeData={tradeData} data={livedata} />
                        </div></span>
                        
                        {/* <span className="grid2_span">Running PNL-Company</span>
                        <div className="grid_2">
                            <RunningPnl marketData={marketData} tradeData={tradeData} data={data} />
                        </div>
                        <span className="grid2_span">Closed Trades PNL-Company</span>
                        <div className="grid_2">
                            <ClosedPnl marketData={marketData} tradeData={tradeData} data={data} />
                        </div> */}
                        <span className={Styles.gridheader}>
                        <div className={Styles.box}>
                        <div class="btn bg-gradient-primary mt-0 w-100">Trader Wise P&L(Company) - Mock</div>
                            <TradersPnlCompany marketData={marketData} tradeData={tradeData}/>          
                        </div></span>
                        <span className={Styles.gridheader}>
                            <div className={Styles.box}>
                            <div class="btn bg-gradient-success mt-0 w-100">Trader Wise P&L(Company) - Live</div>
                                <TradersPnlLiveCompany marketData={marketData} tradeData={tradeData}/>          
                        </div></span>
                </div>
            </div>
            </div>
        </div>
    )
}
export default CompanyPositionTable;