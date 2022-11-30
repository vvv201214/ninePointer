import React from 'react'
import { useEffect, useState } from 'react'
import axios from "axios";

export default function RunningPnl({marketData, tradeData, renderFunc, render1}) {
    let date = new Date();
    let todayDate = `${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()}`
    let fake_date = "28-11-2022"

    const [render, setRender] = useState(render1)
    const [pnlData, setPnlData] = useState([]);
    const [closedPnl, setClosedPnl] = useState([]);
    const [liveDetail, setLiveDetail] = useState([])
    console.log("tradedata", tradeData);
    console.log("market data", marketData);
    useEffect(()=>{
        if(render1){
            setRender(false);
        }
        axios.get("http://localhost:5000/usertradedata")
        .then((res) => {
            let data = (res.data).filter((elem)=>{
                return elem.createdOn.includes(fake_date);
            })
            setPnlData(data);

            let closedPnlArr;

            for(let i = 0; i < data.length-1; i++){
                for(let j = i+1; j < data.length; j++){
                   
                    if(data[i].symbol === data[j].symbol){
                        if(data[i].buyOrSell === data[j].buyOrSell){
                            data[i].Quantity = Number(data[i].Quantity) + Number(data[j].Quantity);
                            data[i].average_price = ((Number(data[i].average_price) * Number(data[i].Quantity)) 
                            + (Number(data[j].average_price) * Number(data[j].Quantity)))/(Number(data[i].Quantity) 
                            + Number(data[j].Quantity));
                        } else{
                            data[i].Quantity = Number(data[i].Quantity) - Number(data[j].Quantity);

                            if(Number(data[i].Quantity) > 0){
                                data[i].buyOrSell = "BUY";
                            } else if((data[i].Quantity) > 0){
                                data[i].buyOrSell = "SELL"
                            } else{
                                closedPnlArr.push(data[i]);
                            }
                        }
                        data.splice(j, 1);
                        j--;
                    }
                }
            }
            setPnlData(data);

            let liveDetailsArr = [];
            data.map((elem)=>{
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
        })
    }, [marketData])

    useEffect(()=>{
        if(!render){
            setRender(true);
        }
    }, [render])
    console.log("this is pnl data", pnlData);
    console.log("live data", liveDetail);

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
            pnlData.map((elem, index)=>{
                return(
                    <>
                    <tr className="grid2_tr" key={elem._id}>
                        <td className="grid2_td">{elem.Product}</td>
                        <td className="grid2_td">{elem.symbol}</td>
                        <td className="grid2_td">{elem.Quantity}</td>
                        <td className="grid2_td">{elem.average_price}</td>
                        <td className="grid2_td">{liveDetail[index]?.last_price}</td>
                        <td className="grid2_td">{(
                            ((liveDetail[index]?.last_price)*(elem.Quantity)) - (elem.average_price*elem.Quantity)
                        )}</td>
                        {liveDetail[index]?.change === undefined ?
                        <td className="grid2_td">{liveDetail[index]?.change}</td>
                        :
                        <td className="grid2_td">{liveDetail[index]?.change.toFixed(2)}</td>}
                        
                    </tr>


                </>
                )
            })
        }
    </table>
  )
}
