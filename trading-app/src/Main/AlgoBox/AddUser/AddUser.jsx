import React, { useState } from "react";
import Styles from "./AddUser.module.css";
import UserList from "./UserList";



export default function AddUser({algoName}) {

    const [modal, setModal] = useState(false);
    const [addUser, setAddUser] = useState([]);
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

    console.log("this is add usere", addUser);

    return (
        <>
            <button onClick={toggleModal} className={Styles.addUserBtn}>ADD USER</button>
            
            {modal && (
                <div className="modal">
                    <div onClick={toggleModal} className="overlay"></div>
                    <div className={Styles.modalContent}>
                        <UserList addUser={addUser} setAddUser={setAddUser} />
                        <table className={Styles.main_instrument_table}>
                            <tr className={Styles.addUser_tr}>
                                <th className={Styles.addUser_th} >User Name</th>
                                <th className={Styles.addUser_th}>Enable Trading</th>
                                <th className={Styles.addUser_th}>Enable Algo</th>
                                <th className={Styles.addUser_th}>Real Trading</th>
                            </tr>
                            {addUser.map((elem)=>{
                                return(
                                    <tr className={Styles.addUser_tr}>
                                        <td className={Styles.addUser_td}>{elem.label}</td>
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
                                )
                            })}

                        </table>
                        <button className={Styles.ACform_tbn} onClick={formbtn}>OK</button>

                    </div>
                </div>
            )}
        </>
    )
}