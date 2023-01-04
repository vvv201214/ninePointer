import React, {useEffect, useState} from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import style from "./TradersTradeBook/TradersTradeBook.module.css";
import axios from "axios";

const TradersTradeBook = () => {

  const [orderCountHistoryCompany, setOrderCountHistoryCompany] = useState(0);
  const [orderCountTodayCompany, setOrderCountTodayCompany] = useState(0);

  let baseUrl = process.env.NODE_ENV === "production" ? "/" : "http://localhost:5000/"

  useEffect(()=>{

      axios.get(`${baseUrl}api/v1/readmocktradecompanycount`)
      .then((res)=>{
          setOrderCountHistoryCompany((res.data));
      }).catch((err)=>{
          window.alert("Server Down");
          return new Error(err);
      })

      axios.get(`${baseUrl}api/v1/readmocktradecompanycountToday`)
      .then((res)=>{
          setOrderCountTodayCompany((res.data));
      }).catch((err)=>{
          window.alert("Server Down");
          return new Error(err);
      })

  });

  return (
    <div className={style.Companyorder_div}>        
    <ul className={style.Companyorder_ul}>
        <li className={style.Companyorder_li}>
            <NavLink className='headers_li_links' to={"/main/dashboard/TradersTradeBook/"} style={({isActive}) => isActive?{color: "#5479FC"} :{color:'black'} }>Today's Trades(Mock-{orderCountTodayCompany})</NavLink>
        </li>
        <li className={style.Companyorder_li}>
            <NavLink className='headers_li_links' to={"/main/dashboard/TradersTradeBook/HistoryTradersTrade/"} style={({isActive}) => isActive?{color: "#5479FC"} :{color:'black'} }>History Trades(Mock-{orderCountHistoryCompany})</NavLink>
        </li>
    </ul>
<Outlet/>
</div>
  )
}

export default TradersTradeBook;