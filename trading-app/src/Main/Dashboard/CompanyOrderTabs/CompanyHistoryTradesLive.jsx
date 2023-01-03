import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import Styles from "./CompanyOrder.module.css"

export default function CompanyHistoryTradesLive(){

    let baseUrl = process.env.NODE_ENV === "production" ? "/" : "http://localhost:5000/"

    const [data, setData] = useState([]);
    const [clickToRemove, setclickToRemove] = useState(1);
    const [skip, setSkip] = useState(0);
    const [griddatacount, setgriddatacount] = useState(0);
    let numberOfClickForRemoveNext = 0

    useEffect(()=>{

        axios.get(`${baseUrl}api/v1/readlivetradecompany`)
        .then((res)=>{

            
            setgriddatacount((res.data).length);
        }).catch((err)=>{
            window.alert("Server Down");
            return new Error(err);
        })

        axios.get(`${baseUrl}api/v1/readlivetradecompanypagination/${skip}/${30}`)
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
        axios.get(`${baseUrl}api/v1/readlivetradecompanypagination/${skip+30}/${30}`)
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
        axios.get(`${baseUrl}api/v1/readlivetradecompanypagination/${skip-30}/${30}`)
        .then((res)=>{

            setData(res.data);
        }).catch((err)=>{
            window.alert("Server Down");
            return new Error(err);
        })
        setclickToRemove((prev)=>prev-1)
    }
    numberOfClickForRemoveNext = Math.ceil(((griddatacount))/30);
    console.log(numberOfClickForRemoveNext, clickToRemove, griddatacount)


    return(
        // <div>
        //     <div className="main_Container">
        //         <div className="right_side">
        //             <div className="rightside_maindiv">
        //             <span className="grid1_span"></span>
        //                 <div className="grid_1">
        //                     <table className="grid1_table">
        //                         <tr className="grid2_tr">
        //                             <th className="grid2_th">Timestamp</th>
        //                             <th className="grid2_th">OrderID</th>
        //                             <th className="grid2_th">Trader</th>
        //                             <th className="grid2_th">Type</th>
        //                             <th className="grid2_th">Instrument</th>
        //                             <th className="grid2_th">Product</th>
        //                             <th className="grid2_th">Quantity</th>
        //                             <th className="grid2_th">Avg. Price</th>
        //                             <th className="grid2_th">Status</th>
        //                             <th className="grid2_th">AlgoName</th>
        //                             <th className="grid2_th">Account</th>
                                    
        //                         </tr> 
        //                         {data.map((elem)=>{
        //                             return(
        //                                 <tr className="grid2_tr" key={elem.guid}>
        //                                     <td className="grid2_td">{elem.order_timestamp}</td>
        //                                     <td className="grid2_td">{elem.order_id}</td>
        //                                     <td className="grid2_td" style={{fontWeight : 700}}>{elem.createdBy}</td>
        //                                     <td className="grid2_td" style={elem.buyOrSell == "BUY" ? {color : "#428BCA",backgroundColor : "#b3ccff",fontWeight : 700}:{color : "red", backgroundColor : "#ffb3b3",fontWeight : 700}}>{elem.buyOrSell}</td>
        //                                     <td className="grid2_td">{elem.symbol}</td>
        //                                     <td className="grid2_td">{elem.Product}</td>
        //                                     <td className="grid2_td" style={elem.Quantity > 0 ? {color : "#428BCA",backgroundColor : "#b3ccff",fontWeight : 700}:{color : "red", backgroundColor : "#ffb3b3",fontWeight : 700}}>{elem.Quantity}</td>
        //                                     <td className="grid2_td">₹{elem.average_price.toFixed(2)}</td>
        //                                     <td className="grid2_td" style={elem.status == "COMPLETE" ? {color : "#008000",backgroundColor : "#99ff99" , fontWeight : 700} : {color : "white",backgroundColor : "red" , fontWeight : 700}}>{elem.status}</td>
        //                                     <td className="grid2_td">{elem.algoBox.algoName}</td>
        //                                     <td className="grid2_td">{elem.placed_by}</td>
                                            
        //                                 </tr> 
        //                             )
        //                         })}        
        //                     </table> 
        //                     <div className={Styles.pegination_div}>
        //                         <button className={Styles.PrevButtons} disabled={!(skip !== 0)} onClick={prevData}>Prev</button>
        //                         <div className={Styles.pageCounting}>{(clickToRemove-1)*30}-{(clickToRemove)*30}</div>
        //                         <button className={Styles.nextButtons} disabled={!(numberOfClickForRemoveNext !== clickToRemove)} onClick={nextData}>Next</button>
        //                     </div>
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        // </div>

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
                                    <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-10 ps-2" style={{textAlign:"center"}}>Amount</th>
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
                                                <p class="text-xs font-weight-bold mb-0" style={{textAlign:"center"}}>₹{Math.abs(elem.average_price*elem.Quantity).toFixed(2)}</p>     
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
                                <button class="btnnew bg-gradient-primary mt-3 w-10" disabled={!(skip !== 0)} onClick={prevData}>Prev</button>
                                <div class="btnnew bg-gradient-secondary mt-3 w-10">{(clickToRemove-1)*30}-{(clickToRemove)*30}</div>
                                <button class="btnnew bg-gradient-primary mt-3 w-10" disabled={!(numberOfClickForRemoveNext !== clickToRemove)} onClick={nextData}>Next</button>
                            </div>
                        
                    
                </div>
            </div>
        </div>
    )
}