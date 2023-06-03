/* eslint-disable @next/next/no-img-element */
import React from "react";
import { useState,useEffect } from "react";
import styles from '../styles/ProfileCard.module.css'
import Link from "next/link";
import axios from "axios";
import FriendStatus from "./FriendStatus";


export default function ProfileCard({account}){

    return(
        <div className={styles['container']}>
            <div className={styles['profile-img']}>
                <img src={account.image_url?account.image_url:'../../images/profile.png'} alt='profile-image' />
            </div>
            <Link href={`/users/${account._id}`} ><p>{account.first_name + ' '+ account.last_name}</p></Link>
            <div className={styles['action-btns']}>
             <FriendStatus account={account}/>
                
            </div>
        </div>
    )
}