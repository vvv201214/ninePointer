import React from "react";
import Styles from "./Reports.module.css";

export default function Reports() {
    return (
        <div>
            <div className="main_Container">
                <div className="right_side">
                    <div className="rightside_maindiv">
                        <div className={Styles.main_dateSelData}>
                            <div className={Styles.form_div}>
                                <form action="">
                                    <label htmlFor="" className={Styles.formLable}>Start Date</label>
                                    <input type="date" className={Styles.formInput} />
                                    <label htmlFor="" className={Styles.formLable}>End Date</label>
                                    <input type="date" className={Styles.formInput} />
                                    <label htmlFor="" className={Styles.formLable}>Trader</label>
                                    <select name="" id="" className={Styles.formSelect} >
                                        <option value="">Select User</option>
                                        <option value="">All User</option>
                                    </select>
                                </form>
                            </div>
                            <div className={Styles.btn_div}>
                                <span className={Styles.formLable}>Gross P&L</span> <input type="text" className={Styles.formInput} />
                                <span className={Styles.formLable}>Transaction Cost</span> <input type="text" className={Styles.formInput} />
                                <span className={Styles.formLable}>Net P&L</span> <input type="text" className={Styles.formInput} />
                                <button className={Styles.formButton}> Download Report</button>

                            </div>
                        </div>
                        <div className={Styles.grid_1}>
                            <table className="grid1_table">
                                <tr className="grid2_tr">
                                    <th className="grid2_th">Trader Name</th>
                                    <th className="grid2_th">Date</th>
                                    <th className="grid2_th">Gross P&L(₹)</th>
                                    <th className="grid2_th">Transaction Cost(₹)</th>
                                    <th className="grid2_th">Net PNL(₹)</th>
                                    <th className="grid2_th"># of Trades</th>
                                    <th className="grid2_th"># of Lots Used</th>
                                </tr>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}