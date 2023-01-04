import React from 'react'
import { NavLink } from 'react-router-dom';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';

export default function UserSideBar({name}) {
    return (
        <>
          <div class="g-sidenav-show  bg-gray-100">
          <aside class="sidenav navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-3   bg-gradient-dark" id="sidenav-main">
          <div class="sidenav-header">
          <div class="mx-3">
          <div class="btnnew bg-gradient-primary text-lowercase mt-4 w-100"><span>ninepointer</span></div>
          </div>
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
                    <NavLink  to="/main/userfunds">
                    <div class="nav-link text-white">
                    <div class="text-white text-center me-2 d-flex align-items-center justify-content-center">
                    <AttachMoneyOutlinedIcon fontSize='small' />
                    <span class="nav-link-text ms-1">Funds</span></div>
                    </div>
                    </NavLink>
                </li>


                <li class="nav-item ">
                    <NavLink  to="/main/report">
                    <div class="nav-link text-white">
                    <div class="text-white text-center me-2 d-flex align-items-center justify-content-center">
                    <AssessmentOutlinedIcon fontSize='small'/>
                    <span class="nav-link-text ms-1">P&L Report</span></div>
                    </div>
                    </NavLink>
                </li>

                <div class="sidenav-footer position-absolute w-100 bottom-0 ">
                    <NavLink  to="/">
                    <div class="mx-3">
                    <a class="btnnew bg-gradient-primary mt-4 w-100" type="button">Go Out</a>
                    </div>
                    </NavLink>
              </div>
            </ul>
          </div>


    </aside>
    </div>

























            {/* <div className="leftsidebar">
                <div className="userSidebar_div">
                    <div className="menuheader">Analytics</div>
                    <NavLink to="/main/dashboard" style={({isActive}) => isActive?{color:'#5479FC'} :{color:'black'} }><div className="sidebar_items"><img className="linkicons" src={require("../media/Dashboard.png")}></img><div className="menuitembar">Dashboard</div></div></NavLink>
                    <NavLink to="/main/userfunds" style={({isActive}) => isActive?{color:'#5479FC'} :{color:'black'} }><div className="sidebar_items"><img className="linkicons" src={require("../media/funds.png")}></img><div className="menuitembar">Funds</div></div></NavLink>
                    <div className="menuheader">Reports</div>
                    <NavLink to="/main/report" style={({isActive}) => isActive?{color:'#5479FC'} :{color:'black'} }><div className="sidebar_items"><img className="linkicons" src={require("../media/reports.png")}></img><div className="menuitembar">P&L Report</div></div></NavLink>
                </div>
                <div >
                    <div className="sidebar_item" style={{color:'black'} }><NavLink to={"/"}>Go Out</NavLink></div>
                </div>
    
            </div> */}
        </>
      )
    
}