import React , { useContext } from 'react'
import { userContext } from "../AuthContext";
import AdminDashHeader from './AdminDashHeader';
import AlgoHeader from "./AlgoHeader";

const AdminDashMain = () => {
    const getDetails = useContext(userContext);
    return(
        <>
            <div className="User_header">
            <h1 className="header_para">{`Hello ${getDetails.userDetails.name}! Welcome Back`}</h1>
                <button className="logo_btn" >ninepointer</button>
            </div>
            <AdminDashHeader/>
        </>
    )
}

export default AdminDashMain