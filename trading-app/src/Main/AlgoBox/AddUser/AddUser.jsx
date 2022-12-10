import React, { useContext, useState } from "react";
import { userContext } from "../../AuthContext";
import Styles from "./AddUser.module.css";
import UserList from "./UserList";



export default function AddUser({algoName}) {
    let date = new Date();
    const getDetails = useContext(userContext);
    let modifiedOn = `${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()}`
    let modifiedBy = getDetails.userDetails.name;
    
    const [permissionData, setPermissionData] = useState([]);
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


    let newData = addUser.concat(permissionData);
    console.log("this is add usere", newData);

    async function formbtn(e, id) {
        e.preventDefault();
        // setModal(!modal);
        let flag = true;
        let newDataUpdated = newData.filter((elem)=>{
            return elem._id === id
        })

        if(permissionData.length){
            for(let elem of permissionData){
                if(elem.userId === newDataUpdated[0].userId){
                    console.log("put request");
                    flag = false;
                }
            }
            if(flag){
                console.log("post request");
            }
        } else{
            console.log("post request");
        }


    }

    return (
        <>
            <button onClick={toggleModal} className={Styles.addUserBtn}>ADD USER</button>
            
            {modal && (
                <div className="modal">
                    <div onClick={toggleModal} className="overlay"></div>
                    <div className={Styles.modalContent}>
                        <UserList addUser={addUser} setAddUser={setAddUser} setPermissionData={setPermissionData}/>
                        <table className={Styles.main_instrument_table}>
                            <tr className={Styles.addUser_tr}>
                                <th className={Styles.addUser_th} >User Name</th>
                                <th className={Styles.addUser_th}>Enable Trading</th>
                                <th className={Styles.addUser_th}>Enable Algo</th>
                                <th className={Styles.addUser_th}>Real Trading</th>
                            </tr>
                            {newData.map((elem)=>{
                                return(
                                    <tr key={elem._id} className={Styles.addUser_tr}>
                                        <td className={Styles.addUser_td}>{elem.userName}</td>
                                        <td className={Styles.addUser_td}>
                                            <select name="" id="" className={Styles.addUser_select}>
                                                <option value=""></option>
                                                <option value="True">True</option>
                                                <option value="False">False</option>
                                            </select>
                                        </td>
                                        {/* <td className={Styles.addUser_td}>
                                            <select name="" id="" className={Styles.addUser_select}>
                                                <option value=""></option>
                                                <option value="True">True</option>
                                                <option value="False">False</option>
                                            </select>
                                        </td> */}
                                        <td className={Styles.addUser_td}>
                                            <select name="" id="" className={Styles.addUser_select}>
                                                <option value=""></option>
                                                <option value="True">True</option>
                                                <option value="False">False</option>
                                            </select>
                                        </td>
                                        <td><button className={Styles.ACform_tbn} onClick={(e)=>formbtn(e, elem._id)}>OK</button></td>
                                    </tr>
                                )
                            })}

                        </table>
                        

                    </div>
                </div>
            )}
        </>
    )
}