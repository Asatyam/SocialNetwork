/* eslint-disable @next/next/no-img-element */
import React from "react";
import { useState } from "react";
import styles from '../styles/PostForm.module.css'
import axios from "axios";

export default function PostForm({setShowForm}){

    const [content, setContent] = useState("");
    const [file,setFile] = useState(null);

    const closeForm = (e)=>{
        setShowForm(false);
    }
    const handleSubmit = (e)=>{
        const formData = new FormData();
        formData.set('content',content);
        
        if(file){ 
            formData.append('file',file);  
        }
        e.preventDefault();
         const token = JSON.parse(localStorage.getItem('token'));
           const config = {
                headers: {Authorization: `Bearer ${token}`},
                'Content-Type': 'multipart/form-data'
           }
           axios.post(`http://localhost:4000/api/posts`,formData,config)
           .then((res)=>{
                setContent('');
                setShowForm(false);
           })
           .catch(console.log);
    }
    const handleFileChange = (e)=>{
        setFile(e.target.files[0]);
    }
    return(
        <div className = {styles['container']}>
            <div className={styles['heading']}>
                <h1>Create Post</h1>
                <button className='icon' onClick={closeForm}><img src='../../images/cancel.png' alt = 'close-btn'/></button>
            </div>
            
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <textarea required name = 'post' id='post' value = {content} onChange = {(e)=>setContent(e.target.value)} placeholder="What's on your mind?"></textarea>
                <div className="img-input">
                    <label htmlFor="image"><img src='../../images/gallery.png' alt = 'add-image-btn'/></label>
                    <input type="file" id='image' size='60' name='postImage' onChange={handleFileChange} />
                </div>
                <button type="submit">Create</button>
            </form>
            
        </div>
    )
}