import React, { useState } from "react";
import Styles from "./AddUser.module.css";
import UserList from "./UserList";



export default function AddUser() {

    const [modal, setModal] = useState(false);
    const toggleModal = () => {
        setModal(!modal);
    };

    if (modal) {
        document.body.classList.add('active-modal')
    } else {
        document.body.classList.remove('active-modal')
    }

    async function formbtn(e) {
        e.preventDefault();
        setModal(!modal);
    }
    return (
        <>

            <button onClick={toggleModal} className={Styles.addUserBtn}>ADD USER</button>
            
            {modal && (
                <div className="modal">
                    <div onClick={toggleModal} className="overlay"></div>
                    <div className={Styles.modalContent}>
                        <UserList/>
                        <table className={Styles.main_instrument_table}>
                            <tr className={Styles.addUser_tr}>
                                <th className={Styles.addUser_th} >User Name</th>
                                <th className={Styles.addUser_th}>Enable Trading</th>
                                <th className={Styles.addUser_th}>Enable Algo</th>
                                <th className={Styles.addUser_th}>Real Trading</th>
                            </tr>
                            <tr className={Styles.addUser_tr}>
                                <td className={Styles.addUser_td}>Sachin</td>
                                <td className={Styles.addUser_td}>
                                    <select name="" id="" className={Styles.addUser_select}>
                                        <option value=""></option>
                                        <option value="True">True</option>
                                        <option value="False">False</option>
                                    </select>
                                </td>
                                <td className={Styles.addUser_td}>
                                    <select name="" id="" className={Styles.addUser_select}>
                                        <option value=""></option>
                                        <option value="True">True</option>
                                        <option value="False">False</option>
                                    </select>
                                </td>
                                <td className={Styles.addUser_td}>
                                    <select name="" id="" className={Styles.addUser_select}>
                                        <option value=""></option>
                                        <option value="True">True</option>
                                        <option value="False">False</option>
                                    </select>
                                </td>
                            </tr>
                        </table>
                        <button className={Styles.ACform_tbn} onClick={formbtn}>OK</button>

                    </div>
                </div>
            )}
        </>
    )
}