import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import style from "./TradersTradeBook/TradersTradeBook.module.css";

const TradersTradeBook = ({orderCountTodayCompany, orderCountHistoryCompany}) => {

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