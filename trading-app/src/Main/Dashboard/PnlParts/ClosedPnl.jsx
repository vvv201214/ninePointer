import React from 'react'
import { useEffect } from 'react';

export default function ClosedPnl({closed}) {
    const {closedPnlDetails, setClosedPnlDetails} = closed
    console.log(closedPnlDetails);
    let details = {
        product: "",
        instrument: "",
        quantity: "",
        average_price: "",
        pnl: ""
    };
    let detailsArr = [];

    useEffect(()=>{
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
    }, [])

    console.log(detailsArr);

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

        }
    </table>
  )
}
