import React,{useState} from "react";
import styles from '../styles/CommentForm.module.css';


export default function CommentForm(){

    const [content, setContent] = useState('');

    return(
        <div className={styles['container']}>
            <form>
                <div className={styles['content']}>
                 <label htmlFor="comment">Comment</label>
            <textarea name='content' id='comment' value={content} onChange={(e)=>{setContent(e.target.value)}}></textarea>
            </div>
            <button type='submit' className={styles['post-btn']}>Post</button>
            </form>
        </div>
    )
}