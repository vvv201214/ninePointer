import React from 'react'
import {useState} from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";
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
import TradersDashboard from './Dashboard/TradersDashboard';
import CompanyPosition from './Dashboard/companyPosition/CompanyPosition';
import CompanyOrders from './Dashboard/CompanyOrders';
import TradersOrders from './Dashboard/TradersOrders';
import TradersPosition from './Dashboard/tradersPosition/TradersPosition';


export default function Routing() {
  return (
        <AuthContext>
            <BrowserRouter>
            <div className='main'>
            <div className='right_Side_comp'>
                <Routes>
                    <Route path='/' element={<LogInForm/>} />
                    <Route path='/main' element={<NewMain/>}>

                        <Route path='/main/tradingAccount' element={<TradingACMain/>}>
                            <Route path='/main/tradingAccount' element={<TradingAccounts/>}></Route>
                            <Route path='/main/tradingAccount/Tradingparameters' element={<Tradingparameters/>} />
                            <Route path='/main/tradingAccount/brokerage' element={<Brokerage/>}></Route>
                            <Route path='/main/tradingAccount/accessrequesttoken' element={<TradingARToken/>} />
                        </Route> 

                        <Route path='/main/instrument' element={<InstrumentsMain/>}>
                            <Route path='/main/instrument' element={<Instruments/>}/>
                        </Route>


                        <Route path='/main/algobox' element={<AlgoMain/>}>
                        <Route path='/main/algobox' element={<TradingAlgo/>}></Route>
                        <Route path='/main/algobox/InstrumentMapping' element={<InstrumentMapping/>}></Route>
                        <Route path='/main/algobox/ExchangeMapping' element={<ExchangeMapping/>}></Route>
                        <Route path='/main/algobox/ProductMapping' element={<ProductMapping/>}></Route>
                        </Route>
                        
                        <Route path='/main/user' element={<UserMain/>}>
                        <Route path='/main/user' element={<Users/>}></Route>
                        <Route path='/main/user/roles' element={<Roles/>}></Route>
                        </Route>

                        <Route path='/main/dashboard' element={<DashboardMain/>}>
                            <Route path='/main/dashboard' element={<TradersDashboard/>}></Route>
                            <Route path='/main/dashboard/CompanyPosition' element={<CompanyPosition/>}></Route>
                            <Route path='/main/dashboard/TradersPosition' element={<TradersPosition/>}></Route>
                            <Route path='/main/dashboard/CompanyOrders' element={<CompanyOrders/>}></Route>
                            <Route path='/main/dashboard/TradersOrders' element={<TradersOrders/>}></Route>
                        </Route>

                        
                    </Route>
                </Routes>
                </div>
                </div>
            </BrowserRouter>
        </AuthContext>
  )
}
