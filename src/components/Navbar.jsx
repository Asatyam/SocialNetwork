/* eslint-disable @next/next/no-img-element */
import React from "react";
import { useState } from "react";
import styles from '../styles/Navbar.module.css'
import Link from "next/link";
import Image from "next/image";

export default function Navbar(){

    const handleClick = (e)=>{
        setShowSearch(true);
    }

    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    return(
            <nav className={styles['main-nav']}>
                <h1><Link href = '/'>Odinbook</Link></h1>
               { showSearch? <input type="search" name='search' className={styles['search']} value={search} onChange={(e)=>setSearch(e.target.value)} placeholder="Search"/>:<button onClick = {handleClick}><img src="/images/search.png" alt = "Search-icon"/></button>}
                <nav className = {styles['small-nav']}>
                    <button className={styles['chat']}><img src="/images/chat.png" alt = "Chat-icon"/></button>
                    <button className = {styles['notifications']}><img src="/images/notification.png" alt = "notification-icon"/></button>
                    <button className = {styles['profile-btn']}><img src="/images/profile.png" alt = "profile-icon"/></button>
                </nav> 
            </nav>
    )
}
{/* <img src="/images/chat.png" alt = "Chat-icon"/>
<img src="/images/chat.png" alt = "Chat-icon"/>
<img src="/images/chat.png" alt = "Chat-icon"/> */}