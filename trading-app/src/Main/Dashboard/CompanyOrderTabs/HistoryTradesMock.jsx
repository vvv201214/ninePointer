import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import Styles from "./CompanyOrder.module.css"

export default function HistoryTradesMock({setOrderCountHistoryCompany, orderCountHistoryCompany}){

    let baseUrl = process.env.NODE_ENV === "production" ? "/" : "http://localhost:5000/"

    const [data, setData] = useState([]);
    const [clickToRemove, setclickToRemove] = useState(1);
    const [skip, setSkip] = useState(0);
    let numberOfClickForRemoveNext = 0

    useEffect(()=>{

        axios.get(`${baseUrl}api/v1/readmocktradecompanypagination/${skip}/${30}`)
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
        axios.get(`${baseUrl}api/v1/readmocktradecompanypagination/${skip+30}/${30}`)
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
        axios.get(`${baseUrl}api/v1/readmocktradecompanypagination/${skip-30}/${30}`)
        .then((res)=>{

            setData(res.data);
        }).catch((err)=>{
            window.alert("Server Down");
            return new Error(err);
        })
        setclickToRemove((prev)=>prev-1)
    }
    numberOfClickForRemoveNext = Math.ceil(((orderCountHistoryCompany))/30);
    console.log(numberOfClickForRemoveNext, clickToRemove, orderCountHistoryCompany)


    return(
        <div class="historydatatable">
            <div class="card-body px-0 pb-2">
                <div class="table-responsive p-0">
                        <table class="table align-items-center mb-0">
                                <tr>
                                    <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-10 ps-2" style={{textAlign:"center"}}>Trader Name</th>
                                    <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-10 ps-2" style={{textAlign:"center"}}>OrderID</th>
                                    <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-10 ps-2" style={{textAlign:"center"}}>TimeStamp</th>
                                    <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-10 ps-2" style={{textAlign:"center"}}>Type</th>
                                    <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-10 ps-2" style={{textAlign:"center"}}>Instrument</th>
                                    <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-10 ps-2" style={{textAlign:"center"}}>Product</th>
                                    <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-10 ps-2" style={{textAlign:"center"}}>Quantity</th>
                                    <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-10 ps-2" style={{textAlign:"center"}}>Avg. Price</th>
                                    <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-10 ps-2" style={{textAlign:"center"}}>Status</th>
                                    <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-10 ps-2" style={{textAlign:"center"}}>AlgoName</th>
                                    <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-10 ps-2" style={{textAlign:"center"}}>Account</th>
                                    
                                </tr> 
                                {data.map((elem)=>{
                                    return(
                                        <tr key={elem.guid}>
                                            <td>
                                                <div class="d-flex px-2 py-1">
                                                <div>
                                                    <img src={require("./img/profileicon.png")} class="avatar avatar-sm me-3 border-radius-lg" alt="user1" />
                                                </div>
                                                <div class="d-flex flex-column justify-content-center">
                                                    <h6 class="mb-0 text-sm">{elem.createdBy}</h6>
                                                    {/* <p class="text-xs text-secondary mb-0">{elem.userId}</p>        */}
                                                </div>
                                                
                                                </div>
                                            </td>
                                            <td>
                                                <p class="text-xs font-weight-bold mb-0" style={{textAlign:"center"}}>{elem.order_id}</p>     
                                            </td>
                                            <td>
                                                <p class="text-xs font-weight-bold mb-0" style={{textAlign:"center"}}>{elem.order_timestamp}</p>     
                                            </td>
                                            <td>
                                                <p class="text-xs font-weight-bold mb-0" style={elem.buyOrSell == "BUY" ? {color : "#428BCA",backgroundColor : "#b3ccff",fontWeight : 700, textAlign:"center", borderRadius:10}:{color : "red", backgroundColor : "#ffb3b3",fontWeight : 700,textAlign:"center",borderRadius:10}}>{elem.buyOrSell}</p>     
                                            </td>
                                            <td>
                                                <p class="text-xs font-weight-bold mb-0" style={{textAlign:"center"}}>{elem.symbol}</p>     
                                            </td>
                                            <td>
                                                <p class="text-xs font-weight-bold mb-0" style={{textAlign:"center"}}>{elem.Product}</p>     
                                            </td>
                                            <td>
                                                <p class="text-xs font-weight-bold mb-0" style={{textAlign:"center"}}>{elem.Quantity}</p>     
                                            </td>
                                            <td>
                                                <p class="text-xs font-weight-bold mb-0" style={{textAlign:"center"}}>₹{elem.average_price.toFixed(2)}</p>     
                                            </td>
                                            <td>
                                                <p class="text-xs font-weight-bold mb-0" style={elem.status == "COMPLETE" ? {color : "white",backgroundColor : "#04aa04",fontWeight : 700, textAlign:"center", borderRadius:10}:{color : "white", backgroundColor : "red",fontWeight : 700,textAlign:"center",borderRadius:10}}>{elem.status}</p>     
                                            </td>
                                            <td>
                                                <p class="text-xs font-weight-bold mb-0" style={{textAlign:"center"}}>{elem.algoBox.algoName}</p>     
                                            </td>
                                            <td>
                                                <p class="text-xs font-weight-bold mb-0" style={{textAlign:"center"}}>{elem.placed_by}</p>     
                                            </td>
                                            
                                        </tr> 
                                    )
                                })}        
                            </table> 
                            <div className={Styles.pegination_div}>
                                <button className={Styles.PrevButtons} disabled={!(skip !== 0)} onClick={prevData}>Prev</button>
                                <div className={Styles.pageCounting}>{(clickToRemove-1)*30}-{(clickToRemove)*30}</div>
                                <button className={Styles.nextButtons} disabled={!(numberOfClickForRemoveNext !== clickToRemove)} onClick={nextData}>Next</button>
                            </div>
                        
                    
                </div>
            </div>
        </div>
    )
}