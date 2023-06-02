/* eslint-disable @next/next/no-img-element */
import React from "react";
import { useState,useEffect } from "react";
import styles from '../styles/ProfileCard.module.css'
import Image from "next/image";
import Link from "next/link";
import axios from "axios";


export default function ProfileCard({account}){

    const [status,setStatus] = useState('');
    const [currUser, setCurrUser] = useState(null);

    useEffect(()=>{
        const user = JSON.parse(localStorage.getItem('user'))
        if(user === account._id){
            setStatus('same');
        }
         const token = JSON.parse(localStorage.getItem('token'));
           const config = {
                headers: {Authorization: `Bearer ${token}`}
           }
        axios.get(`http://localhost:4000/api/users/${user}`,config)
        .then(res=>{
            setCurrUser(res.data.user);
            const idx = res.data.user.friends.includes(account._id);
            if(idx){
                setStatus('friend');
            }
        })
        axios.get(`http://localhost:4000/api/users/${user}/sentRequests`,config)
        .then(res=>{
            const idx = res.data.sentRequests.findIndex((req)=>req._id === account._id);
            if(idx !== -1){
                setStatus('requested');
            }    
        })
        .catch(console.log) 
    
        axios.get(`http://localhost:4000/api/users/${user}/requests`,config)
        .then((res)=>{
            console.log(res.data);
             const idx = res.data.requests.findIndex((req)=>req._id === account._id);
            if(idx !== -1){
                setStatus('requesting');
            } 
        })
        .catch(console.log);
    },[setCurrUser,account._id,status])

    const removeFriend = (e)=>{
          const token = JSON.parse(localStorage.getItem('token'));
           const config = {
                headers: {Authorization: `Bearer ${token}`}
           }
        console.log(config);
        axios.patch(`http://localhost:4000/api/users/${account._id}/removeFriend`,{},config)
        .then((res)=>{
            setStatus('');
        })
        .catch(console.log);
    }
    const addFriend = (e)=>{
         const token = JSON.parse(localStorage.getItem('token'));
           const config = {
                headers: {Authorization: `Bearer ${token}`}
           }
        console.log(config);
        axios.patch(`http://localhost:4000/api/users/${account._id}/sendRequest`,{},config)
        .then((res)=>{
            setStatus('requested');
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
            setStatus('');
            console.log(res.data);
        })
        .catch(console.log);
    }
    const acceptRequest = (e)=>{
         const token = JSON.parse(localStorage.getItem('token'));
           const config = {
                headers: {Authorization: `Bearer ${token}`}
           }
        console.log(config);
        axios.patch(`http://localhost:4000/api/users/${account._id}/acceptRequest`,{},config)
        .then((res)=>{
            setStatus('friend');
            console.log(res.data);
        })
        .catch(console.log);
    }
     const rejectRequest = (e)=>{
         const token = JSON.parse(localStorage.getItem('token'));
           const config = {
                headers: {Authorization: `Bearer ${token}`}
           }
        console.log(config);
        axios.patch(`http://localhost:4000/api/users/${account._id}/rejectRequest`,{},config)
        .then((res)=>{
            setStatus('');
            console.log(res.data);
        })
        .catch(console.log);
    }

    const  returnButtons = (friendShipStatus)=>{
    switch(friendShipStatus){

        case 'friend':
            return(
                <>
                <button onClick={removeFriend}> Friends ✔️</button>
                <button>Message</button>
                </>
            )
        case 'requested':
            return(
                <>
                <button onClick = {cancelRequest}>Cancel Request</button>
                </>
            );
        case 'requesting':
            return(
                <>
                <button onClick={acceptRequest}> Accept</button>
                <button onClick = {rejectRequest}>Reject</button>
                </>
            )
        case 'same':
            return(
                <>
                </>
            )
        default: 
                return(
                    <>
                    <button onClick={addFriend}> Add friend</button>
                    </>
                )
    }
}

    
    return(
        <div className={styles['container']}>
            <div className={styles['profile-img']}>
                <img src={account.image_url?account.image_url:'../../images/profile.png'} alt='profile-image' />
            </div>
            <Link href={`/users/${account._id}`} ><p>{account.first_name + ' '+ account.last_name}</p></Link>
            <div className={styles['action-btns']}>
             { returnButtons(status)}
                
            </div>
        </div>
    )
}