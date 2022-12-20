import Styles from "./Summary.module.css";
import React, { useContext, useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { userContext } from "../../AuthContext";


export default function Summary() {
    const getDetails = useContext(userContext);
    const [userDetail, setUserDetail] = useState([]);
    const [userTradeDetails, setUserTradeDetails] = useState([]);
    let baseUrl = process.env.NODE_ENV === "production" ? "/" : "http://localhost:5000/"
    let [firstDate, setFirstDate] = useState("");
    const [selectUserState, setSelectUserState] = useState("All User");
    let secondDate = "";
    let userId = (getDetails.userDetails.role === "admin") && getDetails.userDetails.email;


    return (
        <div className={Styles.topbox}>
            
            <table>
                <tr>
                    <td>
                        <table>
                        <div className={Styles.blinkitlive}>🟢 Company P&L(Live)</div>
                            <tr>
                                <td className={Styles.topboxlive}>
                                    <table>
                                        <tr>
                                        <td>Gross P&L</td>
                                        <td>+25,000</td>
                                        </tr>
                                    </table>
                                </td>
                                <td className={Styles.topboxlive}>Some Text Here</td>
                                <td className={Styles.topboxlive}>Some Text Here</td>
                            </tr>
                            <tr>
                                <td className={Styles.topboxlive}>Some Text Here</td>
                                <td className={Styles.topboxlive}>Some Text Here</td>
                                <td className={Styles.topboxlive}>Some Text Here</td>
                            </tr>
                        </table>
                    </td>
                    <td>
                        <table>
                        <div className={Styles.blinkitlive}>🟢 Trader P&L(Live)</div>
                            <tr>
                                <td className={Styles.topboxlive}>Some Text Here</td>
                                <td className={Styles.topboxlive}>Some Text Here</td>
                                <td className={Styles.topboxlive}>Some Text Here</td>
                            </tr>
                            <tr>
                                <td className={Styles.topboxlive}>Some Text Here</td>
                                <td className={Styles.topboxlive}>Some Text Here</td>
                                <td className={Styles.topboxlive}>Some Text Here</td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td>
                        <table>
                        <div className={Styles.blinkitmock}>🔵 Company P&L(Mock)</div>
                            <tr>
                                <td className={Styles.topboxlive}>Some Text Here</td>
                                <td className={Styles.topboxlive}>Some Text Here</td>
                                <td className={Styles.topboxlive}>Some Text Here</td>
                            </tr>
                            <tr>
                                <td className={Styles.topboxlive}>Some Text Here</td>
                                <td className={Styles.topboxlive}>Some Text Here</td>
                                <td className={Styles.topboxlive}>Some Text Here</td>
                            </tr>
                        </table>
                    </td>
                    <td>
                        <table>
                        <div className={Styles.blinkitmock}>🔵 Trader P&L(Mock)</div>
                            <tr>
                                <td className={Styles.topboxlive}>Some Text Here</td>
                                <td className={Styles.topboxlive}>Some Text Here</td>
                                <td className={Styles.topboxlive}>Some Text Here</td>
                            </tr>
                            <tr>
                                <td className={Styles.topboxlive}>Some Text Here</td>
                                <td className={Styles.topboxlive}>Some Text Here</td>
                                <td className={Styles.topboxlive}>Some Text Here</td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
            
        </div>
    )
}