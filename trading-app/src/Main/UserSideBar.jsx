import React from 'react'
import { NavLink } from 'react-router-dom'

export default function UserSideBar({name}) {
    return (
        <>
            <div className="leftsidebar">
                <div className="userSidebar_div">
                <div className="userbox"><img className="userimage" src="https://png.pngtree.com/png-vector/20190704/ourlarge/pngtree-businessman-user-avatar-free-vector-png-image_1538405.jpg" alt=""/><h6 className="username">{name}</h6></div>
                    <div className="menuheader">Analytics</div>
                    <NavLink to="/main/dashboard" style={({isActive}) => isActive?{color:'#5479FC'} :{color:'black'} }><div className="sidebar_items"><img className="linkicons" src={require("../media/Dashboard.png")}></img><div className="menuitembar">Dashboard</div></div></NavLink>
                    <NavLink to="/main/userfunds" style={({isActive}) => isActive?{color:'#5479FC'} :{color:'black'} }><div className="sidebar_items"><img className="linkicons" src={require("../media/funds.png")}></img><div className="menuitembar">Funds</div></div></NavLink>
                    <div className="menuheader">Reports</div>
                    <NavLink to="/main/report" style={({isActive}) => isActive?{color:'#5479FC'} :{color:'black'} }><div className="sidebar_items"><img className="linkicons" src={require("../media/reports.png")}></img><div className="menuitembar">P&L Report</div></div></NavLink>
                </div>
                <div >
                    <div className="sidebar_item" style={{color:'black'} }><NavLink to={"/"}>Go Out</NavLink></div>
                </div>
    
            </div>
        </>
      )
    
}