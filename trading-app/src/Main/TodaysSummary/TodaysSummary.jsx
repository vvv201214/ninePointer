import React, { useContext, useState } from "react";
import { useEffect } from "react";
import Styles from "./css/material-dashboard.css";
import axios from "axios";
import { userContext } from "../AuthContext";
// import fonts from "./fonts";
// import js from "./js";


{/* <link id="pagestyle" href="./assets/css/material-dashboard.css?v=3.0.4" rel="stylesheet" /> */}

export default function TodaysSummary({ socket }) {
    let baseUrl = process.env.NODE_ENV === "production" ? "/" : "http://localhost:5000/"
    const setDetails = useContext(userContext);
    const getDetails = useContext(userContext);
    const [reRender, setReRender] = useState(true);
    const [tradeData, setTradeData] = useState([]);
    const [data, setData]  = useState([]);
    const [userDetail, setUserDetail]  = useState([]);
    const [todaysTrades, setTodaysTrades]  = useState([]);
    const [todayDetailpnl1, settodayDetailpnl1]  = useState([]);
    const [marketData, setMarketData] = useState([]);

    let date = new Date();
    let todayDate = `${String((date.getDate())-1).padStart(2, '0')}-${String(date.getMonth() + 1).padStart(2, '0')}-${(date.getFullYear())}`
    // let fake_date = "2022-12-16"

    let todaydetailPnl = [];
    let overalldetailPnl = [];
    let totalPnl = 0;
    let transactionCost = 0;
    let numberOfTrade = 0;
    let lotUsed = 0;
    let name = "";
    let alluserpnl = 0;
    let allcompanypnl = 0;
    let alluserbrokerage = 0;
    let allcompanybrokerage = 0;
    let alltrades = 0;
    let alltodayuserpnl = 0;
    let alltodaycompanypnl = 0;
    let alltodayuserbrokerage = 0;
    let alltodaycompanybrokerage = 0;
    let allnetcompanypnl = 0;
    let allnetuserpnl = 0;
    let alltodaynetcompanypnl = 0;
    let alltodaynetuserpnl = 0;
    let alltodaytrades = 0;
    let runninglots = 0;
    let firstDateSplit;

    let detailArr = [];

    let detailPnlArr = [];

    let totalArr = [];
    let [allBrokerage, setAllBrokerage] = useState(0);
    let [allNet, setAllNet] = useState(0);
    let [allGross, setAllGross] = useState(0);
    let [totaltrades, setTotalTrades] = useState(0);

    console.log(todayDate);
    let fake_date = "16-12-2022";

    // History Trade all users
    // useEffect(() => {
    //     axios.get(`${baseUrl}api/v1/readuserdetails`)
    //         .then((res) => {
    //             res.data.map((elem)=>{
        
    //                 axios.get(`${baseUrl}api/v1/readmocktradeuseremail/${elem.email}`)
    //                     .then((res) => {
    //                         let overallpnl = pnlCalculation(res.data)
    //                                 overallpnl = 0;
    //                                 totalPnl = 0;
    //                                 numberOfTrade = 0;
    //                                 lotUsed = 0;
    //                         console.log(overallpnl);
    //                         overalldetailPnl.push(JSON.parse(JSON.stringify(overallpnl)));
    //                         // todaydetailPnl.push(todayspnl);
    //                         settodayDetailpnl1(JSON.parse(JSON.stringify(overalldetailPnl)));
    //                     }).catch((err) => {
    //                         return new Error(err);
    //                     })
                   
    //             })
    //             console.log(overalldetailPnl);
    //             setUserDetail(res.data);
    //         }).catch((err) => {
    //             return new Error(err);
    //         })
    // },[])

    // History Trades all users ends



    // New Code
 
                
    // New COde Ends

    useEffect(() => {
        axios.get(`${baseUrl}api/v1/readuserdetails`)
            .then((res) => {
                res.data.map((elem)=>{
                        
                    const request1 = axios.get(`${baseUrl}api/v1/readmocktradeuserDate/${elem.email}`)
                    console.log(`${baseUrl}api/v1/readmocktradeuserDate/${elem.email}`);
                    const request2 = axios.get(`${baseUrl}api/v1/readmocktradecompanyDate/${elem.email}`)
                    console.log(`${baseUrl}api/v1/readmocktradecompanyDate/${elem.email}`);
                    const request3 = axios.get(`${baseUrl}api/v1/readmocktradecompanyemail/${elem.email}`)
                    console.log(`${baseUrl}api/v1/readmocktradecompanyemail/${elem.email}`);
                    const request4 = axios.get(`${baseUrl}api/v1/readmocktradeuseremail/${elem.email}`)
                    console.log(`${baseUrl}api/v1/readmocktradeuseremail/${elem.email}`);
                    
    
                    Promise.all([request1, request2, request3, request4])
                    .then(([response1, response2, response3, response4]) => {
                        const todaycompany = response2.data;
                        const todayuser = response1.data;
                        const overallcompany = response3.data;
                        const overalluser = response4.data;
    
                        let newObjtodayCompany = pnlCalculation(todaycompany);
                        transactionCost = 0;
                        totalPnl = 0;
                        numberOfTrade = 0;
                        lotUsed = 0;
                        let newObjtodayUser = pnlCalculation(todayuser);
                        transactionCost = 0;
                        totalPnl = 0;
                        numberOfTrade = 0;
                        lotUsed = 0;
                        let newObjoverallCompany = pnlCalculation(overallcompany);
                        transactionCost = 0;
                        totalPnl = 0;
                        numberOfTrade = 0;
                        lotUsed = 0;
                        let newObjoverallUser = pnlCalculation(overalluser);
                        transactionCost = 0;
                        totalPnl = 0;
                        numberOfTrade = 0;
                        lotUsed = 0;
                        console.log(newObjtodayCompany, newObjtodayUser, newObjoverallCompany, newObjoverallUser)
                        newObjtodayCompany.traderpnl = newObjtodayUser.pnl;
                        newObjtodayCompany.traderbrokerage = newObjtodayUser.brokerage;
                        newObjtodayCompany.overalluserpnl = newObjoverallUser.pnl;
                        newObjtodayCompany.overalluserbrokerage = newObjoverallUser.brokerage;
                        newObjtodayCompany.overallcompanypnl = newObjoverallCompany.pnl;
                        newObjtodayCompany.overallcompanybrokerage = newObjoverallCompany.brokerage;
    
                        //detailPnl.push(JSON.parse(JSON.stringify(newObjtodayCompany)));
                    
                        todaydetailPnl.push(JSON.parse(JSON.stringify(newObjtodayCompany)));
                        transactionCost = 0;
                        totalPnl = 0;
                        numberOfTrade = 0;
                        lotUsed = 0;
    
                                // todaydetailPnl.push(todayspnl);
                                settodayDetailpnl1(JSON.parse(JSON.stringify(todaydetailPnl)));
                        // do something with the users and posts data
                    })
                    .catch(error => {
                        throw new Error(error);
                    });
                    
                   
                })
                console.log(todaydetailPnl);
                setUserDetail(res.data);
            }).catch((err) => {
                return new Error(err);
            })
    },[])
    console.log(todayDetailpnl1);

    (todayDetailpnl1).sort((a, b)=> {
        // console.log(a, b)
        if ((a.pnl-a.brokerage) > (b.pnl-b.brokerage)) {
          return -1;
        }
        if ((a.pnl-a.brokerage) > (b.pnl-b.brokerage)) {
          return 1;
        }
        return 0;
    })
    
    todayDetailpnl1.map((elem)=>{
        if(elem.pnl){
            allcompanypnl = allcompanypnl + Number(elem.overallcompanypnl);
            alltodaycompanypnl = alltodaycompanypnl + Number(elem.pnl);
        }

        if(elem.brokerage){
            allcompanybrokerage = allcompanybrokerage + Number(elem.overallcompanybrokerage);
            alltodaycompanybrokerage = alltodaycompanybrokerage + Number(elem.brokerage);
        }
        
        if(elem.traderpnl){
            alluserpnl = alluserpnl + Number(elem.overalluserpnl);
            alltodayuserpnl = alltodayuserpnl + Number(elem.traderpnl);
        }

        if(elem.traderbrokerage){
            alluserbrokerage = alluserbrokerage + Number(elem.overalluserbrokerage);
            alltodayuserbrokerage = alltodayuserbrokerage + Number(elem.traderbrokerage);
        } 
        console.log(allcompanypnl);
        console.log(alltodaycompanypnl);
       

        // allNet =  (allGross - allBrokerage);
        // userNet = (userGross - userBrokerage)

    })

    allnetcompanypnl = allcompanypnl - allcompanybrokerage;
    allnetuserpnl = alluserpnl - alluserbrokerage;
    alltodaynetcompanypnl = alltodaycompanypnl - alltodaycompanybrokerage;
    alltodaynetuserpnl = alltodayuserpnl - alltodayuserbrokerage;

    // useEffect(() => {
    //     axios.get(`${baseUrl}api/v1/readmocktradeuserDate`)
    //         .then((res) => {
    //             setTodaysTrades(res.data);
    //         }).catch((err) => {
    //             return new Error(err);
    //         })
    // },[])
    // console.log(todaysTrades);

    

    // pnl calculation function start

    function pnlCalculation(data){
        let hash = new Map();
        let hashForTraderCount = new Map();
        let numberOfTrader = 0;
        console.log(data)
        for(let i = data.length-1; i >= 0 ; i--){

            numberOfTrade += 1;
            transactionCost += Number(data[i].brokerage);

            if(!hashForTraderCount.has(data[i].userId)){
                numberOfTrader += 1;
                hashForTraderCount.set(data[i].userId, 1);
            }

            if(hash.has(data[i].symbol)){
                let obj = hash.get(data[i].symbol);
                if(data[i].buyOrSell === "BUY"){
                    if(obj.totalBuy === undefined || obj.totalBuyLot === undefined){
                        obj.totalBuy = Number(data[i].average_price) * (Number(data[i].Quantity))
                        obj.totalBuyLot = (Number(data[i].Quantity))
                    } else{
                        obj.totalBuy = obj.totalBuy + Number(data[i].average_price) * (Number(data[i].Quantity))
                        obj.totalBuyLot = obj.totalBuyLot + (Number(data[i].Quantity)) 
                    }

                } if(data[i].buyOrSell === "SELL"){
                    if( obj.totalSell === undefined || obj.totalSellLot === undefined){

                        obj.totalSell = Number(data[i].average_price) * (Number(data[i].Quantity))
                        obj.totalSellLot = (Number(data[i].Quantity)) 
                    } else{

                        obj.totalSell = obj.totalSell + Number(data[i].average_price) * (Number(data[i].Quantity))
                        obj.totalSellLot = obj.totalSellLot + (Number(data[i].Quantity)) 
                    }
                }
            }  else{
                if(data[i].buyOrSell === "BUY"){
                    hash.set(data[i].symbol, {
                        totalBuy : Number(data[i].average_price) * (Number(data[i].Quantity)),
                        totalBuyLot : (Number(data[i].Quantity)) ,
                        totalSell: 0,
                        totalSellLot: 0,
                        symbol: data[i].symbol,
                        Product: data[i].Product,
                        name: data[0].createdBy,
                        date: ((data[0].order_timestamp).split(" "))[0]
                    })
                }if(data[i].buyOrSell === "SELL"){
                    hash.set(data[i].symbol, {
                        totalSell : Number(data[i].average_price) * (Number(data[i].Quantity)),
                        totalSellLot : (Number(data[i].Quantity)) ,
                        totalBuy : 0,
                        totalBuyLot: 0,
                        symbol: data[i].symbol,
                        Product: data[i].Product,
                        name: data[0].createdBy,
                        date: ((data[0].order_timestamp).split(" "))[0]
                    })
                }
            }
        }

        let overallPnl = [];
        for (let value of hash.values()){
            overallPnl.push(value);
        }
        let liveDetailsArr = [];
        overallPnl.map((elem)=>{
            tradeData.map((element)=>{
                if(element.symbol === elem.symbol){
                    marketData.map((subElem)=>{
                        if(subElem !== undefined && subElem.instrument_token === element.instrumentToken){
                            liveDetailsArr.push(subElem)
                        }
                    })
                }
            })
        })

        console.log(hashForTraderCount)
        let runningLots;
        overallPnl.map((elem, index)=>{
            
                name = elem.name;
            if(elem.totalBuyLot+elem.totalSellLot === 0){
                totalPnl += -(elem.totalBuy+elem.totalSell)
            }else{
                totalPnl += (-(elem.totalBuy+elem.totalSell-(elem.totalBuyLot+elem.totalSellLot)*liveDetailsArr[index]?.last_price))

            }
            
            console.log( liveDetailsArr[index]?.last_price)
            console.log(elem.totalBuy,elem.totalSell,elem.totalBuyLot,elem.totalSellLot, liveDetailsArr[index]?.last_price)
            lotUsed += Math.abs(elem.totalBuyLot) + Math.abs(elem.totalSellLot);
            runningLots = elem.totalBuyLot + elem.totalSellLot
        })
        let date = (overallPnl[0].date).split("-");
        let newObj = {
            brokerage: transactionCost,
            pnl: totalPnl,
            name: name,
            numberOfTrade: numberOfTrade,
            lotUsed: lotUsed,
            date: `${date[2]}-${date[1]}-${date[0]}`,
            numberOfTrader: numberOfTrader,
            runningLots: runningLots
        }

        return newObj;
    }

      // pnl calculation function ends
  

    return (
        <div className="row">
        <div class="col-12">
          <div class="card my-4">
            <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
              <div class="bg-gradient-primary shadow-primary border-radius-lg pt-4 pb-3">
                <h6 class="text-white text-capitalize ps-3">Today's Summary</h6>
                <div class="pnlinfoboxheader">
                <div class="pnlinfobox">
                <div class="text-white text-capitalize ps-3">Today's Gross(C-P&L): {alltodaycompanypnl.toFixed(0)}</div>
                <div class="text-white text-capitalize ps-3">Today's Trans. Cost(C): {alltodaycompanybrokerage.toFixed(0)}</div>
                <div class="text-white text-capitalize ps-3">Today's Net(C-P&L): {alltodaynetcompanypnl.toFixed(0)}</div>
                </div>
                <div class="pnlinfobox">
                <div class="text-white text-capitalize ps-3">Today's Gross(T-P&L): {alltodayuserpnl.toFixed(0)}</div>
                <div class="text-white text-capitalize ps-3">Today's Trans. Cost(T): {alltodayuserbrokerage.toFixed(0)}</div>
                <div class="text-white text-capitalize ps-3">Today's Net(T-P&L): {alltodaynetuserpnl.toFixed(0)}</div>
                </div>
                <div class="pnlinfobox">    
                <div class="text-white text-capitalize ps-3">Lifetime Gross(C-P&L): {allcompanypnl.toFixed(0)}</div>
                <div class="text-white text-capitalize ps-3">Lifetime Trans. Cost(C): {allcompanybrokerage.toFixed(0)}</div>
                <div class="text-white text-capitalize ps-3">Lifetime Net(C-P&L): {allnetcompanypnl.toFixed(0)}</div>
                </div>
                <div class="pnlinfobox">    
                <div class="text-white text-capitalize ps-3">Lifetime Gross(T-P&L): {alluserpnl.toFixed(0)}</div>
                <div class="text-white text-capitalize ps-3">Lifetime Trans. Cost(T): {alluserbrokerage.toFixed(0)}</div>
                <div class="text-white text-capitalize ps-3">Lifetime Net(T-P&L): {allnetuserpnl.toFixed(0)}</div>
                </div>
                </div>
              </div>
            </div>
            <div class="card-body px-0 pb-2">
              <div class="table-responsive p-0">
                <table class="table align-items-center mb-0">
                  
                    <tr>
                      <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Trader</th>
                      <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Gross(C-P&L)</th>
                      <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Trans. Cost(C)</th>
                      <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Net(C-P&L)</th>
                      <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Gross(T-P&L)</th>
                      <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Trans. Cost(T)</th>
                      <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Net(T-P&L)</th>
                      <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"># of Trades</th>
                      <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Details</th>
                      <th class="text-secondary opacity-7"></th>
                    </tr>
                        {todayDetailpnl1.map((elem)=>{
                            return(
                                <>
                                <tr>
                                                <td>
                                                    <div class="d-flex px-2 py-1">
                                                    <div>
                                                        <img src={require("./img/profileicon.png")} class="avatar avatar-sm me-3 border-radius-lg" alt="user1"/>
                                                    </div>
                                                    <div class="d-flex flex-column justify-content-center">
                                                        <h6 class="mb-0 text-sm">{elem.name}</h6>
                                                        <p class="text-xs text-secondary mb-0">{elem.email}</p>
                                                    </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <p class="text-xs font-weight-bold mb-0" style={elem.pnl>=0.00 ? { color: "green"}:  { color: "red"}}>{elem.pnl > 0.00 ? "+₹" + (elem.pnl.toFixed(0)) : elem.pnl === 0 ? " " : "-₹" + ((-(elem.pnl)).toFixed(0))}</p>
                                                    <p class="text-xs text-secondary mb-0" style={elem.overallcompanypnl>=0.00 ? { color: "green"}:  { color: "red"}}>Lifetime: {elem.overallcompanypnl > 0.00 ? "+₹" + (elem.overallcompanypnl.toFixed(0)) : elem.overallcompanypnl === 0 ? " " : "-₹" + ((-(elem.overallcompanypnl)).toFixed(0))}</p>
                                                </td>
                                                
                                                <td>
                                                    <p class="text-xs font-weight-bold mb-0">₹{(elem.brokerage).toFixed(0)}</p>
                                                    <p class="text-xs text-secondary mb-0">Lifetime: ₹{(elem.overallcompanybrokerage).toFixed(0)}</p>
                                                </td>
                                                <td>
                                                    <p class="text-xs font-weight-bold mb-0" style={(elem.pnl-elem.brokerage)>=0.00 ? { color: "green"}:  { color: "red"}}>{(elem.pnl-elem.brokerage) > 0.00 ? "+₹" + ((elem.pnl-elem.brokerage).toFixed(0)) : (elem.pnl-elem.brokerage) === 0 ? " " : "-₹" + ((-((elem.pnl-elem.brokerage))).toFixed(0))}</p>
                                                    <p class="text-xs text-secondary mb-0" style={(elem.overallcompanypnl-elem.overallcompanybrokerage)>=0.00 ? { color: "green"}:  { color: "red"}}>Lifetime: {(elem.overallcompanypnl-elem.overallcompanybrokerage) > 0.00 ? "+₹" + ((elem.overallcompanypnl-elem.overallcompanybrokerage).toFixed(0)) : (elem.overallcompanypnl-elem.overallcompanybrokerage) === 0 ? " " : "-₹" + ((-((elem.overallcompanypnl-elem.overallcompanybrokerage))).toFixed(0))}</p>
                                                </td>
                                                <td>
                                                    <p class="text-xs font-weight-bold mb-0" style={elem.traderpnl>=0.00 ? { color: "green"}:  { color: "red"}}>{elem.traderpnl > 0.00 ? "+₹" + (elem.traderpnl.toFixed(0)) : elem.traderpnl === 0 ? " " : "-₹" + ((-(elem.traderpnl)).toFixed(0))}</p>
                                                    <p class="text-xs text-secondary mb-0" style={elem.overalluserpnl>=0.00 ? { color: "green"}:  { color: "red"}}>Lifetime: {(elem.overalluserpnl) > 0.00 ? "+₹" + ((elem.overalluserpnl).toFixed(0)) : (elem.overalluserpnl) === 0 ? " " : "-₹" + ((-((elem.overalluserpnl))).toFixed(0))}</p>
                                                </td>
                                                <td>
                                                    <p class="text-xs font-weight-bold mb-0">₹{(elem.traderbrokerage).toFixed(0)}</p>
                                                    <p class="text-xs text-secondary mb-0">Lifetime: ₹{(elem.overalluserbrokerage).toFixed(0)}</p>
                                                </td>
                                                <td>
                                                    <p class="text-xs font-weight-bold mb-0" style={(elem.traderpnl-elem.traderbrokerage)>=0.00 ? { color: "green"}:  { color: "red"}}>{(elem.traderpnl-elem.traderbrokerage) > 0.00 ? "+₹" + ((elem.traderpnl-elem.traderbrokerage).toFixed(0)) : (elem.traderpnl-elem.traderbrokerage) === 0 ? " " : "-₹" + ((-((elem.traderpnl-elem.traderbrokerage))).toFixed(0))}</p>
                                                    <p class="text-xs text-secondary mb-0" style={(elem.overalluserpnl-elem.overalluserbrokerage)>=0.00 ? { color: "green"}:  { color: "red"}}>Lifetime: {(elem.overalluserpnl-elem.overalluserbrokerage) > 0.00 ? "+₹" + ((elem.overalluserpnl-elem.overalluserbrokerage).toFixed(0)) : (elem.overalluserpnl-elem.overalluserbrokerage) === 0 ? " " : "-₹" + ((-((elem.overalluserpnl-elem.overalluserbrokerage))).toFixed(0))}</p>
                                                </td>
                                                <td class="align-middle text-center">
                                                    <span class="text-secondary text-xs font-weight-bold">{elem.numberOfTrade}</span>
                                                </td>
                                                <td class="align-middle text-center text-sm">
                                                    <span class="badge badge-sm bg-gradient-success">DETAILS</span>
                                                </td>
                                                {/* <td class="align-middle">
                                                    <a href="javascript:;" class="text-secondary font-weight-bold text-xs" data-toggle="tooltip" data-original-title="Edit user">
                                                    Edit
                                                    </a>
                                                </td> */}
                                                </tr>
                                                </>

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