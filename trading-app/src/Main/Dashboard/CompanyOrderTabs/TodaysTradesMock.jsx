import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import Styles from "./CompanyOrder.module.css"

function TodaysTradesMock({setOrderCountTodayCompany, orderCountTodayCompany}){
    let baseUrl = process.env.NODE_ENV === "production" ? "/" : "http://localhost:5000/"

    const [data, setData] = useState([]);
    const [clickToRemove, setclickToRemove] = useState(1);
    const [skip, setSkip] = useState(0);
    const [length, setLength] = useState(0);
    let numberOfClickForRemoveNext = 0

    useEffect(()=>{

        axios.get(`${baseUrl}api/v1/readmocktradecompanyDate`)
        .then((res)=>{
            setLength((res.data).length);            
            setOrderCountTodayCompany((res.data).length);
        }).catch((err)=>{
            window.alert("Server Down");
            return new Error(err);
        })

        axios.get(`${baseUrl}api/v1/readmocktradecompanytodaydatapagination/${skip}/${30}`)
        .then((res)=>{

            setData(res.data);
        }).catch((err)=>{
            window.alert("Server Down");
            return new Error(err);
        })
    },[])

    function nextData(){
        setSkip((prev)=> prev+30)
        console.log(skip)
        axios.get(`${baseUrl}api/v1/readmocktradecompanytodaydatapagination/${skip+30}/${30}`)
        .then((res)=>{

            setData(res.data);
        }).catch((err)=>{
            window.alert("Server Down");
            return new Error(err);
        })
        setclickToRemove((prev)=>prev+1)
    }

    function prevData(){
        setSkip((prev)=> prev-30)
        console.log(skip)
        axios.get(`${baseUrl}api/v1/readmocktradecompanytodaydatapagination/${skip-30}/${30}`)
        .then((res)=>{

            setData(res.data);
        }).catch((err)=>{
            window.alert("Server Down");
            return new Error(err);
        })
        setclickToRemove((prev)=>prev-1)
    }
    numberOfClickForRemoveNext = Math.ceil(((length))/30);
    console.log(numberOfClickForRemoveNext, clickToRemove, length)

    return(
        <div>
            <div className="main_Container">
                <div className="right_side">
                    <div className="rightside_maindiv">
                    <span className="grid1_span"></span>
                        <div className="grid_1">
                            <table className="grid1_table">
                                <tr className="grid2_tr">
                                    <th className="grid2_th">Timestamp</th>
                                    <th className="grid2_th">OrderID</th>
                                    <th className="grid2_th">Trader</th>
                                    <th className="grid2_th">Type</th>
                                    <th className="grid2_th">Instrument</th>
                                    <th className="grid2_th">Product</th>
                                    <th className="grid2_th">Quantity</th>
                                    <th className="grid2_th">Avg. Price</th>
                                    <th className="grid2_th">Status</th>
                                    <th className="grid2_th">AlgoName</th>
                                    <th className="grid2_th">Account</th>
                                </tr> 
                                {data.map((elem)=>{
                                    return(
                                        <tr className="grid2_tr" key={elem.guid}>
                                            <td className="grid2_td">{elem.order_timestamp}</td>
                                            <td className="grid2_td">{elem.order_id}</td>
                                            <td className="grid2_td" style={{fontWeight : 700}}>{elem.createdBy}</td>
                                            <td className="grid2_td" style={elem.buyOrSell == "BUY" ? {color : "#428BCA",backgroundColor : "#b3ccff",fontWeight : 700}:{color : "red", backgroundColor : "#ffb3b3",fontWeight : 700}}>{elem.buyOrSell}</td>
                                            <td className="grid2_td">{elem.symbol}</td>
                                            <td className="grid2_td">{elem.Product}</td>
                                            <td className="grid2_td" style={elem.Quantity > 0 ? {color : "#428BCA",backgroundColor : "#b3ccff",fontWeight : 700}:{color : "red", backgroundColor : "#ffb3b3",fontWeight : 700}}>{elem.Quantity}</td>
                                            <td className="grid2_td">₹{elem.average_price.toFixed(2)}</td>
                                            <td className="grid2_td" style={{color : "#008000",backgroundColor : "#99ff99" , fontWeight : 700}}>{elem.status}</td>
                                            <td className="grid2_td">{elem.algoBox.algoName}</td>
                                            <td className="grid2_td">{elem.placed_by}</td>
                                        </tr> 
                                    )
                                })}        
                            </table> 
                            <div className={Styles.pegination_div}>
                                <button className={Styles.PrevButtons} disabled={!(skip !== 0)} onClick={prevData}>Prev</button>
                                {(numberOfClickForRemoveNext !== clickToRemove) &&
                                <div className={Styles.pageCounting}>{(clickToRemove-1)*30}-{(clickToRemove)*30}</div>}
                                <button className={Styles.nextButtons} disabled={!(numberOfClickForRemoveNext !== clickToRemove)} onClick={nextData}>Next</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default TodaysTradesMock;