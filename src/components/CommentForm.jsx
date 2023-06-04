import React,{useState} from "react";
import styles from '../styles/CommentForm.module.css';
import axios from "axios";

export default function CommentForm({post}){

    const [content, setContent] = useState('');

    const handleSubmit = (e)=>{
        e.preventDefault();
         const token = JSON.parse(localStorage.getItem('token'));
           const config = {
                headers: {Authorization: `Bearer ${token}`}
           }
           axios.post(`http://localhost:4000/api/posts/${post._id}/comments`,{content},config)
           .then((res)=>{
                setContent('');
           })
           .catch(console.log);
    }
    return(
        <div className={styles['container']}>
            <form onSubmit={handleSubmit}>
                <div className={styles['content']}>
                 <label htmlFor="comment">Comment</label>
            <textarea name='content' id='comment' value={content} onChange={(e)=>{setContent(e.target.value)}} required></textarea>
            </div>
            <button type='submit' className={styles['post-btn']}>Post</button>
            </form>
        </div>
    )
}