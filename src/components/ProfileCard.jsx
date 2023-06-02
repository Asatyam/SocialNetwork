/* eslint-disable @next/next/no-img-element */
import React from "react";
import { useState,useEffect } from "react";
import styles from '../styles/ProfileCard.module.css'
import Image from "next/image";
import Link from "next/link";
import axios from "axios";

export default function ProfileCard({account}){

    const [isFriend, setIsFriend] = useState(false);
    const [currUser, setCurrUser] = useState(null);

    useEffect(()=>{
        const user = JSON.parse(localStorage.getItem('user'))
         const token = JSON.parse(localStorage.getItem('token'));
           const config = {
                headers: {Authorization: `Bearer ${token}`}
           }
        axios.get(`http://localhost:4000/api/users/${user}`,config)
        .then(res=>{
            setCurrUser(res.data.user);
            const idx = res.data.user.friends.includes(account._id);
            setIsFriend(idx);
        })
        .catch(console.log) 
    },[setCurrUser,account._id])

    const handleRemoveFriend = (e)=>{
        console.log(e.target);
    }
    const handleAddFriend = (e)=>{
        console.log(e.target);
    }
    
    return(
        <div className={styles['container']}>
            <div className={styles['profile-img']}>
                <img src={account.image_url?account.image_url:'../../images/profile.png'} alt='profile-image' />
            </div>
            <Link href={`/users/${account._id}`} ><p>{account.first_name + ' '+ account.last_name}</p></Link>
            <div className={styles['action-btns']}>
             { isFriend ?  <button onClick={handleRemoveFriend}> Friends ✔️</button>: <button onClick={handleAddFriend}>Add Friend</button>}
                <button>Message</button>
            </div>
        </div>
    )
}