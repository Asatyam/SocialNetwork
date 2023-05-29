import React from "react";
import { useState,useContext } from "react";
import { AuthContext } from "./context";
import axios from "axios";
import styles from '../styles/Login.module.css'

export default function Login(){

    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    const {auth, setAuth,user,setUser} = useContext(AuthContext);

    return(
       <div className={styles['main']}>
            <div className={styles['text-box']}></div>
            <div className={styles['form-container']}></div>
       </div>
    )
}