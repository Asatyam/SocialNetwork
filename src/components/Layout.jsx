/* eslint-disable @next/next/no-img-element */
import React, { useState,useEffect } from "react";
import Navbar from "./Navbar";
import styles from  "../styles/Layout.module.css"

export default function Layout({children}){

    const [showNav, setShowNav] = useState(true);
    useEffect(()=>{
            const token = localStorage.getItem('token');
            if(!token){
                setShowNav(false);
            }    
    },[])

    return(
       <div className={styles.layout}>
      {showNav && <Navbar/>}
       {children}
       </div>
    )
}