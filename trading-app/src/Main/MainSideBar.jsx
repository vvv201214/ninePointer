import React from 'react'
import { NavLink } from 'react-router-dom'

export default function MainSideBar() {
  return (
    <>
        <div className="leftsidebar">
            <div className="userSidebar_div">
                <img src="https://png.pngtree.com/png-vector/20190704/ourlarge/pngtree-businessman-user-avatar-free-vector-png-image_1538405.jpg" alt="" />
                <h6 className="sidbar_h6">ADMIN</h6>
                <div className="sidebar_items"><NavLink to="/dashboard" style={({isActive}) => isActive?{color:'white'} :{color:'black'} }>Dashboard</NavLink></div>
                <div className="sidebar_items"><NavLink to="/instrument" style={({isActive}) => isActive?{color:'white'} :{color:'black'} }>Instruments</NavLink></div>
                <div className="sidebar_items"><NavLink to="/tradingAccount" style={({isActive}) => isActive?{color:'white'} :{color:'black'} }>Trading Accounts</NavLink></div>
                <div className="sidebar_items"><NavLink to="/user" style={({isActive}) => isActive?{color:'white'} :{color:'black'} }>Users</NavLink></div>
                <div className="sidebar_items"><NavLink to="/report" style={({isActive}) => isActive?{color:'white'} :{color:'black'} }>Reports</NavLink></div>
                <div className="sidebar_items"><NavLink to="/algobox" style={({isActive}) => isActive?{color:'white'} :{color:'black'} }>Algo Box</NavLink></div>
            </div>
            <div >
                <div className="sidebar_item">Go Out</div>
            </div>

        </div>
    </>
  )
}
