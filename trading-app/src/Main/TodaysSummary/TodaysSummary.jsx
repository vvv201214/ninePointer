import React, { useContext, useState } from "react";
import { useEffect } from "react";
import Styles from "../../Main/assets/css/material-dashboard.css";
import axios from "axios";
import { userContext } from "../AuthContext";
// import fonts from "./fonts";
// import js from "./js";


{/* <link id="pagestyle" href="./assets/css/material-dashboard.css?v=3.0.4" rel="stylesheet" /> */ }

export default function TodaysSummary({ socket }) {
    let baseUrl = process.env.NODE_ENV === "production" ? "/" : "http://localhost:5000/"
    const setDetails = useContext(userContext);
    const getDetails = useContext(userContext);
    const [reRender, setReRender] = useState(true);
    const [tradeData, setTradeData] = useState([]);
    const [data, setData] = useState([]);
    const [userDetail, setUserDetail] = useState([]);
    const [todaysTrades, setTodaysTrades] = useState([]);
    const [todayDetailpnl1, settodayDetailpnl1] = useState([]);
    const [marketData, setMarketData] = useState([]);

    let date = new Date();
    let todayDate = `${String((date.getDate()) - 1).padStart(2, '0')}-${String(date.getMonth() + 1).padStart(2, '0')}-${(date.getFullYear())}`
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
    let allmonthtrades = 0;
    let todayusertrades = 0;
    let allmonthcompanybrokerage = 0;
    let allmonthuserbrokerage = 0;
    let allmonthuserpnl = 0;
    let allmonthcompanypnl = 0;
    let monthusertrades = 0;
    let allweekcompanypnl = 0;
    let allweekcompanybrokerage = 0;
    let allweekuserpnl = 0;
    let allweekuserbrokerage = 0;
    let weekusertrades = 0;
    let runningLots = 0;
    let allweeknetcompanypnl = 0;
    let allmonthnetcompanypnl = 0;
    let allyearcompanypnl = 0;
    let allyearcompanybrokerage = 0;
    let allyearuserpnl = 0;
    let allyearuserbrokerage = 0;
    let allyearnetcompanypnl = 0;
    let yearusertrades = 0;
    let allyearnetuserpnl = 0;
    let allmonthnetuserpnl = 0;
    let allweeknetuserpnl = 0;


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
                (res.data).map((elem) => {

                    const request1 = axios.get(`${baseUrl}api/v1/readmocktradeuserDate/${elem.email}`)
                    console.log(`${baseUrl}api/v1/readmocktradeuserDate/${elem.email}`);
                    console.log(request1);
                    const request2 = axios.get(`${baseUrl}api/v1/readmocktradecompanyDate/${elem.email}`)
                    console.log(request2);
                    console.log(`${baseUrl}api/v1/readmocktradecompanyDate/${elem.email}`);
                    const request3 = axios.get(`${baseUrl}api/v1/readmocktradecompanyemail/${elem.email}`)
                    console.log(request3);
                    console.log(`${baseUrl}api/v1/readmocktradecompanyemail/${elem.email}`);
                    const request4 = axios.get(`${baseUrl}api/v1/readmocktradeuseremail/${elem.email}`)
                    console.log(`${baseUrl}api/v1/readmocktradeuseremail/${elem.email}`);
                    console.log(request4);
                    const request5 = axios.get(`${baseUrl}api/v1/readmocktradeuserThisMonth/${elem.email}`)
                    console.log(`${baseUrl}api/v1/readmocktradecompanyThisMonth/${elem.email}`);
                    const request6 = axios.get(`${baseUrl}api/v1/readmocktradecompanyThisMonth/${elem.email}`)
                    console.log(`${baseUrl}api/v1/readmocktradecompanyThisMonth/${elem.email}`);
                    const request7 = axios.get(`${baseUrl}api/v1/readmocktradeuserThisWeek/${elem.email}`)
                    console.log(`${baseUrl}api/v1/readmocktradecompanyThisMonth/${elem.email}`);
                    const request8 = axios.get(`${baseUrl}api/v1/readmocktradecompanyThisWeek/${elem.email}`)
                    console.log(`${baseUrl}api/v1/readmocktradecompanyThisMonth/${elem.email}`);
                    const request9 = axios.get(`${baseUrl}api/v1/readmocktradeuserThisYear/${elem.email}`)
                    console.log(`${baseUrl}api/v1/readmocktradeuserThisYear/${elem.email}`);
                    const request10 = axios.get(`${baseUrl}api/v1/readmocktradecompanyThisYear/${elem.email}`)
                    console.log(`${baseUrl}api/v1/readmocktradecompanyThisYear/${elem.email}`);
                 


                    Promise.all([request1, request2, request3, request4, request5, request6,request7, request8, request9, request10])
                        .then(([response1, response2, response3, response4, response5, response6, response7, response8, response9, response10]) => {
                            const todaycompany = response2.data;
                            const todayuser = response1.data;
                            const overallcompany = response3.data;
                            const overalluser = response4.data;
                            const monthUser = response5.data;
                            const monthCompany = response6.data;
                            const weekUser = response7.data;
                            const weekCompany = response8.data;
                            const yearUser = response9.data;
                            const yearCompany = response10.data;
                        
                            
                            
                            let newObjtodayCompany = pnlCalculation(todaycompany);
                            transactionCost = 0;
                            totalPnl = 0;
                            numberOfTrade = 0;
                            lotUsed = 0;
                            runningLots = 0;
                            
                            let newObjtodayUser = pnlCalculation(todayuser);
                            transactionCost = 0;
                            totalPnl = 0;
                            numberOfTrade = 0;
                            lotUsed = 0;
                            runningLots = 0;
                            
                            console.log(overallcompany);
                            let newObjoverallCompany = pnlCalculation(overallcompany);
                            transactionCost = 0;
                            totalPnl = 0;
                            numberOfTrade = 0;
                            lotUsed = 0;
                            runningLots = 0;

                            let newObjoverallUser = pnlCalculation(overalluser);
                            transactionCost = 0;
                            totalPnl = 0;
                            numberOfTrade = 0;
                            lotUsed = 0;
                            runningLots = 0;

                            let newObjmonthUser = pnlCalculation(monthUser);
                            transactionCost = 0;
                            totalPnl = 0;
                            numberOfTrade = 0;
                            lotUsed = 0;
                            runningLots = 0;

                            let newObjmonthCompany = pnlCalculation(monthCompany);
                            transactionCost = 0;
                            totalPnl = 0;
                            numberOfTrade = 0;
                            lotUsed = 0;
                            runningLots = 0;

                            let newObjweekUser = pnlCalculation(weekUser);
                            transactionCost = 0;
                            totalPnl = 0;
                            numberOfTrade = 0;
                            lotUsed = 0;
                            runningLots = 0;

                            let newObjweekCompany = pnlCalculation(weekCompany);
                            transactionCost = 0;
                            totalPnl = 0;
                            numberOfTrade = 0;
                            lotUsed = 0;
                            runningLots = 0;

                            let newObjyearUser = pnlCalculation(yearUser);
                            transactionCost = 0;
                            totalPnl = 0;
                            numberOfTrade = 0;
                            lotUsed = 0;
                            runningLots = 0;

                            let newObjyearCompany = pnlCalculation(yearCompany);
                            transactionCost = 0;
                            totalPnl = 0;
                            numberOfTrade = 0;
                            lotUsed = 0;
                            runningLots = 0;
                            
                            newObjoverallCompany.traderpnl = newObjtodayUser.pnl;
                            newObjoverallCompany.traderbrokerage = newObjtodayUser.brokerage;
                            newObjoverallCompany.overalluserpnl = newObjoverallUser.pnl;
                            newObjoverallCompany.overalluserbrokerage = newObjoverallUser.brokerage;
                            // newObjoverallCompany.todaycompanyrunninglots = newObjtodayCompany.runningLots;
                            
                            newObjoverallCompany.todaycompanypnl = newObjtodayCompany.pnl;
                            newObjoverallCompany.todaycompanybrokerage = newObjtodayCompany.brokerage;
                            newObjoverallCompany.overallusertrades = newObjoverallUser.numberOfTrade;
                            newObjoverallCompany.todayusertrades = newObjtodayUser.numberOfTrade;
                            newObjoverallCompany.todaycompanyrunningLots = newObjtodayCompany.runningLots;
                            
                            
                            newObjoverallCompany.monthuserpnl = newObjmonthUser.pnl;
                            newObjoverallCompany.monthuserbrokerage = newObjmonthUser.brokerage;
                            newObjoverallCompany.monthusertrades = newObjmonthUser.numberOfTrade;
                            newObjoverallCompany.monthcompanypnl = newObjmonthCompany.pnl;
                            newObjoverallCompany.monthcompanybrokerage = newObjmonthCompany.brokerage;
                            newObjoverallCompany.monthcompanytrades = newObjmonthCompany.numberOfTrade;
                            
                            newObjoverallCompany.weekuserpnl = newObjweekUser.pnl;
                            newObjoverallCompany.weekuserbrokerage = newObjweekUser.brokerage;
                            newObjoverallCompany.weekusertrades = newObjweekUser.numberOfTrade;
                            newObjoverallCompany.weekcompanypnl = newObjweekCompany.pnl;
                            newObjoverallCompany.weekcompanybrokerage = newObjweekCompany.brokerage;
                            newObjoverallCompany.weekcompanytrades = newObjweekCompany.numberOfTrade;

                            newObjoverallCompany.yearuserpnl = newObjyearUser.pnl;
                            newObjoverallCompany.yearuserbrokerage = newObjyearUser.brokerage;
                            newObjoverallCompany.yearusertrades = newObjyearUser.numberOfTrade;
                            newObjoverallCompany.yearcompanypnl = newObjyearCompany.pnl;
                            newObjoverallCompany.yearcompanybrokerage = newObjyearCompany.brokerage;
                            newObjoverallCompany.yearcompanytrades = newObjyearCompany.numberOfTrade;

                      

                            console.log(newObjoverallCompany);
                            console.log(newObjoverallCompany.runningLots);

                            //detailPnl.push(JSON.parse(JSON.stringify(newObjtodayCompany)));

                            todaydetailPnl.push(JSON.parse(JSON.stringify(newObjoverallCompany)));
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
    }, [])
    console.log(todayDetailpnl1);

    (todayDetailpnl1).sort((a, b) => {
        // console.log(a, b)
        if ((a.pnl - a.brokerage) > (b.pnl - b.brokerage)) {
            return -1;
        }
        if ((a.pnl - a.brokerage) > (b.pnl - b.brokerage)) {
            return 1;
        }
        return 0;
    })

    todayDetailpnl1.map((elem) => {
        if (elem.pnl) {
            allcompanypnl = allcompanypnl + Number(elem.pnl);
        }
        if (elem.todaycompanypnl) {
            alltodaycompanypnl = alltodaycompanypnl + Number(elem.todaycompanypnl);
        }
        if (elem.monthcompanypnl) {
            allmonthcompanypnl = allmonthcompanypnl + Number(elem.monthcompanypnl);
        }
        if (elem.weekcompanypnl) {
            allweekcompanypnl = allweekcompanypnl + Number(elem.weekcompanypnl);
        }
        if (elem.yearcompanypnl) {
            allyearcompanypnl = allyearcompanypnl + Number(elem.yearcompanypnl);
        }



        if (elem.brokerage) {
            allcompanybrokerage = allcompanybrokerage + Number(elem.brokerage);
        }
        if(elem.todaycompanybrokerage){
            alltodaycompanybrokerage = alltodaycompanybrokerage + Number(elem.todaycompanybrokerage);
        }
        if(elem.monthcompanybrokerage){
            allmonthcompanybrokerage = allmonthcompanybrokerage + Number(elem.monthcompanybrokerage);
        }
        if(elem.weekcompanybrokerage){
            allweekcompanybrokerage = allweekcompanybrokerage + Number(elem.weekcompanybrokerage);
        }
        if(elem.yearcompanybrokerage){
            allyearcompanybrokerage = allyearcompanybrokerage + Number(elem.yearcompanybrokerage);
        }

        if (elem.overalluserpnl) {
            alluserpnl = alluserpnl + Number(elem.overalluserpnl);
        }
        if (elem.traderpnl) {
            alltodayuserpnl = alltodayuserpnl + Number(elem.traderpnl);
        }
        if (elem.monthuserpnl) {
            allmonthuserpnl = allmonthuserpnl + Number(elem.monthuserpnl);
        }
        if (elem.weekuserpnl) {
            allweekuserpnl = allweekuserpnl + Number(elem.weekuserpnl);
        }
        if (elem.yearuserpnl) {
            allyearuserpnl = allyearuserpnl + Number(elem.yearuserpnl);
        }

        if (elem.overalluserbrokerage) {
            alluserbrokerage = alluserbrokerage + Number(elem.overalluserbrokerage);
        }
        if (elem.traderbrokerage) {
            alltodayuserbrokerage = alltodayuserbrokerage + Number(elem.traderbrokerage);
        }
        if (elem.monthuserbrokerage) {
            allmonthuserbrokerage = allmonthuserbrokerage + Number(elem.monthuserbrokerage);
        }
        if (elem.weekuserbrokerage) {
            allweekuserbrokerage = allweekuserbrokerage + Number(elem.weekuserbrokerage);
        }
        if (elem.yearuserbrokerage) {
            allyearuserbrokerage = allyearuserbrokerage + Number(elem.yearuserbrokerage);
        }

        if (elem.numberOfTrade) {
            alltrades = alltrades + Number(elem.numberOfTrade);
        }
        if (elem.todayusertrades) {
            todayusertrades = todayusertrades + Number(elem.todayusertrades);
        }
        if (elem.monthusertrades) {
            monthusertrades = monthusertrades + Number(elem.monthusertrades);
        }
        if (elem.weekusertrades) {
            weekusertrades = weekusertrades + Number(elem.weekusertrades);
        }
        if (elem.yearusertrades) {
            yearusertrades = yearusertrades + Number(elem.yearusertrades);
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
    allweeknetcompanypnl = allweekcompanypnl - allweekcompanybrokerage;
    allweeknetuserpnl = allweekuserpnl - allweekuserbrokerage;
    allmonthnetcompanypnl = allmonthcompanypnl - allmonthcompanybrokerage;
    allmonthnetuserpnl = allmonthuserpnl - allmonthuserbrokerage;
    allyearnetcompanypnl = allyearcompanypnl - allyearcompanybrokerage;
    allyearnetuserpnl = allyearuserpnl - allyearuserbrokerage;

    

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
                        userId: data[0].userId,
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
                        userId: data[0].userId,
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
        
        let userId = '';
        overallPnl.map((elem, index)=>{
            
                name = elem.name;
                userId = elem.userId;
            
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
        let newObj = {};
        let date = '';
        if(data.length !== 0){
         date = (overallPnl[0].date).split("-");
        }
        newObj = {
            brokerage: transactionCost,
            pnl: totalPnl,
            name: name,
            userId: userId,
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
                            
                            <div class="pnlinfoboxheader">
                            
                                <div class="pnlinfobox">
                                <h5 class="text-white text-capitalize ps-3">Today's Summary</h5>
                                <div class="summarydiv">
                                
                                <div class="companysummary">
                                <h6 class="text-white text-capitalize ps-3">Company</h6>
                                    <div class="text-white text-capitalize ps-3">Gross P&L: {alltodaycompanypnl >= 0.00 ? "+₹" + ((alltodaycompanypnl).toFixed(0)) : "-₹" + (-(alltodaycompanypnl).toFixed(0))}</div>
                                    <div class="text-white text-capitalize ps-3">Trans. Cost:₹{(alltodaycompanybrokerage).toFixed(0)}</div>
                                    <div class="text-white text-capitalize ps-3">Net P&L: {alltodaynetcompanypnl >= 0.00 ? "+₹" + ((alltodaynetcompanypnl).toFixed(0)) : "-₹" + (-(alltodaynetcompanypnl).toFixed(0))}</div>
                                       
                                </div>
                                <div>
                                <h6 class="text-white text-capitalize ps-3">Trader</h6>
                                    <div class="text-white text-capitalize ps-3">Gross P&L: {alltodayuserpnl >= 0.00 ? "+₹" + ((alltodayuserpnl).toFixed(0)) : "-₹" + (-(alltodayuserpnl).toFixed(0))}</div>
                                    <div class="text-white text-capitalize ps-3">Trans. Cost:  ₹{(alltodayuserbrokerage).toFixed(0)}</div>
                                    <div class="text-white text-capitalize ps-3">Net P&L: {alltodaynetuserpnl >= 0.00 ? "+₹" + ((alltodaynetuserpnl).toFixed(0)) : "-₹" + (-(alltodaynetuserpnl).toFixed(0))}</div>
                                    <div class="text-white text-capitalize ps-3"># Trades: {todayusertrades}</div> 
                                </div>
                                </div>
                                </div>

                                <div class="pnlinfobox">
                                <h5 class="text-white text-capitalize ps-3">Weekly Summary</h5>
                                <div class="summarydiv">
                                <div class="companysummary">
                                <h6 class="text-white text-capitalize ps-3">Company</h6>
                                <div>
                                    <div class="text-white text-capitalize ps-3">Gross P&L: {allweekcompanypnl >= 0.00 ? "+₹" + ((allweekcompanypnl).toFixed(0)) : "-₹" + (-(allweekcompanypnl).toFixed(0))}</div>
                                    <div class="text-white text-capitalize ps-3">Trans. Cost: ₹{(allweekcompanybrokerage).toFixed(0)}</div>
                                    <div class="text-white text-capitalize ps-3">Net P&L: {allweeknetcompanypnl >= 0.00 ? "+₹" + ((allweeknetcompanypnl).toFixed(0)) : "-₹" + (-(allweeknetcompanypnl).toFixed(0))}</div>
                                </div>
                                </div>
                                <div>
                                <h6 class="text-white text-capitalize ps-3">Trader</h6>
                                    <div class="text-white text-capitalize ps-3">Gross P&L: {allweekuserpnl >= 0.00 ? "+₹" + ((allweekuserpnl).toFixed(0)) : "-₹" + (-(allweekuserpnl).toFixed(0))}</div>
                                    <div class="text-white text-capitalize ps-3">Trans. Cost: ₹{(allweekuserbrokerage).toFixed(0)}</div>
                                    <div class="text-white text-capitalize ps-3">Net P&L: {allweeknetuserpnl >= 0.00 ? "+₹" + ((allweeknetuserpnl).toFixed(0)) : "-₹" + (-(allweeknetuserpnl).toFixed(0))}</div>
                                    <div class="text-white text-capitalize ps-3"># Trades: {weekusertrades}</div> 
                                </div>
                                </div>
                                </div>

                                <div class="pnlinfobox">
                                <h5 class="text-white text-capitalize ps-3">Monthly Summary</h5>
                                <div class="summarydiv">
                                <div class="companysummary">
                                <h6 class="text-white text-capitalize ps-3">Company</h6>
                                <div>
                                    <div class="text-white text-capitalize ps-3">Gross P&L: {allmonthcompanypnl >= 0.00 ? "+₹" + ((allmonthcompanypnl).toFixed(0)) : "-₹" + (-(allmonthcompanypnl).toFixed(0))}</div>
                                    <div class="text-white text-capitalize ps-3">Trans. Cost: ₹{(allmonthcompanybrokerage).toFixed(0)}</div>
                                    <div class="text-white text-capitalize ps-3">Net P&L: {allmonthnetcompanypnl >= 0.00 ? "+₹" + ((allmonthnetcompanypnl).toFixed(0)) : "-₹" + (-(allmonthnetcompanypnl).toFixed(0))}</div>
                                </div>
                                </div>
                                <div>
                                <h6 class="text-white text-capitalize ps-3">Trader</h6>
                                    <div class="text-white text-capitalize ps-3">Gross P&L: {allmonthuserpnl >= 0.00 ? "+₹" + ((allmonthuserpnl).toFixed(0)) : "-₹" + (-(allmonthuserpnl).toFixed(0))}</div>
                                    <div class="text-white text-capitalize ps-3">Trans. Cost: ₹{(allmonthuserbrokerage).toFixed(0)}</div>
                                    <div class="text-white text-capitalize ps-3">Net P&L: {allmonthnetuserpnl >= 0.00 ? "+₹" + ((allmonthnetuserpnl).toFixed(0)) : "-₹" + (-(allmonthnetuserpnl).toFixed(0))}</div>
                                    <div class="text-white text-capitalize ps-3"># Trades: {monthusertrades}</div> 
                                </div>
                                </div>
                                </div>

                                <div class="pnlinfobox">
                                <h5 class="text-white text-capitalize ps-3">Yearly Summary</h5>
                                <div class="summarydiv">
                                <div class="companysummary">
                                <h6 class="text-white text-capitalize ps-3">Company</h6>
                                <div>
                                    <div class="text-white text-capitalize ps-3">Gross P&L: {allyearcompanypnl >= 0.00 ? "+₹" + ((allyearcompanypnl).toFixed(0)) : "-₹" + (-(allyearcompanypnl).toFixed(0))}</div>
                                    <div class="text-white text-capitalize ps-3">Trans. Cost: ₹{(allyearcompanybrokerage).toFixed(0)}</div>
                                    <div class="text-white text-capitalize ps-3">Net P&L: {allyearnetcompanypnl >= 0.00 ? "+₹" + ((allyearnetcompanypnl).toFixed(0)) : "-₹" + (-(allyearnetcompanypnl).toFixed(0))}</div>
                                </div>
                                </div>
                                <div>
                                <h6 class="text-white text-capitalize ps-3">Trader</h6>
                                    <div class="text-white text-capitalize ps-3">Gross P&L: {allyearuserpnl >= 0.00 ? "+₹" + ((allyearuserpnl).toFixed(0)) : "-₹" + (-(allyearuserpnl).toFixed(0))}</div>
                                    <div class="text-white text-capitalize ps-3">Trans. Cost: ₹{(allyearuserbrokerage).toFixed(0)}</div>
                                    <div class="text-white text-capitalize ps-3">Net P&L: {allyearnetuserpnl >= 0.00 ? "+₹" + ((allyearnetuserpnl).toFixed(0)) : "-₹" + (-(allyearnetuserpnl).toFixed(0))}</div>
                                    <div class="text-white text-capitalize ps-3"># Trades: {yearusertrades}</div> 
                                </div>
                                </div>
                                </div>

                                <div class="pnlinfobox">
                                <h5 class="text-white text-capitalize ps-3">Lifetime Summary</h5>
                                <div class="summarydiv">
                                <div class="companysummary">
                                <h6 class="text-white text-capitalize ps-3">Company</h6>
                                <div>
                                    <div class="text-white text-capitalize ps-3">Gross P&L: {allcompanypnl >= 0.00 ? "+₹" + ((allcompanypnl).toFixed(0)) : "-₹" + (-(allcompanypnl).toFixed(0))}</div>
                                    <div class="text-white text-capitalize ps-3">Trans. Cost: ₹{(allcompanybrokerage).toFixed(0)}</div>
                                    <div class="text-white text-capitalize ps-3">Net P&L: {allnetcompanypnl >= 0.00 ? "+₹" + ((allnetcompanypnl).toFixed(0)) : "-₹" + (-(allnetcompanypnl).toFixed(0))}</div>
                                </div>
                                </div>
                                <div>
                                <h6 class="text-white text-capitalize ps-3">Trader</h6>
                                    <div class="text-white text-capitalize ps-3">Gross P&L: {alluserpnl >= 0.00 ? "+₹" + ((alluserpnl).toFixed(0)) : "-₹" + (-(alluserpnl).toFixed(0))}</div>
                                    <div class="text-white text-capitalize ps-3">Trans. Cost: ₹{(alluserbrokerage).toFixed(0)}</div>
                                    <div class="text-white text-capitalize ps-3">Net P&L: {allnetuserpnl >= 0.00 ? "+₹" + ((allnetuserpnl).toFixed(0)) : "-₹" + (-(allnetuserpnl).toFixed(0))}</div>
                                    <div class="text-white text-capitalize ps-3"># Trades: {alltrades}</div> 
                                </div>
                                </div>
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
                                    <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"># of Trades</th>
                                    {/* <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Details</th> */}
                                    <th class="text-secondary opacity-7"></th>
                                </tr>
                                {todayDetailpnl1.map((elem) => {
                                    console.log(elem.todaycompanyrunningLots)
                                    return (
                                        <>
                                        {elem.pnl !==0 &&
                                            <tr>
                                                <td>
                                                    <div class="d-flex px-2 py-1">
                                                        <div>
                                                            <img src={require("./img/profileicon.png")} class="avatar avatar-sm me-3 border-radius-lg" alt="user1" />
                                                        </div>
                                                        <div class="d-flex flex-column justify-content-center">
                                                            <h6 class="mb-0 text-sm">{elem.name}</h6>
                                                            <p class="text-xs text-secondary mb-0">{elem.userId}</p>
                                                           
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <p class="text-xs font-weight-bold mb-0" style={elem.todaycompanypnl > 0 ? { color: "green" } : !elem.todaycompanypnl ? { color:"grey"} : { color: "red" }}>{(elem.todaycompanyrunningLots === 0 && elem.todaycompanypnl) ? (elem.todaycompanypnl >= 0.00 ? "+₹" + (elem.todaycompanypnl.toFixed(0)) : !elem.todaycompanypnl ? 0 : "-₹" + ((-(elem.todaycompanypnl)).toFixed(0))) : "₹" + 0}</p>
                                                    <p class="text-xs text-secondary mb-0" style={elem.pnl >= 0.00 ? { color: "green" } : { color: "red" }}>Lifetime: {elem.pnl > 0.00 ? "+₹" + (elem.pnl.toFixed(0)) : elem.pnl === 0 ? " " : "-₹" + ((-(elem.pnl)).toFixed(0))}</p>
                                                    <p class="text-xs text-secondary mb-0" style={elem.yearcompanypnl >= 0.00 ? { color: "green" } : { color: "red" }}>YTD: {elem.yearcompanypnl ? (elem.yearcompanypnl > 0.00 ? "+₹" + (elem.yearcompanypnl.toFixed(0)) : elem.yearcompanypnl === 0 ? " " : "-₹" + ((-(elem.yearcompanypnl)).toFixed(0))) : "₹" + 0}</p>
                                                    <p class="text-xs text-secondary mb-0" style={elem.monthcompanypnl >= 0.00 ? { color: "green" } : { color: "red" }}>MTD: {elem.monthcompanypnl ? (elem.monthcompanypnl > 0.00 ? "+₹" + (elem.monthcompanypnl.toFixed(0)) : elem.monthcompanypnl === 0 ? " " : "-₹" + ((-(elem.monthcompanypnl)).toFixed(0))) : "₹" + 0}</p>
                                                    <p class="text-xs text-secondary mb-0" style={elem.weekcompanypnl >= 0.00 ? { color: "green" } : { color: "red" }}>WTD: {elem.weekcompanypnl ? (elem.weekcompanypnl > 0.00 ? "+₹" + (elem.weekcompanypnl.toFixed(0)) : elem.weekcompanypnl === 0 ? " " : "-₹" + ((-(elem.weekcompanypnl)).toFixed(0))) : "₹" + 0}</p>
                                                </td>

                                                <td>
                                                    <p class="text-xs font-weight-bold mb-0">₹{elem.todaycompanyrunningLots === 0 ? (elem.todaycompanybrokerage ? (elem.todaycompanybrokerage).toFixed(0) : elem.todaycompanybrokerage) : 0}</p>
                                                    <p class="text-xs text-secondary mb-0">Lifetime: ₹{elem.brokerage ? (elem.brokerage).toFixed(0) : elem.brokerage}</p>
                                                    <p class="text-xs text-secondary mb-0">YTD: ₹{elem.yearcompanybrokerage ? (elem.yearcompanybrokerage).toFixed(0) : elem.yearcompanybrokerage}</p>
                                                    <p class="text-xs text-secondary mb-0">MTD: ₹{elem.monthcompanybrokerage ? (elem.monthcompanybrokerage).toFixed(0) : elem.monthcompanybrokerage}</p>
                                                    <p class="text-xs text-secondary mb-0">WTD: ₹{elem.weekcompanybrokerage ? (elem.weekcompanybrokerage).toFixed(0) : elem.weekcompanybrokerage}</p>
                                                </td>
                                                <td>
                                                    <p class="text-xs font-weight-bold mb-0" style={(elem.todaycompanypnl - elem.todaycompanybrokerage) > 0.00 ? { color: "green" } : !(elem.todaycompanypnl - elem.todaycompanybrokerage) ? {color : "grey"} : { color: "red" }}>{(elem.todaycompanyrunningLots === 0 && elem.todaycompanypnl)? ((elem.todaycompanypnl - elem.todaycompanybrokerage) > 0.00 ? "+₹" + ((elem.todaycompanypnl - elem.todaycompanybrokerage).toFixed(0)) : !(elem.todaycompanypnl - elem.todaycompanybrokerage) ? "₹" + 0 : "-₹" + ((-((elem.todaycompanypnl - elem.todaycompanybrokerage))).toFixed(0))) : "₹" + 0}</p>
                                                    <p class="text-xs text-secondary mb-0" style={(elem.pnl - elem.brokerage) >= 0.00 ? { color: "green" } : { color: "red" }}>Lifetime: {elem.todaycompanyrunningLots === 0 ?((elem.pnl - elem.brokerage) > 0.00 ? "+₹" + ((elem.pnl - elem.brokerage).toFixed(0)) : (elem.pnl - elem.brokerage) === 0 ? " " : "-₹" + ((-((elem.pnl - elem.brokerage))).toFixed(0))) : "₹" + 0}</p>
                                                    <p class="text-xs text-secondary mb-0" style={(elem.yearcompanypnl - elem.yearcompanybrokerage) >= 0.00 ? { color: "green" } : { color: "red" }}>YTD: {((elem.yearcompanypnl - elem.yearcompanybrokerage) ? (elem.yearcompanypnl - elem.yearcompanybrokerage) > 0.00 ? "+₹" + ((elem.yearcompanypnl - elem.yearcompanybrokerage).toFixed(0)) : (elem.yearcompanypnl - elem.yearcompanybrokerage) === 0 ? " " : "-₹" + ((-((elem.yearcompanypnl - elem.yearcompanybrokerage))).toFixed(0)) : "₹" + 0)}</p>
                                                    <p class="text-xs text-secondary mb-0" style={(elem.monthcompanypnl - elem.monthcompanybrokerage) >= 0.00 ? { color: "green" } : { color: "red" }}>MTD: {((elem.monthcompanypnl - elem.monthcompanybrokerage) ? (elem.monthcompanypnl - elem.monthcompanybrokerage) > 0.00 ? "+₹" + ((elem.monthcompanypnl - elem.monthcompanybrokerage).toFixed(0)) : (elem.monthcompanypnl - elem.monthcompanybrokerage) === 0 ? " " : "-₹" + ((-((elem.monthcompanypnl - elem.monthcompanybrokerage))).toFixed(0)): "₹" + 0)}</p>
                                                    <p class="text-xs text-secondary mb-0" style={(elem.weekcompanypnl - elem.weekcompanybrokerage) >= 0.00 ? { color: "green" } : { color: "red" }}>WTD: {((elem.weekcompanypnl - elem.weekcompanybrokerage) ? (elem.weekcompanypnl - elem.weekcompanybrokerage) > 0.00 ? "+₹" + ((elem.weekcompanypnl - elem.weekcompanybrokerage).toFixed(0)) : (elem.weekcompanypnl - elem.weekcompanybrokerage) === 0 ? " " : "-₹" + ((-((elem.weekcompanypnl - elem.weekcompanybrokerage))).toFixed(0)) : "₹" + 0)}</p>
                                                </td>
                                                <td>
                                                    <p class="text-xs font-weight-bold mb-0" style={elem.traderpnl > 0.00 ? { color: "green" } : !elem.traderpnl ? {color:"grey"} : { color: "red" }}>{(elem.todaycompanyrunningLots === 0 && elem.todaycompanypnl)? (elem.traderpnl > 0.00 ? "+₹" + (elem.traderpnl.toFixed(0)) : !elem.traderpnl ? "₹" + 0 : "-₹" + ((-(elem.traderpnl)).toFixed(0))) : "₹" + 0}</p>
                                                    <p class="text-xs text-secondary mb-0" style={elem.overalluserpnl >= 0.00 ? { color: "green" } : { color: "red" }}>Lifetime: {((elem.overalluserpnl) ? (elem.overalluserpnl) > 0.00 ? "+₹" + ((elem.overalluserpnl).toFixed(0)) : (elem.overalluserpnl) === 0 ? " " : "-₹" + ((-((elem.overalluserpnl))).toFixed(0)) : "₹" + 0)}</p>
                                                    <p class="text-xs text-secondary mb-0" style={elem.yearuserpnl >= 0.00 ? { color: "green" } : { color: "red" }}>YTD: {( elem.yearuserpnl ? (elem.yearuserpnl) > 0.00 ? "+₹" + ((elem.yearuserpnl).toFixed(0)) : (elem.yearuserpnl) === 0 ? " " : "-₹" + ((-((elem.yearuserpnl))).toFixed(0)) : "₹" + 0)}</p>
                                                    <p class="text-xs text-secondary mb-0" style={elem.monthuserpnl >= 0.00 ? { color: "green" } : { color: "red" }}>MTD: {( elem.monthuserpnl ? (elem.monthuserpnl) > 0.00 ? "+₹" + ((elem.monthuserpnl).toFixed(0)) : (elem.monthuserpnl) === 0 ? " " : "-₹" + ((-((elem.monthuserpnl))).toFixed(0)) : "₹" + 0)}</p>
                                                    <p class="text-xs text-secondary mb-0" style={elem.weekuserpnl >= 0.00 ? { color: "green" } : { color: "red" }}>WTD: {(elem.weekuserpnl ? (elem.weekuserpnl) > 0.00 ? "+₹" + ((elem.weekuserpnl).toFixed(0)) : (elem.weekuserpnl) === 0 ? " " : "-₹" + ((-((elem.weekuserpnl))).toFixed(0)) : "₹" + 0)}</p>
                                                </td>
                                                <td>
                                                    <p class="text-xs font-weight-bold mb-0">₹{elem.traderbrokerage ? (elem.traderbrokerage).toFixed(0) : 0}</p>
                                                    <p class="text-xs text-secondary mb-0">Lifetime: ₹{(elem.overalluserbrokerage).toFixed(0)}</p>
                                                    <p class="text-xs text-secondary mb-0">YTD: ₹{(elem.yearuserbrokerage).toFixed(0)}</p>
                                                    <p class="text-xs text-secondary mb-0">MTD: ₹{(elem.monthuserbrokerage).toFixed(0)}</p>
                                                    <p class="text-xs text-secondary mb-0">WTD: ₹{(elem.weekuserbrokerage).toFixed(0)}</p>
                                                </td>
                                                <td>
                                                    <p class="text-xs font-weight-bold mb-0" style={(elem.traderpnl - elem.traderbrokerage) > 0.00 ? { color: "green" } : !(elem.traderpnl - elem.traderbrokerage) ? {color:"grey"} : { color: "red" }}>{(elem.traderpnl - elem.traderbrokerage) > 0.00 ? "+₹" + ((elem.traderpnl - elem.traderbrokerage).toFixed(0)) : !(elem.traderpnl - elem.traderbrokerage) ? "₹" + 0 : "-₹" + ((-((elem.traderpnl - elem.traderbrokerage))).toFixed(0))}</p>
                                                    <p class="text-xs text-secondary mb-0" style={(elem.overalluserpnl - elem.overalluserbrokerage) >= 0.00 ? { color: "green" } : { color: "red" }}>Lifetime: {(elem.overalluserpnl - elem.overalluserbrokerage) > 0.00 ? "+₹" + ((elem.overalluserpnl - elem.overalluserbrokerage).toFixed(0)) : (elem.overalluserpnl - elem.overalluserbrokerage) === 0 ? " " : "-₹" + ((-((elem.overalluserpnl - elem.overalluserbrokerage))).toFixed(0))}</p>
                                                    <p class="text-xs text-secondary mb-0" style={(elem.yearuserpnl - elem.yearuserbrokerage) >= 0.00 ? { color: "green" } : { color: "red" }}>YTD: {((elem.yearuserpnl - elem.yearuserbrokerage) ? (elem.yearuserpnl - elem.yearuserbrokerage) > 0.00 ? "+₹" + ((elem.yearuserpnl - elem.yearuserbrokerage).toFixed(0)) : (elem.yearuserpnl - elem.yearuserbrokerage) === 0 ? " " : "-₹" + ((-((elem.yearuserpnl - elem.yearuserbrokerage))).toFixed(0)) : "₹" + 0)}</p>
                                                    <p class="text-xs text-secondary mb-0" style={(elem.monthuserpnl - elem.monthuserbrokerage) >= 0.00 ? { color: "green" } : { color: "red" }}>MTD: {((elem.monthuserpnl - elem.monthuserbrokerage) ? (elem.monthuserpnl - elem.monthuserbrokerage) > 0.00 ? "+₹" + ((elem.monthuserpnl - elem.monthuserbrokerage).toFixed(0)) : (elem.monthuserpnl - elem.monthuserbrokerage) === 0 ? " " : "-₹" + ((-((elem.monthuserpnl - elem.monthuserbrokerage))).toFixed(0)) : "₹" + 0)}</p>
                                                    <p class="text-xs text-secondary mb-0" style={(elem.weekuserpnl - elem.weekuserbrokerage) >= 0.00 ? { color: "green" } : { color: "red" }}>WTD: {((elem.weekuserpnl - elem.weekuserbrokerage) ? (elem.weekuserpnl - elem.weekuserbrokerage) > 0.00 ? "+₹" + ((elem.weekuserpnl - elem.weekuserbrokerage).toFixed(0)) : (elem.weekuserpnl - elem.weekuserbrokerage) === 0 ? " " : "-₹" + ((-((elem.weekuserpnl - elem.weekuserbrokerage))).toFixed(0)) : "₹" + 0)}</p>
                                                </td>
                                                <td class="text-xs font-weight-bold mb-0">
                                                    <p class="text-xs font-weight-bold mb-0">{elem.todayusertrades}</p>
                                                    <p class="text-xs text-secondary mb-0">Lifetime: {elem.numberOfTrade}</p>
                                                    {/* <span class="text-secondary text-xs font-weight-bold">{elem.numberOfTrade}</span> */}
                                                    <p class="text-xs text-secondary mb-0">YTD: {elem.yearusertrades}</p>
                                                    <p class="text-xs text-secondary mb-0">MTD: {elem.monthusertrades}</p>
                                                    <p class="text-xs text-secondary mb-0">WTD: {elem.weekusertrades}</p>
                                                </td>
                                                {/* <td class="align-middle text-center text-sm">
                                                    <span class="badge badge-sm bg-gradient-success">DETAILS</span>
                                                </td> */}
                                                {/* <td class="align-middle">
                                                    <a href="javascript:;" class="text-secondary font-weight-bold text-xs" data-toggle="tooltip" data-original-title="Edit user">
                                                    Edit
                                                    </a>
                                                </td> */}
                                            </tr>
                                }
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
