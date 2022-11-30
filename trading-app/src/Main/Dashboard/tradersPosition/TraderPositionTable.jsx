import React from "react";
import { useState } from "react";
// import './CompanyPosition.css';
import ByModal from '../companyPosition/ByModal';
import SellModel from "../companyPosition/SellModel";
import { useEffect } from 'react';
import axios from "axios"
import RunningPnl from "../companyPosition/RunningPnl";

function TraderPositionTable({ socket }) {

    const [tradeData, setTradeData] = useState([]);
    const [marketData, setMarketData] = useState([]);
    const [renderRunning, setRenderRunning] = useState(true);
    const [orderId, setOrderId] = useState();
    console.log("orderid in client", orderId);
    let date = new Date();
    useEffect(() => {
        axios.get("http://localhost:5000/getliveprice")
            .then((res) => {
                console.log("live price data", res)
                setMarketData(res.data)
            })

        axios.get("http://localhost:5000/readInstrumentDetails")
            .then((res) => {
                let dataArr = (res.data).filter((elem) => {
                    return (elem.createdOn).includes(`${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`) && elem.status === "Active"
                })
                setTradeData(dataArr)
            })
        console.log("hii");

        axios.get("http://localhost:5000/ws")
        .then((res)=>{
            console.log("vijay", (res.data)[0].last_price);
        })
        
        socket.on("tick",(data)=>{
            console.log(data);
            setMarketData(data);
        })
        
        console.log(marketData);
        console.log(tradeData);
       
    },[])

    useEffect(()=>{
        return ()=>{
            console.log('closing');
            socket.close();
        }
    },[])
    return(
        <div>
            <div className="main_Container">
                <div className="right_side">
                    <div className="rightside_maindiv">
                        <div className="grid_1">
                            <span className="grid1_span">Instruments Details</span>
                            <table className="grid1_table">
                                <tr className="grid2_tr">
                                    <th className="grid2_th">Trading Date</th>
                                    <th className="grid2_th">Instrument</th>
                                    <th className="grid2_th">LTP</th>
                                    <th className="grid2_th">%Change</th>
                                    <th className="grid2_th">Action</th>
                                </tr>

                                {tradeData.map((elem, index)=>{
                                let updatedMarketData = marketData.filter((subElem)=>{
                                    return elem.instrumentToken === subElem.instrument_token;
                                })
                                // setMarketData(updatedMarketData)
                                return(
                                        <tr className="grid2_tr" key={elem.uId}>
                                            <td className="grid2_td">{elem.createdOn}</td>
                                            <td className="grid2_td">{elem.symbol}</td>
                                            <td className="grid2_td">{updatedMarketData[0]?.last_price}</td>

                                            {console.log(updatedMarketData[0], updatedMarketData[0]?.change)}
                                            {(updatedMarketData[0]?.change === undefined) ? 
                                            <td className="grid2_td">{updatedMarketData[0]?.change}</td>
                                            :
                                            <td className="grid2_td">{updatedMarketData[0]?.change.toFixed(2)}</td>}

                                            <td className="grid2_th companyPosition_BSbtn2"><div className="companyPosition_BSbtn">
                                            <ByModal marketData={marketData} uIdProps={elem.uId} isTradersTrade={true} setOrder={setOrderId}/>
                                            <SellModel marketData={marketData} uIdProps={elem.uId} isTradersTrade={true} setOrder={setOrderId}/></div></td>
                                        </tr>
                                    )
                                })} 
                            </table>
                        </div>
                        <div className="grid_2">
                            <span className="grid2_span">Overall PNL-Trader</span>
                            <table className="grid1_table">
                                <tr className="grid2_tr">
                                    <th className="grid2_th">Product</th>
                                    <th className="grid2_th">Instrument</th>
                                    <th className="grid2_th">Quantity</th>
                                    <th className="grid2_th">Average Price</th>
                                    <th className="grid2_th">LTP</th>
                                    <th className="grid2_th">P&L</th>
                                    <th className="grid2_th">%Change</th>
                                </tr> 
                            </table>
                        </div>
                        <div className="grid_2">
                            <span className="grid2_span">Running PNL-Trader</span>
                            <RunningPnl marketData={marketData} tradeData={tradeData} orderId={orderId} render1={renderRunning} renderFunc={setRenderRunning}/>
                        </div>
                        <div className="grid_2">
                            <span className="grid2_span">Closed Trades PNL-Trader</span>
                            <table className="grid1_table">
                                <tr className="grid2_tr">
                                    <th className="grid2_th">Product</th>
                                    <th className="grid2_th">Instrument</th>
                                    <th className="grid2_th">Quantity</th>
                                    <th className="grid2_th">Average Price</th>
                                    <th className="grid2_th">LTP</th>
                                    <th className="grid2_th">P&L</th>
                                    <th className="grid2_th">%Change</th>
                                </tr> 
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default TraderPositionTable;