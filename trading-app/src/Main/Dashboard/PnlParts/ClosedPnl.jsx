import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import axios from "axios";

export default function ClosedPnl({closedPnlDetails, marketData, tradeData}) {
    // const {closedPnlDetails} = closed
    let date = new Date();
    let todayDate = `${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()}`
    let fake_date = "1-12-2022"

    const [closedPnlArr, setClosedPnlArr] = useState([]);
    const [liveDetail, setLiveDetail] = useState([]);
    console.log(closedPnlDetails);
    let details = {
        product: "",
        instrument: "",
        quantity: "",
        average_price: "",
        pnl: "",
        symbol: ""
    };
    let detailsArr = [];

    useEffect(()=>{

        axios.get("http://localhost:5000/usertradedata")
        .then((res) => {
            let data = (res.data).filter((elem)=>{
                return elem.createdOn.includes(fake_date) && elem.status === "COMPLETE";
            })
            // setPnlData(data.reverse());
            console.log(data);
            // data.reverse();
            // console.log(data);
            // setPnlData(data);

            let hash = new Map();
            for(let i = data.length-1; i >= 0 ; i--){
                if(hash.has(data[i].symbol)){
                    let obj = hash.get(data[i].symbol);
                    if(obj.buyOrSell === data[i].buyOrSell){
                        if(Number(obj.Quantity) > 0){
                            obj.average_price_buying = ((Number(obj.average_price) * Number(obj.Quantity)) 
                            + (Number(data[i].average_price) * Number(data[i].Quantity)))/(Number(data[i].Quantity) 
                            + Number(obj.Quantity));
                            
                            obj.average_price_selling = 0;
                        } else {
                            obj.average_price_selling = ((Number(obj.average_price) * Number(obj.Quantity)) 
                            + (Number(data[i].average_price) * Number(data[i].Quantity)))/(Number(data[i].Quantity) 
                            + Number(obj.Quantity));
                            
                            obj.average_price_buying = 0;
                        }

                        obj.Quantity = Number(obj.Quantity) + Number(data[i].Quantity);

                    } else{
                        if(Number(obj.Quantity) > 0){
                            if((Number(obj.Quantity) + Number(data[i].Quantity))> 0){
                                obj.average_price_buying = ((obj.average_price_buying * Number(obj.Quantity)) + (Number(data[i].average_price) * Number(data[i].Quantity)))/(Number(data[i].Quantity) + Number(obj.Quantity))
                                obj.average_price_selling = Number(data[i].average_price);
                            } else{
                                obj.average_price_selling = ((obj.average_price_buying * Number(obj.Quantity)) + (Number(data[i].average_price) * Number(data[i].Quantity)))/(Number(data[i].Quantity) + Number(obj.Quantity))
                                obj.average_price_buying = Number(data[i].average_price);
                            }
                            
                        } else{
                            if((Number(obj.Quantity) + Number(data[i].Quantity)) > 0){
                                obj.average_price_buying = ((obj.average_price_selling * Number(obj.Quantity)) + (Number(data[i].average_price) * Number(data[i].Quantity)))/(Number(data[i].Quantity) + Number(obj.Quantity))
                                obj.average_price_selling = Number(data[i].average_price);
                            } else{
                                obj.average_price_selling = ((obj.average_price_selling * Number(obj.Quantity)) + (Number(data[i].average_price) * Number(data[i].Quantity)))/(Number(data[i].Quantity) + Number(obj.Quantity))
                                obj.average_price_buying = Number(data[i].average_price);
                            }
                            obj.average_price_buying = Number(data[i].average_price);
                        }
                        obj.Quantity = Number(obj.Quantity) + Number(data[i].Quantity);

                        if(Number(obj.Quantity) > 0){
                            obj.buyOrSell = "BUY";
                        } else if((obj.Quantity) > 0){
                            obj.buyOrSell = "SELL"
                        } else{

                        } 
                    }



                    if(Number(data[i].Quantity) + Number(obj.Quantity) === 0){
                        obj.average_price = 0;
                    }else{
                        obj.average_price = ((Number(obj.average_price) * Number(obj.Quantity)) 
                                        + (Number(data[i].average_price) * Number(data[i].Quantity)))/(Number(data[i].Quantity) 
                                        + Number(obj.Quantity));
                    }
                    obj.Quantity = Number(obj.Quantity) + Number(data[i].Quantity)
                    if(Number(obj.Quantity) > 0){
                        obj.buyOrSell = "BUY";
                    } else if((obj.Quantity) > 0){
                        obj.buyOrSell = "SELL"
                    }
                    
                    






                } else{
                    if(Number(data[i].Quantity) > 0){
                        hash.set(data[i].symbol, {
                            buyOrSell : data[i].buyOrSell,
                            Quantity : Number(data[i].Quantity),
                            average_price_buying: Number(data[i].average_price),
                            average_price_selling: 0,
                            Product: data[i].Product
                        })
                    } else{
                        hash.set(data[i].symbol, {
                            buyOrSell : data[i].buyOrSell,
                            Quantity : Number(data[i].Quantity),
                            average_price_buying: 0,
                            average_price_selling: Number(data[i].average_price),
                            Product: data[i].Product
                        })
                    }

                }
            }
            console.log(hash);
        })

            














































        closedPnlDetails.map((elem)=>{
            details.product = elem.firstData.Product;
            details.instrument = elem.firstData.symbol;
            details.quantity = Math.min(Math.abs(Number(elem.firstData.Quantity)), Math.abs(Number(elem.secondData.Quantity)));
            if(elem.firstData.Quantity < 0){
                details.average_price = elem.secondData.average_price;
                details.pnl = (details.quantity * elem.firstData.average_price) - (details.quantity * elem.secondData.average_price);
            } else if(elem.secondData.Quantity < 0){
                details.average_price = elem.firstData.average_price;
                details.pnl = (details.quantity * elem.secondData.average_price) - (details.quantity * elem.firstData.average_price);
            }

            console.log("this is closed elem", details);
            detailsArr.push(details);
        })



        for(let i = 0; i < detailsArr.length-1; i++){
            for(let j = i+1; j < detailsArr.length; j++){
               
                if(detailsArr[i].instrument === detailsArr[j].instrument){
                    
                    detailsArr[i].pnl = detailsArr[i].pnl + detailsArr[j].pnl;
                    detailsArr[i].average_price = ((detailsArr[i].average_price * detailsArr[i].quantity) + 
                                                    (detailsArr[j].average_price * detailsArr[j].quantity))/(detailsArr[j].quantity + detailsArr[i].quantity)
                    detailsArr[i].quantity = detailsArr[i].quantity + detailsArr[j].quantity;
                    detailsArr.splice(j, 1);
                    j--;
                }
            }
        }        

        setClosedPnlArr(detailsArr);
        console.log("details array", detailsArr);

        let liveDetailsArr = [];
        closedPnlArr.map((elem)=>{
            console.log("52");
            tradeData.map((element)=>{
                console.log("53");
                if(element.symbol === elem.instrument){
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
                <tr className="grid2_tr" key={index}>
                    <th className="grid2_th">{elem.product}</th>
                    <th className="grid2_th">{elem.instrument}</th>
                    <th className="grid2_th">{elem.quantity}</th>
                    <th className="grid2_th">{elem.average_price}</th>
                    <th className="grid2_th">{liveDetail[index]?.last_price}</th>
                    <th className="grid2_th">{elem.pnl}</th>
                    {liveDetail[index]?.change === undefined ?
                        <td className="grid2_td">{liveDetail[index]?.change}</td>
                        :
                        <td className="grid2_td">{liveDetail[index]?.change.toFixed(2)}</td>}
                </tr>                
            )
         })   
        }
    </table>
  )
}
