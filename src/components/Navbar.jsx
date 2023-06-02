/* eslint-disable @next/next/no-img-element */
import React, { useContext } from "react";
import { useState } from "react";
import styles from '../styles/Navbar.module.css'
import Link from "next/link";
import axios from "axios";
import { AuthContext } from "@/pages/context";


export default function Navbar(){


    const [search, setSearch] = useState('');
    const {setAuth} = useContext(AuthContext);
    let userid;
    if(typeof window !=='undefined'){
        const user = JSON.parse(localStorage.getItem('user'));
        userid = user;
    }
    const handleLogout = (e)=>{
        const token = JSON.parse(localStorage.getItem('token'));
           const config = {
                headers: {Authorization: `Bearer ${token}`}
           }
           localStorage.clear();
           setAuth(false);
        axios.post('http://localhost:4000/api/logout',config)
        .catch(console.log);
    }
    return(
            <nav className={styles['main-nav']}>
                <h1><Link href = '/'>Odinbook</Link></h1>
                <div className={`${styles['search']} ${styles['wide']}}`}>
                    <input type="search" name='search' value={search} onChange={(e)=>setSearch(e.target.value)} placeholder="Search"/>
                </div>
                <nav className = {styles['small-nav']}>
                    <button className='icon'><img src="/images/chat.png" alt = "Chat-icon"/></button>
                    <button className = 'icon' onClick={handleLogout}><img src="/images/logout.png" alt = "logout-icon"/></button>
                    <button className = 'icon'><Link href = {`/users/${userid}`}><img src="/images/profile.png" alt = "profile-icon"/></Link></button>
                </nav> 
            </nav>
    )
}