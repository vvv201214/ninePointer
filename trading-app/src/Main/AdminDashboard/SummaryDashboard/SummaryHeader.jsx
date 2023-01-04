import React, { useContext } from 'react'
import { NavLink, Outlet } from 'react-router-dom';

export default function SummaryHeader({role}) {

  return (
    <>
        <div className='navbarlinks'>
            <ul className='navbar'>
                <li>
                    <NavLink className='headers_li_links' style={({isActive}) => isActive?{color: "#5479FC"} :{color:'black'} } to={"/main/admindashboard/summary/"}>Summary</NavLink>
                </li>
                <li>
                    <NavLink className='headers_li_links' style={({isActive}) => isActive?{color: "#5479FC"} :{color:'black'} } to={"/main/admindashboard/summary/pnlreport/"}>Company Daily P&L(Trader-Wise)</NavLink>
                </li>
                <li>
                    <NavLink className='headers_li_links' style={({isActive}) => isActive?{color: "#5479FC"} :{color:'black'} } to={"/main/admindashboard/summary/dailypnlreport/"}>Company Daily P&L</NavLink>
                </li>
                <li>
                    <NavLink className='headers_li_links' style={({isActive}) => isActive?{color: "#5479FC"} :{color:'black'} } to={"/main/admindashboard/summary/traderpnlreport/"}>Trader P&L</NavLink>
                </li>
                <li>
                    <NavLink className='headers_li_links' style={({isActive}) => isActive?{color: "#5479FC"} :{color:'black'} } to={"/main/admindashboard/summary/tradermetrics/"}>Trader Metrics</NavLink>
                </li>
            </ul>
           
            <Outlet/>
        </div>
                   {/* <div class="collapse navbar-collapse" id="navigation">
              <ul class="navbar-nav mx-auto">
                <li class="nav-item">
                  <a class="nav-link d-flex align-items-center me-2 active" aria-current="page" href="../pages/dashboard.html">
                    <i class="fa fa-chart-pie opacity-6 text-dark me-1"></i>
                    Dashboard
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link me-2" href="../pages/profile.html">
                    <i class="fa fa-user opacity-6 text-dark me-1"></i>
                    Profile
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link me-2" href="../pages/sign-up.html">
                    <i class="fas fa-user-circle opacity-6 text-dark me-1"></i>
                    Sign Up
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link me-2" href="../pages/sign-in.html">
                    <i class="fas fa-key opacity-6 text-dark me-1"></i>
                    Sign In
                  </a>
                </li>
              </ul>
              <ul class="navbar-nav d-lg-flex d-none">
                <li class="nav-item d-flex align-items-center">
                  <a class="btn btn-outline-primary btn-sm mb-0 me-2" target="_blank" href="https://www.creative-tim.com/builder/material?ref=navbar-dashboard">Online Builder</a>
                </li>
                <li class="nav-item">
                  <a href="https://www.creative-tim.com/product/material-dashboard" class="btn btn-sm mb-0 me-1 bg-gradient-dark">Free download</a>
                </li>
              </ul>
              <Outlet/>
            </div> */}
    </>
  )
}