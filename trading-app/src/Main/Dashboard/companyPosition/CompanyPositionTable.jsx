// import React from "react";
// import { useState } from "react";
// import './CompanyPosition.css';
// import ByModal from './ByModal'
// import SellModel from "./SellModel";
// import { useEffect } from 'react';
// import { io } from "socket.io-client";
// import axios from "axios"

// function CompanyPositionTable({socket}) {

//     const [tradeData, setTradeData] = useState([]);
//     const [marketData, setMarketData] = useState([]);
//     let date = new Date();
//     const socket = io.connect("http://localhost:9000/")
//     useEffect(()=>{
//         axios.get("http://localhost:5000/readInstrumentDetails")
//         .then((res)=>{
//             let dataArr = (res.data).filter((elem)=>{
//                 return (elem.createdOn).includes(`${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()}`) && elem.status === "Active" 
//             })
//             setTradeData(dataArr)
//         })
//         console.log("hii");
        
//         axios.get("http://localhost:5000/ws")
//         .then((res)=>{
//             console.log("vijay", (res.data)[0].last_price);
//         })
//         socket.on("connect", ()=>{
//             console.log(socket.id);
//             socket.emit("hi","ok")
//         })
//         socket.on("disconnect", ()=>{
//             console.log(socket.id);
//         })
//         socket.on("tick",(data)=>{
//             console.log(data);
//             setMarketData(data);
//             console.log(marketData);
//         })

//         tradeData.map((elem, index)=>{
//             for(let property in marketData[index]){
//                 if(property === "last_price" || property === "change"){
//                     elem[property] = marketData[index][property]
//                 }
//             }
//         })
//         console.log(tradeData);
//         setTradeData([...tradeData])

//         return(()=>{
//             socket.close();
//         })
//     },[marketData])


//     return (
//         <div>
//             <div className="main_Container">
//                 <div className="right_side">
//                     <div className="rightside_maindiv">
//                         <div className="grid_1">
//                             <span className="grid1_span">Instruments Details</span>
//                             <span className="livePrice_table grid1_ul">
//                                 <table className="grid1_table">
//                                         <tr className="grid1_ul">
//                                             <th className="grid1_li">Trading Date</th>
//                                             <th className="grid1_li">Instrument</th>
//                                             <th className="grid1_li">LTP</th>
//                                             <th className="grid1_li">%Change</th>
//                                             <th className="grid1_li">Action</th>
//                                         </tr>
                           
//                                         {tradeData.map((elem)=>{
//                                             return(
//                                                 <tr key={elem.uId}>
//                                                     <td>{elem.createdOn}</td>
//                                                     <td>{elem.symbol}</td>
//                                                     <td>{elem.last_price}</td>
//                                                     {/* <td>{(elem.change).toFixed(2)}</td> */}
//                                                     <td><ByModal marketData={marketData} uIdProps={elem.uId}/></td>
//                                                     <td><SellModel marketData={marketData} uIdProps={elem.uId}/></td>
//                                                 </tr>
//                                             )
//                                         })}
                                      
//                                 </table>
                                     

//                             </span>
//                         </div>

                        
                       

//                         <div className="grid_2">
//                             <span className="grid2_span">Overall PNL-Company</span>
//                             <ul className="grid2_ul">
//                                 <li className="grid2_li">Product</li>
//                                 <li className="grid2_li">Instruments</li>
//                                 <li className="grid2_li">Quantity</li>
//                                 <li className="grid2_li">Average Price</li>
//                                 <li className="grid2_li">LTP</li>
//                                 <li className="grid2_li">P&L</li>
//                                 <li className="grid2_li">%Change</li>
//                             </ul>
//                         </div>
//                         <div className="grid_2">
//                             <span className="grid2_span">Running PNL-Company</span>
//                             <ul className="grid2_ul">
//                                 <li className="grid2_li">Product</li>
//                                 <li className="grid2_li">Instruments</li>
//                                 <li className="grid2_li">Quantity</li>
//                                 <li className="grid2_li">Average Price</li>
//                                 <li className="grid2_li">LTP</li>
//                                 <li className="grid2_li">P&L</li>
//                                 <li className="grid2_li">%Change</li>
//                             </ul>
//                         </div>
//                         <div className="grid_2">
//                             <span className="grid2_span">Closed Trades PNL-Company</span>
//                             <ul className="grid2_ul">
//                                 <li className="grid2_li">Product</li>
//                                 <li className="grid2_li">Instruments</li>
//                                 <li className="grid2_li">Quantity</li>
//                                 <li className="grid2_li">Average Price</li>
//                                 <li className="grid2_li">LTP</li>
//                                 <li className="grid2_li">P&L</li>
//                                 <li className="grid2_li">%Change</li>
//                             </ul>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }
// export default CompanyPositionTable;

import React from "react";
import { useState } from "react";
import './CompanyPosition.css';
import ByModal from './ByModal';
import SellModel from "./SellModel";
import { useEffect } from 'react';
import { io } from "socket.io-client";
import axios from "axios"

function CompanyPositionTable({ socket }) {

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
                                    <tr className="grid1_table">
                                            <td className="grid2_td">{elem.createdOn}</td>
                                            <td className="grid2_td">{elem.symbol}</td>
                                            <td className="grid2_td">{updatedMarketData[0]?.last_price}</td>
                                            <td className="grid2_td">{updatedMarketData[0]?.change.toFixed(2)}</td>
                                            <td className="grid2_th companyPosition_BSbtn2"><div className="companyPosition_BSbtn"><ByModal marketData={marketData} uIdProps={elem.uId}/>
                                            <SellModel marketData={marketData} uIdProps={elem.uId}/></div></td>
                                    </tr>
                                    )
                                })} 
                            </table>
                        </div>
                        <div className="grid_2">
                            <span className="grid2_span">Overall PNL-Company</span>
                            <table className="grid1_table">
                            <tr className="grid2_tr">
                                <th className="grid2_th">Product</th>
                                <th className="grid2_th">Instruments</th>
                                <th className="grid2_th">Quantity</th>
                                <th className="grid2_th">Average Price</th>
                                <th className="grid2_th">LTP</th>
                                <th className="grid2_th">P&L</th>
                                <th className="grid2_th">%Change</th>
                            </tr>
                            </table>
                        </div>
                        <div className="grid_2">
                            <span className="grid2_span">Running PNL-Company</span>
                            <table className="grid1_table">
                            <tr className="grid2_tr">
                                <th className="grid2_th">Product</th>
                                <th className="grid2_th">Instruments</th>
                                <th className="grid2_th">Quantity</th>
                                <th className="grid2_th">Average Price</th>
                                <th className="grid2_th">LTP</th>
                                <th className="grid2_th">P&L</th>
                                <th className="grid2_th">%Change</th>
                            </tr>
                            </table>
                        </div>
                        <div className="grid_2">
                            <span className="grid2_span">Closed Trades PNL-Company</span>
                            <table className="grid1_table">
                                <tr className="grid2_tr">
                                    <th className="grid2_th">Product</th>
                                    <th className="grid2_th">Instruments</th>
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
export default CompanyPositionTable;