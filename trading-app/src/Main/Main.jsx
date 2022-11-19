import React, {useEffect} from 'react'
import {BrowserRouter, Routes, Route} from "react-router-dom";
import MainSideBar from './MainSideBar';
import Brokerage from './TradingAccounts/Brokerage';
import TradingAccounts from './TradingAccounts/TradingAccounts';
import TradingACMain from './TradingAccounts/TradingACMain';
import TradingARToken from './TradingAccounts/TradingARToken';
import "./Main.css";
import InstrumentsMain from './Instruments/InstrumentsMain';
import Instruments from './Instruments/Instruments';
import DashboardMain from './Dashboard/DashboardMain';
import TradersDashboard from './Dashboard/TradersDashboard';
import TradingAlgo from './AlgoBox/TradingAlgo';
import AlgoMain from './AlgoBox/AlgoMain';
import InstrumentMapping from './AlgoBox/InstrumentMapping';
import ExchangeMapping from './AlgoBox/ExchangeMapping'
import ProductMapping from './AlgoBox/ProductMapping';
import CompanyPosition from './Dashboard/companyPosition/CompanyPosition';
import TradersPosition from './Dashboard/tradersPosition/TradersPosition';
import CompanyOrders from './Dashboard/CompanyOrders';
import TradersOrders from './Dashboard/TradersOrders';
import Tradingparameters from './TradingAccounts/Tradingparameters';
import UserMain from './User/UserMain';
import Users from './User/Users';
import Roles from './User/Roles';
import TraderPosition from './Dashboard/tradersPosition/TradersPosition';
import LogInForm from '../initialForm/LogInForm';



export default function Main() {

  const dashboardPage = async ()=>{
    try{
        const res = await fetch("http://localhost:5000/dashboard", {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            credentials: "include"
        });

        const data = await res.json();
        console.log(data);

        if(!res.status === 200){
            throw new Error(res.error);
        }
    } catch(err){

    }
}
useEffect(()=>{
    dashboardPage();
}, [])


  return (
    <>
        <BrowserRouter>
        <div className='main'>
        <Routes>
        <Route path='/' element={<LogInForm/>} />
        </Routes>
            <div className='left_Side_comp'>
                <MainSideBar/>
            </div>
            <div className='right_Side_comp'>
                <Routes>
                    <Route path='/tradingAccount' element={<TradingACMain/>}>
                        <Route path='/tradingAccount' element={<TradingAccounts/>}></Route>
                        <Route path='/tradingAccount/Tradingparameters' element={<Tradingparameters/>} />
                        <Route path='/tradingAccount/brokerage' element={<Brokerage/>}></Route>
                        <Route path='/tradingAccount/accessrequesttoken' element={<TradingARToken/>} />
                    </Route> 

                    <Route path='/Instrument' element={<InstrumentsMain/>}>
                      <Route path='/Instrument' element={<Instruments/>}/>
                    </Route>
                  
                    <Route path='/dashboard' element={<DashboardMain/>}>
                      <Route path='/dashboard' element={<TradersDashboard/>}></Route>
                      <Route path='/dashboard/CompanyPosition' element={<CompanyPosition/>}></Route>
                      <Route path='/dashboard/TradersPosition' element={<TradersPosition/>}></Route>
                      <Route path='/dashboard/CompanyOrders' element={<CompanyOrders/>}></Route>
                      <Route path='/dashboard/TradersOrders' element={<TradersOrders/>}></Route>
                    
                    </Route>
                      <Route path='/algobox' element={<AlgoMain/>}>
                      <Route path='/algobox' element={<TradingAlgo/>}></Route>
                      <Route path='/algobox/InstrumentMapping' element={<InstrumentMapping/>}></Route>
                      <Route path='/algobox/ExchangeMapping' element={<ExchangeMapping/>}></Route>
                      <Route path='/algobox/ProductMapping' element={<ProductMapping/>}></Route>
                    </Route>
                    
                      <Route path='/user' element={<UserMain/>}>
                      <Route path='/user' element={<Users/>}></Route>
                      <Route path='/user/roles' element={<Roles/>}></Route>
                    
                    </Route>
                </Routes>
            </div>
          </div>
        </BrowserRouter>
    </>
  )
}
