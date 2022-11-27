import React from 'react'
import { useEffect } from 'react'
import buyBrokerageCharge from "./BuyBrokerage";

export default function TradingAlgoPart(uId, lastPrice, companyTrade, Details) {
  const [tradingAlgoData, setTradingAlgoData] = useState([]);
  const [accessTokenDetails, setAccessToken] = useState([]);
  const [apiKeyDetails, setApiKey] = useState([]);


  useEffect(()=>{
    axios.get("http://localhost:5000/readtradingAlgo")
    .then((res) => {
        let activeAlgo = (res.data).filter((elem) => {
            return elem.status === "Active"
        })
        setTradingAlgoData(activeAlgo);
        console.log(activeAlgo);
    })

    axios.get("http://localhost:5000/readRequestToken")
    .then((res) => {
        setAccessToken(res.data);
    })

    axios.get("http://localhost:5000/readAccountDetails")
    .then((res) => {
        setApiKey(res.data);
    })
  }, [])

  function tradingAlgo() {
    if (tradingAlgoData.length) {
        tradingAlgoData.map((elem) => {
            console.log("in algo");
            if (elem.transactionChange) {
                companyTrade.realBuyOrSell = "SELL"
            } else {
                companyTrade.realBuyOrSell = "BUY"
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
            const getLastPrice = marketData.filter((elem)=>{
                return elem.instrument_token === arr[0].instrumentToken;
            })

            companyTrade.realQuantity = elem.lotMultipler * (Details.Quantity);
            let accesssTokenData = accessTokenDetails.filter((element) => {
              return elem.tradingAccount === element.accountId
            })
            console.log(accesssTokenData);
            setAccessToken(accesssTokenData);
            let apiKeyData = apiKeyDetails.filter((element) => {
                return elem.tradingAccount === element.accountId
            })
            console.log(apiKeyData);
            setApiKey(apiKeyData);
            companyTrade.real_last_price = getLastPrice[0].last_price;
            companyTrade.realAmount = getLastPrice[0].last_price * companyTrade.realQuantity;
            companyTrade.realBrokerage = buyBrokerageCharge(brokerageData, companyTrade.realQuantity, companyTrade.realAmount);
            
            setCompanyTrade(companyTrade);
            console.log(Details);
            console.log(companyTrade);
            // sendOrderReq();
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
        console.log(Details);
        console.log(companyTrade);
        // sendOrderReq();
        setModal(!modal);
    }
}

tradingAlgo();

  return (
    <></>
  )
}

