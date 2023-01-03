import React, { useContext } from "react";
import { useState } from "react";
import { useEffect } from 'react';
import axios from "axios"
import { userContext } from "../../AuthContext";
import RunningPnl from "../PnlParts/RunningPnl";
import ClosedPnl from "../PnlParts/ClosedPnl";
import OverallPnl from "../PnlParts/OverallPnl";
import TradersPNLTrader from '../PnlParts/TraderPNLTrader';
import Styles from "../Dashboard.module.css";

export default function NewTradersTable({socket}) {

  const getDetails = useContext(userContext);
  let baseUrl = process.env.NODE_ENV === "production" ? "/" : "http://localhost:5000/"

  const [tradeData, setTradeData] = useState([]);
  // const [reRender, setReRender] = useState(true);
  const [marketData, setMarketData] = useState([]);
  const [userDetail, setUserDetail] = useState([]);
  const [data, setData] = useState([]);
  let date = new Date();
  let todayDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`
  useEffect(() => {

  axios.get(`${baseUrl}api/v1/readuserdetails`)
    .then((res) => {
        setUserDetail(res.data);
    }).catch((err)=>{
        return new Error(err);
    })

    
  axios.get(`${baseUrl}api/v1/readmocktradeuserDate`)
      .then((res) => {
        //   let data = (res.data).filter((elem) => {
        //       return elem.order_timestamp.includes(todayDate) && elem.status === "COMPLETE";
        //   })
          setData(res.data);
          
      }).catch((err) => {
          return new Error(err);
      })

  axios.get(`${baseUrl}api/v1/getliveprice`)
      .then((res) => {
          console.log("live price data", res)
          setMarketData(res.data)
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
  console.log("hii");

    socket.on("tick",(data)=>{
      console.log("this is live market data", data);
      setMarketData(data);
    })
      // reRender ? setReRender(false) : setReRender(true)
      // setReRender(true);
  }, [getDetails])

  useEffect(() => {
      return () => {
          console.log('closing');
          socket.close();
      }
  }, [])

  console.log(data);
  console.log(marketData);



  return (
    <>
    
    <div>
            <div className="main_Container">
                <div className="right_side">
                    <div className="rightside_maindiv">
                    <div className={Styles.gridheader}>
                    <div className={Styles.box}>
                        <span class="btnnew bg-gradient-primary mt-0 w-100">Overall P&L(Traders) - Mock</span>
                        <div className="grid_2">
                            <OverallPnl marketData={marketData} tradeData={tradeData} data={data} />
                        </div>
                    </div>
                    </div>
                    <div className={Styles.gridheader}>
                    <div className={Styles.box}>
                        <span class="btnnew bg-gradient-success mt-0 w-100">Overall P&L(Traders) - Live</span>
                        <div className="grid_2">
                            <OverallPnl marketData={marketData} tradeData={tradeData} data={data} />
                        </div>
                    </div>
                    </div> 
                        {/* <span className="grid2_span">Running PNL-Traders</span>
                        <div className="grid_2">
                            <RunningPnl marketData={marketData} tradeData={tradeData} data={data} />
                        </div>
                        <span className="grid2_span">Closed Trades PNL-Traders</span>
                        <div className="grid_2">
                            <ClosedPnl marketData={marketData} tradeData={tradeData} data={data} />
                        </div> */}
                        <div className={Styles.gridheader}>
                        <div className={Styles.box}>
                        <span class="btnnew bg-gradient-primary mt-0 w-100">Traders Wise P&L(Traders)-Mock</span>
                        
                            <TradersPNLTrader marketData={marketData} tradeData={tradeData} />
                        
                        </div></div>
                        <div className={Styles.gridheader}>
                        <div className={Styles.box}>
                        <span class="btnnew bg-gradient-success mt-0 w-100">Traders Wise P&L(Traders)-Mock</span>
                        
                            <TradersPNLTrader marketData={marketData} tradeData={tradeData} />
                        
                        </div></div>
                    </div>
                </div>
            </div>
        </div>

    </>
  )
}
