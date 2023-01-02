import React from 'react'
import { NavLink } from 'react-router-dom'
import "./assets/css/material-dashboard.css?v=3.0.4";
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import CandlestickChartOutlinedIcon from '@mui/icons-material/CandlestickChartOutlined';
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import AccountBalanceOutlinedIcon from '@mui/icons-material/AccountBalanceOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import SummarizeOutlinedIcon from '@mui/icons-material/SummarizeOutlined';
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';
import { style } from '@mui/system';


export default function MainSideBar({name}) {
  return (
    <>
        <div class="g-sidenav-show  bg-gray-100">
          <aside class="sidenav navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-3   bg-gradient-dark"
    id="sidenav-main">

          <div class="sidenav-header">
          
          </div>

          <hr class="horizontal light mt-0 mb-2"/>

          <div>

            <ul className="navbar-nav">

              <li class="nav-item ">
              <NavLink to="/main/dashboard">
              <div className={`nav-link text-white`}>
              <div class="text-white text-center me-2 d-flex align-items-center justify-content-center">
              <DashboardOutlinedIcon fontSize='small'/> 
              <span class="nav-link-text ms-1">Dashboard</span></div>
              </div>
              </NavLink>
              </li>

              <li class="nav-item ">
              <NavLink to="/main/admindashboard/summary">
              <div class="nav-link text-white">
              <div class="text-white text-center me-2 d-flex align-items-center justify-content-center">
              <AdminPanelSettingsOutlinedIcon fontSize='small'/>
              <span class="nav-link-text ms-1">Admin Reports</span></div>
              </div>
              </NavLink>
              </li>

              <li class="nav-item ">
              <NavLink  to="/main/instrument">
              <div class="nav-link text-white">
              <div class="text-white text-center me-2 d-flex align-items-center justify-content-center">
              <CandlestickChartOutlinedIcon fontSize='small'/>
              <span class="nav-link-text ms-1">Instruments</span></div>
              </div>
              </NavLink>
              </li>

              <li class="nav-item ">
              <NavLink  to="/main/algobox">
              <div class="nav-link text-white">
              <div class="text-white text-center me-2 d-flex align-items-center justify-content-center">
              <ManageAccountsOutlinedIcon fontSize='small'/>
              <span class="nav-link-text ms-1">Algo Box</span></div>
              </div>
              </NavLink>
              </li>

              <li class="nav-item ">
              <NavLink  to="/main/tradingAccount">
              <div class="nav-link text-white">
              <div class="text-white text-center me-2 d-flex align-items-center justify-content-center">
              <AccountBalanceOutlinedIcon fontSize='small'/>
              <span class="nav-link-text ms-1">Trading Accounts</span></div>
              </div>
              </NavLink>
              </li>

              <li class="nav-item ">
              <NavLink  to="/main/user">
              <div class="nav-link text-white">
              <div class="text-white text-center me-2 d-flex align-items-center justify-content-center">
              <PersonOutlinedIcon fontSize='small'/>
              <span class="nav-link-text ms-1">Users</span></div>
              </div>
              </NavLink>
              </li>

              <li class="nav-item ">
              <NavLink  to="/main/userfunds">
              <div class="nav-link text-white">
              <div class="text-white text-center me-2 d-flex align-items-center justify-content-center">
              <AttachMoneyOutlinedIcon fontSize='small' />
              <span class="nav-link-text ms-1">Funds</span></div>
              </div>
              </NavLink>
              </li>

              <li class="nav-item ">
              <NavLink  to="/main/todayssummary">
              <div class="nav-link text-white">
              <div class="text-white text-center me-2 d-flex align-items-center justify-content-center">
              <SummarizeOutlinedIcon fontSize='small'/>
              <span class="nav-link-text ms-1">Today's Summary</span></div>
              </div>
              </NavLink>
              </li>

              <li class="nav-item ">
              <NavLink  to="/main/report">
              <div class="nav-link text-white">
              <div class="text-white text-center me-2 d-flex align-items-center justify-content-center">
              <AssessmentOutlinedIcon fontSize='small'/>
              <span class="nav-link-text ms-1">Reports</span></div>
              </div>
              </NavLink>
              </li>

              {/* <li class="nav-item ">
              <NavLink  to="/">
              <div class="nav-link text-white">
              <div class="text-white text-center me-2 d-flex align-items-center justify-content-center">
              <span class="material-icons opacity-10"><img className="linkicons" src={require("../media/reports.png")}/></span>
              <span class="nav-link-text ms-1">Go Out</span></div>
              </div>
              </NavLink>
              </li> */}

              <div class="sidenav-footer position-absolute w-100 bottom-0 ">
              <NavLink  to="/">
                <div class="mx-3">
                  <a class="btn bg-gradient-primary mt-4 w-100" type="button">Go Out</a>
                </div>
                </NavLink>
              </div>
 
            </ul>
            
           
                

          </div>
          </aside>

        </div>
        
          
            
           
      
    </>
  )
}