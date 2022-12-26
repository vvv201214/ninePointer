import React from "react";
import { NavLink, Outlet } from 'react-router-dom';
import style from "./CompanyOrderTabs/CompanyOrder.module.css";

export default function TradersOrders({orderCountTodayUser, orderCountHistoryUser}){
    return(
        <div className={style.Companyorder_div}>        
            <ul className={style.Companyorder_ul}>
                <li className={style.Companyorder_li}>
                    <NavLink className='headers_li_links' to={"/main/dashboard/TradersOrders/"} style={({isActive}) => isActive?{color: "#5479FC"} :{color:'black'} }>Today's Trades-({orderCountTodayUser})</NavLink>
                </li>
                <li className={style.Companyorder_li}>
                    <NavLink className='headers_li_links' to={"/main/dashboard/TradersOrders/HistoryTrades/"} style={({isActive}) => isActive?{color: "#5479FC"} :{color:'black'} }>History Trades-({orderCountHistoryUser})</NavLink>
                </li>
            </ul>
        <Outlet/>
        </div>
    )
}