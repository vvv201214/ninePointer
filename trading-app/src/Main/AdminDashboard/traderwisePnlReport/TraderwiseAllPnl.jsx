import React, { useContext, useRef, useState } from "react";
import { useEffect } from "react";
import Styles from "../DailyPNLReport/DailyPNLReport.module.css";
import axios from "axios";
import { userContext } from "../../AuthContext";
import { io } from "socket.io-client";


export default function DailyPNLReport() {
    let baseUrl1 = process.env.NODE_ENV === "production" ? "/" : "http://localhost:9000/"
    let baseUrl = process.env.NODE_ENV === "production" ? "/" : "http://localhost:5000/"

    let socket;
    try{
        // socket = io.connect("http://localhost:9000/")
        socket = io.connect(`${baseUrl1}`)

    } catch(err){
        throw new Error(err);
    }

    let date = new Date();
    let valueInSecondDate = `${(date.getFullYear())}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`

    let valueInFirstDate = `${(date.getFullYear())}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`


    const getDetails = useContext(userContext);
    const [detailPnlArr, setDetailPnl] = useState([]);
    const [userDetail, setUserDetail] = useState([]);
    const [tradeData, setTradeData] = useState([]);
    const [render, setRender] = useState(true);
    let [firstDate, setFirstDate] = useState(valueInFirstDate);
    let [secondDate, setSecondDate] = useState(valueInSecondDate);
    const [selectUserState, setSelectUserState] = useState("All User");
    const [marketData, setMarketData] = useState([]);
    const [allDate, setAllDate] = useState([]);

    let totalArr = [];
    let [allBrokerage, setAllBrokerage] = useState(0);
    let [allNet, setAllNet] = useState(0);
    let [allGross, setAllGross] = useState(0);
    let userBrokerage = 0;
    let userGross = 0;
    let userNet = 0;
    // let secondDate = "";
    // let userId = (getDetails.userDetails.role === "user") && getDetails.userDetails.email;

    let noRender = useRef(true);
    let detailPnl = [];
    let totalPnl = 0;
    let transactionCost = 0;
    let numberOfTrade = 0;
    let lotUsed = 0;
    let name = "";
    let runninglots = 0;
    let firstDateSplit;

    let detailArr = [];

    useEffect(()=>{
        //console.log("rendering")
        //console.log(socket);
        socket.on("connect", ()=>{
            //console.log(socket.id);
            socket.emit("hi",true)
        })

        socket.on("tick", (data) => {
            //console.log("this is live market data", data);
            setMarketData(data);
        })
    },[])

    useEffect(()=>{
        axios.get(`${baseUrl}api/v1/readuserdetails`)
        .then((res) => {
            setUserDetail(res.data);
        }).catch((err)=>{
            return new Error(err);
        })

        axios.get(`${baseUrl}api/v1/readInstrumentDetails`)
        .then((res) => {
            let dataArr = (res.data).filter((elem) => {
                return  elem.status === "Active"
            })
            detailArr = dataArr;
            setTradeData(dataArr)
        }).catch((err)=>{
            return new Error(err);
        })


        //console.log(userDetail)

        // setInterval(()=>{
        //     render ? setRender(false) : setRender(true)
        // }, 5000)

    }, [getDetails,render, detailPnlArr])


    useEffect(() => {
        return () => {
            //console.log('closing');
            socket.close();
        }
    }, [])


    function firstDateChange(e){
        e.preventDefault();
        if((((e.target.value) > secondDate) && secondDate)){
            window.alert("Date range is not valid")
            return;
        }
        noRender.current = false;
        console.log(userDetail)
        firstDateSplit = (e.target.value).split("-");
        firstDate = `${firstDateSplit[0]}-${firstDateSplit[1]}-${firstDateSplit[2]}`
        setFirstDate(firstDate);
        //console.log(firstDate);
        let secondDateSplit = (secondDate).split("-");
        secondDate = `${secondDateSplit[0]}-${secondDateSplit[1]}-${secondDateSplit[2]}`
        setSecondDate(secondDate);
        //console.log(firstDate ,secondDate);
        //console.log(firstDate < secondDate);

            //<= secondDate && noRender.current
            // if(`${firstDateSplit[0]}-${firstDateSplit[1]}-${firstDateSplit[2]}`){
            //     while(`${firstDateSplit[0]}-${firstDateSplit[1]}-${firstDateSplit[2]}` <= secondDate){
            //         //console.log(`${firstDateSplit[0]}-${firstDateSplit[1]}-${firstDateSplit[2]}` , secondDate)
            //         // let newObj = {};
            //         const request1 = axios.get(`${baseUrl}api/v1/readmocktradecompanypariculardatewithemail/${`${firstDateSplit[2]}-${firstDateSplit[1]}-${firstDateSplit[0]}`}/${elem.email}`)
            //         const request2 = axios.get(`${baseUrl}api/v1/readmocktradeuserpariculardatewithemail/${`${firstDateSplit[2]}-${firstDateSplit[1]}-${firstDateSplit[0]}`}/${elem.email}`)
    
            //         Promise.all([request1, request2])
            //         .then(([response1, response2]) => {
            //             const company = response1.data;
            //             const user = response2.data;
            //             //console.log(company, user)
            //             let newObjCompany = pnlCalculation(company);
            //             transactionCost = 0;
            //             totalPnl = 0;
            //             numberOfTrade = 0;
            //             lotUsed = 0;

            //             let newObjUser = pnlCalculation(user);
            //             //console.log(newObjCompany, newObjUser)

            //             newObjCompany.traderpnl = newObjUser.pnl;
            //             newObjCompany.traderbrokerage = newObjUser.brokerage;

            //             if(!mainObj.pnl){
            //                 mainObj.pnl = newObjCompany.pnl;
            //             } else{
            //                 mainObj.pnl = mainObj.pnl + newObjCompany.pnl;
            //             }

            //             if(!mainObj.brokerage){
            //                 mainObj.brokerage = newObjCompany.brokerage;
            //             } else{
            //                 mainObj.brokerage = mainObj.brokerage + newObjCompany.brokerage;
            //             }

            //             if(!mainObj.traderpnl){
            //                 mainObj.traderpnl = newObjCompany.traderpnl;
            //             } else{
            //                 mainObj.traderpnl = mainObj.traderpnl + newObjCompany.traderpnl;
            //             }

            //             if(!mainObj.traderbrokerage){
            //                 mainObj.traderbrokerage = newObjCompany.traderbrokerage;
            //             } else{
            //                 mainObj.traderbrokerage = mainObj.traderbrokerage + newObjCompany.traderbrokerage;
            //             }

            //             if(!mainObj.numberOfTrade){
            //                 mainObj.numberOfTrade = newObjCompany.numberOfTrade;
            //             } else{
            //                 mainObj.numberOfTrade = mainObj.numberOfTrade + newObjCompany.numberOfTrade;
            //             }
    
            //             // detailPnl.push(JSON.parse(JSON.stringify(newObjCompany)));
                            
            //             transactionCost = 0;
            //             totalPnl = 0;
            //             numberOfTrade = 0;
            //             lotUsed = 0;
                    
            //             // //console.log(detailPnl);
            //             // setDetailPnl(detailPnl)
            //             // do something with the users and posts data
            //         })
            //         .catch(error => {
            //             throw new Error(error);
            //         });
        
        
        
            //         if((firstDateSplit[2]) < 9){
            //             (firstDateSplit[2]) = `0${Number(firstDateSplit[2]) + 1}`
            //         }
            //         else if((firstDateSplit[2]) === 31){
            //             (firstDateSplit[2]) = `01`;
                        
            //             //console.log(`${firstDateSplit[0]}-${firstDateSplit[1]}-${firstDateSplit[2]}`)
            //             if((firstDateSplit[1]) < 9){
            //                 (firstDateSplit[1]) = `0${Number(firstDateSplit[1]) + 1}`;
            //             }
            //             else if((firstDateSplit[1]) === 13){
            //                 (firstDateSplit[1]) = `01`;
            //                 (firstDateSplit[0]) = Number(firstDateSplit[0])+ 1;
            //             }else{
            //                 (firstDateSplit[1]) = Number(firstDateSplit[1]) + 1;
            //             }
            //         }else{
            //             (firstDateSplit[2]) = Number(firstDateSplit[2]) + 1;
            //         }
                    
            //     }
                
            //     //console.log(mainObj); 
            //     detailPnl.push(JSON.parse(JSON.stringify(mainObj)));
                            
            //     // transactionCost = 0;
            //     // totalPnl = 0;
            //     // numberOfTrade = 0;
            //     // lotUsed = 0;
            //     // mainObj = {};
            
            //     //console.log(detailPnl); 
            //     setDetailPnl((JSON.parse(JSON.stringify(detailPnl))))
            // }
        userDetail.map((elem)=>{
            //console.log(elem);
            let mainObj = {};
            firstDateSplit = (firstDate).split("-");
    


            if(`${firstDateSplit[0]}-${firstDateSplit[1]}-${firstDateSplit[2]}` <= secondDate){
                while(`${firstDateSplit[0]}-${firstDateSplit[1]}-${firstDateSplit[2]}` <= secondDate){
                    //console.log(`${firstDateSplit[0]}-${firstDateSplit[1]}-${firstDateSplit[2]}` , secondDate)

                    const request1 = axios.get(`${baseUrl}api/v1/readmocktradecompanypariculardatewithemail/${`${firstDateSplit[2]}-${firstDateSplit[1]}-${firstDateSplit[0]}`}/${elem.email}`)
                    const request2 = axios.get(`${baseUrl}api/v1/readmocktradeuserpariculardatewithemail/${`${firstDateSplit[2]}-${firstDateSplit[1]}-${firstDateSplit[0]}`}/${elem.email}`)
    
                    Promise.all([request1, request2])
                    .then(([response1, response2]) => {
                        const company = response1.data;
                        const user = response2.data;
    
                        let newObjCompany = pnlCalculation(company);
                        transactionCost = 0;
                        totalPnl = 0;
                        numberOfTrade = 0;
                        lotUsed = 0;
                        let newObjUser = pnlCalculation(user);
                        //console.log(newObjCompany, newObjUser)
                        newObjCompany.traderpnl = newObjUser.pnl;
                        newObjCompany.traderbrokerage = newObjUser.brokerage;
    
                        detailPnl.push(JSON.parse(JSON.stringify(newObjCompany)));
                            
                        transactionCost = 0;
                        totalPnl = 0;
                        numberOfTrade = 0;
                        lotUsed = 0;
                    
                        // console.log(detailPnl);
                        setDetailPnl(JSON.parse(JSON.stringify(detailPnl)))
                        // do something with the users and posts data
                    })
                    .catch(error => {
                        throw new Error(error);
                    });
 
                    if((firstDateSplit[2]) < 9){
                        (firstDateSplit[2]) = `0${Number(firstDateSplit[2]) + 1}`
                    }
                    else if((firstDateSplit[2]) === 31){
                        (firstDateSplit[2]) = `01`;
                        
                        //console.log(`${firstDateSplit[0]}-${firstDateSplit[1]}-${firstDateSplit[2]}`)
                        if((firstDateSplit[1]) < 9){
                            (firstDateSplit[1]) = `0${Number(firstDateSplit[1]) + 1}`;
                        }
                        else if((firstDateSplit[1]) === 13){
                            (firstDateSplit[1]) = `01`;
                            (firstDateSplit[0]) = Number(firstDateSplit[0])+ 1;
                        }else{
                            (firstDateSplit[1]) = Number(firstDateSplit[1]) + 1;
                        }
                    }else{
                        (firstDateSplit[2]) = Number(firstDateSplit[2]) + 1;
                    }
                }
            } 

            // arr.push(detailPnlArr);
            // setAllDate(arr)
            console.log(detailPnlArr);

        })
        // setTimeout(()=>{
        //     render ? setRender(false) : setRender(true)
        // }, 4000)
      //console.log("after sorting", detailPnlArr);

    }
    
    function secondDateChange(e){
        e.preventDefault();
        if(((firstDate > e.target.value) && firstDate)){
            window.alert("Date range is not valid")
            return;
        }
        noRender.current = false;
        //console.log(userDetail)
        firstDateSplit = (firstDate).split("-");
        firstDate = `${firstDateSplit[0]}-${firstDateSplit[1]}-${firstDateSplit[2]}`
        setFirstDate(firstDate);
        //console.log(firstDate);
        let secondDateSplit = (e.target.value).split("-");
        secondDate = `${secondDateSplit[0]}-${secondDateSplit[1]}-${secondDateSplit[2]}`
        setSecondDate(secondDate);

        //console.log(firstDate ,secondDate);
        //console.log(firstDate < secondDate);
        userDetail.map((elem)=>{
            //console.log(elem);
            let mainObj = {};
            firstDateSplit = (firstDate).split("-");
    


            if(`${firstDateSplit[0]}-${firstDateSplit[1]}-${firstDateSplit[2]}` <= secondDate){
                while(`${firstDateSplit[0]}-${firstDateSplit[1]}-${firstDateSplit[2]}` <= secondDate){
                    //console.log(`${firstDateSplit[0]}-${firstDateSplit[1]}-${firstDateSplit[2]}` , secondDate)

                    const request1 = axios.get(`${baseUrl}api/v1/readmocktradecompanypariculardatewithemail/${`${firstDateSplit[2]}-${firstDateSplit[1]}-${firstDateSplit[0]}`}/${elem.email}`)
                    const request2 = axios.get(`${baseUrl}api/v1/readmocktradeuserpariculardatewithemail/${`${firstDateSplit[2]}-${firstDateSplit[1]}-${firstDateSplit[0]}`}/${elem.email}`)
    
                    Promise.all([request1, request2])
                    .then(([response1, response2]) => {
                        const company = response1.data;
                        const user = response2.data;
    
                        let newObjCompany = pnlCalculation(company);
                        transactionCost = 0;
                        totalPnl = 0;
                        numberOfTrade = 0;
                        lotUsed = 0;
                        let newObjUser = pnlCalculation(user);
                        //console.log(newObjCompany, newObjUser)
                        newObjCompany.traderpnl = newObjUser.pnl;
                        newObjCompany.traderbrokerage = newObjUser.brokerage;
    
                        detailPnl.push(JSON.parse(JSON.stringify(newObjCompany)));
                            
                        transactionCost = 0;
                        totalPnl = 0;
                        numberOfTrade = 0;
                        lotUsed = 0;
                    
                        // console.log(detailPnl);
                        setDetailPnl(JSON.parse(JSON.stringify(detailPnl)))
                        // do something with the users and posts data
                    })
                    .catch(error => {
                        throw new Error(error);
                    });
 
                    if((firstDateSplit[2]) < 9){
                        (firstDateSplit[2]) = `0${Number(firstDateSplit[2]) + 1}`
                    }
                    else if((firstDateSplit[2]) === 31){
                        (firstDateSplit[2]) = `01`;
                        
                        //console.log(`${firstDateSplit[0]}-${firstDateSplit[1]}-${firstDateSplit[2]}`)
                        if((firstDateSplit[1]) < 9){
                            (firstDateSplit[1]) = `0${Number(firstDateSplit[1]) + 1}`;
                        }
                        else if((firstDateSplit[1]) === 13){
                            (firstDateSplit[1]) = `01`;
                            (firstDateSplit[0]) = Number(firstDateSplit[0])+ 1;
                        }else{
                            (firstDateSplit[1]) = Number(firstDateSplit[1]) + 1;
                        }
                    }else{
                        (firstDateSplit[2]) = Number(firstDateSplit[2]) + 1;
                    }
                }
            } 

            // arr.push(detailPnlArr);
            // setAllDate(arr)
            console.log(detailPnlArr);

        })
            // setTimeout(()=>{
            //     render ? setRender(false) : setRender(true)
            // }, 4000)
        //console.log(detailPnl);
    }


    function pnlCalculation(data){
        let hash = new Map();
        let hashForTraderCount = new Map();
        let numberOfTrader = 0;
        //console.log(data)
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

        //console.log(hashForTraderCount)
        let runningLots;
        overallPnl.map((elem, index)=>{
            if(selectUserState === "All user"){
                name = "All User"
            }else{
                name = elem.name;
            }
            if(elem.totalBuyLot+elem.totalSellLot === 0){
                totalPnl += -(elem.totalBuy+elem.totalSell)
            }else{
                totalPnl += (-(elem.totalBuy+elem.totalSell-(elem.totalBuyLot+elem.totalSellLot)*liveDetailsArr[index]?.last_price))

            }
            
            //console.log( liveDetailsArr[index]?.last_price)
            //console.log(elem.totalBuy,elem.totalSell,elem.totalBuyLot,elem.totalSellLot, liveDetailsArr[index]?.last_price)
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



    (detailPnlArr).sort((a, b)=> {
        // //console.log(a, b)
        if (a.date < b.date) {
          return -1;
        }
        if (a.date > b.date) {
          return 1;
        }
        return 0;
    })


    detailPnlArr.map((elem)=>{
        if(elem.brokerage){
            allBrokerage = allBrokerage + Number(elem.brokerage);
            userBrokerage = userBrokerage + Number(elem.traderbrokerage);
        }

        if(elem.pnl){
            allGross = allGross + Number(elem.pnl);
            userGross = userGross + Number(elem.traderpnl);
        }

        allNet =  (allGross - allBrokerage);
        userNet = (userGross - userBrokerage)
        // //console.log(detailPnlArr, allBrokerage, allGross, allNet)

        let obj = {
            allBrokerage: allBrokerage,
            allGross: allGross,
            allNet: allNet
        }
        // //console.log(obj)
        totalArr.push(obj);
    })

    console.log(detailPnlArr)
    let hashmap = new Map();
    for(let i = 0; i < detailPnlArr.length; i++){
        if(hashmap.has(detailPnlArr[i].name)){
            let obj = hashmap.get(detailPnlArr[i].name);

            obj.pnl = obj.pnl + detailPnlArr[i].pnl ;
            obj.brokerage = obj.brokerage + detailPnlArr[i].brokerage ;
            obj.traderpnl = obj.traderpnl + detailPnlArr[i].traderpnl ;
            obj.traderbrokerage = obj.traderbrokerage + detailPnlArr[i].traderbrokerage ;
            obj.numberOfTrade = obj.numberOfTrade + detailPnlArr[i].numberOfTrade ;
            obj.lotUsed = obj.lotUsed + detailPnlArr[i].lotUsed ;
            obj.runninglots = obj.runninglots + detailPnlArr[i].runningLots

        } else{
            hashmap.set(detailPnlArr[i].name, {
                pnl: detailPnlArr[i].pnl,
                brokerage: detailPnlArr[i].brokerage,
                traderpnl: detailPnlArr[i].traderpnl,
                traderbrokerage: detailPnlArr[i].traderbrokerage,
                numberOfTrade: detailPnlArr[i].numberOfTrade,
                lotUsed: detailPnlArr[i].lotUsed,
                runninglots: detailPnlArr[i].runningLots,
                name: detailPnlArr[i].name
            })
        }
    }

    console.log(hashmap);

    let totalDateWisePnl = [];
    for (let value of hashmap.values()){
        totalDateWisePnl.push(value);
    }

    console.log(totalDateWisePnl);
    return (
        <div>
            <div className="main_Container">
                <div className="right_side">
                    <div className="rightside_maindiv">
                        <div className={Styles.main_dateSelData}>
                            <div className={Styles.form_div}>
                                <form action="">
                                    <label htmlFor="" className={Styles.formLable}>Start Date</label>
                                    <input type="date" value={firstDate} className={Styles.formInput} onChange={(e)=>{firstDateChange(e)}}/>
                                    <label htmlFor=""  className={Styles.formLable}>End Date</label>
                                    <input type="date" value={secondDate} className={Styles.formInput} onChange={(e)=>{secondDateChange(e)}}/>

                                </form>
                            </div>
                            <div className={Styles.btn_div}>
                                <div className={`${Styles.formLable}`}>Gross P&L</div>
                                <div style={allGross > 0.00 ? { color: "green" } : allGross === 0.00 ? { color: "grey" } : { color: "red" }} className={`${Styles.formInput1}`}>{allGross > 0.00 ? "+₹" + (allGross.toFixed(2)) : allGross === 0 ? "" : "-₹" + ((-(allGross)).toFixed(2))}</div>
                                <div className={Styles.formLable}>Transaction Cost </div>
                                <div className={`${Styles.formInput1}`}>{allBrokerage === 0 ? " " : "₹" + (allBrokerage.toFixed(2))}</div>
                                <div className={Styles.formLable}>Net P&L</div>
                                <div className={`${Styles.formInput1}`} style={allNet > 0.00 ? { color: "green" } : allBrokerage === 0.00 ? { color: "grey" } : { color: "red" }} >{allNet > 0.00 ? "+₹" + (allNet.toFixed(2)) : allNet === 0 ? " " : "-₹" + ((-(allNet)).toFixed(2))}</div>

                                <button className={Styles.formButton}> Download Report</button>
                            </div>
                        </div>
                        <div className={Styles.grid_1}>
                            <table className="grid1_table">
                                <tr className="grid2_tr">
                                    <th className="grid2_th">Trader Name</th>
                                    <th className="grid2_th">Gross(C-P&L)</th>
                                    <th className="grid2_th">Tran. Cost(C)</th>
                                    <th className="grid2_th">Net(C-P&L)</th>
                                    <th className="grid2_th">Gross(T-P&L)</th>
                                    <th className="grid2_th">Tran. Cost(T)</th>
                                    <th className="grid2_th">Net(T-P&L)</th>
                                    {/* <th className="grid2_th"># of Traders</th> */}
                                    <th className="grid2_th"># of Trades</th>
                                    <th className="grid2_th">Details</th>
                                    {/* <th className="grid2_th">{detailPnl[0].name}</th> */}
                                </tr>
                                {

                                totalDateWisePnl.map((elem, index)=>{
                                    // let data = (elem.date).split("-");
                                    return(
                                        <>
                                        {(elem.name ) &&
                                        <tr>
                                            <td className="grid2_td">{elem.name}</td>
                                            {!elem.pnl ?
                                            <td className="grid2_td" style={elem.pnl>=0.00 ? { color: "green"}:  { color: "red"}}>{elem.pnl >0.00 ? "+₹" + (elem.pnl): "-₹" + (-(elem.pnl)) }</td>
                                            :
                                            <td className="grid2_td" style={elem.pnl>=0.00 ? { color: "green"}:  { color: "red"}}>{elem.pnl >0.00 ? "+₹" + (elem.pnl.toFixed(2)): "-₹" + ((-(elem.pnl)).toFixed(2)) }</td>}
                                            {!elem.brokerage ?
                                            <td className="grid2_td" >{elem.brokerage >0.00 ? "₹" + (elem.brokerage) : "₹" + 0.00}</td>
                                            :
                                            <td className="grid2_td" >{elem.brokerage >0.00 ? "₹" + (elem.brokerage.toFixed(2)): "₹" + (-(elem.brokerage).toFixed(2)) }</td>}
                                            {(elem.pnl - elem.brokerage) !== undefined &&
                                            <td className="grid2_td" style={(elem.pnl - elem.brokerage)>=0.00 ? { color: "green"}:  { color: "red"}}> {elem.pnl - elem.brokerage > 0.00 ? "+₹" + (elem.pnl - elem.brokerage).toFixed(2): "-₹" + ((-(elem.pnl - elem.brokerage)).toFixed(2))}</td>}

                                            {!elem.traderpnl ?
                                            <td className="grid2_td" style={elem.traderpnl>=0.00 ? { color: "green"}:  { color: "red"}}>{elem.traderpnl >0.00 ? "+₹" + (elem.traderpnl): "-₹" + (-(elem.traderpnl)) }</td>
                                            :
                                            <td className="grid2_td" style={elem.traderpnl>=0.00 ? { color: "green"}:  { color: "red"}}>{elem.traderpnl >0.00 ? "+₹" + (elem.traderpnl.toFixed(2)): "-₹" + ((-(elem.traderpnl)).toFixed(2)) }</td>}
                                            {!elem.traderbrokerage ?
                                            <td className="grid2_td" >{elem.traderbrokerage >0.00 ? "₹" + (elem.traderbrokerage) : "₹" + 0.00}</td>
                                            :
                                            <td className="grid2_td" >{elem.traderbrokerage >0.00 ? "₹" + (elem.traderbrokerage.toFixed(2)): "₹" + (-(elem.traderbrokerage).toFixed(2)) }</td>}
                                            {(elem.traderpnl - elem.traderbrokerage) !== undefined &&
                                            <td className="grid2_td" style={(elem.traderpnl - elem.traderbrokerage)>=0.00 ? { color: "green"}:  { color: "red"}}> {elem.traderpnl - elem.traderbrokerage > 0.00 ? "+₹" + (elem.traderpnl - elem.traderbrokerage).toFixed(2): "-₹" + ((-(elem.traderpnl - elem.traderbrokerage)).toFixed(2))}</td>}

                                            <td className="grid2_td">{elem.numberOfTrader}</td>
                                            <td className="grid2_td">{elem.numberOfTrade}</td>
                                            <td className="grid2_td"><button>Details</button></td>

                                        </tr>}
                                        </>
                                    )
                                })
                            }
                            </table>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}