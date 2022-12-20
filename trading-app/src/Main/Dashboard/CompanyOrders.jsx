import React from "react";
import { NavLink, Outlet } from 'react-router-dom';
import HistoryTradesMock from "./CompanyOrderTabs/HistoryTradesMock";
import TodaysTradesMock from "./CompanyOrderTabs/TodaysTradesMock";
import style from "./CompanyOrderTabs/CompanyOrder.module.css";

export default function CompanyOrders(){
    return(
        <div>
        <ul className={style.Companyorder_ul}>
         <li className={style.Companyorder_li}>
            <NavLink to={"/main/dashboard/CompanyOrders"}>TodaysTradesMock</NavLink>
        </li>
        <li className={style.Companyorder_li}>
            <NavLink to={"/main/dashboard/CompanyOrders/HistoryTradesMock"}>HistoryTradesMock</NavLink>
        </li>
        </ul>
        <Outlet/>
        </div>
    )
}