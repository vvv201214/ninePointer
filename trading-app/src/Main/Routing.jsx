import React from 'react'
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LogInForm from '../initialForm/LogInForm';
import NewMain from './NewMain';
import AuthContext, { userContext } from './AuthContext';
import { useContext } from 'react';
import InstrumentsMain from './Instruments/InstrumentsMain';
import Instruments from './Instruments/Instruments';
import TradingACMain from './TradingAccounts/TradingACMain';
import TradingAccounts from './TradingAccounts/TradingAccounts';
import Tradingparameters from './TradingAccounts/Tradingparameters';
import Brokerage from './TradingAccounts/Brokerage';
import TradingARToken from './TradingAccounts/TradingARToken';
import AlgoMain from './AlgoBox/AlgoMain';
import TradingAlgo from './AlgoBox/TradingAlgo';
import InstrumentMapping from './AlgoBox/InstrumentMapping';
import ExchangeMapping from './AlgoBox/ExchangeMapping';
import ProductMapping from './AlgoBox/ProductMapping';
import UserMain from './User/UserMain';
import Users from './User/Users';
import Roles from './User/Roles';
import DashboardMain from './Dashboard/DashboardMain';
import CompanyPosition from './Dashboard/companyPosition/CompanyPosition';
import CompanyOrders from './Dashboard/CompanyOrders';
import TradersOrders from './Dashboard/TradersOrders';
import TradersPosition from './Dashboard/tradersPosition/TradersPosition';
import "./Main.css"
import UserSelect from './User/UserSelect/UserSelect';
import ReportsMain from './Reports/ReportsMain';
import Reports from './Reports/Reports';
import SummaryMain from './AdminDashboard/SummaryDashboard/SummaryMain';
import Summary from './AdminDashboard/SummaryDashboard/Summary';
import PNLReport from './AdminDashboard/PNLReport/PNLReport';
import DailyPNLReport from './AdminDashboard/DailyPNLReport/DailyPNLReport';
import TraderMetrics from './AdminDashboard/TraderMetrics/TraderMetrics';
import TraderPosition from './Dashboard/newTraderPosition/NewTraderPosition';
import UserFundsMain from './UserFunds/UserFundsMain';
import UserFunds from './UserFunds/UserFunds';
import TodaysSummaryMain from './TodaysSummary/TodaysSummaryMain';
import TodaysSummary from './TodaysSummary/TodaysSummary';
import TodaysTradesMock from './Dashboard/CompanyOrderTabs/TodaysTradesMock';
import HistoryTradesMock from './Dashboard/CompanyOrderTabs/HistoryTradesMock';
import CompanyTodaysTradesLive from './Dashboard/CompanyOrderTabs/CompanyTodaysTradesLive';
import CompanyHistoryTradesLive from './Dashboard/CompanyOrderTabs/CompanyHistoryTradesLive';
import TodaysTrades from './Dashboard/TraderOrdersTabs/TodaysTrades';
import HistoryTrades from './Dashboard/TraderOrdersTabs/HistoryTrades';
import Dashboard from './Dashboard/Dashboard';
import TradersTradeBook from './Dashboard/TradersTradeBook';
import TodaysTradersTrade from './Dashboard/TradersTradeBook/TodaysTradersTrade';
import HistoryTradersTrade from './Dashboard/TradersTradeBook/HistoryTradersTrade';
import TraderwiseAllPnl from './AdminDashboard/traderwisePnlReport/TraderwiseAllPnl';
import TraderView from './AdminDashboard/TraderView/TraderView';




export default function Routing() {

    const [orderCountHistoryCompany, setOrderCountHistoryCompany] = useState(0);
    const [orderCountHistoryUser, setOrderCountHistoryUser] = useState(0);
    const [orderCountTodayCompany, setOrderCountTodayCompany] = useState(0);
    const [orderCountTodayUser, setOrderCountTodayUser] = useState(0);
    const [details, setDetails] = useState({});
    return (
        <AuthContext>
            <BrowserRouter>
                <>
                    <Routes>
                        <Route path='/' element={<LogInForm />} />
                        <Route path='/main' element={<NewMain setter={setDetails} />}>

                            <Route path='/main/tradingAccount' element={<TradingACMain />} className="head">
                                <Route path='/main/tradingAccount/' element={<TradingAccounts />}></Route>
                                {/* <Route path='/main/Tradingparameters' element={<Tradingparameters/>} /> */}
                                <Route path='/main/tradingAccount/brokerage/' element={<Brokerage />}></Route>
                                <Route path='/main/tradingAccount/accessrequesttoken/' element={<TradingARToken />} />
                            </Route>

                            <Route path='/main/instrument' element={<InstrumentsMain />}>
                                <Route path='/main/instrument/' element={<Instruments />} />
                            </Route>

                            <Route path='/main/algobox' element={<AlgoMain />}>
                                <Route path='/main/algobox/' element={<TradingAlgo />}></Route>
                                <Route path='/main/algobox/InstrumentMapping/' element={<InstrumentMapping />}></Route>
                                <Route path='/main/algobox/ExchangeMapping/' element={<ExchangeMapping />}></Route>
                                <Route path='/main/algobox/ProductMapping/' element={<ProductMapping />}></Route>
                            </Route>

                            <Route path='/main/user' element={<UserMain />}>
                                <Route path='/main/user/' element={<Users />}></Route>
                                <Route path='/main/user/roles/' element={<Roles />}></Route>
                                <Route path='/main/user/UserSelect' element={<UserSelect />}></Route>

                            </Route>
                            {/* {console.log("this is details...",details)}
                        {details.role === "admin" ? */}
                            <Route path='/main/dashboard' element={<DashboardMain />}>
                                {/* <Route path='/main/dashboard/' element={<Dashboard />}></Route> */}
                                <Route path='/main/dashboard/CompanyPosition/' element={<CompanyPosition />}></Route>
                                <Route path='/main/dashboard/TraderPosition/' element={<TraderPosition />}></Route>
                                <Route path='/main/dashboard/' element={<TradersPosition />}></Route>

                                <Route path='/main/dashboard/CompanyOrders' element={<CompanyOrders orderCountHistoryCompany={orderCountHistoryCompany} orderCountTodayCompany={orderCountTodayCompany}/>}> 
                                <Route path='/main/dashboard/CompanyOrders' element={<TodaysTradesMock setOrderCountTodayCompany={setOrderCountTodayCompany}/>} ></Route>
                                <Route path='/main/dashboard/CompanyOrders/HistoryTradesMock' element={<HistoryTradesMock setOrderCountHistoryCompany={setOrderCountHistoryCompany}/>} ></Route>
                                <Route path='/main/dashboard/CompanyOrders/CompanyTodaysTradesLive' element={<CompanyTodaysTradesLive />} ></Route>
                                <Route path='/main/dashboard/CompanyOrders/CompanyHistoryTradesLive' element={<CompanyHistoryTradesLive />} ></Route>
                            </Route>
                            <Route path='/main/dashboard/TradersOrders' element={<TradersOrders orderCountHistoryUser={orderCountHistoryUser} orderCountTodayUser={orderCountTodayUser}/>}>
                                <Route path='/main/dashboard/TradersOrders' element={<TodaysTrades info={details} setOrderCountTodayUser={setOrderCountTodayUser}/>} ></Route>
                                <Route path='/main/dashboard/TradersOrders/HistoryTrades' element={<HistoryTrades info={details} setOrderCountHistoryUser={setOrderCountHistoryUser}/>} ></Route>
                            </Route>
                                <Route path='/main/dashboard/TradersTradeBook' element={<TradersTradeBook orderCountHistoryCompany={orderCountHistoryCompany} orderCountTodayCompany={orderCountTodayCompany} />}>
                                    <Route path='/main/dashboard/TradersTradeBook/' element={<TodaysTradersTrade setOrderCountTodayCompany={setOrderCountTodayCompany}/>} ></Route>
                                    <Route path='/main/dashboard/TradersTradeBook/HistoryTradersTrade/' element={<HistoryTradersTrade setOrderCountHistoryCompany={setOrderCountHistoryCompany}/>} ></Route>
                                </Route>

                            </Route>
                            <Route path='/main/report' element={<ReportsMain />}>
                                <Route path='/main/report/' element={<Reports />}></Route>
                            </Route>
                            <Route path='/main/admindashboard/summary' element={<SummaryMain/>}>
                                {/* <Route path='/main/admindashboard/summary/' element={<Summary/>}></Route> */}
                                <Route path='/main/admindashboard/summary/pnlreport/' element={<PNLReport/>}></Route>
                                <Route path='/main/admindashboard/summary/dailypnlreport/' element={<DailyPNLReport/>}></Route>
                                <Route path='/main/admindashboard/summary/traderpnlreport/' element={<TraderwiseAllPnl/>}></Route>
                                <Route path='/main/admindashboard/summary/tradermetrics/' element={<TraderMetrics/>}></Route>
                                <Route path='/main/admindashboard/summary/traderview/' element={<TraderView/>}></Route>
                            </Route>
                            <Route path='/main/userfunds' element={<UserFundsMain />}>
                                <Route path='/main/userfunds/' element={<UserFunds />}></Route>
                            </Route>
                            <Route path='/main/todayssummary' element={<TodaysSummaryMain />}>
                                <Route path='/main/todayssummary/' element={<TodaysSummary />}></Route>
                            </Route>
                            
                            
                            {/* // :
                        // <Route path='/main/dashboard' element={<DashboardMain/>}>
                        //     <Route path='/main/dashboard' element={<TradersPosition/>}></Route>
                        //     <Route path='/main/dashboard/TradersOrders' element={<TradersOrders info={details}/>}></Route>
                        // </Route> }                         */}
                        </Route>
                    </Routes>
                </>
            </BrowserRouter>
        </AuthContext>
    )
}
