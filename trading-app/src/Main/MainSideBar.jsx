import React from 'react'
import { NavLink } from 'react-router-dom'

export default function MainSideBar() {
  return (
    <>
        <div className="leftsidebar">
            <div className="userSidebar_div">
                <img src="https://png.pngtree.com/png-vector/20190704/ourlarge/pngtree-businessman-user-avatar-free-vector-png-image_1538405.jpg" alt="" />
                <h6 className="sidbar_h6">ADMIN</h6>
                <div className="sidebar_items"><NavLink to="/">Dashboard</NavLink></div>
                <div className="sidebar_items"><NavLink to={"/instrument"}>Instruments</NavLink></div>
                <div className="sidebar_items"><NavLink to={"/tradingAccount"}>Trading Accounts</NavLink></div>
                <div className="sidebar_items"><NavLink to={"/user"}>Users</NavLink></div>
                <div className="sidebar_items"><NavLink to={"/report"}>Reports</NavLink></div>
                <div className="sidebar_items"><NavLink to={"/algobox"}>Algo Box</NavLink></div>
            </div>
            <div >
                <div className="sidebar_item">Go Out</div>
            </div>

        </div>
    </>
  )
}
