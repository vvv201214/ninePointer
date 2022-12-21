import React from 'react'
import { useEffect } from 'react';

export default function NewTradersTable() {

    let baseUrl = process.env.NODE_ENV === "production" ? "/" : "http://localhost:9000/"
    let socket;
    try{
        socket = io.connect(`${baseUrl}`)
    } catch(err){
        throw new Error(err);
    }

    useEffect(()=>{

    },[])


  return (
    <>
    
    </>
  )
}
