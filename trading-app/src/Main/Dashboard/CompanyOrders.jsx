import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink, Outlet } from 'react-router-dom';
import style from "./CompanyOrderTabs/CompanyOrder.module.css";


export default function CompanyOrders(){

    const [orderCountHistoryCompany, setOrderCountHistoryCompany] = useState(0);
    const [orderCountTodayCompany, setOrderCountTodayCompany] = useState(0);
    const [orderCountLiveHistoryCompany, setOrderCountLiveHistoryCompany] = useState(0);
    const [orderCountLiveTodayCompany, setOrderCountLiveTodayCompany] = useState(0);

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

        axios.get(`${baseUrl}api/v1/readliveTradecompanycount`)
        .then((res)=>{
            setOrderCountLiveHistoryCompany((res.data));
        }).catch((err)=>{
            window.alert("Server Down");
            return new Error(err);
        })

        axios.get(`${baseUrl}api/v1/readliveTradecompanycountToday`)
        .then((res)=>{
            setOrderCountLiveTodayCompany((res.data));
        }).catch((err)=>{
            window.alert("Server Down");
            return new Error(err);
        })

    });

    return(
        <div className={style.Companyorder_div}>
            <ul className={style.Companyorder_ul}>
                <li className={style.Companyorder_li}>
                    <NavLink className='headers_li_links' to={"/main/dashboard/CompanyOrders/"} style={({isActive}) => isActive?{color: "#5479FC"} :{color:'black'} }>Today's Trades(Mock-{orderCountTodayCompany})</NavLink>
                </li>
                <li className={style.Companyorder_li}>
                    <NavLink className='headers_li_links' to={"/main/dashboard/CompanyOrders/HistoryTradesMock/"} style={({isActive}) => isActive?{color: "#5479FC"} :{color:'black'} }>History Trades(Mock-{orderCountHistoryCompany})</NavLink>
                </li>
                <li className={style.Companyorder_li}>
                    <NavLink className='headers_li_links' to={"/main/dashboard/CompanyOrders/CompanyTodaysTradesLive/"} style={({isActive}) => isActive?{color: "#5479FC"} :{color:'black'} }>Today's Trades(Live-{orderCountLiveTodayCompany})</NavLink>
                </li>
                <li className={style.Companyorder_li}>
                    <NavLink className='headers_li_links' to={"/main/dashboard/CompanyOrders/CompanyHistoryTradesLive/"} style={({isActive}) => isActive?{color: "#5479FC"} :{color:'black'} }>History Trades(Live-{orderCountLiveHistoryCompany})</NavLink>
                </li>

            </ul>
        <Outlet/>
        </div>
    )
}


