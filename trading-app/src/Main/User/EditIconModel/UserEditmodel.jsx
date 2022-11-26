import React, { useState } from "react";
import { useEffect } from "react";
import { TiEdit } from "react-icons/ti";
import Styles from "./UserEditModel.module.css";


export default function UserEditModel({data, id}) {
   
    const[editData, setEditData] = useState(data);

    useEffect(()=>{
        let updatedData = editData.filter((elem)=>{
            return elem._id === id
        })
        setEditData(updatedData)
        
    },[])
        console.log(editData);

        const [formstate, setformstate] = useState({
            Name: editData[0].name,
            Designation: editData[0].designation,
            EmailID: editData[0].email,
            MobileNo: editData[0].mobile,
            Degree: editData[0].degree,
            DOB: editData[0].dob,
            Gender: editData[0].gender,
            TradingExp: editData[0].trading_exp,
            Location: editData[0].location,
            LastOccupation: editData[0].last_occupation,
            DateofJoining: editData[0].joining_date,
            Role: editData[0].role,
            Status: editData[0].status
        });
    
    const [modal, setModal] = useState(false);
    const toggleModal = () => {
        setModal(!modal);
    };

    if (modal) {
        document.body.classList.add('active-modal')
    } else {
        document.body.classList.remove('active-modal')
    }

    function formbtn(e) {
        e.preventDefault();
        setformstate(formstate);
        console.log(formstate)
        setModal(!modal);

    }

    function handleInputChange(e){
        // const target = e.target;
        // const value = target.value;
        // setformstate({
           
        // });
        
    }

        return (
            <>
                <button onClick={toggleModal}><TiEdit /></button>

                {modal && (
                    <div className="modal">
                        <div onClick={toggleModal} className="overlay"></div>
                        <div className={Styles.modalContent}>
                            <form className={Styles.main_instrument_form}>
                                <label className={Styles.Ac_form} htmlFor="">Name</label>
                                <input type="text" value={formstate.Name} className={Styles.Ac_forminput} onChange={(e) =>  setformstate(formstate.Name= e.target.value)} />
                                <label className={Styles.Ac_form} htmlFor="">Designation</label>
                                <input type="text" value={formstate.Designation} className={Styles.Ac_forminput} onChange={handleInputChange} />
                                <label className={Styles.Ac_form} htmlFor="">EmailID</label>
                                <input type="text" value={formstate.EmailID} className={Styles.Ac_forminput} onChange={handleInputChange} />
                                <label htmlFor="" className={Styles.Ac_form}>MobileNo</label>
                                <input type="text" value={formstate.MobileNo} className={Styles.Ac_forminput} onChange={handleInputChange} />
                                <label htmlFor="" className={Styles.Ac_form}>Degree</label>
                                <input type="text" value={formstate.Degree} className={Styles.Ac_forminput} onChange={handleInputChange} />
                                <label htmlFor="" className={Styles.Ac_form}>DOB</label>
                                <input type="text" value={formstate.DOB} className={Styles.Ac_forminput} onChange={handleInputChange} />
                                <label htmlFor="" className={Styles.Ac_form}>Gender</label>
                                <select name="" value={formstate.Gender} id="" className={Styles.Ac_forminput} onChange={handleInputChange}>
                                    <option value=""></option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                                <label htmlFor="" className={Styles.Ac_form}>Trading Exp.</label>
                                <input type="text" value={formstate.TradingExp} className={Styles.Ac_forminput} onChange={handleInputChange} />
                                <label htmlFor="" className={Styles.Ac_form}>Location</label>
                                <input type="text" value={formstate.Location} className={Styles.Ac_forminput} onChange={handleInputChange} />
                                <label htmlFor="" className={Styles.Ac_form}>Last Occupation</label>
                                <input type="text" value={formstate.LastOccupation} className={Styles.Ac_forminput} onChange={handleInputChange} />
                                <label htmlFor="" className={Styles.Ac_form}>Date of Joining</label>
                                <input type="text" value={formstate.DateofJoining} className={Styles.Ac_forminput} onChange={handleInputChange} />
                                <label htmlFor="" className={Styles.Ac_form}>Role</label>
                                <input type="text" value={formstate.Role} className={Styles.Ac_forminput} onChange={handleInputChange} />
                                <label htmlFor="" className={Styles.Ac_form}>Status</label>
                                <select name="" value={formstate.Status} id="" className={Styles.Ac_forminput} onChange={handleInputChange}>
                                    <option value=""></option>
                                    <option value="Inactive">Inactive</option>
                                    <option value="Active">Active</option>
                                </select>
                            </form>
                            <button className={Styles.ACform_tbn} onClick={formbtn}>OK</button>

                        </div>
                    </div>
                )}
            </>
        )
    }