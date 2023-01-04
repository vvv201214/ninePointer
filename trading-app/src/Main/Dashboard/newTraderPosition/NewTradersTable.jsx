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
import TradersPnlLiveTrader from "../PnlParts/TradersPnlLiveTrader";

export default function NewTradersTable({socket}) {

  const getDetails = useContext(userContext);
  let baseUrl = process.env.NODE_ENV === "production" ? "/" : "http://localhost:5000/"

  const [tradeData, setTradeData] = useState([]);
  const [liveData, setLiveData] = useState([]);
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

          setData(res.data);
          
      }).catch((err) => {
          return new Error(err);
      })

      axios.get(`${baseUrl}api/v1/readliveTradeuserDate`)
      .then((res) => {

        setLiveData(res.data);
          
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
                    <div class="row1">
                            <div class="col-12">
                            <div class="card my-4">
                                <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                                <div class="bg-gradient-primary shadow-primary border-radius-lg pt-0 pb-0">
                            <h6 class="text-white text-capitalize text-sm-center ps-3">Overall P&L (Company) - Mock</h6>
                                </div></div>
                      
                            <OverallPnl marketData={marketData} tradeData={tradeData} data={data} />
                        
                    </div>
                    </div></div>

                    <div class="row1">
                            <div class="col-12">
                            <div class="card my-4">
                                <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                                <div class="bg-gradient-success shadow-success border-radius-lg pt-0 pb-0">
                            <h6 class="text-white text-capitalize text-sm-center ps-3">Overall P&L (Company) - Live</h6>
                                </div></div>
                     
                            <OverallPnl marketData={marketData} tradeData={tradeData} data={liveData} />
                        
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
                        <div class="row1">
                            <div class="col-12">
                            <div class="card my-4">
                                <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                                <div class="bg-gradient-primary shadow-primary border-radius-lg pt-0 pb-0">
                            <h6 class="text-white text-capitalize text-sm-center ps-3">Trader Wise P&L (Company) - Mock</h6>
                                </div></div>
                        
                            <TradersPNLTrader marketData={marketData} tradeData={tradeData} />
                        
                        </div></div>
                        </div>
                        <div class="row1">
                            <div class="col-12">
                            <div class="card my-4">
                                <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                                <div class="bg-gradient-success shadow-success border-radius-lg pt-0 pb-0">
                            <h6 class="text-white text-capitalize text-sm-center ps-3">Trader Wise P&L (Company) - Live</h6>
                                </div></div>
                        
                            <TradersPnlLiveTrader marketData={marketData} tradeData={tradeData} />
                        
                        </div></div></div>
                    </div>
                </div>
            </div>
        </div>

    </>
  )
}
