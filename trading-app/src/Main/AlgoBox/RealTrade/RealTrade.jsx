import axios from 'axios';
import React, { useContext, useState } from 'react'
import { useEffect } from 'react';
import { useRef } from 'react'
import { userContext } from '../../AuthContext';

export default function RealTrade({Render, id, buttonTextBool, tradingAlgo}) {
    let baseUrl = process.env.NODE_ENV === "production" ? "/" : "http://localhost:5000/"
    const getDetails = useContext(userContext);
    const { reRender, setReRender } = Render;
    let realTrade = useRef(buttonTextBool);
    let buttonText = buttonTextBool ? "ON" : "OFF"
    const [mappedUser, setMappedUser] = useState([]);
    const [singleUserPnl, setSingleUserPnl] = useState([]);

    let date = new Date();
    let todayDate = `${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()}`
    let fake_date = "10-12-2022"

    const allUserRunningPnl = [];
    useEffect(()=>{
        axios.get(`${baseUrl}api/v1/readpermission`)
        .then((res)=>{
            let permissionData = res.data

            let perticularAlgo = tradingAlgo.filter((elem)=>{
                return elem._id === id && elem.status === "Active";
            })
    
            let mappedUser = permissionData.filter((elem)=>{
                return perticularAlgo[0].algoName === elem.algoName;
            })

            setMappedUser(mappedUser);


    
        }).catch((err)=>{
            window.alert("Server Down");
            return new Error(err);
        })



    }, [])


    mappedUser.map((elem)=>{
        // console.log(oneUserRunningPnl(elem));
        // allUserRunningPnl.push(oneUserRunningPnl(elem))
        axios.get(`${baseUrl}api/v1/readmocktradeuser`)
        .then((res) => {
            let singleUserPnl = (res.data).filter((element)=>{
                return element.order_timestamp.includes(fake_date) && element.status === "COMPLETE" && element.userId === elem.userId;
            })
            // setSingleUserPnl(data);

            let hash = new Map();
            for(let i = singleUserPnl.length-1; i >= 0 ; i--){
                if(hash.has(singleUserPnl[i].symbol)){
                    let obj = hash.get(singleUserPnl[i].symbol);
                    if(Number(singleUserPnl[i].Quantity) + Number(obj.Quantity) === 0){
                        obj.average_price = 0;
                    }else{
                        obj.average_price = ((Number(obj.average_price) * Number(obj.Quantity)) 
                                        + (Number(singleUserPnl[i].average_price) * Number(singleUserPnl[i].Quantity)))/(Number(singleUserPnl[i].Quantity) 
                                        + Number(obj.Quantity));
                    }
                    obj.Quantity = Number(obj.Quantity) + Number(singleUserPnl[i].Quantity)
                    if(Number(obj.Quantity) > 0){
                        obj.buyOrSell = "BUY";
                    } else if((obj.Quantity) > 0){
                        obj.buyOrSell = "SELL"
                    } 
    
                } else{
                    hash.set(singleUserPnl[i].symbol, {
                        buyOrSell : singleUserPnl[i].buyOrSell,
                        Quantity : Number(singleUserPnl[i].Quantity),
                        average_price: Number(singleUserPnl[i].average_price),
                        Product: singleUserPnl[i].Product,
                        symbol: singleUserPnl[i].symbol,
                        userId: elem.userId,
                        userName: elem.userName
                    })
                }
            }
    
            
            console.log(hash);
            let runningPnl = [];
            for (let value of hash.values()){
                runningPnl.push(value);
            }
    
            console.log(runningPnl);
            allUserRunningPnl.push(runningPnl)
            console.log(allUserRunningPnl);

        }).catch((err)=>{
            return new Error(err);
        })
    })

    function takingTrade(){
        let perticularAlgo = tradingAlgo.filter((elem)=>{
            return elem._id === id && elem.status === "Active";
        })
        console.log(perticularAlgo);


        // {
        //     if (elem.transactionChange) {
        //         companyTrade.realBuyOrSell = "SELL"
        //     } else {
        //         companyTrade.realBuyOrSell = "BUY"
        //     }

        //     let arr;
        //     if (elem.instrumentChange) {
        //         arr = tradeData.filter((elem) => {
        //             return elem.uId !== uIdProps && elem.status === "Active";
        //         })
        //         companyTrade.realSymbol = arr[0].symbol
        //         companyTrade.realInstrument = arr[0].instrument
        //     } else {
        //         companyTrade.realSymbol = Details.symbol
        //         companyTrade.realInstrument = Details.instrument
        //     }
        //     const getLastPrice = marketData.filter((elem)=>{
        //         return elem.instrument_token === arr[0].instrumentToken;
        //     })

        //     companyTrade.realQuantity = elem.lotMultipler * (Details.Quantity);
        //     accessTokenDetails = accessTokenDetails.filter((element) => {
        //         return elem.tradingAccount === element.accountId
        //     })
        //     setAccessToken(accessTokenDetails);
        //     apiKeyDetails = apiKeyDetails.filter((element) => {
        //         return elem.tradingAccount === element.accountId
        //     })
        //     setApiKey(apiKeyDetails);
        //     // companyTrade.real_last_price = getLastPrice[0].last_price;
        //     companyTrade.real_last_price = 100
        //     companyTrade.realAmount = 800
        //     //companyTrade.realAmount = getLastPrice[0].last_price * companyTrade.realQuantity;
        //     companyTrade.realBrokerage = buyBrokerageCharge(brokerageData, companyTrade.realQuantity, companyTrade.realAmount);
            
        //     setCompanyTrade(companyTrade)

        //     sendOrderReq();
        //     userPermission.map((subElem)=>{
        //         if(subElem.algoName === elem.algoName){
        //             if(subElem.isRealTradeEnable || subElem.isRealTradeEnable){
                        
        //                 // mockTradeUser("yes");
        //             } else{
        //                 // mockTradeUser("no");
        //                 mockTradeCompany(elem);
        //             }
        //         }
        //     })
        // }

        
    }

    function userRunningPnl(){
        console.log(allUserRunningPnl);


    }

    // function oneUserRunningPnl(singleMappedUser){
    //     // data --> single mapped user
    //     axios.get(`${baseUrl}api/v1/readmocktradeuser`)
    //     .then((res) => {
    //         let data = (res.data).filter((elem)=>{
    //             return elem.order_timestamp.includes(fake_date) && elem.status === "COMPLETE" && elem.userId === singleMappedUser.userId;
    //         })
    //         setSingleUserPnl(data);
    //     }).catch((err)=>{
    //         return new Error(err);
    //     })

    //     let hash = new Map();
    //     for(let i = singleUserPnl.length-1; i >= 0 ; i--){
    //         if(hash.has(singleUserPnl[i].symbol)){
    //             let obj = hash.get(singleUserPnl[i].symbol);
    //             if(Number(singleUserPnl[i].Quantity) + Number(obj.Quantity) === 0){
    //                 obj.average_price = 0;
    //             }else{
    //                 obj.average_price = ((Number(obj.average_price) * Number(obj.Quantity)) 
    //                                 + (Number(singleUserPnl[i].average_price) * Number(singleUserPnl[i].Quantity)))/(Number(singleUserPnl[i].Quantity) 
    //                                 + Number(obj.Quantity));
    //             }
    //             obj.Quantity = Number(obj.Quantity) + Number(singleUserPnl[i].Quantity)
    //             if(Number(obj.Quantity) > 0){
    //                 obj.buyOrSell = "BUY";
    //             } else if((obj.Quantity) > 0){
    //                 obj.buyOrSell = "SELL"
    //             } 

    //         } else{
    //             hash.set(singleUserPnl[i].symbol, {
    //                 buyOrSell : singleUserPnl[i].buyOrSell,
    //                 Quantity : Number(singleUserPnl[i].Quantity),
    //                 average_price: Number(singleUserPnl[i].average_price),
    //                 Product: singleUserPnl[i].Product,
    //                 symbol: singleUserPnl[i].symbol,
    //                 userId: singleMappedUser.userId,
    //                 userName: singleMappedUser.userName
    //             })
    //         }
    //     }

    //     console.log(hash);
    //     let runningPnl = [];
    //     for (let value of hash.values()){
    //         runningPnl.push(value);
    //     }

    //     return runningPnl;
    // }

    function functionality(){

        if(realTrade.current){
            realTrade.current = false;
        } else{
            realTrade.current = true;
        }
        
        console.log(realTrade);
        patchReq(id, realTrade.current);

        reRender ? setReRender(false) : setReRender(true)
    }

    async function patchReq(id, realTrade){
        const res = await fetch(`${baseUrl}api/v1/readtradingAlgo/${id}`, {
            method: "PATCH",
            headers: {
                "Accept": "application/json",
                "content-type": "application/json"
            },
            body: JSON.stringify({
                realTrade
            })
        });
        const dataResp = await res.json();
        // console.log(dataResp);
        if (dataResp.status === 422 || dataResp.error || !dataResp) {
            window.alert(dataResp.error);
            console.log("Failed to Edit");
        } else {
            console.log(dataResp);
            window.alert("Switched succesfull");
            console.log("Edit succesfull");
        }
        reRender ? setReRender(false) : setReRender(true)
    }
  return (
    <>
        <button onClick={()=>{userRunningPnl()}} >{buttonText}</button>
    </>
  )
}




