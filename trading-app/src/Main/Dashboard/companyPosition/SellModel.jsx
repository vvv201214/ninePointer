import React, { useState } from "react";
import "./ByModel.css";
import { useEffect } from 'react';
import axios from "axios"
import uniqid from "uniqid"

export default function SellModel({marketData, uIdProps, isTradersTrade}) {
    let uId = uniqid();
    let date = new Date();
    let createdOn = `${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
    let createdBy = "prateek"
    let totalAmount = 0;

    const [bsBtn, setBsBtn] = useState(true)
    const [modal, setModal] = useState(false);
    const[Details, setDetails] = useState({
        exchange:"",
        symbol:"",
        ceOrPe:"",
        buyOrSell:"",
        variety:"",
        Product:"",
        Quantity: "",
        Price: "",
        OrderType:"",
        TriggerPrice: "",
        stopLoss:"",
        validity:"DAY"
    })
    const [accessTokenDetails, setAccessToken] = useState([]);
    const [apiKeyDetails, setApiKey] = useState([]);
    const [tradeData, setTradeData] = useState([]);
    const [brokerageData, setBrokerageData] = useState([]);
    const [algoData, setAlgoData] = useState([]);
    const [companyTrade, setCompanyTrade] = useState({
        realBuyOrSell : "",
        realSymbol: "",
        realQuantity: "",
        realInstrument: ""
    })

    useEffect(()=>{
        axios.get("http://localhost:5000/readRequestToken")
        .then((res)=>{
            setAccessToken(res.data);
        })
        axios.get("http://localhost:5000/readAccountDetails")
        .then((res)=>{
            setApiKey(res.data);
        })
        
        axios.get("http://localhost:5000/readtradingAlgo")
        .then((res)=>{
                    
        let activeAlgo = (res.data).filter((elem)=>{
            return elem.status === "Active"
        })
            setAlgoData(activeAlgo)
            console.log(activeAlgo);
        })
        axios.get("http://localhost:5000/readBrokerage")
        .then((res)=>{
            setBrokerageData(res.data)
        })
        
        axios.get("http://localhost:5000/readInstrumentDetails")
        .then((res)=>{
            let dataArr = (res.data).filter((elem)=>{
                return (elem.createdOn).includes(`${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()}`) && elem.status === "Active" 
            })
            setTradeData(dataArr)
        })
        console.log("hii");

        console.log(tradeData);
        setTradeData([...tradeData])
    },[])


    const toggleModal = () => {
        setModal(!modal);
    };

    if (modal) {
        document.body.classList.add('active-modal')
    } else {
        document.body.classList.remove('active-modal')
    }

    function FormHandler(e){
        e.preventDefault()
    }

    function helperOfSell(uId){
        if(algoData.length){
            algoData.map((elem)=>{
                console.log("in algo");
                if(elem.transactionChange){
                    companyTrade.realBuyOrSell = "BUY"
                }else{
                    companyTrade.realBuyOrSell = "SELL"
                }
                console.log("exchange", tradeData);

                if(elem.instrumentChange){
                    console.log("in the if2");
                    let arr = tradeData.filter((elem)=>{
                        return elem.uId !== uIdProps && elem.status === "Active";
                    })
                    companyTrade.realSymbol = arr[0].symbol
                    companyTrade.realInstrument = arr[0].instrument
                }else{
                    companyTrade.realSymbol = Details.symbol
                    companyTrade.realInstrument = Details.instrument
                }
                
                companyTrade.realQuantity = elem.lotMultipler * (Details.Quantity);
                let accesssTokenData = accessTokenDetails.filter((element)=>{
                    return elem.tradingAccount === element.accountId
                })
                setAccessToken(accesssTokenData);
                let apiKeyData = apiKeyDetails.filter((element)=>{
                    return elem.tradingAccount === element.accountId
                })
                setApiKey(apiKeyData);
            })
        }else{
            companyTrade.realBuyOrSell = "SELL";
            companyTrade.realSymbol = Details.symbol
            companyTrade.realInstrument = Details.instrument
            companyTrade.realQuantity = Details.Quantity;
        }        
    }

    async function Sell(e, uId){
        e.preventDefault()

        Details.buyOrSell = "SELL";
        if(bsBtn === true){
            Details.variety = "regular"
        }
        else{
            Details.variety = "amo"
        }

        console.log(tradeData)
        let getSomeData = tradeData.filter((elem)=>{
            return elem.uId === uIdProps;
        })
        console.log(getSomeData)
        Details.exchange = getSomeData[0].exchange;
        Details.symbol = getSomeData[0].symbol

        let getLivePrice = marketData.filter((elem)=>{
            console.log("getSomeData.instrumentToken", getSomeData[0].instrumentToken, "elem.instrument_token", elem.instrument_token);
            return getSomeData[0].instrumentToken === elem.instrument_token;
        })
        console.log(getLivePrice[0], getLivePrice)
        Details.last_price = getLivePrice[0].last_price
        // Details.last_price = 100;

        Details.brokerageCharge = sellBrokerageCharge(brokerageData);
        Details.totalAmount = totalAmount;
        
        // Algo box applied here....
        console.log("algodata", algoData);

        if(isTradersTrade){
            helperOfSell(uId);
        }else{
            companyTrade.realBuyOrSell = "SELL";
            companyTrade.realSymbol = Details.symbol
            companyTrade.realInstrument = Details.instrument
            companyTrade.realQuantity = Details.Quantity;            
        }

        setCompanyTrade(companyTrade)
        setDetails(Details)
        console.log(Details);
        console.log(companyTrade);

        sendOrderReq();
        setModal(!modal);        
    }

    async function sendOrderReq(){
        const {exchange, symbol, buyOrSell, Quantity, Price, Product, OrderType, TriggerPrice, stopLoss, validity, variety, last_price} = Details;
        const {realBuyOrSell, realSymbol, realQuantity, realInstrument} = companyTrade;
        const {instrument} = tradeData;
        const {apiKey} = apiKeyDetails[0];
        const {accessToken} = accessTokenDetails[0];

        const res = await fetch("http://localhost:5000/placeorder", {
            method: "POST",
            headers: {
                "content-type" : "application/json"
            },
            body: JSON.stringify({
                exchange, symbol, buyOrSell, Quantity, Price, Product, OrderType, 
                TriggerPrice, stopLoss, variety, validity, uId, createdBy, createdOn,
                last_price, realBuyOrSell, realSymbol, realQuantity, instrument,
                realInstrument, apiKey, accessToken
            })
        });
        // console.log
        const dataResp = await res.json();
        console.log(dataResp);
        if(dataResp.status === 422 || dataResp.error || !dataResp){
            window.alert(dataResp.error);
            console.log("Failed to Trade");
        }else{
            console.log(dataResp); 
            window.alert("Trade succesfull");
            console.log("entry succesfull");
        } 
    }

    function sellBrokerageCharge(brokerageData){
        let buyBrokerage = brokerageData.filter((elem)=>{
            return elem.transaction === "SELL"
        })
        console.log(buyBrokerage);
        let brokerage = buyBrokerage.brokerageCharge;
        let totalAmount = Number(Details.last_price) * Number(Details.Quantity);
        let exchangeCharge = totalAmount * (Number(buyBrokerage.exchangeCharge)/100);
        let gst = (brokerage + exchangeCharge)*(Number(buyBrokerage.gst)/100);
        let sebiCharges = totalAmount * (Number(buyBrokerage.sebiCharge)/100);
        let stampDuty = totalAmount * (Number(buyBrokerage.stampDuty)/100);
        let sst = totalAmount * (Number(buyBrokerage.sst)/100);
        let finalCharge = brokerage + exchangeCharge + gst + sebiCharges + stampDuty + sst;

        return finalCharge
    }

    return (
        <>
            <button  onClick={toggleModal} className="btn-modal Sell_btn">
                SELL
            </button>

            {modal && (
               <div className="modal">
               <div onClick={toggleModal} className="overlay"></div>
               <div className="modal-content">
                   <div className="form_btnRagAMO">
                   <button className={bsBtn ? "amobtn" : `bsBtn`} onClick={() => { setBsBtn(true) }}>Regular</button> <button className={bsBtn ? "bsBtn" : "amobtn"} onClick={() => { setBsBtn(false) }}>AMO</button>
                   </div>
                   {bsBtn ?  <form className="Form_head" onChange={FormHandler} >
                       <div className="container_One">
                           <input type="radio" value="MIS" name="Product" className="btnRadio" onChange={(e) => { { Details.Product = e.target.value } }} /> Intraday <span style={{ color: 'gray' }}>MIS</span>

                           <input type="radio" value="NRML" name="Product"  className="btnRadio" onChange={(e) => { { Details.Product = e.target.value } }} /> Overnight <span style={{ color: 'gray' }}>NRML</span>
                       </div>
                       <div className="container_two">
                           <div className="form_inputContain">
                           <label htmlFor="" className="bsLabel">Quantity</label>
                           <input type="text" className="bsInput" onChange={(e) => { { Details.Quantity = e.target.value } }} />
                                                  
                           <label htmlFor="" className="bsLabel" >Price</label>
                           <input type="text" className="bsInput" onChange={(e) => { { Details.Price = e.target.value } }}/>
                        
                           <label htmlFor="" className="bsLabel">Trigger Price</label>
                           <input type="text" className="bsInput" onChange={(e) => { { Details.TriggerPrice = e.target.value } }}/>
                           </div>
                           <div className="form_checkbox">
                           <input type="radio" value="MARKET" name="OrderType" className="btnRadio1"  onChange={(e) => { { Details.OrderType = e.target.value } }}/> Market 
                           <input type="radio" value="LIMIT" name="OrderType" className="btnRadio1" onChange={(e) => { { Details.OrderType = e.target.value } }} /> Limit
                           <input type="radio" value="SL" name="TriggerPrice" className="btnRadio1" onChange={(e) => { { Details.stopLoss = e.target.value } }}/> SL 
                           <input type="radio" value="SLM" name="TriggerPrice" className="btnRadio1" onChange={(e) => { { Details.stopLoss = e.target.value } }}/> SL-M
                           </div>
                       </div>
                      
                       <div className="container_three">
                           <label htmlFor="" className="bsLabel" >Validity</label>
                           <span>
                           <input type="radio" value="DAY" name="validity"  className="btnRadio2" onChange={(e) => { { Details.validity = e.target.value } }}/> Day</span>

                           <span><input type="radio" value="IMMEDIATE" name="validity" className="btnRadio2" onChange={(e) => { { Details.validity = e.target.value } }}/> Immediate  </span>
                          
                           <span><input type="radio" value="MINUTES" name="validity" className="btnRadio2" onChange={(e) => { { Details.validity = e.target.value } }}/> Minutes </span>
                       </div>


                       <div className="form_button">
                       <button className="bsButton bsButton1" onClick={(e)=>{Sell(e, uId)}} >Sell</button> <button className="bsButton1_cancel" onClick={toggleModal}> Cancel</button>
                       </div>
                   </form> :
                        <form className="Form_head" onChange={FormHandler} >
                        <div className="container_One">
                            <input type="radio" value="MIS" name="Product" className="btnRadio" onChange={(e) => { { Details.Product = e.target.value } }} /> Intraday <span style={{ color: 'gray' }}>MIS</span>

                            <input type="radio" value="NRML" name="Product" className="btnRadio" onChange={(e) => { { Details.Product = e.target.value } }} /> Overnight <span style={{ color: 'gray' }}>NRML</span>
                        </div>
                        <div className="container_two">
                            <div className="form_inputContain">
                            <label htmlFor="" className="bsLabel">Quantity</label>
                            <input type="text" className="bsInput" onChange={(e) => { { Details.Quantity = e.target.value } }} />
                                                   
                            <label htmlFor="" className="bsLabel" >Price</label>
                            <input type="text" className="bsInput" onChange={(e) => { { Details.Price = e.target.value } }}/>
                         
                            <label htmlFor="" className="bsLabel">Trigger Price</label>
                            <input type="text" className="bsInput" onChange={(e) => { { Details.TriggerPrice = e.target.value } }}/>

                            </div>
                            <div className="form_checkbox">
                            <input type="radio" value="MARKET" name="OrderType" className="btnRadio1"  onChange={(e) => { { Details.OrderType = e.target.value } }}/> Market 
                            <input type="radio" value="LIMIT" name="OrderType" className="btnRadio1" onChange={(e) => { { Details.OrderType = e.target.value } }} /> Limit
                            <input type="radio" value="SL" name="TriggerPrice" className="btnRadio1" onChange={(e) => { { Details.stopLoss = e.target.value } }}/> SL 
                            <input type="radio" value="SLM" name="TriggerPrice" className="btnRadio1" onChange={(e) => { { Details.stopLoss = e.target.value } }}/> SL-M
                            </div>

                        </div>
                       
                        <div className="container_three">
                            <label htmlFor="" className="bsLabel" >Validity</label>
                            <span>
                            <input type="radio" value="DAY" name="validity"  className="btnRadio2" onChange={(e) => { { Details.validity = e.target.value } }} /> Day</span>


                            <span><input type="radio" value="IMMEDIATE" name="validity" className="btnRadio2" onChange={(e) => { { Details.validity = e.target.value } }}/> Immediate  </span>
                           
                            <span><input type="radio" value="MINUTES" name="validity" className="btnRadio2" onChange={(e) => { { Details.validity = e.target.value } }}/> Minutes </span>
                        </div>

                        <div className="form_button">
                        <button className="bsButton bsButton1" onClick={(e)=>{Sell(e, uId)}} >Sell</button> <button className="bsButton1_cancel" onClick={toggleModal}> Cancel</button>
                        </div>
                    </form>
                        }
                       
                    </div>
                </div>
            )}

        </>
    );
}