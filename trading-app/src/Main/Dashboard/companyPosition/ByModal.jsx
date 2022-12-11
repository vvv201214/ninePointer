import React, { useContext, useState } from "react";
import "./ByModel.css";
import { useEffect } from 'react';
import axios from "axios"
import uniqid from "uniqid"
import { userContext } from "../../AuthContext";

export default function ByModal({ marketData, uIdProps }) {
    let baseUrl = process.env.NODE_ENV === "production" ? "/" : "http://localhost:5000/"

    const getDetails = useContext(userContext);
    let uId = uniqid();
    let date = new Date();
    let createdOn = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
    let createdBy = getDetails.userDetails.name;
    let userId = getDetails.userDetails.email;
    let totalAmount = 0;
    let tradeBy = getDetails.userDetails.name;


    const [userPermission, setUserPermission] = useState([]);
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
        OrderType: "",
        TriggerPrice: "",
        stopLoss: "",
        validity: "DAY",
        last_price: "",
        brokerageCharge: "",
        totalAmount: ""
    })
    let [accessTokenDetails, setAccessToken] = useState([]);
    let [apiKeyDetails, setApiKey] = useState([]);
    const [tradeData, setTradeData] = useState([]);
    const [brokerageData, setBrokerageData] = useState([]);
    const [tradingAlgoData, setTradingAlgoData] = useState([]);
    const [instrumentAlgoData, setInstrumentAlgoData] = useState([]);
    // const [permission, setPermission] = useState([]);
    const [companyTrade, setCompanyTrade] = useState({
        realBuyOrSell: "",
        realSymbol: "",
        realQuantity: "",
        realInstrument: "",
        realBrokerage: "",
        realAmount: "",
        real_last_price: "",
    })

    useEffect(() => {

        axios.get(`${baseUrl}api/v1/readpermission`)
        .then((res)=>{
            let perticularUser = (res.data).filter((elem)=>{
                console.log(elem.userId , userId);
                return elem.userId === userId;
            })
            setUserPermission(perticularUser);
        }).catch((err)=>{
            window.alert("Server Down");
            return new Error(err);
        })

        axios.get(`${baseUrl}api/v1/readRequestToken`)
            .then((res) => {
                let activeAccessToken = (res.data).filter((elem)=>{
                    return elem.status === "Active"
                })
                setAccessToken(activeAccessToken);
            }).catch((err)=>{
                
                return new Error(err);
            })
        axios.get(`${baseUrl}api/v1/readAccountDetails`)
            .then((res) => {
                let activeApiKey = (res.data).filter((elem)=>{
                    return elem.status === "Active"
                })
                setApiKey(activeApiKey);
            }).catch((err)=>{
                
                return new Error(err);
            })
        axios.get(`${baseUrl}api/v1/readtradingAlgo`)
            .then((res) => {
               setTradingAlgoData(res.data);
            }).catch((err)=>{
                return new Error(err);
            })
        axios.get(`${baseUrl}api/v1/readBrokerage`)
            .then((res) => {
                setBrokerageData(res.data)
            }).catch((err)=>{
                
                return new Error(err);
            })

        axios.get(`${baseUrl}api/v1/readInstrumentDetails`)
            .then((res) => {
                let dataArr = (res.data).filter((elem) => {
                    return elem.status === "Active"
                })
                setTradeData(dataArr)
            }).catch((err)=>{
                
                return new Error(err);
            })
         axios.get(`${baseUrl}api/v1/readInstrumentAlgo`)
            .then((res) => {
                let activeInstrumentAlgo = (res.data).filter((elem)=>{
                    return elem.Status === "Active";
                })
                setInstrumentAlgoData(activeInstrumentAlgo)
            }).catch((err)=>{
                window.alert("Server Down");
                return new Error(err);
            })

        setTradeData([...tradeData])
    }, [getDetails])



    const tradingAlgoArr = [];
    apiKeyDetails.map((elem)=>{
        accessTokenDetails.map((subelem)=>{
            tradingAlgoData.map((element) => {
                if(element.status === "Active" && subelem.accountId == element.tradingAccount && elem.accountId == element.tradingAccount){
                    tradingAlgoArr.push(element);
                }
            })
        })
    })

    console.log(userPermission, tradingAlgoArr);
    const userPermissionAlgo = [];
    for(let elem of tradingAlgoArr){
        for(let subElem of userPermission){
            if(elem.algoName === subElem.algoName){
                userPermissionAlgo.push(elem)
            }
        }
    }

    console.log(userPermissionAlgo); //its an array do everything according it


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
    function instrumentAlgo(lastPrice){
        if (instrumentAlgoData.length) {
            instrumentAlgoData.map((elem) => {
                tradeData.map((element)=>{
                    if(elem.IncomingInstrumentCode === element.symbol){
                        companyTrade.realSymbol = elem.OutgoingInstrumentCode;
                    }
                })
                companyTrade.real_last_price = Details.last_price; // its wrong because OutgoingInstrumentCode <-- decide real last price
                companyTrade.realBuyOrSell = "BUY";
                companyTrade.realQuantity = Details.Quantity;
                companyTrade.realAmount = Details.Quantity * lastPrice;
                companyTrade.realBrokerage = buyBrokerageCharge(brokerageData, companyTrade.realQuantity, companyTrade.realAmount);
                
                // Details.totalAmount = totalAmount;
                setCompanyTrade(companyTrade)
                // if(permission[0].isRealTradeEnable){
                //     sendOrderReq();
                // } else{
                //     mockTrade();
                // }
                setModal(!modal);
            })
        } else {
            companyTrade.real_last_price = Details.last_price;
            companyTrade.realBuyOrSell = "BUY";
            companyTrade.realSymbol = Details.symbol
            companyTrade.realInstrument = Details.instrument
            companyTrade.realQuantity = Details.Quantity;
            companyTrade.realAmount = lastPrice * companyTrade.realQuantity;
            companyTrade.realBrokerage = buyBrokerageCharge(brokerageData, companyTrade.realQuantity, companyTrade.realAmount);
            

            setCompanyTrade(companyTrade)
            // if(permission[0].isRealTradeEnable){
            //     sendOrderReq();
            // } else{
            //     mockTrade();
            // }
            setModal(!modal);
        }
    }

    function tradingAlgo(uId, lastPrice) {
        // if (userPermissionAlgo.length) {
            userPermissionAlgo.map((elem) => {
                
                if (elem.transactionChange) {
                    companyTrade.realBuyOrSell = "SELL"
                } else {
                    companyTrade.realBuyOrSell = "BUY"
                }

                let arr;
                if (elem.instrumentChange) {
                    arr = tradeData.filter((elem) => {
                        return elem.uId !== uIdProps && elem.status === "Active";
                    })
                    companyTrade.realSymbol = arr[0].symbol
                    companyTrade.realInstrument = arr[0].instrument
                } else {
                    companyTrade.realSymbol = Details.symbol
                    companyTrade.realInstrument = Details.instrument
                }
                const getLastPrice = marketData.filter((elem)=>{
                    return elem.instrument_token === arr[0].instrumentToken;
                })

                companyTrade.realQuantity = elem.lotMultipler * (Details.Quantity);
                accessTokenDetails = accessTokenDetails.filter((element) => {
                    return elem.tradingAccount === element.accountId
                })
                setAccessToken(accessTokenDetails);
                apiKeyDetails = apiKeyDetails.filter((element) => {
                    return elem.tradingAccount === element.accountId
                })
                setApiKey(apiKeyDetails);
                // companyTrade.real_last_price = getLastPrice[0].last_price;
                companyTrade.real_last_price = 100
                companyTrade.realAmount = 800
                //companyTrade.realAmount = getLastPrice[0].last_price * companyTrade.realQuantity;
                companyTrade.realBrokerage = buyBrokerageCharge(brokerageData, companyTrade.realQuantity, companyTrade.realAmount);
                
                setCompanyTrade(companyTrade)

                userPermission.map((subElem)=>{
                    if(subElem.algoName === elem.algoName){
                        if(subElem.isRealTradeEnable || subElem.isRealTradeEnable){
                            sendOrderReq();
                            // mockTradeUser("yes");
                        } else{
                            // mockTradeUser("no");
                            mockTradeCompany(elem);
                        }
                    }
                })
                setModal(!modal);
            })
        
        // } else {
        //     companyTrade.real_last_price = Details.last_price;
        //     companyTrade.realBuyOrSell = "BUY";
        //     companyTrade.realSymbol = Details.symbol
        //     companyTrade.realInstrument = Details.instrument
        //     companyTrade.realQuantity = Details.Quantity;
        //     companyTrade.realAmount = lastPrice * companyTrade.realQuantity;
        //     companyTrade.realBrokerage = buyBrokerageCharge(brokerageData, companyTrade.realQuantity, companyTrade.realAmount);
            

        //     setCompanyTrade(companyTrade)

        //     if(permission[0].isRealTradeEnable || permission[0].isRealTradeEnable){
        //         sendOrderReq();
        //         mockTradeUser();
        //     } else{
        //         mockTradeUser();
        //         mockTradeCompany();
        //     }

        //     setModal(!modal);
        // }
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
        let getSomeData = tradeData.filter((elem) => {
            return elem.uId === uIdProps;
        })
        Details.exchange = getSomeData[0].exchange;
        Details.symbol = getSomeData[0].symbol

        let getLivePrice = marketData.filter((elem) => {
            return getSomeData[0].instrumentToken === elem.instrument_token;
        })
        Details.last_price = 100
        // Details.last_price = getLivePrice[0].last_price

        Details.totalAmount = Details.last_price * Details.Quantity;
        Details.brokerageCharge = buyBrokerageCharge(brokerageData, Details.Quantity, Details.totalAmount);
        

        // Details.last_price = 100;


        // Algo box applied here....

        if(Details.exchange === "NFO"){
            if (true) {
                setDetails(Details)
                instrumentAlgo(Details.last_price);
            } else {
                companyTrade.realBuyOrSell = "BUY";
                companyTrade.realSymbol = Details.symbol
                companyTrade.realInstrument = Details.instrument
                companyTrade.realQuantity = Details.Quantity;
                companyTrade.real_last_price = Details.last_price
                companyTrade.realAmount = Details.last_price * companyTrade.realQuantity;
                companyTrade.realBrokerage = buyBrokerageCharge(brokerageData, companyTrade.realQuantity, companyTrade.realAmount);
                
                setCompanyTrade(companyTrade)
                setDetails(Details)
        

                // if(permission[0].isRealTradeEnable){
                //     sendOrderReq();
                // } else{
                //     mockTrade();
                // } // must keep inside both if and else
                setModal(!modal);
            }
        } else if(Details.exchange === "NSE"){
// first check if value is there in algo mtlb algo ka account id match huaa h ya nhi agr nhi huaa to algo nhi h but user ko ock trade dilana h
            if (userPermissionAlgo.length) {
                setDetails(Details)
                mockTradeUser("no");
                tradingAlgo(uId, Details.last_price);
            } else {
                companyTrade.realBuyOrSell = "BUY";
                companyTrade.realSymbol = Details.symbol
                companyTrade.realInstrument = Details.instrument
                companyTrade.realQuantity = Details.Quantity;
                companyTrade.real_last_price = Details.last_price
                companyTrade.realAmount = Details.last_price * companyTrade.realQuantity;
                companyTrade.realBrokerage = buyBrokerageCharge(brokerageData, companyTrade.realQuantity, companyTrade.realAmount);
                
                setCompanyTrade(companyTrade)
                setDetails(Details)
        
                const fakeAlgo = {
                    algoName: "no algo",
                    transactionChange: "no algo",
                    instrumentChange: "no algo",
                    exchangeChange: "no algo",
                    lotMultipler: "no algo",
                    productChange: "no algo",
                    tradingAccount: "no algo"
                }
                mockTradeUser("no");
                mockTradeCompany(fakeAlgo);
                // must keep inside both if and else
                setModal(!modal);
            }                
        }
    }

    async function sendOrderReq() {
        const { exchange, symbol, buyOrSell, Quantity, Price, Product, OrderType, TriggerPrice, stopLoss, validity, variety, last_price } = Details;
        const { realBuyOrSell, realSymbol, realQuantity, realInstrument, realBrokerage, realAmount, real_last_price} = companyTrade;
        const { instrument } = tradeData;
        const { apiKey } = apiKeyDetails[0];
        const { accessToken } = accessTokenDetails[0];

        const res = await fetch(`${baseUrl}api/v1/placeorder`, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                exchange, symbol, buyOrSell, Quantity, Price, Product, OrderType,
                TriggerPrice, stopLoss, variety, validity, uId, createdBy, createdOn,
                last_price, realBuyOrSell, realSymbol, realQuantity, instrument,
                realInstrument, apiKey, accessToken, userId, realBrokerage, realAmount, 
                real_last_price, tradeBy
            })
        });
        const dataResp = await res.json();
        if (dataResp.status === 422 || dataResp.error || !dataResp) {
            window.alert(dataResp.error);
            console.log("Failed to Trade");
        } else {
            console.log(dataResp);
            window.alert("Trade succesfull");
            console.log("entry succesfull");
        }
    }

    function buyBrokerageCharge(brokerageData, quantity, totalAmount) {
        let buyBrokerage = brokerageData.filter((elem) => {
            return elem.transaction === "BUY"
        })
        let brokerage = Number(buyBrokerage[0].brokerageCharge);
        // let totalAmount = Number(Details.last_price) * Number(quantity);
        let exchangeCharge = totalAmount * (Number(buyBrokerage[0].exchangeCharge) / 100);

        let gst = (brokerage + exchangeCharge) * (Number(buyBrokerage[0].gst) / 100);
        let sebiCharges = totalAmount * (Number(buyBrokerage[0].sebiCharge) / 100);
        let stampDuty = totalAmount * (Number(buyBrokerage[0].stampDuty) / 100);
        let sst = totalAmount * (Number(buyBrokerage[0].sst) / 100);
        let finalCharge = brokerage + exchangeCharge + gst + sebiCharges + stampDuty + sst;
        return finalCharge
    }

    async function mockTradeUser(realTrade){ // have to add some feild according to auth
        const { exchange, symbol, buyOrSell, Quantity, Price, Product, OrderType, TriggerPrice, stopLoss, validity, variety, last_price } = Details;
        // const {algoName, transactionChange, instrumentChange, exchangeChange, lotMultipler, productChange, tradingAccount} = algoBox
        const res = await fetch(`${baseUrl}api/v1/mocktradeuser`, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                exchange, symbol, buyOrSell, Quantity, Price, Product, OrderType, TriggerPrice, stopLoss, validity, variety, last_price, createdBy, userId, createdOn, uId,
                isRealTrade:realTrade
                // , algoBox: {algoName, transactionChange, instrumentChange, exchangeChange, lotMultipler, productChange, tradingAccount}
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

    async function mockTradeCompany(algoBox){
        const { exchange, symbol, buyOrSell, Quantity, Price, Product, OrderType, TriggerPrice, stopLoss, validity, variety, last_price } = Details;
        const {algoName, transactionChange, instrumentChange, exchangeChange, lotMultipler, productChange, tradingAccount} = algoBox;
        const {realBuyOrSell, realSymbol, realQuantity, realInstrument, realBrokerage, realAmount, real_last_price} = companyTrade;

        const res = await fetch(`${baseUrl}api/v1/mocktradecompany`, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                exchange, symbol: realSymbol, buyOrSell: realBuyOrSell, Quantity: realQuantity, Price, Product, OrderType, TriggerPrice, 
                stopLoss, validity, variety, last_price: real_last_price, createdBy, userId, createdOn, uId, 
                algoBox: {algoName, transactionChange, instrumentChange, exchangeChange, lotMultipler, 
                productChange, tradingAccount}

            })
        });
        const dataResp = await res.json();
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
            {userPermission[0] === undefined ?
            <button disabled={!userPermission.isTradeEnable} onClick={toggleModal} className="btn-modal By_btn">
            BUY
            </button>
            :
            <button disabled={!userPermission[0].isTradeEnable} onClick={toggleModal} className="btn-modal By_btn">
            BUY
            </button> }


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

// if(permission.isRealTradeEnable){
//     sendOrderReq();
// } else{
//     mockTrade();
// }