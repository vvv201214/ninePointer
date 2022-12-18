import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIndianRupeeSign } from '@fortawesome/free-solid-svg-icons';
import { useEffect } from 'react';
import { userContext } from "../AuthContext";
import axios from "axios"
import OverallPnl from "./PnlParts/OverallPnl";
import RunningPnl from "./PnlParts/RunningPnl";
import ClosedPnl from "./PnlParts/ClosedPnl";
import TradersPnlCompany from "./PnlParts/TradersPnlCompany";
import TradersPNL from "./PnlParts/TraderPNL";

export default function TraderPosition() {

    // const getDetails = useContext(userContext);
    let baseUrl = process.env.NODE_ENV === "production" ? "/" : "http://localhost:5000/"

    const [tradeData, setTradeData] = useState([]);
    // const [reRender, setReRender] = useState(true);
    const [marketData, setMarketData] = useState([]);
    // const [userDetail, setUserDetail] = useState([]);
    const [data, setData] = useState([]);
    let date = new Date();
    let todayDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`
    // let fake_date = "14-12-2022"
    // useEffect(() => {

    //     axios.get(`${baseUrl}api/v1/readuserdetails`)
    //     .then((res) => {
    //         setUserDetail(res.data);
    //     }).catch((err)=>{
    //         return new Error(err);
    //     })

    //     axios.get(`${baseUrl}api/v1/readmocktradecompany`)
    //         .then((res) => {
    //             let data = (res.data).filter((elem) => {
    //                 return elem.order_timestamp.includes(todayDate) && elem.status === "COMPLETE";
    //             })
    //             setData(data);
    //         }).catch((err) => {
    //             return new Error(err);
    //         })

    // axios.get(`${baseUrl}api/v1/getliveprice`)
    //     .then((res) => {
    //         console.log("live price data", res)
    //         setMarketData(res.data)
    //     }).catch((err) => {

    //         return new Error(err);
    //     })

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

    //     // axios.get(`${baseUrl}api/v1/ws`)
    //     // .then((res)=>{
    //     //     console.log("vijay", (res.data)[0].last_price);
    //     // }).catch((err)=>{
    //     //     window.alert("Server Down");
    //     //     return new Error(err);
    //     // })

    //     socket.on("tick", (data) => {
    //         console.log("this is live market data", data);
    //         setMarketData(data);
    //     })

    //     console.log(marketData);
    //     console.log(tradeData);
    //     // reRender ? setReRender(false) : setReRender(true)
    //     // setReRender(true);
    // }, [getDetails, reRender])
    // console.log(marketData);
    // useEffect(() => {
    //     return () => {
    //         console.log('closing');
    //         socket.close();
    //     }
    // }, [])

    return (
        <div>
            <div className="main_Container">
                <div className="right_side">
                    <div className="rightside_maindiv">
                        <span className="grid1_span">Instruments Details</span>
                        <div className="grid_1">
                            <table className="grid1_table">
                                <tr className="grid2_tr">
                                    <th className="grid2_th">Trading Date</th>
                                    <th className="grid2_th">Contract Date</th>
                                    <th className="grid2_th"> Symbol</th>
                                    <th className="grid2_th"> Instrument</th>
                                    <th className="grid2_th">LTP(<FontAwesomeIcon className='fa-xs' icon={faIndianRupeeSign} />)</th>
                                    <th className="grid2_th">%Change</th>
                                </tr>
                                {tradeData.map((elem, index) => {
                                    let updatedMarketData = marketData.filter((subElem) => {
                                        return elem.instrumentToken === subElem.instrument_token;
                                    })
                                    return (
                                        <tr className="grid1_table">
                                            <td className="grid2_td">{todayDate}</td>
                                            <td className="grid2_td">1</td>
                                            <td className="grid2_td">{elem.symbol}</td>
                                            <td className="grid2_td">{elem.instrument}</td>
                                            <td className="grid2_td">{updatedMarketData[0]?.last_price}</td>

                                            {console.log(updatedMarketData[0], updatedMarketData[0]?.change)}
                                            {(updatedMarketData[0]?.change === undefined) ?
                                                <td className="grid2_td">{(Math.abs((updatedMarketData[0]?.last_price - updatedMarketData[0]?.average_price) / updatedMarketData[0]?.average_price)).toFixed(2)}%</td>
                                                :
                                                <td className="grid2_td">{updatedMarketData[0]?.change.toFixed(2)}%</td>}
                                        </tr>
                                    )
                                })}
                            </table>
                        </div>
                        <span className="grid2_span">Overall PNL-Traders</span>
                        <div className="grid_2">
                            <OverallPnl marketData={marketData} tradeData={tradeData} data={data} />
                        </div>
                        <span className="grid2_span">Running PNL-Traders</span>
                        <div className="grid_2">
                            <RunningPnl marketData={marketData} tradeData={tradeData} data={data} />
                        </div>
                        <span className="grid2_span">Closed Trades PNL-Traders</span>
                        <div className="grid_2">
                            <ClosedPnl marketData={marketData} tradeData={tradeData} data={data} />
                        </div>
                        <span className="grid2_span">Traders PNL</span>
                        <div className="grid_2">
                            <TradersPNL />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}