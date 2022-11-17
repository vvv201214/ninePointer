import React from "react";
import axios from "axios"
import { useEffect, useState } from "react";

function TradersOrders(){

    const [data, setData] = useState([]);
    useEffect(()=>{
        axios.get("http://localhost:5000/usertradedata")
        .then((res)=>{
            setData(res.data);
        })
    })

    return(
        <div>
            <div className="main_Container">
                <div className="right_side">
                    <div className="rightside_maindiv">
                        <div className="grid_1">
                            <span className="grid1_span">Today's Trades</span>
                                <ul className="grid2_ul">
                                    <li className="grid2_li">Timestamp</li>
                                    <li className="grid2_li">OrderID</li>
                                    <li className="grid2_li">Type</li>
                                    <li className="grid2_li">Instrument</li>
                                    <li className="grid2_li">Product</li>
                                    <li className="grid2_li">Quantity</li>
                                    <li className="grid2_li">Avg.Price</li>
                                    <li className="grid2_li">Status</li>
                                </ul> 
                                {data.map((elem)=>{
                                    return(
                                        <ul className="grid2_ul" key={elem.guid}>
                                            <li className="grid2_li">{elem.order_timestamp}</li>
                                            <li className="grid2_li">{elem.order_id}</li>
                                            <li className="grid2_li">{elem.buyOrSell}</li>
                                            <li className="grid2_li">{elem.symbol}</li>
                                            <li className="grid2_li">{elem.Product}</li>
                                            <li className="grid2_li">{elem.Quantity}</li>
                                            <li className="grid2_li">{elem.average_price}</li>
                                            <li className="grid2_li">{elem.status}</li>
                                        </ul> 
                                    )
                                })}        
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
export default TradersOrders;