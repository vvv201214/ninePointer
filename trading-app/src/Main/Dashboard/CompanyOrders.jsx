import React from "react";
import { NavLink, Outlet } from 'react-router-dom';
import style from "./CompanyOrderTabs/CompanyOrder.module.css";

export default function CompanyOrders(){
    return(
        <div className={style.Companyorder_div}>        
            <ul className={style.Companyorder_ul}>
                <li className={style.Companyorder_li}>
                    <NavLink to={"/main/dashboard/CompanyOrders/"}style={({isActive}) => isActive?{backgroundColor: "white", borderRadius: "3px"} :{Color:'black'} }>Today's Trades(Mock)</NavLink>
                </li>
                <li className={style.Companyorder_li}>
                    <NavLink to={"/main/dashboard/CompanyOrders/HistoryTradesMock/"}style={({isActive}) => isActive?{backgroundColor: "white", borderRadius: "3px"} :{Color:'black'} }>History Trades(Mock)</NavLink>
                </li>
            </ul>
        <Outlet/>
        </div>
    )
}


