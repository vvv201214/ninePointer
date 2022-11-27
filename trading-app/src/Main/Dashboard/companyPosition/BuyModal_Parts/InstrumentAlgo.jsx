import React from 'react'
import { useEffect, useState } from 'react';
import buyBrokerageCharge from "./BuyBrokerage";

export default function InstrumentAlgo(lastPrice) {

    const [instrumentAlgoData, setInstrumentAlgoData] = useState([]);

    useEffect(()=>{
        axios.get("http://localhost:5000/readInstrumentAlgo")
        .then((res) => {
            setInstrumentAlgoData(res.data)
        })
    }, [])

    function instrumentAlgo(){
        if (instrumentAlgoData.length) {
            instrumentAlgoData.map((elem) => {
                tradeData.map((element)=>{
                    if(elem.IncomingInstrumentCode === element.symbol){
                        companyTrade.realSymbol = elem.OutgoingInstrumentCode;
                    }
                })

                companyTrade.realAmount = Details.Quantity * lastPrice;
                companyTrade.realBrokerage = buyBrokerageCharge(brokerageData, companyTrade.realQuantity, companyTrade.realAmount);
                
                // Details.totalAmount = totalAmount;
                setCompanyTrade(companyTrade)
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
    instrumentAlgo();

  return (
    <></>
  )
}
