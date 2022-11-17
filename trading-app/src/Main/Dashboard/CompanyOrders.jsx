import React from "react";
import axios from "axios"
import { useEffect, useState } from "react";

function CompanyOrders(){

    const [data, setData] = useState([]);
    useEffect(()=>{
        axios.get("http://localhost:5000/companytradedata")
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
                            <table>
                                <thead>
                                    <tr className="grid2_ul">
                                        <th className="grid2_li">Timestamp</th>
                                        <th className="grid2_li">Type</th>
                                        <th className="grid2_li">Instrument</th>
                                        <th className="grid2_li">Product</th>
                                        <th className="grid2_li">Quantity</th>
                                        <th className="grid2_li">Avg.Price</th>
                                        <th className="grid2_li">OrderID</th>
                                        <th className="grid2_li">Status</th>
                                    </tr> 
                                </thead>
                                <tbody>
                                    {data.map((elem)=>{
                                        return(
                                            <tr className="grid2_ul" key={elem.guid}>
                                                <td className="grid2_li">{elem.order_timestamp}</td>
                                                <td className="grid2_li">{elem.transaction_type}</td>
                                                <td className="grid2_li">{elem.tradingsymbol}</td>
                                                <td className="grid2_li">{elem.product}</td>
                                                <td className="grid2_li">{elem.quantity}</td>
                                                <td className="grid2_li">{elem.average_price}</td>
                                                <td className="grid2_li">{elem.order_id}</td>
                                                <td className="grid2_li">{elem.status}</td>
                                            </tr> 
                                        )
                                    })}  
                                </tbody> 
                            </table>          
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default CompanyOrders;