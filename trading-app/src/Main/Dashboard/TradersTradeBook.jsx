import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import style from "./TradersTradeBook/TradersTradeBook.module.css";

const TradersTradeBook = ({orderCountTodayCompany, orderCountHistoryCompany}) => {

  return (
    <div className={style.Companyorder_div}>        
    <ul className={style.Companyorder_ul}>
        <li className={style.Companyorder_li}>
            <NavLink to={"/main/dashboard/TradersTradeBook/"} style={({isActive}) => isActive?{backgroundColor: "white", borderRadius: "3px"} :{color:'black'} }>Today's Trades(Mock-{orderCountTodayCompany})</NavLink>
        </li>
        <li className={style.Companyorder_li}>
            <NavLink to={"/main/dashboard/TradersTradeBook/HistoryTradersTrade/"} style={({isActive}) => isActive?{backgroundColor: "white", borderRadius: "3px"} :{Color: "black"} }>History Trades(Mock-{orderCountHistoryCompany})</NavLink>
        </li>
    </ul>
<Outlet/>
</div>
  )
}

export default TradersTradeBook;