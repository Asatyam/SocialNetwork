/* eslint-disable @next/next/no-img-element */
import React, { useState,useEffect } from "react";
import Navbar from "./Navbar";
import styles from  "../styles/Layout.module.css"
import { useRouter } from "next/router";

export default function Layout({children}){

    const router = useRouter();
    const showNav = (router.pathname === '/login' || router.pathname === '/signup') ? false : true;

    return(
       <div className={styles.layout}>
      {showNav && <Navbar/>}
       {children}
       </div>
    )
}