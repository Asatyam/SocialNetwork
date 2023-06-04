import React, { useEffect } from "react";
import { useState,useContext } from "react";
import { AuthContext } from "./context";
import axios from "axios";
import styles from '../styles/Login.module.css'
import { Roboto } from "next/font/google";
import { useRouter } from "next/router";
const roboto = Roboto({subsets:['latin'],weight:'500'});
const robotoBold = Roboto({subsets:['latin'],weight:'900'});
export default function Login(){

    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [errors, setErrors] = useState();
    const {auth, setAuth} = useContext(AuthContext);
    const router = useRouter();
    /*To do Client side validation */
    useEffect(()=>{
        
        const token = localStorage.getItem('token');
        
        if(token){
            router.replace('/');
        }
    })
    const handleEmailChange = (e)=>{
        setEmail(e.target.value);
    }
     const handlePasswordChange = (e)=>{
        setPassword(e.target.value);
    }

    const handleSubmit = (e)=>{

        e.preventDefault();
        const body = {email, password};
        axios.post('http://localhost:4000/api/login',body)
        .then((res)=>{
            setAuth(true);
            localStorage.setItem('token',JSON.stringify(res.data.token));
            localStorage.setItem('user',JSON.stringify(res.data.body._id));
            setErrors('');
            router.push('/');
            
        }).catch(err=>{
            setErrors(err.response.data.info);
        })
    }

    return(
       <div className={`${styles['main']} ${roboto.className}` }>
            <div className={styles['text-box']}>
                <h1 className={robotoBold.className}>LetsTalk</h1>
                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. </p>
            </div>
            <div className={styles['form-container']}>
                <form onSubmit={handleSubmit}>
                    <div className={styles['form-item']}>
                        <label htmlFor="email">Email <span style={{color:'red'}}>*</span></label>
                        <input type='email' id='email' name='email' placeholder="abc123@email.com" value = {email} onChange={handleEmailChange} required/>
                    </div>

                    <div className={styles['form-item']}>
                        <label htmlFor = "password">Password <span style={{color:'red'}}>*</span></label>
                        <input type='password' id='password' name='password' placeholder="Abcd@123" minLength = '8' value = {password} onChange={handlePasswordChange} required/>
                    </div>
                    <button type='submit' className={styles['form-btn']}>Login</button>
                    {errors && <p className={styles['error']}>{errors.message} </p>}
                </form>
                <button className={styles['new-account']} onClick = {()=>{router.push('/signup')}}>Create new Account</button>
            </div>
       </div>
    )
}