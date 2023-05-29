import React from "react";
import { useState,useContext } from "react";
import { AuthContext } from "./context";
import axios from "axios";
import styles from '../styles/Login.module.css'
import { Roboto } from "next/font/google";
const roboto = Roboto({subsets:['latin'],weight:'500'});
const robotoBold = Roboto({subsets:['latin'],weight:'900'});
export default function Login(){

    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    const {auth, setAuth,user,setUser} = useContext(AuthContext);

    return(
       <div className={`${styles['main']} ${roboto.className}` }>
            <div className={styles['text-box']}>
                <h1 className={robotoBold.className}>Odinbook</h1>
                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. </p>
            </div>
            <div className={styles['form-container']}></div>
       </div>
    )
}