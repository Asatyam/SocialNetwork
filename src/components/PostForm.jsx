/* eslint-disable @next/next/no-img-element */
import React from "react";
import { useState } from "react";
import styles from '../styles/PostForm.module.css'

export default function PostForm({setShowForm}){

    const [content, setContent] = useState("");

    const closeForm = (e)=>{
        setShowForm(false);
    }
    return(
        <div className = {styles['container']}>
            <div className={styles['heading']}>
                <h1>Create Post</h1>
                <button className='icon' onClick={closeForm}><img src='../../images/cancel.png' alt = 'close-btn'/></button>
            </div>
            
            <form>
                <textarea name = 'post' id='post' value = {content} onChange = {(e)=>setContent(e.target.value)} placeholder="What's on your mind?"></textarea>
                <div className="img-input">
                    <label htmlFor="image"><img src='../../images/gallery.png' alt = 'add-image-btn'/></label>
                    <input type="file" id='image' size='60' name='postImage' />
                </div>
                <button type="submit">Create</button>
            </form>
            
        </div>
    )
}