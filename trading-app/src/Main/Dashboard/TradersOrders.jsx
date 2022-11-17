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
                            <table className="grid1_table">
                                <tr className="grid2_tr">
                                    <th className="grid2_th">Timestamp</th>
                                    <th className="grid2_th">OrderID</th>
                                    <th className="grid2_th">Type</th>
                                    <th className="grid2_th">Instrument</th>
                                    <th className="grid2_th">Product</th>
                                    <th className="grid2_th">Quantity</th>
                                    <th className="grid2_th">Avg.Price</th>
                                    <th className="grid2_th">Status</th>
                                </tr> 
                                {data.map((elem)=>{
                                    return(
                                        <tr className="grid2_tr" key={elem.guid}>
                                            <td className="grid2_td">{elem.order_timestamp}</td>
                                            <td className="grid2_td">{elem.order_id}</td>
                                            <td className="grid2_td">{elem.buyOrSell}</td>
                                            <td className="grid2_td">{elem.symbol}</td>
                                            <td className="grid2_td">{elem.Product}</td>
                                            <td className="grid2_td">{elem.Quantity}</td>
                                            <td className="grid2_td">{elem.average_price}</td>
                                            <td className="grid2_td">{elem.status}</td>
                                        </tr> 
                                    )
                                })}        
                            </table> 
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
export default TradersOrders;