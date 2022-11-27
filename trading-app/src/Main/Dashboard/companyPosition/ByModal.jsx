import React, { useContext, useState } from "react";
import "./ByModel.css";
import { useEffect } from 'react';
import axios from "axios"
import uniqid from "uniqid"
import { userContext } from "../../AuthContext";
import tradingAlgo from "./BuyModal_Parts/TradingAlgoPart";
import buyBrokerageCharge from "./BuyModal_Parts/BuyBrokerage";

export default function ByModal({ marketData, uIdProps, isTradersTrade }) {
    const getDetails = useContext(userContext);
    let uId = uniqid();
    let date = new Date();
    let createdOn = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
    let createdBy = getDetails.userDetails.name;
    let userId = getDetails.userDetails.email;
    let totalAmount = 0;

    let isTradeEnable;
    if(getDetails.userDetails.status === "Active"){
        isTradeEnable = false;
    }else {
        isTradeEnable = true;
    }
    console.log(isTradeEnable);

    console.log(marketData);
    const [bsBtn, setBsBtn] = useState(true)
    const [modal, setModal] = useState(false);
    const [Details, setDetails] = useState({
        exchange: "",
        symbol: "",
        ceOrPe: "",
        buyOrSell: "",
        variety: "",
        Product: "",
        Quantity: "",
        Price: "",
        OrderType: "LIMIT",
        TriggerPrice: "",
        stopLoss: "",
        validity: "DAY",
        last_price: "",
        brokerageCharge: "",
        totalAmount: ""
    })
    const [accessTokenDetails, setAccessToken] = useState([]);
    const [apiKeyDetails, setApiKey] = useState([]);
    const [tradeData, setTradeData] = useState([]);
    
    
    
    const [companyTrade, setCompanyTrade] = useState({
        realBuyOrSell: "",
        realSymbol: "",
        realQuantity: "",
        realInstrument: "",
        realBrokerage: "",
        realAmount: "",
        real_last_price:""
    })

    useEffect(() => {
        axios.get("http://localhost:5000/readRequestToken")
            .then((res) => {
                setAccessToken(res.data);
            })
        axios.get("http://localhost:5000/readAccountDetails")
            .then((res) => {
                setApiKey(res.data);
            })

        axios.get("http://localhost:5000/readInstrumentDetails")
            .then((res) => {
                let dataArr = (res.data).filter((elem) => {
                    return (elem.createdOn).includes(`${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`) && elem.status === "Active"
                })
                setTradeData(dataArr)
            })
        
        console.log("hii");

        console.log(tradeData);
        setTradeData([...tradeData])
    }, [])


    const toggleModal = () => {
        setModal(!modal);
    };

    if (modal) {
        document.body.classList.add('active-modal')
    } else {
        document.body.classList.remove('active-modal')
    }
    function FormHandler(e) {
        e.preventDefault()
    }
    


    async function Buy(e, uId) {
        e.preventDefault()
        Details.buyOrSell = "BUY";

        if (bsBtn === true) {
            Details.variety = "regular"
        }
        else {
            Details.variety = "amo"
        }
        console.log(tradeData)
        let getSomeData = tradeData.filter((elem) => {
            return elem.uId === uIdProps;
        })
        console.log(getSomeData)
        Details.exchange = getSomeData[0].exchange;
        Details.symbol = getSomeData[0].symbol

        let getLivePrice = marketData.filter((elem) => {
            console.log("getSomeData.instrumentToken", getSomeData[0].instrumentToken, "elem.instrument_token", elem.instrument_token);
            return getSomeData[0].instrumentToken === elem.instrument_token;
        })
        console.log(getLivePrice[0], getLivePrice)
        Details.last_price = getLivePrice[0].last_price
        Details.totalAmount = Details.last_price * Details.Quantity;
        Details.brokerageCharge = buyBrokerageCharge(brokerageData, Details.Quantity, Details.totalAmount);
        

        // Details.last_price = 100;


        console.log(Details.exchange, tradeData);
        // Algo box applied here....

        if(Details.exchange === "NFO"){
            console.log("in nse")
            if (isTradersTrade) {
                console.log("algo box should be applied");
                setDetails(Details)
                instrumentAlgo(Details.last_price);
            } else {

                companyTrade.real_last_price = Details.last_price;
                companyTrade.realBuyOrSell = "BUY";
                companyTrade.realSymbol = Details.symbol
                companyTrade.realInstrument = Details.instrument
                companyTrade.realQuantity = Details.Quantity;
    
                companyTrade.realAmount = Details.last_price * companyTrade.realQuantity;
                companyTrade.realBrokerage = buyBrokerageCharge(brokerageData, companyTrade.realQuantity, companyTrade.realAmount);
                
                setCompanyTrade(companyTrade)
                setDetails(Details)
                console.log(Details);
                console.log(companyTrade);
        
                // sendOrderReq(); // must keep inside both if and else
                setModal(!modal);
            }
        } else if(Details.exchange === "NSE"){
            if (isTradersTrade) {
                console.log("algo box should be applied");
                setDetails(Details)
                tradingAlgo(uId, Details.last_price, companyTrade, Details);
            } else {
                companyTrade.real_last_price = Details.last_price;
                companyTrade.realBuyOrSell = "BUY";
                companyTrade.realSymbol = Details.symbol
                companyTrade.realInstrument = Details.instrument
                companyTrade.realQuantity = Details.Quantity;
    
                companyTrade.realAmount = Details.last_price * companyTrade.realQuantity;
                companyTrade.realBrokerage = buyBrokerageCharge(brokerageData, companyTrade.realQuantity, companyTrade.realAmount);
                
                setCompanyTrade(companyTrade)
                setDetails(Details)
                console.log(Details);
                console.log(companyTrade);
        
                // sendOrderReq(); // must keep inside both if and else
                setModal(!modal);
            }                

        }

        console.log("tradingAlgoData", tradingAlgoData);

    }

    async function sendOrderReq() {
        const { exchange, symbol, buyOrSell, Quantity, Price, Product, OrderType, TriggerPrice, stopLoss, validity, variety, last_price } = Details;
        const { realBuyOrSell, realSymbol, realQuantity, realInstrument, realBrokerage, realAmount} = companyTrade;
        const { instrument } = tradeData;
        const { apiKey } = apiKeyDetails[0];
        const { accessToken } = accessTokenDetails[0];

        const res = await fetch("http://localhost:5000/placeorder", {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                exchange, symbol, buyOrSell, Quantity, Price, Product, OrderType,
                TriggerPrice, stopLoss, variety, validity, uId, createdBy, createdOn,
                last_price, realBuyOrSell, realSymbol, realQuantity, instrument,
                realInstrument, apiKey, accessToken, userId, realBrokerage, realAmount
            })
        });
        const dataResp = await res.json();
        console.log(dataResp);
        if (dataResp.status === 422 || dataResp.error || !dataResp) {
            window.alert(dataResp.error);
            console.log("Failed to Trade");
        } else {
            console.log(dataResp);
            window.alert("Trade succesfull");
            console.log("entry succesfull");
        }
    }




    return (
        <>
            <button disabled={isTradeEnable} onClick={toggleModal} className="btn-modal By_btn">
                BUY
            </button>

            {modal && (
                <div className="modal">
                    <div onClick={toggleModal} className="overlay"></div>
                    <div className="modal-content">
                        <div className="form_btnRagAMO">
                            <button className={bsBtn ? "amobtn" : `bsBtn`} onClick={() => { setBsBtn(true) }}>Regular</button> <button className={bsBtn ? "bsBtn" : "amobtn"} onClick={() => { setBsBtn(false) }}>AMO</button>
                        </div>
                        {bsBtn ? <form className="Form_head" onChange={FormHandler} >
                            <div className="container_One">
                                <input type="radio" value="MIS" name="Product" className="btnRadio" onChange={(e) => { { Details.Product = e.target.value } }} /> Intraday <span style={{ color: 'gray' }}>MIS</span>

                                <input type="radio" value="NRML" name="Product" className="btnRadio" onChange={(e) => { { Details.Product = e.target.value } }} /> Overnight <span style={{ color: 'gray' }}>NRML</span>
                            </div>
                            <div className="container_two">
                                <div className="form_inputContain">
                                    <label htmlFor="" className="bsLabel">Quantity</label>
                                    <input type="text" className="bsInput" onChange={(e) => { { Details.Quantity = e.target.value } }} />

                                    <label htmlFor="" className="bsLabel" >Price</label>
                                    <input type="text" className="bsInput" onChange={(e) => { { Details.Price = e.target.value } }} />

                                    <label htmlFor="" className="bsLabel">Trigger Price</label>
                                    <input type="text" className="bsInput" onChange={(e) => { { Details.TriggerPrice = e.target.value } }} />
                                </div>
                                <div className="form_checkbox">
                                    <input type="radio" value="MARKET" name="OrderType" className="btnRadio1" onChange={(e) => { { Details.OrderType = e.target.value } }} /> Market
                                    <input type="radio" value="LIMIT" name="OrderType" className="btnRadio1" onChange={(e) => { { Details.OrderType = e.target.value } }} /> Limit
                                    <input type="radio" value="SL" name="TriggerPrice" className="btnRadio1" onChange={(e) => { { Details.stopLoss = e.target.value } }} /> SL
                                    <input type="radio" value="SLM" name="TriggerPrice" className="btnRadio1" onChange={(e) => { { Details.stopLoss = e.target.value } }} /> SL-M
                                </div>
                            </div>

                            <div className="container_three">
                                <label htmlFor="" className="bsLabel bslable1" >Validity</label>
                                <span className="lable1_radiobtn"><input type="radio" value="DAY" name="validity" className="btnRadio2" onChange={(e) => { { Details.validity = e.target.value } }} /> Day</span>

                                <span className="lable1_radiobtn"><input type="radio" value="IMMEDIATE" name="validity" className="btnRadio2" onChange={(e) => { { Details.validity = e.target.value } }} /> Immediate  </span>

                                <span className="lable1_radiobtn"><input type="radio" value="MINUTES" name="validity" className="btnRadio2" onChange={(e) => { { Details.validity = e.target.value } }} /> Minutes </span>
                            </div>

                            <div className="form_button">
                                <button  className="bsButton bsButton1" onClick={(e) => { Buy(e, uId) }} >BUY</button> <button className="bsButton1_cancel" onClick={toggleModal}> Cancel</button>
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
                                        <input type="text" className="bsInput" onChange={(e) => { { Details.Price = e.target.value } }} />

                                        <label htmlFor="" className="bsLabel">Trigger Price</label>
                                        <input type="text" className="bsInput" onChange={(e) => { { Details.TriggerPrice = e.target.value } }} />
                                    </div>
                                    <div className="form_checkbox">
                                        <input type="radio" value="MARKET" name="OrderType" className="btnRadio1" onChange={(e) => { { Details.OrderType = e.target.value } }} /> Market
                                        <input type="radio" value="LIMIT" name="OrderType" className="btnRadio1" onChange={(e) => { { Details.OrderType = e.target.value } }} /> Limit
                                        <input type="radio" value="SL" name="TriggerPrice" className="btnRadio1" onChange={(e) => { { Details.stopLoss = e.target.value } }} /> SL
                                        <input type="radio" value="SLM" name="TriggerPrice" className="btnRadio1" onChange={(e) => { { Details.stopLoss = e.target.value } }} /> SL-M
                                    </div>
                                </div>

                                <div className="container_three">
                                    <label htmlFor="" className="bsLabel bslable1" >Validity</label>
                             
                                        <span className="lable1_radiobtn"><input type="radio" value="DAY" name="validity" className="btnRadio2" onChange={(e) => { { Details.validity = e.target.value } }} /> Day</span>

                                        <span className="lable1_radiobtn"> <input type="radio" value="IMMEDIATE" name="validity" className="btnRadio2" onChange={(e) => { { Details.validity = e.target.value } }} /> Immediate </span>

                                        <span className="lable1_radiobtn">  <input type="radio" value="MINUTES" name="validity" className="btnRadio2" onChange={(e) => { { Details.validity = e.target.value } }} /> Minutes </span>
                                </div>

                                <div className="form_button">
                                    <button className="bsButton bsButton1" onClick={(e) => { Buy(e, uId) }} >BUY</button> <button className="bsButton1_cancel" onClick={toggleModal}> Cancel</button>
                                </div>
                            </form>
                        }

                    </div>
                </div>
            )}

        </>
    );
}