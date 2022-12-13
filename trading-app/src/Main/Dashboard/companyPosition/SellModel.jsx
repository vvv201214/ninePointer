import React, { useContext, useState } from "react";
import "./ByModel.css";
import { useEffect } from 'react';
import axios from "axios"
import uniqid from "uniqid"
import { userContext } from "../../AuthContext";
import Styles from "./SellModel.module.css";

export default function SellModel({ marketData, uIdProps }) {
    let baseUrl = process.env.NODE_ENV === "production" ? "/" : "http://localhost:5000/"

    const getDetails = useContext(userContext);
    let uId = uniqid();
    let date = new Date();
    let createdOn = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
    let createdBy = getDetails.userDetails.name;
    let userId = getDetails.userDetails.email;
    let totalAmount = 0;
    let tradeBy = getDetails.userDetails.name;

    const [selected, setSelected] = useState("MIS");
    const radioHandler = (e) => {
        console.log(e.target.value);
        setSelected(e.target.value);
        Details.Product = e.target.value
        console.log(Details.Product);
    }

    const [marketselected, setMarketselected] = useState("MARKET");
    const radioHandlerTwo = (e) => {
        setMarketselected(e.target.value);
        Details.OrderType = e.target.value;
    }

    const [validitySelected, setValiditySelected] = useState("DAY");
    const radioHandlerthree = (e) => {
        setValiditySelected(e.target.value);
        Details.validity = e.target.value;
    }

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
            .then((res) => {
                let perticularUser = (res.data).filter((elem) => {
                    console.log(elem.userId, userId);
                    return elem.userId === userId;
                })
                setUserPermission(perticularUser);
            }).catch((err) => {
                window.alert("Server Down");
                return new Error(err);
            })

        axios.get(`${baseUrl}api/v1/readRequestToken`)
            .then((res) => {
                let activeAccessToken = (res.data).filter((elem) => {
                    return elem.status === "Active"
                })
                setAccessToken(activeAccessToken);
            }).catch((err) => {

                return new Error(err);
            })
        axios.get(`${baseUrl}api/v1/readAccountDetails`)
            .then((res) => {
                let activeApiKey = (res.data).filter((elem) => {
                    return elem.status === "Active"
                })
                setApiKey(activeApiKey);
            }).catch((err) => {

                return new Error(err);
            })

        axios.get(`${baseUrl}api/v1/readtradingAlgo`)
            .then((res) => {
                setTradingAlgoData(res.data);
            }).catch((err) => {
                return new Error(err);
            })

        axios.get(`${baseUrl}api/v1/readBrokerage`)
            .then((res) => {
                setBrokerageData(res.data)
            }).catch((err) => {

                return new Error(err);
            })

        axios.get(`${baseUrl}api/v1/readInstrumentDetails`)
            .then((res) => {
                let dataArr = (res.data).filter((elem) => {
                    return elem.status === "Active"
                })
                setTradeData(dataArr)
            }).catch((err) => {

                return new Error(err);
            })
        axios.get(`${baseUrl}api/v1/readInstrumentAlgo`)
            .then((res) => {
                let activeInstrumentAlgo = (res.data).filter((elem) => {
                    return elem.Status === "Active";
                })
                setInstrumentAlgoData(activeInstrumentAlgo)
            }).catch((err) => {
                window.alert("Server Down");
                return new Error(err);
            })
        console.log("hii");

        console.log(tradeData);
        setTradeData([...tradeData])
    }, [])


    const tradingAlgoArr = [];
    apiKeyDetails.map((elem) => {
        accessTokenDetails.map((subelem) => {
            tradingAlgoData.map((element) => {
                if (element.status === "Active" && subelem.accountId == element.tradingAccount && elem.accountId == element.tradingAccount) {
                    tradingAlgoArr.push(element);
                }
            })
        })
    })

    console.log(userPermission, tradingAlgoArr);
    const userPermissionAlgo = [];
    for (let elem of tradingAlgoArr) {
        for (let subElem of userPermission) {
            if (elem.algoName === subElem.algoName) {
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

    function instrumentAlgo(lastPrice) {
        if (instrumentAlgoData.length) {
            instrumentAlgoData.map((elem) => {
                tradeData.map((element) => {
                    if (elem.IncomingInstrumentCode === element.symbol) {
                        companyTrade.realSymbol = elem.OutgoingInstrumentCode;
                    }
                })
                companyTrade.real_last_price = Details.last_price; // wrong see here in buy model
                companyTrade.realBuyOrSell = "SELL";
                companyTrade.realQuantity = Details.Quantity;
                companyTrade.realAmount = Details.Quantity * lastPrice;
                companyTrade.realBrokerage = sellBrokerageCharge(brokerageData, companyTrade.realQuantity, companyTrade.realAmount);

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
            companyTrade.realBuyOrSell = "SELL";
            companyTrade.realSymbol = Details.symbol
            companyTrade.realInstrument = Details.instrument
            companyTrade.realQuantity = Details.Quantity;
            companyTrade.realAmount = lastPrice * companyTrade.realQuantity;
            companyTrade.realBrokerage = sellBrokerageCharge(brokerageData, companyTrade.realQuantity, companyTrade.realAmount);

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
        // if(tradingAlgoData.length){
        userPermissionAlgo.map((elem) => {

            if (elem.transactionChange) {
                companyTrade.realBuyOrSell = "BUY"
            } else {
                companyTrade.realBuyOrSell = "SELL"
            }
            console.log("exchange", tradeData);

            let arr;
            if (elem.instrumentChange) {
                console.log("in the if2");
                arr = tradeData.filter((elem) => {
                    return elem.uId !== uIdProps && elem.status === "Active";
                })
                console.log(arr);
                companyTrade.realSymbol = arr[0].symbol
                companyTrade.realInstrument = arr[0].instrument
            } else {
                companyTrade.realSymbol = Details.symbol
                companyTrade.realInstrument = Details.instrument
            }
            const getLastPrice = marketData.filter((elem) => {
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

            companyTrade.real_last_price = 100
            companyTrade.realAmount = 800
            // companyTrade.real_last_price = getLastPrice[0].last_price;
            // companyTrade.realAmount = getLastPrice[0].last_price * companyTrade.realQuantity;
            companyTrade.realBrokerage = sellBrokerageCharge(brokerageData, companyTrade.realQuantity, companyTrade.realAmount);

            userPermission.map((subElem) => {
                if (subElem.algoName === elem.algoName) {
                    if (subElem.isRealTradeEnable || subElem.isRealTradeEnable) {
                        sendOrderReq();
                        // mockTradeUser("yes");
                    } else {
                        // mockTradeUser("no");
                        mockTradeCompany(elem);
                    }
                }
            })
            setModal(!modal);
        })
        // }else{
        //     companyTrade.real_last_price = Details.last_price;
        //     companyTrade.realBuyOrSell = "SELL";
        //     companyTrade.realSymbol = Details.symbol
        //     companyTrade.realInstrument = Details.instrument
        //     companyTrade.realQuantity = Details.Quantity;
        //     companyTrade.realAmount = lastPrice * companyTrade.realQuantity;
        //     companyTrade.realBrokerage = sellBrokerageCharge(brokerageData, companyTrade.realQuantity, companyTrade.realAmount);

        //     setCompanyTrade(companyTrade)
        //     console.log(Details);
        //     console.log(companyTrade);
        //     sendOrderReq();
        //     setModal(!modal);
        // }
    }

    async function Sell(e, uId) {
        e.preventDefault()

        Details.buyOrSell = "SELL";
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
        Details.exchange = getSomeData[0].exchange;
        Details.symbol = getSomeData[0].symbol

        let getLivePrice = marketData.filter((elem) => {
            return getSomeData[0].instrumentToken === elem.instrument_token;
        })

        // Details.last_price = getLivePrice[0].last_price
        Details.last_price = 100;

        Details.totalAmount = Details.last_price * Details.Quantity;
        Details.brokerageCharge = sellBrokerageCharge(brokerageData, Details.Quantity, Details.totalAmount);

        // Algo box applied here....
        if (Details.exchange === "NFO") {
            if (true) {
                console.log("algo box should be applied");
                setDetails(Details)
                instrumentAlgo(Details.last_price);
            } else {
                companyTrade.realBuyOrSell = "SELL";
                companyTrade.realSymbol = Details.symbol
                companyTrade.realInstrument = Details.instrument
                companyTrade.realQuantity = Details.Quantity;
                companyTrade.real_last_price = Details.last_price
                companyTrade.realAmount = Details.last_price * companyTrade.realQuantity;
                companyTrade.realBrokerage = sellBrokerageCharge(brokerageData, companyTrade.realQuantity, companyTrade.realAmount);

                setCompanyTrade(companyTrade)
                setDetails(Details)
                console.log(Details);
                console.log(companyTrade);

                sendOrderReq(); // must keep inside both if and else
                setModal(!modal);
            }


        } else if (Details.exchange === "NSE") {
            if (userPermissionAlgo.length) {
                setDetails(Details)
                mockTradeUser("no");
                tradingAlgo(uId, Details.last_price);
            } else {
                companyTrade.realBuyOrSell = "SELL";
                companyTrade.realSymbol = Details.symbol
                companyTrade.realInstrument = Details.instrument
                companyTrade.realQuantity = Details.Quantity;
                companyTrade.real_last_price = Details.last_price
                companyTrade.realAmount = Details.last_price * companyTrade.realQuantity;
                companyTrade.realBrokerage = sellBrokerageCharge(brokerageData, companyTrade.realQuantity, companyTrade.realAmount);

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
        const { exchange, symbol, buyOrSell, Quantity, Price, Product, OrderType, TriggerPrice, stopLoss, validity, variety, last_price, brokerageCharge } = Details;
        const { realBuyOrSell, realSymbol, realQuantity, realInstrument, realBrokerage, realAmount, real_last_price } = companyTrade;
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
                brokerageCharge, real_last_price, tradeBy
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

    function sellBrokerageCharge(brokerageData, quantity, totalAmount) {
        let buyBrokerage = brokerageData.filter((elem) => {
            return elem.transaction === "SELL"
        })
        console.log(buyBrokerage);
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

    async function mockTradeUser(realTrade) { // have to add some feild according to auth
        const { exchange, symbol, buyOrSell, Quantity, Price, Product, OrderType, TriggerPrice, stopLoss, validity, variety, last_price } = Details;
        // const {algoName, transactionChange, instrumentChange, exchangeChange, lotMultipler, productChange, tradingAccount} = algoBox
        const res = await fetch(`${baseUrl}api/v1/mocktradeuser`, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                exchange, symbol, buyOrSell, Quantity, Price, Product, OrderType, TriggerPrice, stopLoss, validity, variety, last_price, createdBy, userId, createdOn, uId,
                isRealTrade: realTrade
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

    async function mockTradeCompany(algoBox) {
        const { exchange, symbol, buyOrSell, Quantity, Price, Product, OrderType, TriggerPrice, stopLoss, validity, variety, last_price } = Details;
        const { algoName, transactionChange, instrumentChange, exchangeChange, lotMultipler, productChange, tradingAccount } = algoBox;
        const { realBuyOrSell, realSymbol, realQuantity, realInstrument, realBrokerage, realAmount, real_last_price } = companyTrade;

        const res = await fetch(`${baseUrl}api/v1/mocktradecompany`, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                exchange, symbol: realSymbol, buyOrSell: realBuyOrSell, Quantity: realQuantity, Price, Product, OrderType, TriggerPrice,
                stopLoss, validity, variety, last_price: real_last_price, createdBy, userId, createdOn, uId,
                algoBox: {
                    algoName, transactionChange, instrumentChange, exchangeChange, lotMultipler,
                    productChange, tradingAccount
                }

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
    // disabled={userPermission.isTradeEnable} disabled={userPermission[0].isTradeEnable}
    return (
        <>
            {userPermission[0] === undefined ?
                <button onClick={toggleModal} className="btn-modal Sell_btn">
                    SELL
                </button>
                :
                <button onClick={toggleModal} className="btn-modal Sell_btn">
                    SELL
                </button>}

            {modal && (
                <div className="modal">
                    <div onClick={toggleModal} className="overlay"></div>
                    <div className="modal-content">
                        <div className="form_btnRagAMO">
                            <button className={bsBtn ? "amobtn" : `bsBtn`} onClick={() => { setBsBtn(true) }}>Regular</button>
                            <button className={bsBtn ? "bsBtn" : "amobtn"} onClick={() => { setBsBtn(false) }}>AMO</button>
                        </div>
                        {bsBtn ? <form className="Form_head" onChange={FormHandler} >
                            <div className="container_One">
                                <input type="radio" value="MIS" checked={selected === 'MIS'} name="Product" className="btnRadio" onChange={radioHandler} /> Intraday <span style={{ color: 'gray' }}>MIS</span>
                                <input type="radio" value="NRML" checked={selected === 'NRML'} name="Product" className="btnRadio" onChange={radioHandler} /> Overnight <span style={{ color: 'gray' }}>NRML</span>
                            </div>
                            <div className="container_two">
                                <div className="form_inputContain">
                                    <label htmlFor="" className="bsLabel">Quantity</label>
                                    <input type="text" className="bsInput" onChange={(e) => { { Details.Quantity = (e.target.value) } }} />

                                    <label htmlFor="" className="bsLabel" >Price</label>
                                    <input type="text" className="bsInput" onChange={(e) => { { Details.Price = e.target.value } }} />

                                    <label htmlFor="" className="bsLabel">Trigger Price</label>
                                    <input type="text" className="bsInput" onChange={(e) => { { Details.TriggerPrice = e.target.value } }} />
                                </div>
                                <div className="form_checkbox">
                                    <input type="radio" value="MARKET" checked={marketselected === 'MARKET'} name="OrderType" className="btnRadio1" onChange={radioHandlerTwo} /> Market
                                    <input type="radio" value="LIMIT" checked={marketselected === 'LIMIT'} name="OrderType" className="btnRadio1" onChange={radioHandlerTwo} /> Limit
                                    <input type="radio" value="SL" name="TriggerPrice" className="btnRadio1" onChange={(e) => { { Details.stopLoss = e.target.value } }} /> SL
                                    <input type="radio" value="SLM" name="TriggerPrice" className="btnRadio1" onChange={(e) => { { Details.stopLoss = e.target.value } }} /> SL-M
                                </div>
                            </div>

                            <div className="container_three">
                                <label htmlFor="" className="bsLabel bslable1" >Validity</label>
                                <span className="lable1_radiobtn"><input type="radio" value="DAY" checked={validitySelected === 'DAY'} name="validity" className="btnRadio2" onChange={radioHandlerthree} /> Day</span>
                                <span className="lable1_radiobtn"><input type="radio" value="IMMEDIATE" checked={validitySelected === 'IMMEDIATE'} name="validity" className="btnRadio2" onChange={radioHandlerthree} /> Immediate  </span>
                                <span className="lable1_radiobtn"><input type="radio" value="MINUTES" checked={validitySelected === 'MINUTES'} name="validity" className="btnRadio2" onChange={radioHandlerthree} /> Minutes </span>
                            </div>


                            <div className="form_button">
                                <button className="bsButton bsButton1" onClick={(e) => { Sell(e, uId) }} >Sell</button>
                                <button className="bsButton1_cancel" onClick={toggleModal}> Cancel</button>
                            </div>
                        </form> :
                            <form className="Form_head" onChange={FormHandler} >
                                <div className="container_One">
                                    <input type="radio" value="MIS" checked={selected === 'MIS'} name="Product" className="btnRadio" onChange={radioHandler} /> Intraday <span style={{ color: 'gray' }}>MIS</span>
                                    <input type="radio" value="NRML" checked={selected === 'NRML'} name="Product" className="btnRadio" onChange={radioHandler} /> Overnight <span style={{ color: 'gray' }}>NRML</span>
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
                                        <input type="radio" value="MARKET" checked={marketselected === 'MARKET'} name="OrderType" className="btnRadio1" onChange={radioHandlerTwo} /> Market
                                        <input type="radio" value="LIMIT" checked={marketselected === 'LIMIT'} name="OrderType" className="btnRadio1" onChange={radioHandlerTwo} /> Limit
                                        <input type="radio" value="SL" name="TriggerPrice" className="btnRadio1" onChange={(e) => { { Details.stopLoss = e.target.value } }} /> SL
                                        <input type="radio" value="SLM" name="TriggerPrice" className="btnRadio1" onChange={(e) => { { Details.stopLoss = e.target.value } }} /> SL-M
                                    </div>
                                </div>

                                <div className="container_three">
                                    <label htmlFor="" className="bsLabel bslable1" >Validity</label>
                                    <span className="lable1_radiobtn"><input type="radio" value="DAY" checked={validitySelected === 'DAY'} name="validity" className="btnRadio2" onChange={radioHandlerthree} /> Day</span>
                                    <span className="lable1_radiobtn"><input type="radio" value="IMMEDIATE" checked={validitySelected === 'IMMEDIATE'} name="validity" className="btnRadio2" onChange={radioHandlerthree} /> Immediate  </span>
                                    <span className="lable1_radiobtn"><input type="radio" value="MINUTES" checked={validitySelected === 'MINUTES'} name="validity" className="btnRadio2" onChange={radioHandlerthree} /> Minutes </span>
                                </div>

                                <div className="form_button">
                                    <button className= "bsButton bsButton1" onClick={(e) => { Sell(e, uId) }} >Sell</button>
                                    <button className="bsButton1_cancel" onClick={toggleModal}> Cancel</button>
                                </div>
                            </form>
                        }
                    </div>
                </div>
            )}

        </>
    );
}