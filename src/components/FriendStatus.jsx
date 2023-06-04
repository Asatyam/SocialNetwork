/* eslint-disable @next/next/no-img-element */
import React from "react";
import { useState,useEffect } from "react";
import styles from '../styles/ProfileCard.module.css'
import axios from "axios";


export default function FriendStatus({account}){

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
        axios.get(`https://socialnetwork-api-r5ve.onrender.com/api/users/${user}`,config)
        .then(res=>{
            setCurrUser(res.data.user);
            const idx = res.data.user.friends.includes(account._id);
            if(idx){
                setStatus('friend');
            }
        })
        .catch(console.log);
        axios.get(`https://socialnetwork-api-r5ve.onrender.com/api/users/${user}/sentRequests`,config)
        .then(res=>{
            const idx = res.data.sentRequests.findIndex((req)=>req._id === account._id);
            if(idx !== -1){
                setStatus('requested');
            }    
        })
        .catch(console.log) 
    
        axios.get(`https://socialnetwork-api-r5ve.onrender.com/api/users/${user}/requests`,config)
        .then((res)=>{
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
        axios.patch(`https://socialnetwork-api-r5ve.onrender.com/api/users/${account._id}/removeFriend`,{},config)
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
        axios.patch(`https://socialnetwork-api-r5ve.onrender.com/api/users/${account._id}/sendRequest`,{},config)
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
        axios.patch(`https://socialnetwork-api-r5ve.onrender.com/api/users/${account._id}/cancelRequest`,{},config)
        .then((res)=>{
            setStatus('');
        })
        .catch(console.log);
    }
    const acceptRequest = (e)=>{
         const token = JSON.parse(localStorage.getItem('token'));
           const config = {
                headers: {Authorization: `Bearer ${token}`}
           }
        axios.patch(`https://socialnetwork-api-r5ve.onrender.com/api/users/${account._id}/acceptRequest`,{},config)
        .then((res)=>{
            setStatus('friend');
        })
        .catch(console.log);
    }
     const rejectRequest = (e)=>{
         const token = JSON.parse(localStorage.getItem('token'));
           const config = {
                headers: {Authorization: `Bearer ${token}`}
           }
        axios.patch(`https://socialnetwork-api-r5ve.onrender.com/api/users/${account._id}/rejectRequest`,{},config)
        .then((res)=>{
            setStatus('');
        })
        .catch(console.log);
    }

    const  returnButtons = (friendShipStatus)=>{
    switch(friendShipStatus){

        case 'friend':
            return(
                <>
                <button onClick={removeFriend}> Friends ✅</button>
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
            <>
             { returnButtons(status)}     
            </>

    )
}