import React, { useContext } from "react";
import axios from "axios"
import { useEffect, useState } from "react";
// import { userContext } from "../AuthContext";

function TradersOrders({info}){

    console.log(info)
    const [data, setData] = useState([]);
    // const [details, setDetails] = useState(info);
    // const getDetails = useContext(userContext);


    useEffect(()=>{
        // console.log(getDetails)
        // console.log(getDetails.userDetails.role);
        // if(getDetails.userDetails.role === "admin"){
        //     axios.get("http://localhost:5000/companytradedata")
        //     .then((res)=>{
        //         let updated = (res.data).filter((elem)=>{
        //             // console.log(getDetails.userDetails.email, elem.userId);
        //             return getDetails.userDetails.email === elem.userId;
        //         })
        //         console.log(updated);
        //         setData(updated);
        //     })            
        // }else{
        //     axios.get("http://localhost:5000/usertradedata")
        //     .then((res)=>{
        //         let updated = (res.data).filter((elem)=>{
        //             return getDetails.userDetails.email === elem.userId;
        //         })
        //         console.log(updated);
        //         setData(updated);
        //     })
        // }



                // console.log(getDetails.userDetails.role);
        console.log(info.role)
        if(info.role === "admin"){
            axios.get("http://localhost:5000/companytradedata")
            .then((res)=>{
                let updated = (res.data).filter((elem)=>{
                    // console.log(getDetails.userDetails.email, elem.userId);
                    return info.email === elem.userId;
                })
                console.log(updated);
                setData(updated);
            })            
        }else if(info.role === "user"){
            axios.get("http://localhost:5000/usertradedata")
            .then((res)=>{
                let updated = (res.data).filter((elem)=>{
                    return info.email === elem.userId;
                })
                console.log(updated);
                setData(updated);
            })
        }
    }, [])

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
                                {/* { getDetails.userDetails.userDetails.role === "user" ?
                                data.map((elem)=>{
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
                                })
                                :
                                data.map((elem)=>{
                                    return(
                                        <tr className="grid2_tr" key={elem.guid}>
                                            <td className="grid2_td">{elem.order_timestamp}</td>
                                            <td className="grid2_td">{elem.order_id}</td>
                                            <td className="grid2_td">{elem.transaction_type}</td>
                                            <td className="grid2_td">{elem.tradingsymbol}</td>
                                            <td className="grid2_td">{elem.product}</td>
                                            <td className="grid2_td">{elem.quantity}</td>
                                            <td className="grid2_td">{elem.average_price}</td>
                                            <td className="grid2_td">{elem.status}</td>
                                        </tr> 
                                    )
                                })}  */}



                                { info.role === "user" ?
                                data.map((elem)=>{
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
                                })
                                :
                                data.map((elem)=>{
                                    return(
                                        <tr className="grid2_tr" key={elem.guid}>
                                            <td className="grid2_td">{elem.order_timestamp}</td>
                                            <td className="grid2_td">{elem.order_id}</td>
                                            <td className="grid2_td">{elem.transaction_type}</td>
                                            <td className="grid2_td">{elem.tradingsymbol}</td>
                                            <td className="grid2_td">{elem.product}</td>
                                            <td className="grid2_td">{elem.quantity}</td>
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