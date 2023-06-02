/* eslint-disable @next/next/no-img-element */
import React from "react";
import { useState,useEffect } from "react";
import styles from '../styles/ProfileCard.module.css'
import Image from "next/image";
import Link from "next/link";
import axios from "axios";

export default function ProfileCard({account}){

    const [isFriend, setIsFriend] = useState(false);
    const [requested,setRequested] = useState(false);
    const [requesting, setRequesting] = useState(false);
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
        axios.get(`http://localhost:4000/api/users/${user}/sentRequests`,config)
        .then(res=>{
            const idx = res.data.sentRequests.findIndex((req)=>req._id === account._id);
            if(idx !== -1){
                setRequested(true);
            }    
        })
        .catch(console.log) 
    
        axios.get(`http://localhost:4000/api/users/${user}/requests`,config)
        .then((res)=>{
            console.log(res.data);
             const idx = res.data.requests.findIndex((req)=>req._id === account._id);
            if(idx !== -1){
                setRequesting(true);
            } 
        })
        .catch(console.log);
    },[setCurrUser,account._id,setRequested,requested,requesting,setRequesting])

    const handleRemoveFriend = (e)=>{
        console.log(e.target);
    }
    const handleAddFriend = (e)=>{
         const token = JSON.parse(localStorage.getItem('token'));
           const config = {
                headers: {Authorization: `Bearer ${token}`}
           }
        console.log(config);
        axios.patch(`http://localhost:4000/api/users/${account._id}/sendRequest`,{},config)
        .then((res)=>{
            setRequested(true);
        })
        .catch(console.log);
    }
    const cancelRequest = (e)=>{
         const token = JSON.parse(localStorage.getItem('token'));
           const config = {
                headers: {Authorization: `Bearer ${token}`}
           }
        console.log(config);
        axios.patch(`http://localhost:4000/api/users/${account._id}/cancelRequest`,{},config)
        .then((res)=>{
            setRequested(false);
            console.log(res.data);
        })
        .catch(console.log);
    }
    
    return(
        <div className={styles['container']}>
            <div className={styles['profile-img']}>
                <img src={account.image_url?account.image_url:'../../images/profile.png'} alt='profile-image' />
            </div>
            <Link href={`/users/${account._id}`} ><p>{account.first_name + ' '+ account.last_name}</p></Link>
            <div className={styles['action-btns']}>
             { isFriend ?  <button onClick={handleRemoveFriend}> Friends ✔️</button>: requested? <button onClick={cancelRequest}>Cancel request</button> : <button onClick={handleAddFriend}>Add Friend</button>}
                <button>Message</button>
            </div>
        </div>
    )
}