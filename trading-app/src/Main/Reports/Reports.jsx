import React, { useContext, useState } from "react";
import { useEffect } from "react";
import Styles from "./Reports.module.css";
import axios from "axios";
import { userContext } from "../AuthContext";
import { io } from "socket.io-client";


export default function Reports() {
    let baseUrl1 = process.env.NODE_ENV === "production" ? "/" : "http://localhost:9000/"
    let baseUrl = process.env.NODE_ENV === "production" ? "/" : "http://localhost:5000/"

    let socket;
    try{
        // socket = io.connect("http://localhost:9000/")
        socket = io.connect(`${baseUrl1}`)

    } catch(err){
        throw new Error(err);
    }

    const getDetails = useContext(userContext);
    const [detailPnlArr, setDetailPnl] = useState([]);
    const [userDetail, setUserDetail] = useState([]);
    const [tradeData, setTradeData] = useState([]);
    const [userTradeDetails, setUserTradeDetails] = useState([]);
    let [firstDate, setFirstDate] = useState("");
    const [selectUserState, setSelectUserState] = useState("All User");
    const [marketData, setMarketData] = useState([]);

    let totalArr = [];
    let [allBrokerage, setAllBrokerage] = useState(0);
    let [allNet, setAllNet] = useState(0);
    let [allGross, setAllGross] = useState(0);
    let secondDate = "";
    let userId = (getDetails.userDetails.role === "user") && getDetails.userDetails.email;

    let detailPnl = [];
    let totalPnl = 0;
    let transactionCost = 0;
    let numberOfTrade = 0;
    let lotUsed = 0;
    let name = "";
    let runninglots = 0;

    let detailArr = [];

    useEffect(()=>{
        console.log("rendering")
        console.log(socket);
        socket.on("connect", ()=>{
            console.log(socket.id);
            socket.emit("hi",true)
        })

        socket.on("tick", (data) => {
            console.log("this is live market data", data);
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
    }, [getDetails])

    function firstDateChange(e){
        e.preventDefault();
        setFirstDate((e.target.value));

    }
    let firstDateSplit;
    function secondDateChange(e){
        e.preventDefault();
        console.log(userDetail)
        firstDateSplit = (firstDate).split("-");
        firstDate = `${firstDateSplit[0]}-${firstDateSplit[1]}-${firstDateSplit[2]}`
        setFirstDate(firstDate);
        console.log(firstDate);
        let secondDateSplit = (e.target.value).split("-");
        secondDate = `${secondDateSplit[0]}-${secondDateSplit[1]}-${secondDateSplit[2]}`

        console.log(firstDate ,secondDate);
        console.log(firstDate < secondDate);

        if(getDetails.userDetails.role === "user"){
            axios.get(`${baseUrl}api/v1/readmocktradeuseremail/${userId}`)
            .then((res) => {
                let filteredData = (res.data).filter((elem)=>{
                    let timeStamp = elem.order_timestamp;
                    let oneDateSplit = (timeStamp).split(" ");
                    let twoDateSplit = oneDateSplit[0].split("-");
                    timeStamp = `${twoDateSplit[2]}-${twoDateSplit[1]}-${twoDateSplit[0]}`

                    return timeStamp >= firstDate && timeStamp <= secondDate;
                })
                console.log(filteredData);
                if(`${firstDateSplit[0]}-${firstDateSplit[1]}-${firstDateSplit[2]}` <= secondDate){
                    while(`${firstDateSplit[0]}-${firstDateSplit[1]}-${firstDateSplit[2]}` <= secondDate){
                    // let firstDateDigit = Number(firstDateSplit[2]);
                        // let secondDateDigit = Number(secondDateSplit[2]);
                        let singleDateData = filteredData.filter((elem)=>{
                            let splitting = (elem.order_timestamp).split(" ");
                            return splitting[0] === (`${firstDateSplit[2]}-${firstDateSplit[1]}-${firstDateSplit[0]}`)
                        })
                        
                        console.log(singleDateData, `${firstDateSplit[2]}-${firstDateSplit[1]}-${firstDateSplit[0]}`);
                        let newObj = pnlCalculation(singleDateData);
                        newObj.date = `${firstDateSplit[2]}-${firstDateSplit[1]}-${firstDateSplit[0]}`;
    
                        console.log(newObj);
                        if(newObj.numberOfTrade){
                            detailPnl.push(JSON.parse(JSON.stringify(newObj)));
                        }
                        
                        transactionCost = 0;
                        totalPnl = 0;
                        numberOfTrade = 0;
                        lotUsed = 0;
                    
                        console.log(detailPnl);
                        setDetailPnl(detailPnl)
                        
                        if((firstDateSplit[2]) <= 9){
                            (firstDateSplit[2]) = `0${Number(firstDateSplit[2]) + 1}`
                        }
                        else if((firstDateSplit[2]) == 31){
                            (firstDateSplit[2]) = 1;
                            (firstDateSplit[1]) = Number(firstDateSplit[1]) + 1;
                        }else{
                            (firstDateSplit[2]) = Number(firstDateSplit[2]) + 1;
                        }
                    }
                } 
              
            }).catch((err)=>{
                return new Error(err);
            })
        } else if(getDetails.userDetails.role === "admin"){
            console.log(selectUserState);
            if(selectUserState === "All User"){

                axios.get(`${baseUrl}api/v1/readmocktradeuser`)
                .then((res) => {
                    let filteredData = (res.data).filter((elem)=>{
                        let timeStamp = elem.order_timestamp;
                        let oneDateSplit = (timeStamp).split(" ");
                        let twoDateSplit = oneDateSplit[0].split("-");
                        timeStamp = `${twoDateSplit[2]}-${twoDateSplit[1]}-${twoDateSplit[0]}`

                        return timeStamp >= firstDate && timeStamp <= secondDate;
                    })
                    console.log(filteredData);
                    if(`${firstDateSplit[0]}-${firstDateSplit[1]}-${firstDateSplit[2]}` <= secondDate){
                        while(`${firstDateSplit[0]}-${firstDateSplit[1]}-${firstDateSplit[2]}` <= secondDate){
                            console.log(`${firstDateSplit[0]}-${firstDateSplit[1]}-${firstDateSplit[2]}` , secondDate)
                            // let firstDateDigit = Number(firstDateSplit[2]);
                            // let secondDateDigit = Number(secondDateSplit[2]);
                            let singleDateData = filteredData.filter((elem)=>{
                                let splitting = (elem.order_timestamp).split(" ");
                                return splitting[0] === (`${firstDateSplit[2]}-${firstDateSplit[1]}-${firstDateSplit[0]}`)
                            })
                            
                            console.log(singleDateData, `${firstDateSplit[2]}-${firstDateSplit[1]}-${firstDateSplit[0]}`);
                            let newObj = pnlCalculationUser(singleDateData);
                            // newObj.date = `${firstDateSplit[2]}-${firstDateSplit[1]}-${firstDateSplit[0]}`;
        
                            console.log(newObj);
                            detailPnl.push(JSON.parse(JSON.stringify(newObj)));
                            // if(newObj.numberOfTrade){
                                
                            // }
                            
                            transactionCost = 0;
                            totalPnl = 0;
                            numberOfTrade = 0;
                            lotUsed = 0;
                        
                            console.log(detailPnl);
                            setDetailPnl(detailPnl)
                            if((firstDateSplit[2]) <= 9){
                                (firstDateSplit[2]) = `0${Number(firstDateSplit[2]) + 1}`
                            }
                            else if((firstDateSplit[2]) == 31){
                                (firstDateSplit[2]) = 1;
                                (firstDateSplit[1]) = Number(firstDateSplit[1]) + 1;
                            }else{
                                (firstDateSplit[2]) = Number(firstDateSplit[2]) + 1;
                            }
                            
                        }
                    } 
            
                }).catch((err)=>{
                    return new Error(err);
                })
    
            } else{
                let data = userDetail.filter((elem)=>{
                    return elem.name === selectUserState
                })

                axios.get(`${baseUrl}api/v1/readmocktradeuseremail/${data[0].email}`)
                .then((res) => {
                    let filteredData = (res.data).filter((elem)=>{
                        let timeStamp = elem.order_timestamp;
                        let oneDateSplit = (timeStamp).split(" ");
                        let twoDateSplit = oneDateSplit[0].split("-");
                        timeStamp = `${twoDateSplit[2]}-${twoDateSplit[1]}-${twoDateSplit[0]}`

                        return timeStamp >= firstDate && timeStamp <= secondDate;
                    })
                    console.log(filteredData);
                    if(`${firstDateSplit[0]}-${firstDateSplit[1]}-${firstDateSplit[2]}` <= secondDate){
                        while(`${firstDateSplit[0]}-${firstDateSplit[1]}-${firstDateSplit[2]}` <= secondDate){
                            // let firstDateDigit = Number(firstDateSplit[2]);
                            // let secondDateDigit = Number(secondDateSplit[2]);
                            let singleDateData = filteredData.filter((elem)=>{
                                let splitting = (elem.order_timestamp).split(" ");
                                return splitting[0] === (`${firstDateSplit[2]}-${firstDateSplit[1]}-${firstDateSplit[0]}`)
                            })
                            
                            console.log(singleDateData, `${firstDateSplit[2]}-${firstDateSplit[1]}-${firstDateSplit[0]}`);
                            let newObj = pnlCalculation(singleDateData);
                            newObj.date = `${firstDateSplit[2]}-${firstDateSplit[1]}-${firstDateSplit[0]}`;
        
                            console.log(newObj);
                            if(newObj.numberOfTrade){
                                detailPnl.push(JSON.parse(JSON.stringify(newObj)));
                            }
                            
                            transactionCost = 0;
                            totalPnl = 0;
                            numberOfTrade = 0;
                            lotUsed = 0;
                        
                            console.log(detailPnl);
                            setDetailPnl(detailPnl)
                            
                            if((firstDateSplit[2]) <= 9){
                                (firstDateSplit[2]) = `0${Number(firstDateSplit[2]) + 1}`
                            }
                            else if((firstDateSplit[2]) == 31){
                                (firstDateSplit[2]) = 1;
                                (firstDateSplit[1]) = Number(firstDateSplit[1]) + 1;
                            }else{
                                (firstDateSplit[2]) = Number(firstDateSplit[2]) + 1;
                            }
                        }
                    } 
                    
                }).catch((err)=>{
                    return new Error(err);
                })
                
            }
        }

        console.log(detailPnl);
    }


    function pnlCalculation(data){
        let hash = new Map();

        for(let i = data.length-1; i >= 0 ; i--){
            numberOfTrade += 1;
            transactionCost += Number(data[i].brokerage);
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
                        name: data[0].createdBy
                    })
                }if(data[i].buyOrSell === "SELL"){
                    hash.set(data[i].symbol, {
                        totalSell : Number(data[i].average_price) * (Number(data[i].Quantity)),
                        totalSellLot : (Number(data[i].Quantity)) ,
                        totalBuy : 0,
                        totalBuyLot: 0,
                        symbol: data[i].symbol,
                        Product: data[i].Product,
                        name: data[0].createdBy
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

        console.log(liveDetailsArr)
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
            
            console.log( liveDetailsArr[index]?.last_price)
            console.log(elem.totalBuy,elem.totalSell,elem.totalBuyLot,elem.totalSellLot, liveDetailsArr[index]?.last_price)
            lotUsed += Math.abs(elem.totalBuyLot) + Math.abs(elem.totalSellLot);
        })

        let newObj = {
            brokerage: transactionCost,
            pnl: totalPnl,
            name: name,
            numberOfTrade: numberOfTrade,
            lotUsed: lotUsed
        }

        return newObj;
    }

    function selectUser(e){
        e.preventDefault();
        setSelectUserState(e.target.value);
        // let user = userDetail.filter((elem)=>{
        //     return elem.name === selectUserState;
        // })
        
        // // let userId = user[0].email;
        console.log(e.target.value, selectUserState, userDetail)
        // secondDateChange(e)
        detailPnl = [];
        firstDateSplit = (firstDate).split("-");


        let data = userDetail.filter((elem)=>{
            return elem.name === (e.target.value)
        })

        console.log(data);

        axios.get(`${baseUrl}api/v1/readmocktradeuseremail/${data[0].email}`)
        .then((res) => {
            let filteredData = (res.data).filter((elem)=>{
                let timeStamp = elem.order_timestamp;
                let oneDateSplit = (timeStamp).split(" ");
                let twoDateSplit = oneDateSplit[0].split("-");
                timeStamp = `${twoDateSplit[2]}-${twoDateSplit[1]}-${twoDateSplit[0]}`

                return timeStamp >= firstDate && timeStamp <= secondDate;
            })
            console.log(filteredData);
            console.log(`${firstDateSplit[0]}-${firstDateSplit[1]}-${firstDateSplit[2]}` , secondDate)
            if(`${firstDateSplit[0]}-${firstDateSplit[1]}-${firstDateSplit[2]}` <= secondDate){
                while(`${firstDateSplit[0]}-${firstDateSplit[1]}-${firstDateSplit[2]}` <= secondDate){
                    // let firstDateDigit = Number(firstDateSplit[2]);
                    // let secondDateDigit = Number(secondDateSplit[2]);
                    let singleDateData = filteredData.filter((elem)=>{
                        let splitting = (elem.order_timestamp).split(" ");
                        return splitting[0] === (`${firstDateSplit[2]}-${firstDateSplit[1]}-${firstDateSplit[0]}`)
                    })
                    
                    console.log(singleDateData, `${firstDateSplit[2]}-${firstDateSplit[1]}-${firstDateSplit[0]}`);
                    let newObj = pnlCalculation(singleDateData);
                    newObj.date = `${firstDateSplit[2]}-${firstDateSplit[1]}-${firstDateSplit[0]}`;

                    console.log(newObj);
                    if(newObj.numberOfTrade){
                        detailPnl.push(JSON.parse(JSON.stringify(newObj)));
                    }
                    
                    transactionCost = 0;
                    totalPnl = 0;
                    numberOfTrade = 0;
                    lotUsed = 0;
                
                    console.log(detailPnl);
                    setDetailPnl(detailPnl)
                    if((firstDateSplit[2]) <= 9){
                        (firstDateSplit[2]) = `0${Number(firstDateSplit[2]) + 1}`
                    }
                    else if((firstDateSplit[2]) == 31){
                        (firstDateSplit[2]) = 1;
                        (firstDateSplit[1]) = Number(firstDateSplit[1]) + 1;
                    }else{
                        (firstDateSplit[2]) = Number(firstDateSplit[2]) + 1;
                    }
                }
            } 
        })



    }

    function pnlCalculationUser(allTrade){
        userDetail.map((elem)=>{

            let data = allTrade.filter((element)=>{
                return elem.email === element.userId;
            })
    
    
            let hash = new Map();
    
            for(let i = data.length-1; i >= 0 ; i--){
                numberOfTrade += 1;
                transactionCost += Number(data[i].brokerage);
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
                            date: data[0].order_timestamp
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
                            date: data[0].order_timestamp
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
    
            let name = "";
            let date = "";
            overallPnl.map((elem, index)=>{
                date = elem.date;
                name = elem.name;
                if(elem.totalBuyLot+elem.totalSellLot === 0){
                    totalPnl += -(elem.totalBuy+elem.totalSell)
                }else{
                    totalPnl += (-(elem.totalBuy+elem.totalSell-(elem.totalBuyLot+elem.totalSellLot)*liveDetailsArr[index]?.last_price))

                }
                console.log(elem.totalBuy,elem.totalSell,elem.totalBuyLot,elem.totalSellLot, liveDetailsArr[index]?.last_price)
                // totalPnl += (-(elem.totalBuy+elem.totalSell-(elem.totalBuyLot+elem.totalSellLot)*liveDetailsArr[index]?.last_price))
                lotUsed += Math.abs(elem.totalBuyLot) + Math.abs(elem.totalSellLot);
                runninglots += elem.totalBuyLot + elem.totalSellLot;
                console.log(runninglots);
            })

            
    
            let newObj = {
                brokerage: transactionCost,
                pnl: totalPnl,
                name: name,
                numberOfTrade: numberOfTrade,
                lotUsed: lotUsed,
                runninglots: runninglots,
                date: (date.split(" "))[0]
            }

            console.log("overallPnl", overallPnl, newObj)
            console.log(transactionCost, totalPnl, name, runninglots);
            detailPnl.push(JSON.parse(JSON.stringify(newObj)));
            transactionCost = 0;
            totalPnl = 0;
            numberOfTrade = 0;
            lotUsed = 0;
            runninglots = 0;
            // runninglots = 0;
        })

        // detailPnl.sort((a, b)=> {
        //     return b.pnl-a.pnl
        //   });
    
        return detailPnl;
    }

    
    detailPnlArr.map((elem)=>{
        if(elem.brokerage){
            allBrokerage = allBrokerage + Number(elem.brokerage);
        }

        if(elem.pnl){
            allGross = allGross + Number(elem.pnl);
        }

        allNet =  (allGross - allBrokerage);
        console.log(detailPnlArr, allBrokerage, allGross, allNet)

        let obj = {
            allBrokerage: allBrokerage,
            allGross: allGross,
            allNet: allNet
        }
        console.log(obj)
        totalArr.push(obj);
    })

    console.log(detailPnlArr, totalArr)

    return (
        <div>
            <div className="main_Container">
                <div className="right_side">
                    <div className="rightside_maindiv">
                        <div className={Styles.main_dateSelData}>
                            <div className={Styles.form_div}>
                                <form action="">
                                    <label htmlFor="" className={Styles.formLable}>Start Date</label>
                                    <input type="date" className={Styles.formInput} onChange={(e)=>{firstDateChange(e)}}/>
                                    <label htmlFor="" className={Styles.formLable}>End Date</label>
                                    <input type="date" className={Styles.formInput} onChange={(e)=>{secondDateChange(e)}}/>
                                    <label htmlFor="" className={Styles.formLable}>Trader</label>
                                    { getDetails.userDetails.role === "user" ?
                                        <select name="" id="" className={Styles.formSelect} onChange={(e)=>{selectUser(e)}} >
                                            <option value="">{getDetails.userDetails.name}</option>
                                        </select>
                                    :
                                    getDetails.userDetails.role === "admin" &&
                                    <select name="" id="" className={Styles.formSelect} onChange={(e)=>{selectUser(e)}} >
                                        <option value="">Select User</option>
                                        {userDetail.map((elem)=>{
                                            return(
                                                <option value={elem.name}>{elem.name}</option>
                                            )
                                        })}
                                        <option value="">All User</option>
                                    </select> }
                                </form>
                            </div>
                            <div className={Styles.btn_div}>
                                <span className={`${Styles.formLable}`}>Gross P&L</span> <span>{allGross}</span> <input type="text" className={`${Styles.formInput} ${Styles.formInput1}`} />
                                <span className={Styles.formLable}>Transaction Cost</span> <span>{allBrokerage}</span> <input type="text" className={Styles.formInput} />
                                <span className={Styles.formLable}>Net P&L</span> <span>{allNet}</span> <input type="text" className={Styles.formInput} />
                                <button className={Styles.formButton}> Download Report</button>

                            </div>
                        </div>
                        <div className={Styles.grid_1}>
                            <table className="grid1_table">
                                <tr className="grid2_tr">
                                    <th className="grid2_th">Trader Name</th>
                                    <th className="grid2_th">Date</th>
                                    <th className="grid2_th">Gross P&L(₹)</th>
                                    <th className="grid2_th">Transaction Cost(₹)</th>
                                    <th className="grid2_th">Net PNL(₹)</th>
                                    <th className="grid2_th"># of Trades</th>
                                    <th className="grid2_th"># of Lots Used</th>
                                    {/* <th className="grid2_th">{detailPnl[0].name}</th> */}
                                </tr>
                                {detailPnlArr.map((elem)=>{
                                    allBrokerage = allBrokerage + Number(elem.brokerage);
                                    allGross = allGross + elem.pnl;
                                    allNet = allNet + (allGross - allBrokerage);
                                    // setTotalBrokerage(allBrokerage); setTotalGross(allGross); setTotalNetPnl(allNet);
                                    return(
                                        <>
                                        {elem.name &&
                                        <tr>
                                            <td className="grid2_td">{elem.name}</td>
                                            <td className="grid2_td">{elem.date}</td>
                                            <td className="grid2_td">{elem.pnl}</td>
                                            <td className="grid2_td">{elem.brokerage}</td>
                                            <td className="grid2_td">{elem.pnl - elem.brokerage}</td>
                                            <td className="grid2_td">{elem.numberOfTrade}</td>
                                            <td className="grid2_td">{elem.lotUsed}</td>
                                        </tr>}
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