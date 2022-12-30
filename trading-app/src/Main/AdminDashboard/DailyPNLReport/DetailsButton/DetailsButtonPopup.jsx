import React, { useState } from 'react'
import Styles from "./DetailsButtonPopup.module.css";

const DetailsButtonPopup = () => {

    const [modal, setModal] = useState(false);
    const toggleModal = () => {
        setModal(!modal);
    };

    if (modal) {
        document.body.classList.add('active-modal')
    } else {
        document.body.classList.remove('active-modal')
    }

    function closeHandler(){
        setModal(!modal);
    }
    return (
        <div>
            <button onClick={toggleModal}>Details</button>

            {modal && (
                <div className="modal">
                    <div onClick={toggleModal} className="overlay"></div>

                    <div className={Styles.modalContent}>
                        <div className={Styles.headingDiv}>
                            <div className={Styles.dateDiv}>
                                <span className={Styles.date}>Date-</span>&nbsp;&nbsp; <span className={Styles.dateData}>12-12-2022</span>
                            </div>
                            <div className={Styles.TradersNumberDiv}>
                                <span className={Styles.date}>Number Of Traders -</span>&nbsp;&nbsp;<span className={Styles.dateData}>10</span>
                            </div>
                        </div>
                        <div className={Styles.grid_11}>
                            <table className="grid1_table">
                                <tr className="tableheader">
                                    <th className="grid2_th">Trader Name</th>
                                    <th className="grid2_th">Gross(C-P&L)</th>
                                    <th className="grid2_th">Tran. Cost(C)</th>
                                    <th className="grid2_th">Net(C-P&L)</th>
                                    <th className="grid2_th">Gross(T-P&L)</th>
                                    <th className="grid2_th">Tran. Cost(T)</th>
                                    <th className="grid2_th">Net(T-P&L)</th>
                                    <th className="grid2_th"># of Trades</th>
                                </tr>
                                <tr className="tableheader">
                                    <td className="grid2_td">1</td>
                                    <td className="grid2_td">2</td>
                                    <td className="grid2_td">3</td>
                                    <td className="grid2_td">4</td>
                                    <td className="grid2_td">5</td>
                                    <td className="grid2_td">5</td>
                                    <td className="grid2_td">5</td>
                                    <td className="grid2_td">5</td>
                                </tr>
                                <tr className="tableheader">
                                    <td className="grid2_td">TOTAL</td>
                                    <td className="grid2_td"></td>
                                    <td className="grid2_td"></td>
                                    <td className="grid2_td"></td>
                                    <td className="grid2_td"></td>
                                    <td className="grid2_td"></td>
                                    <td className="grid2_td"></td>
                                    <td className="grid2_td"></td>
                                </tr>
                            </table>
                        </div>
                        <button className={Styles.ACform_tbn} onClick={closeHandler}>Close</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default DetailsButtonPopup