import React from 'react'
import { useEffect, useState } from 'react'

export default function BuyBrokerage(brokerageData, quantity, totalAmount) {
    const [brokerageData, setBrokerageData] = useState([]);
    useEffect(()=>{
        axios.get("http://localhost:5000/readBrokerage")
        .then((res) => {
            setBrokerageData(res.data)
        })
    }, [])

    function buyBrokerageCharge() {
        let buyBrokerage = brokerageData.filter((elem) => {
            return elem.transaction === "BUY"
        })
        let brokerage = Number(buyBrokerage[0].brokerageCharge);
        let exchangeCharge = totalAmount * (Number(buyBrokerage[0].exchangeCharge) / 100);
        let gst = (brokerage + exchangeCharge) * (Number(buyBrokerage[0].gst) / 100);
        let sebiCharges = totalAmount * (Number(buyBrokerage[0].sebiCharge) / 100);
        let stampDuty = totalAmount * (Number(buyBrokerage[0].stampDuty) / 100);
        let sst = totalAmount * (Number(buyBrokerage[0].sst) / 100);
        let finalCharge = brokerage + exchangeCharge + gst + sebiCharges + stampDuty + sst;
        return finalCharge
    }
    buyBrokerageCharge()

  return (
    <></>
  )
}
