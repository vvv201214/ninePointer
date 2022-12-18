import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIndianRupeeSign } from '@fortawesome/free-solid-svg-icons';
import { useEffect } from 'react';
import axios from "axios";


export default function TradersPnlCompany({marketData, tradeData}) {
    let baseUrl = process.env.NODE_ENV === "production" ? "/" : "http://localhost:5000/"

    const [userDetail, setUserDetail] = useState([]);
    const [allTrade, setAllTrade] = useState([]);

    let detailPnl = [];

    let date = new Date();
    let todayDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`
    // let fake_date = "2022-12-16";
    let fake_date = "16-12-2022";
    let totalPnl = 0;
    let transactionCost = 0;
    useEffect(()=>{
        axios.get(`${baseUrl}api/v1/readuserdetails`)
        .then((res) => {
            setUserDetail(res.data);
        }).catch((err)=>{
            return new Error(err);
        })

        axios.get(`${baseUrl}api/v1/readmocktradecompany`)
        .then((res) => {
            let data = (res.data).filter((elem) => {
                return elem.order_timestamp.includes(fake_date) && elem.status === "COMPLETE";
            })
            console.log(data);
            setAllTrade(data);
            console.log(allTrade);
        }).catch((err)=>{
            return new Error(err);
        })

    }, [marketData])
    userDetail.map((elem)=>{

        let data = allTrade.filter((element)=>{
            return elem.email === element.userId;
        })

        console.log(data);

        let hash = new Map();

        for(let i = data.length-1; i >= 0 ; i--){
            transactionCost += Number(data[i].brokerage);
            if(hash.has(data[i].symbol)){
                let obj = hash.get(data[i].symbol);
                if(data[i].buyOrSell === "BUY"){
                    if(obj.totalBuy === undefined || obj.totalBuyLot === undefined){
                        obj.totalBuy = Number(data[i].average_price) * (Number(data[i].Quantity))
                        obj.totalBuyLot = (Number(data[i].Quantity))
                    } else{
                        obj.totalBuy = obj.totalBuy + Number(data[i].average_price) * (Number(data[i].Quantity))
                        obj.totalBuyLot = obj.totalBuyLot + (Number(data[i].Quantity)) 
                    }

                } if(data[i].buyOrSell === "SELL"){
                    if( obj.totalSell === undefined || obj.totalSellLot === undefined){

                        obj.totalSell = Number(data[i].average_price) * (Number(data[i].Quantity))
                        obj.totalSellLot = (Number(data[i].Quantity)) 
                    } else{

                        obj.totalSell = obj.totalSell + Number(data[i].average_price) * (Number(data[i].Quantity))
                        obj.totalSellLot = obj.totalSellLot + (Number(data[i].Quantity)) 
                    }

                }
            }  else{
                if(data[i].buyOrSell === "BUY"){
                    hash.set(data[i].symbol, {
                        totalBuy : Number(data[i].average_price) * (Number(data[i].Quantity)),
                        totalBuyLot : (Number(data[i].Quantity)) ,
                        totalSell: 0,
                        totalSellLot: 0,
                        symbol: data[i].symbol,
                        Product: data[i].Product,
                        name: data[0].createdBy
                    })
                }if(data[i].buyOrSell === "SELL"){
                    hash.set(data[i].symbol, {
                        totalSell : Number(data[i].average_price) * (Number(data[i].Quantity)),
                        totalSellLot : (Number(data[i].Quantity)) ,
                        totalBuy : 0,
                        totalBuyLot: 0,
                        symbol: data[i].symbol,
                        Product: data[i].Product,
                        name: data[0].createdBy
                    })
                }
            }
        }

        let overallPnl = [];
        for (let value of hash.values()){
            overallPnl.push(value);
        }
        let liveDetailsArr = [];
        overallPnl.map((elem)=>{
            tradeData.map((element)=>{
                if(element.symbol === elem.symbol){
                    marketData.map((subElem)=>{
                        if(subElem !== undefined && subElem.instrument_token === element.instrumentToken){
                            liveDetailsArr.push(subElem)
                        }
                    })
                }
            })
        })

        let name = "";
        overallPnl.map((elem, index)=>{
            name = elem.name;
            console.log(elem.totalBuy,elem.totalSell,elem.totalBuyLot,elem.totalSellLot, liveDetailsArr[index]?.last_price)
            totalPnl += (-(elem.totalBuy+elem.totalSell-(elem.totalBuyLot+elem.totalSellLot)*liveDetailsArr[index]?.last_price))
            console.log("totalPnl", totalPnl)
        })

        let newObj = {
            brokerage: transactionCost,
            pnl: totalPnl,
            name: name
        }
        console.log(transactionCost, totalPnl, name);
        detailPnl.push(JSON.parse(JSON.stringify(newObj)));
        transactionCost = 0;
        totalPnl = 0;
    })

    console.log(detailPnl);

  return (
    <div className="grid_2">
        <table className="grid1_table">
            <tr className="grid2_tr">
                <th className="grid2_th">Trader Name</th>
                <th className="grid2_th">Overall PNL (<FontAwesomeIcon className='fa-xs' icon={faIndianRupeeSign} />)</th>
                {/* <th className="grid2_th">Running PNL (<FontAwesomeIcon className='fa-xs' icon={faIndianRupeeSign} />)</th>
                <th className="grid2_th">Closed PNL(<FontAwesomeIcon className='fa-xs' icon={faIndianRupeeSign} />)</th> */}
                <th className="grid2_th">Tran. Cost(<FontAwesomeIcon className='fa-xs' icon={faIndianRupeeSign} />)</th>
                <th className="grid2_th"> Net PNL (<FontAwesomeIcon className='fa-xs' icon={faIndianRupeeSign} />)</th>
            </tr>
            {
                detailPnl.map((elem, index)=>{

                    return(
                        <tr key={elem._id}>
                            {elem.name &&
                            <>
                            <td className="grid2_td">{(elem.name)}</td>
                            {!elem.pnl ?
                            <td className="grid2_td">{(elem.pnl)} </td>
                            :
                            <td className="grid2_td">{(elem.pnl).toFixed(2)} </td>}
                            {/* <td className="grid2_td">Running PNL </td>
                            <td className="grid2_td">Closed PNL</td> */}
                            <td className="grid2_td">0</td>
                            <td className="grid2_td"> {(elem.pnl - elem.brokerage).toFixed(2)} </td>
                            </>
                            }
                        </tr>
                    )
                })
            }
        </table>
    <button className="DetailsBtn">Details</button>
    </div>
  )
}

// if(data[i].buyOrSell === "BUY"){
//     if(obj.totalBuy === undefined || obj.totalBuyLot === undefined){
//         obj.totalBuy = Number(data[i].average_price) * (Number(data[i].Quantity))
//         obj.totalBuyLot = (Number(data[i].Quantity))
//     } else{
//         obj.totalBuy = obj.totalBuy + Number(data[i].average_price) * (Number(data[i].Quantity))
//         obj.totalBuyLot = obj.totalBuyLot + (Number(data[i].Quantity)) 
//     }

//     console.log("obj.totalBuy", obj.totalBuy, "totalBuyLot", obj.totalBuyLot)
// } if(data[i].buyOrSell === "SELL"){
//     if( obj.totalSell === undefined || obj.totalSellLot === undefined){

//         obj.totalSell = Number(data[i].average_price) * (Number(data[i].Quantity))
//         obj.totalSellLot = (Number(data[i].Quantity)) 
//     } else{

//         obj.totalSell = obj.totalSell + Number(data[i].average_price) * (Number(data[i].Quantity))
//         obj.totalSellLot = obj.totalSellLot + (Number(data[i].Quantity)) 
//     }

//     // console.log("obj.totalSell", obj.totalSell, "totalSellLot", obj.totalSellLot)
// }
