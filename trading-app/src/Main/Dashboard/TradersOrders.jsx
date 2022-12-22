import React from "react";
import { NavLink, Outlet } from 'react-router-dom';
import HistoryTradesMock from "./CompanyOrderTabs/HistoryTradesMock";
import TodaysTradesMock from "./CompanyOrderTabs/TodaysTradesMock";
import style from "./CompanyOrderTabs/CompanyOrder.module.css";

export default function TradersOrders(){
    return(
        <div className={style.Companyorder_div}>        
            <ul className={style.Companyorder_ul}>
                <li className={style.Companyorder_li}>
                    <NavLink to={"/main/dashboard/TradersOrders"}>Today's Trades</NavLink>
                </li>
                <li className={style.Companyorder_li}>
                    <NavLink to={"/main/dashboard/TradersOrders/HistoryTrades"}>History Trades</NavLink>
                </li>
            </ul>
        <Outlet/>
        </div>
    )
}