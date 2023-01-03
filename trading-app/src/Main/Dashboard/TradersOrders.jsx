import React, { useContext, useState } from "react";
import { useEffect } from "react";
import { NavLink, Outlet } from 'react-router-dom';
import { userContext } from "../AuthContext";
import style from "./CompanyOrderTabs/CompanyOrder.module.css";
import axios from "axios";

export default function TradersOrders(){

    let baseUrl = process.env.NODE_ENV === "production" ? "/" : "http://localhost:5000/"

    const getDetails = useContext(userContext);
    const [todayCount, setTodayCount] = useState(0);
    const [allCount, setAllCount] = useState(0);

    useEffect(()=>{
        axios.get(`${baseUrl}api/v1/readmocktradecompanycountbyemail/${getDetails.userDetails.email}`)
        .then((res)=>{
            setAllCount((res.data));
        }).catch((err)=>{
            window.alert("Server Down");
            return new Error(err);
        })

        axios.get(`${baseUrl}api/v1/readmocktradeusercountTodaybyemail/${getDetails.userDetails.email}`)
        .then((res)=>{
            setTodayCount((res.data));
        }).catch((err)=>{
            window.alert("Server Down");
            return new Error(err);
        })

    }, [])

    return(
        <div className={style.Companyorder_div}>        
            <ul className={style.Companyorder_ul}>
                <li className={style.Companyorder_li}>
                    <NavLink className='headers_li_links' to={"/main/dashboard/TradersOrders/"} style={({isActive}) => isActive?{color: "#5479FC"} :{color:'black'} }>Today's Trades-({todayCount})</NavLink>
                </li>
                <li className={style.Companyorder_li}>
                    <NavLink className='headers_li_links' to={"/main/dashboard/TradersOrders/HistoryTrades/"} style={({isActive}) => isActive?{color: "#5479FC"} :{color:'black'} }>History Trades-({allCount})</NavLink>
                </li>
            </ul>
        <Outlet/>
        </div>
    )
}