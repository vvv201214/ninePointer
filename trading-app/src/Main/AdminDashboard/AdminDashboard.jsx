import React from "react";
import Styles from "./AdminDashboard.module.css";

export default function AdminDashboard() {
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