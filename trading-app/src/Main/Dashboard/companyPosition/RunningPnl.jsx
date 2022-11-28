import React from 'react'
import { useEffect, useState } from 'react'
import axios from "axios";

export default function RunningPnl({marketData, tradeData, orderId}) {

    const [pnlData, setPnlData] = useState([]);

    useEffect(()=>{
        axios.get("http://localhost:5000/companytradedata")
        .then((res) => {
            let data = (res.data).filter((elem)=>{
                return elem.order_id === orderId;
            })
            setPnlData(data);
        })
    }, [])


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
            pnlData.map((elem)=>{
                <tr className="grid2_tr" key={elem._id}>
                    <td className="grid2_td">{elem.product}</td>
                    <td className="grid2_td">{elem.tradingsymbol}</td>
                    <td className="grid2_td">{elem.quantity}</td>
                    <td className="grid2_td">{elem.average_price}</td>
                    {tradeData.map((element)=>{
                        if(element.symbol === elem.tradingsymbol){
                            marketData.map((subElem)=>{
                                if(subElem !== undefined && subElem.instrument_token === element.instrumentToken){
                                    return(
                                        <>
                                            <td className="grid2_td">{subElem.last_price}</td>
                                            <td className="grid2_td">{(
                                                (subElem.last_price*elem.quantity) - (elem.real_last_price*elem.quantity)
                                            )}</td>
                                            <td className="grid2_td">{subElem.change.toFixed(2)}</td>
                                        </>
                                        
                                    )
                                }
                            })
                        }
                    })}
                </tr>
            })
        }

    </table>
  )
}
