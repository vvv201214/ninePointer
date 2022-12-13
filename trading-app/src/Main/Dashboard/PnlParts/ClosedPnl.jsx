import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import axios from "axios";

export default function ClosedPnl({marketData, tradeData, data}) {
    // let date = new Date();
    // let todayDate = `${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()}`
    // let fake_date = "1-12-2022"

    const [closedPnlArr, setClosedPnlArr] = useState([]);
    const [liveDetail, setLiveDetail] = useState([]);

    useEffect(()=>{

        // axios.get("http://localhost:5000/usertradedata")
        // .then((res) => {
        //     let data = (res.data).filter((elem)=>{
        //         return elem.createdOn.includes(todayDate) && elem.status === "COMPLETE";
        //     })
            console.log(data);

            let hash = new Map();
            for(let i = data.length-1; i >= 0 ; i--){
                if(hash.has(data[i].symbol)){
                    let obj = hash.get(data[i].symbol);
                    if(obj.buyOrSell === data[i].buyOrSell){
                        obj.average_price = ((Number(obj.average_price) * Number(obj.Quantity)) 
                        + (Number(data[i].average_price) * Number(data[i].Quantity)))/(Number(data[i].Quantity) 
                        + Number(obj.Quantity));

                        obj.Quantity = Number(obj.Quantity) + Number(data[i].Quantity);
                        if(Number(obj.Quantity) >= 0){
                            obj.buyOrSell = "BUY";
                        } else if((obj.Quantity) > 0){
                            obj.buyOrSell = "SELL"
                        }

                    } else{
                        if(Number(obj.Quantity) > 0){
                            obj.average_price_buying = obj.average_price;
                            obj.average_price_selling = Number(data[i].average_price)
                        } else{
                            obj.average_price_selling = obj.average_price;
                            obj.average_price_buying = Number(data[i].average_price)
                        }

                        if(Number(obj.Quantity) + Number(data[i].Quantity) === 0){
                            obj.average_price = 0;
                        } else{
                            obj.average_price = ((Number(obj.average_price) * Number(obj.Quantity)) 
                            + (Number(data[i].average_price) * Number(data[i].Quantity)))/(Number(data[i].Quantity) 
                            + Number(obj.Quantity));
                        }


                        if(obj.closed_quantity !== undefined){
                            obj.closed_quantity += Math.min(Math.abs(Number(obj.Quantity)), Math.abs(Number(data[i].Quantity)));
                        } else{
                            obj.closed_quantity = Math.min(Math.abs(Number(obj.Quantity)), Math.abs(Number(data[i].Quantity)));
                        }
                        obj.Quantity = Number(obj.Quantity) + Number(data[i].Quantity);
                        if(Number(obj.Quantity) > 0){
                            obj.buyOrSell = "BUY";
                        } else if((obj.Quantity) > 0){
                            obj.buyOrSell = "SELL"
                        } 
                    }
                }  else{
                    hash.set(data[i].symbol, {
                        buyOrSell : data[i].buyOrSell,
                        Quantity : Number(data[i].Quantity),
                        average_price: Number(data[i].average_price),
                        Product: data[i].Product,
                        symbol: data[i].symbol
                    })
                }
            }
            console.log(hash);
        
        let closedPnl = [];
        for (let value of hash.values()){
            closedPnl.push(value);
        }


        setClosedPnlArr(closedPnl);
        console.log("details array", closedPnl);

        let liveDetailsArr = [];
        closedPnl.map((elem)=>{
            console.log("52");
            tradeData.map((element)=>{
                console.log("53");
                if(element.symbol === elem.symbol){
                    console.log("line 54");
                    marketData.map((subElem)=>{
                        if(subElem !== undefined && subElem.instrument_token === element.instrumentToken){
                            console.log(subElem);
                            liveDetailsArr.push(subElem)
                        }
                    })
                }
            })
        })

        setLiveDetail(liveDetailsArr);

    // })
 
    }, [marketData])

    console.log(liveDetail);
    console.log(closedPnlArr);

  return (
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
        {
         closedPnlArr.map((elem, index)=>{
            return(
                <>
                    {(elem.closed_quantity !== 0 && elem.closed_quantity !== undefined) &&
                    <tr className="grid2_tr" key={index}>
                        <th className="grid2_th">{elem.Product}</th>
                        <th className="grid2_th">{elem.symbol}</th>
                        <th className="grid2_th">{elem.closed_quantity}</th>
                        <th className="grid2_th">{(elem.average_price_buying).toFixed(2)}</th>
                        <th className="grid2_th">{liveDetail[index]?.last_price.toFixed(2)}</th>
                        <th className="grid2_th">{((elem.average_price_selling * elem.closed_quantity) - 
                                                    (elem.average_price_buying * elem.closed_quantity)).toFixed(2)}</th>
                        {liveDetail[index]?.change === undefined ?
                            <td className="grid2_td">{((liveDetail[index]?.last_price - elem.average_price_buying)/(elem.average_price_buying)).toFixed(2)}</td>
                            :
                            <td className="grid2_td">{liveDetail[index]?.change.toFixed(2)}</td>}
                            
                    </tr> } 
                </>            
            )
         })   
        }
    </table>
  )
}
