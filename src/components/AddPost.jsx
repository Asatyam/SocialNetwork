/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
import React,{useState} from "react";
import styles from '../styles/AddPost.module.css'


export default function AddPost({setShowForm}){

    const handleClick =(e)=>{
        setShowForm(true);
    }
    return (
        <div className={styles['main-container']}>
            <div className='icon'>
                <img src="/images/profile.png" alt='profile-icon'/>
            </div>
            <button className={styles['new-post']} onClick={handleClick}>What's on your mind? </button>
            {/* <button className = 'icon'><img  src='images/gallery.png' alt='add image'/> </button> */}
        </div>
    )
}