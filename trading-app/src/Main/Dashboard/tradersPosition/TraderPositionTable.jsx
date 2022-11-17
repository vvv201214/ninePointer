import React from "react";
import { useState } from "react";
// import './CompanyPosition.css';
import ByModal from '../companyPosition/ByModal';
import SellModel from "../companyPosition/SellModel";
import { useEffect } from 'react';
import axios from "axios"

function TraderPositionTable({ socket }) {

    const isTradersTrade = true;
    const [tradeData, setTradeData] = useState([]);
    const [marketData, setMarketData] = useState([]);
    let date = new Date();
    useEffect(() => {
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
        // tradeData.map((elem, index)=>{
        //     for(let property in marketData[index]){
        //         if(property === "last_price" || property === "change"){
        //             elem[property] = marketData[index][property]
        //         }
        //     }
        // })
        console.log(tradeData);
        // setTradeData([...tradeData])
    },[])

    useEffect(()=>{
        return ()=>{
            console.log('closing');
            socket.close();
        }
    },[])

    return (
        <div>
            <div className="main_Container">
                <div className="right_side">
                    <div className="rightside_maindiv">
                        <div className="grid_1">
                            <span className="grid1_span">Instruments Details</span>
                            <span className="grid1_ul"></span>
                            <ul className="grid1_ul grid2_ul">
                                <li className="grid1_li">Trading Date</li>
                                <li className="grid1_li">Instrument</li>
                                <li className="grid1_li">LTP</li>
                                <li className="grid1_li">%Change</li>
                                <li className="grid1_li">Action</li>
                                
                            </ul>
                            {tradeData.map((elem, index)=>{
                                let updatedMarketData = marketData.filter((subElem)=>{
                                    return elem.instrumentToken === subElem.instrument_token;
                                })
                                // setMarketData(updatedMarketData)
                                return(
                                        <ul className="grid1_ul" key={elem.uId}>
                                            <li className="grid1_li">{elem.createdOn}</li>
                                            <li className="grid1_li">{elem.symbol}</li>
                                            <li className="grid1_li">{updatedMarketData[0]?.last_price}</li>
                                            <li className="grid1_li">{updatedMarketData[0]?.change.toFixed(2)}</li>
                                            <li className="grid1_li"><ByModal marketData={marketData} uIdProps={elem.uId} isTradersTrade={true}/></li>
                                            <li className="grid1_li"><SellModel marketData={marketData} uIdProps={elem.uId} isTradersTrade={true}/></li>
                                        </ul>
                                    )
                                })} 
                        </div>
                        <div className="grid_2">
                            <span className="grid2_span">Overall PNL-Trader</span>
                            <ul className="grid2_ul">
                                <li className="grid2_li">Product</li>
                                <li className="grid2_li">Instruments</li>
                                <li className="grid2_li">Quantity</li>
                                <li className="grid2_li">Average Price</li>
                                <li className="grid2_li">LTP</li>
                                <li className="grid2_li">P&L</li>
                                <li className="grid2_li">%Change</li>
                            </ul>
                        </div>
                        <div className="grid_2">
                            <span className="grid2_span">Running PNL-Trader</span>
                            <ul className="grid2_ul">
                                <li className="grid2_li">Product</li>
                                <li className="grid2_li">Instruments</li>
                                <li className="grid2_li">Quantity</li>
                                <li className="grid2_li">Average Price</li>
                                <li className="grid2_li">LTP</li>
                                <li className="grid2_li">P&L</li>
                                <li className="grid2_li">%Change</li>
                            </ul>
                        </div>
                        <div className="grid_2">
                            <span className="grid2_span">Closed Trades PNL-Trader</span>
                            <ul className="grid2_ul">
                                <li className="grid2_li">Product</li>
                                <li className="grid2_li">Instruments</li>
                                <li className="grid2_li">Quantity</li>
                                <li className="grid2_li">Average Price</li>
                                <li className="grid2_li">LTP</li>
                                <li className="grid2_li">P&L</li>
                                <li className="grid2_li">%Change</li>
                            </ul>
                        </div>
                    </div>
           
                </div>
            </div>
        </div>
    )
}
export default TraderPositionTable;